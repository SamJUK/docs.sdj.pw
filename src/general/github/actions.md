# Github Actions

The root users home directory is not `/root/` but instead `/github/home/`

## SSH Key / Known Hosts not working within Containers

You may run into issues of your SSH key / Known hosts entries not working. One reason for this is, the place you are writing the keys, is not a registered path for SSH.

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
