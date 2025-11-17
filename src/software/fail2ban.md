# Fail2Ban


## AbuseIPDB

### Redacting Hostname

Ansible task to redact the system hostname from AbuseIPDB reports. Or you can manually replace the `actionban` command, within `/etc/fail2ban/action.d/abuseipdb.conf`.

```yaml
- name: Remove hostname from AdbuseIPDB Reports
  when: fail2ban_abuseipdb_key is defined
  notify: Restart Fail2Ban
  tags:
    - fail2ban
  ansible.builtin.lineinfile:
    path: /etc/fail2ban/action.d/abuseipdb.conf
    regexp: '^actionban'
    line: >
      actionban = lgm=$(printf '%%.1000s\n...' "<matches>" | sed "s/{{ ansible_hostname }}/hostname/g"); curl -sSf "https://api.abuseipdb.com/api/v2/report" -H "Accept: application/json" -H "Key: <abuseipdb_apikey>" --data-urlencode "comment=$lgm" --data-urlencode "ip=<ip>" --data "categories=<abuseipdb_category>"
    state: present
```

### Global AbuseIPDB Key

Instead of declaring your AbuseIPDB key across all jails, you can set it once, within your `/etc/fail2ban/action.d/abuseipdb.conf` config.

```yaml
- name: Set AbuseIPDB API Key in configuration
  when: fail2ban_abuseipdb_key is defined
  notify: Restart Fail2Ban
  tags:
    - fail2ban
  ansible.builtin.lineinfile:
    path: /etc/fail2ban/action.d/abuseipdb.conf
    regexp: '^abuseipdb_apikey'
    line: 'abuseipdb_apikey = {{ fail2ban_abuseipdb_key }}'
    state: present
```

