## EXPLAIN/ANALYZE notes for key queries

This document shows representative EXPLAIN outputs and tuning decisions.

1) Query: fetch recent transactions for user (hot path)

SQL:
```sql
SELECT * FROM transactions WHERE user_id = :user_id ORDER BY created_at DESC LIMIT 50;
```

Index used: `ix_transactions_user_created` on (user_id, created_at)

Optimization notes:
- With the composite index the query performs an index-only scan for Postgres when needed.
- For SQLite it uses the index to avoid full table scans.

2) Query: dashboard summary by tag

SQL:
```sql
SELECT day, tag, tx_count, total_amount FROM mv_tx_summary WHERE day >= :start_date ORDER BY day;
```

Materialized view avoids expensive GROUP BY at runtime; refresh strategy is scheduled.

Join strategy notes:
- Transactions->Projects join for infrequent joins uses hash joins on large tables.
- For small selective queries on indexed columns nested loop join with index lookup is faster.

Further tuning:
- Ensure statistics are up to date in Postgres using `ANALYZE` after large imports.
- Add partial indexes for common filters (e.g., `WHERE success = true`).
