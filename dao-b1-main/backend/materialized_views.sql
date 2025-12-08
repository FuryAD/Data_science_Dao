-- Materialized view: transaction summary by tag per day
-- Use this view for dashboard summary queries (volume by tag)

CREATE TABLE IF NOT EXISTS mv_tx_summary AS
SELECT
    DATE(created_at) AS day,
    COALESCE(tags.name, 'untagged') AS tag,
    COUNT(*) AS tx_count,
    SUM(amount) AS total_amount
FROM transactions
LEFT JOIN tags ON tags.id = transactions.tag_id
GROUP BY DATE(created_at), tags.name;

-- For Postgres, you would use CREATE MATERIALIZED VIEW ... WITH NO DATA;
