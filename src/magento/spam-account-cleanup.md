---
description: Magento spam customer account identification and cleanup strategies for e-commerce security management.
---
# Magento Spam Account Cleanup

No one size fits all for identifying spam customers. But here are some common identifiers.

The SQL queries include joins against the `customer_log` and `sales_order` tables to help identify genuine accounts from spam ones. We use these tables to gather if the customer has placed any orders, and when their last login was.

## Domains in Name Fields
```sql
SELECT
  e.entity_id, email, firstname, lastname, e.created_at, e.updated_at, l.last_login_at, o.cnt
FROM
  customer_entity as e
LEFT JOIN
  customer_log as l ON l.customer_id = e.entity_id
LEFT JOIN 
    (SELECT count(*) as cnt, customer_id FROM sales_order GROUP BY customer_id) as o on o.customer_id = e.entity_id
WHERE
  firstname RLIKE '.*www.*|\\\\.(net|com|ru|co|cn|cz|uk)'
  OR lastname RLIKE '.*www.*|\\\\.(net|com|ru|co|cn|cz|uk)'
GROUP BY e.entity_id
```

## Advanced Email Addresses
It is fairly uncommon for most customers to include a + sign within their email address. Most internet uses does not even know this is an option. You will need to manually review each line, since a handful of these could potentially be legitimate customers but most will be bots.

```sql
SELECT
  e.entity_id, email, firstname, lastname, e.created_at, e.updated_at, l.last_login_at, o.cnt
FROM
  customer_entity as e
LEFT JOIN
  customer_log as l
    ON l.customer_id = e.entity_id
LEFT JOIN 
  (SELECT count(*) as cnt, customer_id FROM sales_order GROUP BY customer_id) as o on o.customer_id = e.entity_id
WHERE
  email LIKE '%+%'
GROUP BY e.entity_id
```

## Random Name Fields
Another signature of bot accounts I've observed recently is randomly generated strings similar to `TGoHfngNexaUju` or `kaYgQKXpOlURPSnI` within the name fields. These prove to be much more of a challenge to identify and bulk remove. Currently the best query I have found these is by filtering the name fields on the following conditions:
- Does not contain a space
- Length is more than 5 characters
- Is not full capitals
- If capitals make up 40% of the string
```sql
SELECT
  e.entity_id, email, firstname, lastname, e.created_at, e.updated_at, l.last_login_at, o.cnt
FROM
  customer_entity as e
LEFT JOIN
  customer_log as l ON l.customer_id = e.entity_id
LEFT JOIN 
  (SELECT count(*) as cnt, customer_id FROM sales_order GROUP BY customer_id) as o on o.customer_id = e.entity_id
WHERE
  (
    firstname NOT LIKE '% %'
    AND LENGTH(firstname) > 5
    AND CAST(UPPER(firstname) as BINARY) != CAST(firstname as BINARY)
    AND (LENGTH(REGEXP_REPLACE(firstname, '(?-i)[A-Z]', '')) / LENGTH(firstname)) < 0.6
  ) OR (
    lastname NOT LIKE '% %'
    AND LENGTH(lastname) > 5
    AND CAST(UPPER(lastname) as BINARY) != CAST(lastname as BINARY)
    AND (LENGTH(REGEXP_REPLACE(lastname, '(?-i)[A-Z]', '')) / LENGTH(lastname)) < 0.6
  )
GROUP BY e.entity_id
```