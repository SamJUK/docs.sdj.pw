---
description: Collection of Fluentbit Parsers and Configuration
---
# Fluentbit

## Parsers

General collection of Fluentbit parsers

### Fail2Ban

```
[PARSER]
    Name fail2ban
    Format regex
    Regex /^(?<time>.*) fail2ban\.(?<component>\w+)\s+\[(?<pid>\d+)\]: (?<severity>\w+)\s+(?<message>.+)$/
    Time_Key time
    Time_Format %Y-%m-%d %H:%M:%S,%L
```

### Auth

```
[PARSER]
    Name auth
    Format regex
    Regex /^(?<time>.*?) (?<host>[\S]*) (?<program>[^\[\] ]*)(\[(?<pid>\d*)\])?: (?<message>.*)$/
    Time_Key time
    Time_Format %Y-%m-%dT%H:%M:%S.%L%z
```
