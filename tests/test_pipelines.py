"""Integration tests for pipelines."""
import unittest
import pandas as pd
from datetime import datetime, timedelta
from doncoin.data_science.pipelines.etl import ETLPipeline
from doncoin.data_science.pipelines.model_inference import InferencePipeline


class TestETLPipeline(unittest.TestCase):

    def setUp(self):
        now = datetime.now()
        self.sample_df = pd.DataFrame([
            {'user_id': f'user_{i}', 'timestamp': now - timedelta(days=j), 'status': 'confirmed', 'amount': 100.0}
            for i in range(5) for j in range(3)
        ])

    def test_extract_transactions(self):
        """Test transaction extraction."""
        extracted = ETLPipeline.extract_transactions(self.sample_df)
        self.assertEqual(len(extracted), len(self.sample_df))

    def test_transform_data(self):
        """Test data transformation."""
        transformed = ETLPipeline.transform_data(self.sample_df)
        self.assertEqual(len(transformed), len(self.sample_df))
        self.assertIsNotNone(transformed['timestamp'].dtype)

    def test_full_pipeline(self):
        """Test full ETL pipeline."""
        result = ETLPipeline.run_full_pipeline(self.sample_df)
        self.assertGreater(len(result), 0)


class TestInferencePipeline(unittest.TestCase):

    def setUp(self):
        self.pipeline = InferencePipeline()
        now = datetime.now()
        self.sample_df = pd.DataFrame([
            {
                'user_id': 'user_1',
                'timestamp': now,
                'status': 'confirmed',
                'tx_frequency': 5.0,
                'conversion_rate': 0.8,
                'tx_count': 10,
            }
        ])

    def test_predict_risk(self):
        """Test risk prediction."""
        features = {
            'tx_frequency': 5.0,
            'conversion_rate': 0.8,
            'tx_count': 10,
        }
        prediction = self.pipeline.predict_risk('user_1', features)
        self.assertIn('risk_score', prediction)
        self.assertIn('combined_risk_level', prediction)

    def test_batch_inference(self):
        """Test batch inference."""
        results = self.pipeline.run_batch_inference(self.sample_df)
        self.assertEqual(len(results), len(self.sample_df))


if __name__ == '__main__':
    unittest.main()
