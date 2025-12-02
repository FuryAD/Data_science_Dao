"""Risk scoring heuristic for transaction flagging."""
import json
import logging
from datetime import datetime
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import numpy as np

logger = logging.getLogger(__name__)


class RiskScorer:
    """Classifies transactions as low/medium/high risk."""

    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        self.is_trained = False

    def train(self, X: np.ndarray, y: np.ndarray):
        """Train the risk model. X: feature matrix, y: risk labels (0=low, 1=high)."""
        X_scaled = self.scaler.fit_transform(X)
        self.model.fit(X_scaled, y)
        self.is_trained = True
        logger.info("RiskScorer trained successfully.")

    def score(self, features: dict) -> dict:
        """
        Score a single transaction.
        Returns: {'risk_level': 'low'|'medium'|'high', 'probability': float, 'timestamp': str}
        """
        if not self.is_trained:
            logger.warning("Model not trained. Returning default low-risk score.")
            return {'risk_level': 'low', 'probability': 0.0, 'timestamp': datetime.now().isoformat()}

        feature_array = np.array([[
            features.get('tx_frequency', 0.0),
            features.get('conversion_rate', 0.5),
            features.get('tx_count', 0),
        ]])

        feature_array_scaled = self.scaler.transform(feature_array)
        prob = self.model.predict_proba(feature_array_scaled)[0][1]

        if prob < 0.33:
            risk_level = 'low'
        elif prob < 0.66:
            risk_level = 'medium'
        else:
            risk_level = 'high'

        output = {
            'risk_level': risk_level,
            'probability': float(prob),
            'timestamp': datetime.now().isoformat(),
            'input_features': features,
        }

        logger.info(f"Risk score computed: {json.dumps(output)}")
        return output
