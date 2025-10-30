---
description: Ansible infrastructure patching automation for applying security patches at scale across multiple hosts.
---
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

## Additional Steps

Sometimes the platform requires a bit more than just patching the raw file, this may be a PHP OPCache Flush, Permission / Immutability flag change or FPC cache post patch.

Luckily it is easy enough to achieve this by writing a simple Ansible playbook, which also provides a nice UI.

```sh
# Download patch we want to use 
curl https://raw.githubusercontent.com/magento/magento-cloud-patches/xxxx.patch > patches/CVE-2025-54236.patch

# Apply patch
ansible-playbook -i inventories/acme_agency.yaml playbooks/patch.yaml -e patch_file=patches/CVE-2025-54236.patch

# Remove patch
ansible-playbook -i inventories/acme_agency.yaml playbooks/patch.yaml -e patch_file=patches/CVE-2025-54236.patch -e revert=1

# Apply to a subset of infrastructure (EG Only staging sites)
ansible-playbook -i inventories/acme_agency.yaml playbooks/patch.yaml -e patch_file=patches/CVE-2025-54236.patch --limit "*-staging"
```

The following playbook shows an example of applying the patch and flushing OPCache afterwards. You can add additional steps to change immutability flags / file permissions etc.

```yaml
# playbooks/patch.yaml
---
- name: Apply Patch to Infrastructure
  hosts: all
  pre_tasks:
    - name: Ensure Patch File is defined
      ansible.builtin.assert:
        that:
          - patch_file is defined
        fail_msg: "The variable 'patch_file' must be defined."
        success_msg: "The variable 'patch_file' is defined."

  tasks:
    - name: Apply Patch
      ansible.posix.patch:
        src: "{{ patch_file }}"
        basedir: "{{ magento_root }}"
        strip: 1
        state: "{{ (revert is defined and revert | bool) | ternary('absent', 'present') }}"
      register: patch

    - name: Flush OPCache
      ansible.builtin.command: 
        cmd: cachetool opcache:reset --fcgi="{{ item }}"
      loop: "{{ fastcgi_sockets }}"
      when: fastcgi_sockets is defined and patch.changed
```


## Magento

For Magento specifically, I wrote a blog post at https://www.sdj.pw/posts/magento2-patching/ aswell as a similar, but separate doc at https://docs.sdj.pw/magento/patching.html

These include an example Ansible playbook for applying patches, and store within GIT. Aswell as a separate Composer package, that can be used to distribute patches across projects to prevent the patch being lost during the next deployment.