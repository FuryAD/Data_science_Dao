"""Heuristic rules for decision-making."""
import logging
from datetime import datetime

logger = logging.getLogger(__name__)


class TransactionHeuristic:
    """Rule-based heuristics for transaction evaluation."""

    @staticmethod
    def check_high_frequency_user(tx_frequency: float, threshold: float = 10.0) -> bool:
        """Flag if user has unusually high transaction frequency."""
        return tx_frequency > threshold

    @staticmethod
    def check_low_conversion(conversion_rate: float, threshold: float = 0.3) -> bool:
        """Flag if user has low conversion rate (possible spam)."""
        return conversion_rate < threshold

    @staticmethod
    def evaluate_transaction(user_id: str, features: dict) -> dict:
        """Comprehensive heuristic evaluation."""
        flags = []
        
        if TransactionHeuristic.check_high_frequency_user(features.get('tx_frequency', 0)):
            flags.append('high_frequency')
        
        if TransactionHeuristic.check_low_conversion(features.get('conversion_rate', 1)):
            flags.append('low_conversion')
        
        return {
            'user_id': user_id,
            'flags': flags,
            'is_suspicious': len(flags) > 0,
            'timestamp': datetime.now().isoformat(),
        }
