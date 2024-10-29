# Github Actions

The root users home directory is not `/root/` but instead `/github/home/`

## SSH Key / Known Hosts not working within Containers

The home directory for the runner user (root) is actually `/github/home/` instead of `/root/` as you might expect. Therefor writing keys/hosts to relative home directory `~/.ssh/known_hosts` will actually never be picked up.

Either: 
1. Write your content to `/root/.ssh/id_rsa` directory
3. Or if you have access to the container build, you can add the extra key/known hosts look ups to map the the github home directory.
```sh
echo "IdentityFile /home/github/.ssh/id_rsa" >> /etc/ssh/ssh_config.d/github.conf
echo "UserKnownHostsFile /home/github/.ssh/known_hosts" >> /etc/ssh/ssh_config.d/github.conf
```
