"""Model inference pipeline for production."""
import logging
from datetime import datetime
from doncoin.data_science.models.risk_scorer import RiskScorer
from doncoin.data_science.models.heuristics import TransactionHeuristic
import pandas as pd

logger = logging.getLogger(__name__)


class InferencePipeline:
    """Production inference pipeline."""

    def __init__(self):
        self.risk_scorer = RiskScorer()
        self.heuristic = TransactionHeuristic()

    def predict_risk(self, user_id: str, features: dict) -> dict:
        """Predict transaction risk."""
        risk_score = self.risk_scorer.score(features)
        heuristic_eval = self.heuristic.evaluate_transaction(user_id, features)
        
        return {
            'user_id': user_id,
            'risk_score': risk_score,
            'heuristic_flags': heuristic_eval['flags'],
            'combined_risk_level': self._combine_scores(risk_score, heuristic_eval),
            'timestamp': datetime.now().isoformat(),
        }

    @staticmethod
    def _combine_scores(risk_score: dict, heuristic_eval: dict) -> str:
        """Combine risk score and heuristic evaluation."""
        if heuristic_eval['is_suspicious']:
            return 'high'
        return risk_score.get('risk_level', 'medium')

    def run_batch_inference(self, transactions_df: pd.DataFrame) -> list:
        """Run inference on batch of transactions."""
        results = []
        
        for _, row in transactions_df.iterrows():
            features = {
                'tx_frequency': row.get('tx_frequency', 0),
                'conversion_rate': row.get('conversion_rate', 0.5),
                'tx_count': row.get('tx_count', 0),
            }
            
            prediction = self.predict_risk(row['user_id'], features)
            results.append(prediction)
        
        logger.info(f"Batch inference completed for {len(results)} transactions")
        return results
