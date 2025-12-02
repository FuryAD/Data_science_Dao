"""Feature engineering for ML models."""
import pandas as pd
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)


class FeatureEngineer:
    """Derives features from raw transaction/user data."""

    @staticmethod
    def user_tx_frequency(user_id: str, transactions: pd.DataFrame, window_days: int = 7) -> float:
        """Average transactions per day in the last N days."""
        cutoff = datetime.now() - timedelta(days=window_days)
        user_txs = transactions[
            (transactions['user_id'] == user_id) & 
            (transactions['timestamp'] > cutoff)
        ]
        if len(user_txs) == 0:
            return 0.0
        days_active = (user_txs['timestamp'].max() - user_txs['timestamp'].min()).days + 1
        return len(user_txs) / max(days_active, 1)

    @staticmethod
    def event_lag(latest_event_timestamp: datetime) -> float:
        """Time lag in seconds from latest event to now."""
        return (datetime.now() - latest_event_timestamp).total_seconds()

    @staticmethod
    def user_conversion_rate(user_id: str, transactions: pd.DataFrame) -> float:
        """% of submitted transactions that were confirmed."""
        user_txs = transactions[transactions['user_id'] == user_id]
        if len(user_txs) == 0:
            return 0.0
        confirmed = user_txs[user_txs['status'] == 'confirmed'].shape[0]
        return confirmed / len(user_txs)

    @staticmethod
    def feature_vector(user_id: str, transactions: pd.DataFrame) -> dict:
        """Build complete feature dict for a user."""
        return {
            'user_id': user_id,
            'tx_frequency': FeatureEngineer.user_tx_frequency(user_id, transactions),
            'conversion_rate': FeatureEngineer.user_conversion_rate(user_id, transactions),
            'tx_count': len(transactions[transactions['user_id'] == user_id]),
            'timestamp': datetime.now().isoformat(),
        }
