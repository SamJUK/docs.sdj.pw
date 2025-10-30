---
description: GitHub Dependabot configuration for automated dependency updates and security vulnerability management.
---
# Dependabot

Dependabot handles alerting and creating pull requests for outdated packages.

## Secrets

When using secrets in dependabot, such as authentication tokens for private repositories. They are stored separately from the normal repository secrets. 

```
Settings > Secrets and Variables > Dependabot
```

## Composer

By default, dependabot runs on PHP7.4 for composer manifests. 

You can specific what version of PHP dependabot will run as, by including the relevant `php` constraints within your `require` block in `composer.json`.

Dependabot will pick the lowest version it can, whilst still matching the constraints.

```json
{
    ...
    "require": {
        "php": "^8.2.0"
        ...
    }
    ...
}
```
