---
description: Magento patching strategies at scale using Ansible and Composer for emergency and maintenance patches.
---
# Magento - Patching

Patching Magento at scale does not have to be difficult, using a combination of Ansible and Composer packages, we can achieve both emergency patching and persistent patches at scale with minimal time/cost.

## Live / Emergency Patching

Live patching is reserved for high severity security related patches (think CosmicSting, SessionReaper), that need to be released to production ASAP. Where we will typically skip the usual deployment/testing process and patch the current deployments.

This is a process that can be done in as little as 5 minutes, if your brave enough. Or a few hours if you opt to perform a slower rolling release.

```sh
curl https://raw.githubusercontent.com/magento/magento-cloud-patches/xxxx.patch > patches/CVE-2025-54236.patch
ansible-playbook -i inventories/acme_agency.yaml playbooks/patch.yaml -e patch_file=patches/CVE-2025-54236.patch
```

> ℹ Bonus Tip: You can start with targeting a single/smaller selection of hosts with the --limit flag. Then once confident push across the whole inventory.

https://github.com/SamJUK/magento2-patching-examples/blob/master/live-patching


## Maintenance Patching

Maintenance patching is where we want to get the patch out, across all deployments, but it is not time critical and we can wait for our automated dependency checkers & testing suites to execute.

One way to handle this, is to create a centralized composer patching package. Where we can declare a selection of patches, we want applied to the entire infrastructure. And require this package within the rest of our projects.

```json
{
    "name": "acme-agency/m2-module-patches",
    "description": "Magento 2 Module containing all required M2 Patches",
    "extra": {
        "patches": {
            "*": {
                "CVE-2025-54236 (Session Reaper)": {
                    "source": "patches/CVE-2025-54236.patch",
                    "depends": {
                        "magento/framework": "<=104.0.0"
                    }
                }
            }
        }
    }
}
```

The big benefit to this approach, is we can declare the new patch in a single place (the composer package) and tag a new release. And since its just a composer package, our Dependabot/Renovate configurations should pickup the module update and raise pull requests across all the projects for the version bump.

Now we (should) have the patch ready to be merged, after a quick check of the changelog and test results.

Example: https://github.com/SamJUK/magento2-patching-examples/blob/master/maintenance-patching


## Package Updates
Package updates are where Adobe performs a full security release, creating a new -p composer package. Thanks to tools like Dependabot & Renovate this is an already solved problem for most.

Provided you have a sensible config and properly manage composer constraints, once the new release is published your projects should start to create automatic pull requests to update to the new patch version.

Once your test suite passes, it should be as simple as, a quick changelog review and triggering the merge.

> ℹ Tip: Make use of dependency groups to run core updates on a more aggressive schedule and isolate them from regular Module updates.

> ℹ Bonus Tip: If using the central patch approach, run these in their own group as well. Preventing patches being blocked by other updates.