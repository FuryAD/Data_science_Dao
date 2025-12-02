"""Example runner: train RiskScorer on synthetic data and run scoring.

Usage:
  python run_example.py --data-dir ../data

This script assumes you've generated synthetic data using
`generate_synthetic_data.py` into `doncoin/data_science/data/`.
"""
import argparse
import os
import pandas as pd
import numpy as np
from doncoin.data_science.models.risk_scorer import RiskScorer


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--data-dir', '-d', default=os.path.join(os.path.dirname(__file__), '..', 'data'))
    args = parser.parse_args()

    data_dir = os.path.abspath(args.data_dir)
    train_path = os.path.join(data_dir, 'train_features.csv')
    features_path = os.path.join(data_dir, 'features.csv')

    if not os.path.exists(train_path) or not os.path.exists(features_path):
        print('Please run generate_synthetic_data.py first to create CSVs in', data_dir)
        return

    print('Loading training data from', train_path)
    train_df = pd.read_csv(train_path)
    X = train_df[['tx_frequency', 'conversion_rate', 'tx_count']].values
    y = train_df['label'].values

    scorer = RiskScorer()
    scorer.train(X, y)
    print('Trained RiskScorer on synthetic data')

    print('Loading feature set for scoring from', features_path)
    feat_df = pd.read_csv(features_path)
    results = []
    for _, row in feat_df.iterrows():
        features = {
            'tx_frequency': float(row['tx_frequency']),
            'conversion_rate': float(row['conversion_rate']),
            'tx_count': int(row['tx_count'])
        }
        res = scorer.score(features)
        results.append({'user_id': row['user_id'], 'risk_level': res['risk_level'], 'prob': res['probability']})

    out_df = pd.DataFrame(results)
    out_path = os.path.join(data_dir, 'scored_features.csv')
    out_df.to_csv(out_path, index=False)
    print('Saved scored features to', out_path)


if __name__ == '__main__':
    main()
