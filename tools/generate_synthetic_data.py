"""Generate synthetic datasets for data_science testing.

Creates:
- data/raw_transactions.csv    (per-transaction rows)
- data/features.csv            (per-user aggregated features)
- data/train_features.csv      (feature matrix + label for model training)

Usage:
    python generate_synthetic_data.py --out-dir ../data --n-users 100

"""
from __future__ import annotations
import argparse
import os
import random
from datetime import datetime, timedelta
import pandas as pd
import numpy as np

from doncoin.data_science.models.heuristics import TransactionHeuristic


def generate_raw_transactions(n_users=50, avg_txs_per_user=10, days=30):
    rows = []
    now = datetime.now()
    for u in range(1, n_users + 1):
        user_id = f'user_{u}'
        # sample transaction count per user
        tx_count = max(1, int(np.random.poisson(avg_txs_per_user)))
        for t in range(tx_count):
            ts = now - timedelta(days=random.uniform(0, days), hours=random.uniform(0, 24))
            status = 'confirmed' if random.random() < 0.85 else 'pending'
            amount = round(float(np.abs(np.random.normal(loc=50, scale=30))), 2)
            rows.append({
                'tx_id': f"tx_{user_id}_{t}",
                'user_id': user_id,
                'timestamp': ts.isoformat(),
                'status': status,
                'amount': amount,
            })
    return pd.DataFrame(rows)


def aggregate_features(transactions_df, window_days=7):
    # Convert timestamp
    df = transactions_df.copy()
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    now = datetime.now()
    cutoff = now - timedelta(days=window_days)

    features = []
    for user_id, group in df.groupby('user_id'):
        recent = group[group['timestamp'] >= cutoff]
        tx_count = len(group)
        tx_freq = len(recent) / max(window_days, 1)
        conversion_rate = group[group['status'] == 'confirmed'].shape[0] / max(tx_count, 1)
        features.append({
            'user_id': user_id,
            'tx_frequency': round(float(tx_freq), 4),
            'conversion_rate': round(float(conversion_rate), 4),
            'tx_count': int(tx_count),
        })
    return pd.DataFrame(features)


def generate_training_set(features_df, heuristics=None, n_samples=500):
    """Create a labeled training set by sampling and applying heuristics for labels.

    Label=1 indicates higher risk/suspicious according to the heuristic rules.
    """
    rows = []
    if heuristics is None:
        heuristics = TransactionHeuristic

    for _ in range(n_samples):
        # sample a base user or randomly sample values
        if random.random() < 0.7 and len(features_df) > 0:
            base = features_df.sample(1).iloc[0]
            tx_frequency = max(0.0, float(base['tx_frequency']) + np.random.normal(scale=1.0))
            conversion_rate = min(1.0, max(0.0, float(base['conversion_rate']) + np.random.normal(scale=0.1)))
            tx_count = max(0, int(base['tx_count'] + np.random.normal(scale=5)))
        else:
            tx_frequency = max(0.0, np.random.exponential(scale=2.0))
            conversion_rate = min(1.0, max(0.0, np.random.beta(2, 5)))
            tx_count = max(0, int(np.random.poisson(10)))

        features = {
            'tx_frequency': round(float(tx_frequency), 4),
            'conversion_rate': round(float(conversion_rate), 4),
            'tx_count': int(tx_count),
        }

        eval_res = heuristics.evaluate_transaction('synthetic_user', features)
        label = 1 if eval_res['is_suspicious'] else 0

        rows.append({**features, 'label': int(label)})

    return pd.DataFrame(rows)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--out-dir', '-o', default=os.path.join(os.path.dirname(__file__), '..', 'data'))
    parser.add_argument('--n-users', type=int, default=50)
    parser.add_argument('--avg-txs', type=float, default=10.0)
    parser.add_argument('--days', type=int, default=30)
    parser.add_argument('--train-samples', type=int, default=500)
    args = parser.parse_args()

    out_dir = os.path.abspath(args.out_dir)
    os.makedirs(out_dir, exist_ok=True)

    print(f"Generating raw transactions for {args.n_users} users...")
    raw = generate_raw_transactions(n_users=args.n_users, avg_txs_per_user=args.avg_txs, days=args.days)
    raw_path = os.path.join(out_dir, 'raw_transactions.csv')
    raw.to_csv(raw_path, index=False)
    print(f"Saved raw transactions to {raw_path} ({len(raw)} rows)")

    print("Aggregating per-user features...")
    features = aggregate_features(raw, window_days=7)
    features_path = os.path.join(out_dir, 'features.csv')
    features.to_csv(features_path, index=False)
    print(f"Saved features to {features_path} ({len(features)} rows)")

    print(f"Generating training set ({args.train_samples} samples)...")
    train = generate_training_set(features, n_samples=args.train_samples)
    train_path = os.path.join(out_dir, 'train_features.csv')
    train.to_csv(train_path, index=False)
    print(f"Saved training features to {train_path} ({len(train)} rows)")

    print('\nCompleted synthetic data generation.')


if __name__ == '__main__':
    main()
