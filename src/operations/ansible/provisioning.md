# Ansible

## Provisioning

Cloud Config to provision new infrastructure with a ansible user already configured with the relevant SSH Authorized Key.

```yaml
#cloud-config
users:
  - name: ansible
    ssh-authorized-keys:
      - ssh-ed25519 xxxxx user@example.com
    sudo: ['ALL=(ALL) NOPASSWD:ALL']
```

