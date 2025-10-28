# Ansible Patching

Ansible makes patching infrastructure at scale easy. Especially if we just need to apply a `.patch` unconditionally across writeable hosts.

As long as we have a maintained inventory of all our hosts, we can achieve this with a single CLI command

```sh
# Ensure CVE patch is applied across the entire Magento inventory
ansible -i hosts.yaml -m ansible.posix.patch -a "src=~/Downloads/CVE-2025-54236.patch basedir={{project_root}} strip=1" magento

# Limit the patch deployment to certain hosts
ansible -i hosts.yaml -m ansible.posix.patch -a "src=~/Downloads/CVE-2025-54236.patch basedir={{project_root}} strip=1" magento --limit "client1"

# Limit the patch deployment to non staging hosts only
ansible -i hosts.yaml -m ansible.posix.patch -a "src=~/Downloads/CVE-2025-54236.patch basedir={{project_root}} strip=1" magento --limit "*-staging"
```


And if our platform requirements a bit more than just patching the raw file (think OPCache flush / permission / immutable flag changes). It is trivial again to write a playbook with pre and post tasks to tackle these.

I wrote about this in more depth specifically targeting Magento in a blog post https://www.sdj.pw/posts/magento2-patching/