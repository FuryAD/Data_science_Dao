"""Unit tests for ML models."""
import unittest
import numpy as np
from doncoin.data_science.models.risk_scorer import RiskScorer
from doncoin.data_science.models.heuristics import TransactionHeuristic


class TestRiskScorer(unittest.TestCase):

    def setUp(self):
        self.risk_scorer = RiskScorer()

    def test_score_without_training(self):
        """Test scoring before model training."""
        features = {'tx_frequency': 5.0, 'conversion_rate': 0.8, 'tx_count': 10}
        score = self.risk_scorer.score(features)
        self.assertEqual(score['risk_level'], 'low')

    def test_score_after_training(self):
        """Test scoring after model training."""
        X = np.random.randn(5, 3)
        y = np.array([0, 0, 1, 1, 0])
        self.risk_scorer.train(X, y)
        
        features = {'tx_frequency': 5.0, 'conversion_rate': 0.8, 'tx_count': 10}
        score = self.risk_scorer.score(features)
        self.assertIn(score['risk_level'], ['low', 'medium', 'high'])


class TestTransactionHeuristic(unittest.TestCase):

    def test_high_frequency_detection(self):
        """Test detection of high-frequency users."""
        result = TransactionHeuristic.check_high_frequency_user(15.0, threshold=10.0)
        self.assertTrue(result)

    def test_low_conversion_detection(self):
        """Test detection of low conversion rate."""
        result = TransactionHeuristic.check_low_conversion(0.2, threshold=0.3)
        self.assertTrue(result)

    def test_evaluate_transaction(self):
        """Test transaction evaluation."""
        features = {
            'tx_frequency': 15.0,
            'conversion_rate': 0.2,
            'tx_count': 50,
        }
        result = TransactionHeuristic.evaluate_transaction('user_1', features)
        self.assertTrue(result['is_suspicious'])
        self.assertIn('high_frequency', result['flags'])


if __name__ == '__main__':
    unittest.main()
