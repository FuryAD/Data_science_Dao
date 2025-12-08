"""
Sprint 3: Monitoring & Metrics Module
Tracks KPIs, alerts, and operational health
"""

import time
import json
from datetime import datetime
from collections import deque, defaultdict
from threading import Lock
from enum import Enum

import numpy as np
from prometheus_client import Counter, Gauge, Histogram, generate_latest, CollectorRegistry


class AlertSeverity(Enum):
    """Alert severity levels"""
    CRITICAL = 1
    WARNING = 2
    INFO = 3


class KPITracker:
    """Track key performance indicators"""
    
    def __init__(self, max_history=1440):  # 1 day at 1-min resolution
        self.max_history = max_history
        self.lock = Lock()
        
        # Event processing KPIs
        self.event_processing_lag = deque(maxlen=max_history)  # Seconds
        self.error_rate = deque(maxlen=max_history)  # Percentage
        self.api_response_latency = deque(maxlen=max_history)  # Milliseconds
        self.suspicious_transactions_flagged = deque(maxlen=max_history)  # Count
        
        # Conversion metrics
        self.conversion_rate = deque(maxlen=max_history)  # Percentage
        self.transaction_success_rate = deque(maxlen=max_history)  # Percentage
        
        # Timestamp
        self.last_update = datetime.now()
        
    def update_event_lag(self, lag_seconds):
        """Update event processing lag KPI"""
        with self.lock:
            self.event_processing_lag.append(lag_seconds)
    
    def update_error_rate(self, error_count, total_count):
        """Update error rate KPI"""
        with self.lock:
            error_pct = (error_count / total_count * 100) if total_count > 0 else 0
            self.error_rate.append(error_pct)
    
    def update_latency(self, latency_ms):
        """Update API response latency"""
        with self.lock:
            self.api_response_latency.append(latency_ms)
    
    def update_suspicious_count(self, count):
        """Update count of flagged suspicious transactions"""
        with self.lock:
            self.suspicious_transactions_flagged.append(count)
    
    def update_conversion_rate(self, converted, total):
        """Update conversion rate KPI"""
        with self.lock:
            conv_pct = (converted / total * 100) if total > 0 else 0
            self.conversion_rate.append(conv_pct)
    
    def get_summary(self):
        """Get KPI summary statistics"""
        with self.lock:
            return {
                'timestamp': datetime.now().isoformat(),
                'event_processing_lag': {
                    'mean': np.mean(self.event_processing_lag) if self.event_processing_lag else 0,
                    'max': max(self.event_processing_lag) if self.event_processing_lag else 0,
                    'current': self.event_processing_lag[-1] if self.event_processing_lag else 0,
                },
                'error_rate': {
                    'mean': np.mean(self.error_rate) if self.error_rate else 0,
                    'max': max(self.error_rate) if self.error_rate else 0,
                    'current': self.error_rate[-1] if self.error_rate else 0,
                },
                'api_response_latency': {
                    'mean': np.mean(self.api_response_latency) if self.api_response_latency else 0,
                    'p95': np.percentile(self.api_response_latency, 95) if self.api_response_latency else 0,
                    'p99': np.percentile(self.api_response_latency, 99) if self.api_response_latency else 0,
                },
                'suspicious_transactions_flagged': {
                    'current': self.suspicious_transactions_flagged[-1] if self.suspicious_transactions_flagged else 0,
                    'total': sum(self.suspicious_transactions_flagged),
                },
                'conversion_rate': {
                    'mean': np.mean(self.conversion_rate) if self.conversion_rate else 0,
                    'current': self.conversion_rate[-1] if self.conversion_rate else 0,
                },
            }


