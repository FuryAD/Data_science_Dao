"""ETL pipeline for data extraction and transformation."""
import logging
import pandas as pd
from datetime import datetime

logger = logging.getLogger(__name__)


class ETLPipeline:
    """Extract-Transform-Load pipeline."""

    @staticmethod
    def extract_transactions(source_df: pd.DataFrame, filters: dict = None) -> pd.DataFrame:
        """Extract transactions with optional filters."""
        df = source_df.copy()
        
        if filters:
            if 'user_id' in filters:
                df = df[df['user_id'] == filters['user_id']]
            if 'status' in filters:
                df = df[df['status'] == filters['status']]
            if 'start_date' in filters:
                df = df[df['timestamp'] >= filters['start_date']]
        
        logger.info(f"Extracted {len(df)} transactions")
        return df

    @staticmethod
    def transform_data(df: pd.DataFrame) -> pd.DataFrame:
        """Transform raw data for ML consumption."""
        df = df.copy()
        
        # Ensure timestamp is datetime
        if 'timestamp' in df.columns:
            df['timestamp'] = pd.to_datetime(df['timestamp'])
        
        # Remove duplicates
        df = df.drop_duplicates()
        
        # Handle missing values
        df = df.fillna(0)
        
        logger.info(f"Transformed data shape: {df.shape}")
        return df

    @staticmethod
    def load_to_storage(df: pd.DataFrame, storage_path: str):
        """Load processed data to storage."""
        df.to_csv(storage_path, index=False)
        logger.info(f"Data loaded to {storage_path}")

    @staticmethod
    def run_full_pipeline(source_df: pd.DataFrame, filters: dict = None, output_path: str = None) -> pd.DataFrame:
        """Execute full ETL pipeline."""
        logger.info("Starting ETL pipeline...")
        
        extracted = ETLPipeline.extract_transactions(source_df, filters)
        transformed = ETLPipeline.transform_data(extracted)
        
        if output_path:
            ETLPipeline.load_to_storage(transformed, output_path)
        
        logger.info("ETL pipeline completed.")
        return transformed
