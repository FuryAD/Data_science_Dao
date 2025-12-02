"""Unit tests for feature engineering."""
import unittest
import pandas as pd
from datetime import datetime, timedelta
from doncoin.data_science.features.feature_engineering import FeatureEngineer


class TestFeatureEngineer(unittest.TestCase):

    def setUp(self):
        """Create sample transaction data."""
        now = datetime.now()
        self.transactions = pd.DataFrame([
            {'user_id': 'user_1', 'timestamp': now - timedelta(days=1), 'status': 'confirmed'},
            {'user_id': 'user_1', 'timestamp': now - timedelta(days=2), 'status': 'confirmed'},
            {'user_id': 'user_1', 'timestamp': now - timedelta(days=3), 'status': 'failed'},
            {'user_id': 'user_2', 'timestamp': now, 'status': 'confirmed'},
        ])

    def test_user_tx_frequency(self):
        """Test transaction frequency calculation."""
        freq = FeatureEngineer.user_tx_frequency('user_1', self.transactions, window_days=7)
        self.assertGreater(freq, 0)

    def test_user_conversion_rate(self):
        """Test conversion rate calculation."""
        rate = FeatureEngineer.user_conversion_rate('user_1', self.transactions)
        self.assertAlmostEqual(rate, 2/3, places=2)

    def test_feature_vector(self):
        """Test complete feature vector generation."""
        vec = FeatureEngineer.feature_vector('user_1', self.transactions)
        self.assertIn('user_id', vec)
        self.assertIn('tx_frequency', vec)
        self.assertIn('conversion_rate', vec)


if __name__ == '__main__':
    unittest.main()
