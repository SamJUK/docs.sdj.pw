---
description: GitHub Actions SSH configuration troubleshooting for correct file paths and root user directory issues.
---
# Github Actions - SSH Config Location

You may expect the SSH config location for the root user to be under `/root` be default. Although this is not the case and any config you add to the root folder will be ignored.

The root users home directory is actually `/github/home/` instead of `/root`.

Which is why you may run into issues, where your SSH key / Known hosts entries are not working. Since the place you are writing the keys, is not a registered path for SSH.

### Debug
You can add 2 new steps to confirm what paths SSH is looking at, as well as the real path of the relative home directory.

```yaml
- name: Relative SSH paths
  run: |
    realpath ~/.ssh/id_rsa
    realpath ~/.ssh/known_hosts

- name: Test SSH
  run: ssh -v user@hostname 'uptime'
```

### Solutions
Two main options to resolve this:
1. Use the absolute path of `/root/.ssh/id_rsa` or `/root/.ssh/known_hosts`.
2. Update the SSH config in your container to include the github path.
```sh
echo "IdentityFile /home/github/.ssh/id_rsa" > /etc/ssh/ssh_config.d/github.conf
echo "UserKnownHostsFile /home/github/.ssh/known_hosts" >> /etc/ssh/ssh_config.d/github.conf
```
