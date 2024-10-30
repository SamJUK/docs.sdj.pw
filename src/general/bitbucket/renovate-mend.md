# Renovate Mend - Bitbucket

Renovate is similar to dependabot, and allows us to configure automatic version updates for our packages. And Mend is the hosted app version of it. 

## Installation

Annoyingly its a multi step process to enable renovate in Bitbucket.

### Enable the Bitbucket Integration
1. Within Bitbucket navigate to the workspace settings
2. Open `Marketplace` in the sidebar under `Apps and features`
3. Search for `Mend` and install the Mend app, granting the relevant permissions.

### Register & Configure Mend
1. Now, Navigate to the Mend developer portal at: https://developer.mend.io/
2. Sign in using your Bitbucket account with permission on the relevant workspace.
3. You should see your workspace in the grid, click through to it.
4. Go through the prompts to configure the repositories you want setup and start the initial Scan.

### Repo Configuration
1. On your repo, you should now have an onboard PR where Renovate informs you of the current config & what PRs it would open with the current config.
2. Checkout the branch, and modify the `renovate.json` configuration to your needs. Docs can be found at: https://docs.renovatebot.com/configuration-options/
3. Push and initiate another scan in the developer portal.
4. Merge the onboarding PR when the config is correct. And your done

::: info
@TODO: Add sample config & example images for the UI process.
:::