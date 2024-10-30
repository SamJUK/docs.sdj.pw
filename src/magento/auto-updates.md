# Automatic Magento Updates

Automatic updates are apart of a wider development strategy, that involves ephemeral hosts, E2E testing, continuous deployment etc.


## Dependabot

Configuring Dependabot for Magento is fairly simple. First you need to add your authentication tokens for the private composer repositories under `Settings > Secrets and Variables > Dependabot`. 

Next ensure you have the relevant PHP constraint under your `require` section in the `composer.json` file. So dependabot can pick the correct Magento Version.

Add your `dependabot.yml` file

```yaml
version: 2
registries:
  adobe:
    type: composer-repository
    url: repo.magento.com
    username: xxxxx
    password: ${{secrets.COMPOSER_ADOBE_TOKEN}}
  amasty:
    type: composer-repository
    url: https://composer.amasty.com/community/
    username: xxxxx
    password: ${{secrets.COMPOSER_AMASTY_TOKEN}}

updates:
  - package-ecosystem: "composer"
    directory: "/"
    registries:
      - adobe
      - amasty
    schedule:
      interval: "daily"
      target-branch: "staging"
```

::: info
@TODO: Update this with current production version
:::