class AlertManager:
    """Manage alerts and thresholds"""
    
    def __init__(self):
        self.lock = Lock()
        self.alerts = deque(maxlen=10000)  # Keep recent alerts
        
        # Alert thresholds (configurable)
        self.thresholds = {
            'event_processing_lag_critical': 60,  # seconds
            'error_rate_critical': 2.0,  # percentage
            'api_latency_warning': 1000,  # milliseconds
            'suspicious_transactions_critical': 50,  # count in period
        }
    
    def check_and_alert(self, kpi_name, value, threshold):
        """Check if value exceeds threshold and create alert"""
        if value > threshold:
            alert = {
                'timestamp': datetime.now().isoformat(),
                'kpi': kpi_name,
                'value': value,
                'threshold': threshold,
                'severity': AlertSeverity.CRITICAL.name,
                'message': f"{kpi_name} exceeded threshold: {value:.2f} > {threshold:.2f}"
            }
            with self.lock:
                self.alerts.append(alert)
            return alert
        return None
    
    def get_recent_alerts(self, limit=100):
        """Get recent alerts"""
        with self.lock:
            return list(self.alerts)[-limit:]


# Global instances
kpi_tracker = KPITracker()
alert_manager = AlertManager()


class MetricsCollector:
    """Collect metrics for Prometheus export"""
    
    def __init__(self):
        self.registry = CollectorRegistry()
        
        # Prometheus metrics
        self.http_requests_total = Counter(
            'http_requests_total',
            'Total HTTP requests',
            ['method', 'endpoint', 'status'],
            registry=self.registry
        )
        
        self.http_request_duration_ms = Histogram(
            'http_request_duration_ms',
            'HTTP request duration in milliseconds',
            ['endpoint'],
            registry=self.registry
        )
        
        self.event_processing_lag_seconds = Gauge(
            'event_processing_lag_seconds',
            'Event processing lag in seconds',
            registry=self.registry
        )
        
        self.error_rate_percent = Gauge(
            'error_rate_percent',
            'Error rate percentage',
            registry=self.registry
        )
        
        self.suspicious_transactions_total = Counter(
            'suspicious_transactions_total',
            'Total suspicious transactions flagged',
            registry=self.registry
        )
        
        self.model_inference_duration_ms = Histogram(
            'model_inference_duration_ms',
            'Model inference duration in milliseconds',
            ['model_name'],
            registry=self.registry
        )
    
    def export_metrics(self):
        """Export metrics in Prometheus format"""
        return generate_latest(self.registry).decode('utf-8')


metrics_collector = MetricsCollector()


# Logging for model inputs/outputs (for model tracing)
class ModelInferenceLogger:
    """Log all model inferences for tracing and audit"""
    
    def __init__(self, max_entries=10000):
        self.lock = Lock()
        self.logs = deque(maxlen=max_entries)
    
    def log_inference(self, model_name, features_dict, prediction, score, latency_ms):
        """Log model inference"""
        entry = {
            'timestamp': datetime.now().isoformat(),
            'model_name': model_name,
            'input_features': features_dict,
            'prediction': prediction,
            'score': score,
            'latency_ms': latency_ms,
        }
        with self.lock:
            self.logs.append(entry)
    
    def get_recent_inferences(self, model_name=None, limit=100):
        """Get recent inferences"""
        with self.lock:
            logs = list(self.logs)
            if model_name:
                logs = [l for l in logs if l['model_name'] == model_name]
            return logs[-limit:]


inference_logger = ModelInferenceLogger()


if __name__ == '__main__':
    # Demo: Simulate KPI updates
    print("=== Monitoring Module Demo ===\n")
    
    # Simulate event processing lag
    kpi_tracker.update_event_lag(45)  # Normal
    kpi_tracker.update_event_lag(65)  # Exceeds threshold
    
    # Check thresholds
    alert = alert_manager.check_and_alert(
        'event_processing_lag',
        65,
        alert_manager.thresholds['event_processing_lag_critical']
    )
    if alert:
        print(f"🚨 ALERT: {alert['message']}")
    
    # Get KPI summary
    print("\nKPI Summary:")
    summary = kpi_tracker.get_summary()
    print(json.dumps(summary, indent=2))
    
    # Log model inference
    inference_logger.log_inference(
        model_name='XGBoost_HighValueUserClassifier',
        features_dict={'total_amount': 100.5, 'tx_count': 15, 'confirmation_rate': 0.95},
        prediction=1,
        score=0.87,
        latency_ms=5.2
    )
    print("\n✅ Model inference logged")
