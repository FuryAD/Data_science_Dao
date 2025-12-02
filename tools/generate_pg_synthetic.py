"""Generate synthetic CSVs matching provided PostgreSQL table schemas.

Creates CSV files under `doncoin/data_science/data_pg/`:
- base_wallet.csv
- base_donor.csv
- base_proposal.csv
- base_round.csv
- base_matchingpool.csv
- base_donation.csv
- base_match.csv
- base_payout.csv
- base_qfresult.csv
- base_sybilscore.csv
- base_governancetoken.csv

Usage:
    python -m doncoin.data_science.tools.generate_pg_synthetic --out-dir doncoin/data_science/data_pg

This script uses only stdlib + pandas/numpy; it creates realistic relationships between tables.
"""
from __future__ import annotations
import argparse
import os
import uuid
import random
from datetime import datetime, timedelta
import pandas as pd
import numpy as np


def gen_uuid():
    return str(uuid.uuid4())


def random_date(start_days_ago=365, end_days_ago=0):
    start = datetime.now() - timedelta(days=start_days_ago)
    end = datetime.now() - timedelta(days=end_days_ago)
    return start + (end - start) * random.random()


def money(v):
    return round(float(v), 8)


def generate_data(out_dir, n_donors=100, n_wallets=None, n_rounds=5, n_proposals=60, avg_donations_per_proposal=8):
    os.makedirs(out_dir, exist_ok=True)

    # Wallets
    if n_wallets is None:
        n_wallets = n_donors + 20

    wallets = []
    for _ in range(n_wallets):
        wid = gen_uuid()
        addr = '0x' + uuid.uuid4().hex[:40]
        balance = money(abs(np.random.normal(loc=1000, scale=2000)))
        status = random.choice(['active', 'inactive'])
        last_activity = random_date(180, 0).isoformat()
        wallets.append({'wallet_id': wid, 'address': addr, 'balance': balance, 'status': status, 'last_activity': last_activity})
    wallets_df = pd.DataFrame(wallets)
    wallets_df.to_csv(os.path.join(out_dir, 'base_wallet.csv'), index=False)

    # Donors (link some to wallets)
    donors = []
    for i in range(n_donors):
        did = gen_uuid()
        username = f'user{i+1:04d}'
        reputation = round(max(0.0, np.random.normal(loc=50, scale=15)), 6)
        joined_at = random_date(1000, 200).isoformat()
        wallet_id = wallets_df.sample(1).iloc[0]['wallet_id']
        donors.append({'donor_id': did, 'username': username, 'reputation_score': reputation, 'joined_at': joined_at, 'wallet_id': wallet_id})
    donors_df = pd.DataFrame(donors)
    donors_df.to_csv(os.path.join(out_dir, 'base_donor.csv'), index=False)

    # Matching pools
    pools = []
    for i in range(n_rounds):
        pid = gen_uuid()
        total = money(abs(np.random.normal(loc=50000, scale=20000)))
        allocated = money(total * random.uniform(0.0, 0.6))
        replenished_by = random.choice(['grant', 'donation', 'reserve'])
        pools.append({'pool_id': pid, 'total_funds': total, 'allocated_funds': allocated, 'replenished_by': replenished_by})
    pools_df = pd.DataFrame(pools)
    pools_df.to_csv(os.path.join(out_dir, 'base_matchingpool.csv'), index=False)

    # Rounds
    rounds = []
    for i in range(n_rounds):
        rid = gen_uuid()
        start = random_date(1200, 300)
        end = start + timedelta(days=random.randint(7, 60))
        status = random.choice(['upcoming', 'open', 'closed'])
        matching_pool_id = pools_df.sample(1).iloc[0]['pool_id']
        rounds.append({'round_id': rid, 'start_date': start.isoformat(), 'end_date': end.isoformat(), 'status': status, 'matching_pool_id': matching_pool_id})
    rounds_df = pd.DataFrame(rounds)
    rounds_df.to_csv(os.path.join(out_dir, 'base_round.csv'), index=False)

    # Proposals (linked to donors and rounds)
    proposals = []
    for i in range(n_proposals):
        pid = gen_uuid()
        title = f'Project Proposal #{i+1}'
        description = f'Description for project {i+1}. Generated synthetic content.'
        status = random.choice(['open', 'closed', 'approved', 'rejected'])
        total_donations = 0.0
        created_at = random_date(400, 0).isoformat()
        proposer = donors_df.sample(1).iloc[0]['donor_id']
        round_id = rounds_df.sample(1).iloc[0]['round_id']
        proposals.append({'proposal_id': pid, 'title': title, 'description': description, 'status': status, 'total_donations': money(total_donations), 'created_at': created_at, 'proposer_id': proposer, 'round_id': round_id})
    proposals_df = pd.DataFrame(proposals)
    proposals_df.to_csv(os.path.join(out_dir, 'base_proposal.csv'), index=False)

    # Donations (randomly connect donors to proposals)
    donations = []
    tx_hashes = set()
    for _, prop in proposals_df.iterrows():
        n_don = max(1, int(np.random.poisson(avg_donations_per_proposal)))
        donors_sample = donors_df.sample(min(n_don, len(donors_df)), replace=True)
        for j, drow in donors_sample.iterrows():
            did = gen_uuid()
            amount = money(abs(np.random.normal(loc=50, scale=150)))
            sybil = round(max(0.0, np.random.beta(2, 20)), 6)
            tx = '0x' + uuid.uuid4().hex[:64]
            created_at = random_date(180, 0).isoformat()
            donor_id = drow['donor_id']
            proposal_id = prop['proposal_id']
            donations.append({'donation_id': did, 'amount': amount, 'sybil_score': sybil, 'tx_hash': tx, 'created_at': created_at, 'donor_id': donor_id, 'proposal_id': proposal_id})
            tx_hashes.add(tx)
    donations_df = pd.DataFrame(donations)
    # update proposals total_donations
    total_by_proposal = donations_df.groupby('proposal_id')['amount'].sum().reset_index()
    prop_totals = proposals_df.merge(total_by_proposal, how='left', left_on='proposal_id', right_on='proposal_id')
    proposals_df['total_donations'] = prop_totals['amount'].fillna(0.0).values
    proposals_df.to_csv(os.path.join(out_dir, 'base_proposal.csv'), index=False)
    donations_df.to_csv(os.path.join(out_dir, 'base_donation.csv'), index=False)

    # Matches (one match per some proposals)
    matches = []
    for _, prop in proposals_df.sample(frac=0.4).iterrows():
        mid = gen_uuid()
        matched_amount = money(prop['total_donations'] * random.uniform(0.2, 1.5))
        round_id = prop['round_id']
        matches.append({'match_id': mid, 'matched_amount': matched_amount, 'proposal_id': prop['proposal_id'], 'round_id': round_id})
    matches_df = pd.DataFrame(matches)
    matches_df.to_csv(os.path.join(out_dir, 'base_match.csv'), index=False)

    # QF Results (one per matched proposal)
    qf = []
    for _, m in matches_df.iterrows():
        rid = gen_uuid()
        calc = money(m['matched_amount'] * random.uniform(0.8, 1.2))
        verified = random.choice([True, False])
        proposal_id = m['proposal_id']
        round_id = m['round_id']
        qf.append({'result_id': rid, 'calculated_match': calc, 'verified': verified, 'proposal_id': proposal_id, 'round_id': round_id})
    qf_df = pd.DataFrame(qf)
    qf_df.to_csv(os.path.join(out_dir, 'base_qfresult.csv'), index=False)

    # Payouts (for some proposals)
    payouts = []
    for _, prop in proposals_df.sample(frac=0.2).iterrows():
        pid = gen_uuid()
        amount = money(prop['total_donations'] * random.uniform(0.5, 1.0))
        tx = '0x' + uuid.uuid4().hex[:64]
        distributed_at = random_date(120, 0).isoformat()
        payouts.append({'payout_id': pid, 'amount': amount, 'tx_hash': tx, 'distributed_at': distributed_at, 'proposal_id': prop['proposal_id'], 'round_id': prop['round_id']})
    payouts_df = pd.DataFrame(payouts)
    payouts_df.to_csv(os.path.join(out_dir, 'base_payout.csv'), index=False)

    # Sybil scores (per wallet sampled)
    syb = []
    for _, w in wallets_df.sample(frac=0.5).iterrows():
        sid = gen_uuid()
        score = round(random.random(), 6)
        verified_by = random.choice(['oracle_A', 'oracle_B', 'manual'])
        last_updated = random_date(120, 0).isoformat()
        syb.append({'score_id': sid, 'score': score, 'verified_by': verified_by, 'last_updated': last_updated, 'wallet_id': w['wallet_id']})
    syb_df = pd.DataFrame(syb)
    syb_df.to_csv(os.path.join(out_dir, 'base_sybilscore.csv'), index=False)

    # Governance tokens (some wallets are holders)
    gts = []
    roles = ['member', 'admin', 'owner']
    for _, w in wallets_df.sample(frac=0.2).iterrows():
        hid = gen_uuid()
        voting_power = money(abs(np.random.normal(loc=100, scale=300)))
        role = random.choice(roles)
        gts.append({'holder_id': hid, 'voting_power': voting_power, 'role': role, 'wallet_id': w['wallet_id']})
    gts_df = pd.DataFrame(gts)
    gts_df.to_csv(os.path.join(out_dir, 'base_governancetoken.csv'), index=False)

    print('Generated CSVs in', out_dir)
    return {
        'wallets': wallets_df,
        'donors': donors_df,
        'rounds': rounds_df,
        'proposals': proposals_df,
        'donations': donations_df,
        'matches': matches_df,
        'qf': qf_df,
        'payouts': payouts_df,
        'sybil': syb_df,
        'gts': gts_df,
        'pools': pools_df,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--out-dir', '-o', default=os.path.join(os.path.dirname(__file__), '..', 'data_pg'))
    parser.add_argument('--n-donors', type=int, default=100)
    parser.add_argument('--n-rounds', type=int, default=5)
    parser.add_argument('--n-proposals', type=int, default=60)
    parser.add_argument('--avg-donations', type=float, default=8.0)
    args = parser.parse_args()

    out_dir = os.path.abspath(args.out_dir)
    generate_data(out_dir, n_donors=args.n_donors, n_rounds=args.n_rounds, n_proposals=args.n_proposals, avg_donations_per_proposal=args.avg_donations)


if __name__ == '__main__':
    main()
