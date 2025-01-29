# Github Environments Cleanup

If you are using Ephmeral Environments on Github. You likely will want to delete the environments once your done, and decomissioned the related infrastructure.

## PAT Token

The default token, does not have the permissions needed to delete environments. Instead we can create a PAT token, with the following permissions.

- "Actions" repository permissions (read)
- "Administration" repository permissions (read & write)
- "Deployments" repository permissions (read & write)


## Workflow Step - GH CLI

Where possible I prefer to avoid using non vendor prebuilt actions, especially for simple tasks, to reduce potential supply chain issues.

In our tear-down workflow, using our PAT token, we can run a few GH API commands to remove the environment and any related deployments.

You will likely want to change your triggers & environment name to better match your setup workflow.

```yaml
on:
  pull_request:
    types: [ closed ]

jobs:
  cleanup:
    steps:
      - name: Delete deployments & environment
        run: |
          gh api /repos/${GITHUB_REPOSITORY}/deployments | jq ".[] | select(.ref == \"$environment\") | .id" | xargs sh -c 'for arg do \
            gh api -XPOST /repos/${GITHUB_REPOSITORY}/deployments/$arg/statuses -F state=inactive; \
            gh api -XDELETE /repos/${GITHUB_REPOSITORY}/deployments/$arg; \
          done' _
          gh api -XDELETE /repos/${GITHUB_REPOSITORY}/environments/$(echo $environment | sed 's/\//%2F/')
        env:
          GH_TOKEN: ${{ secrets.GH_PAT_TOKEN }}
          environment: ${{ github.event.pull_request.head.ref || github.head_ref || github.ref_name }}
```

## Workflow Step - GH Action

Alternativley, we can use the [delete-deployment-environment](https://github.com/marketplace/actions/delete-deployment-environment) GH Action by [StrumWolf](https://github.com/strumwolf).

Which can be setup the same way using the PAT token.

```yaml
on:
  pull_request:
    types: [ closed ]

jobs:
  cleanup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: 🗑 Delete deployment environment
        uses: strumwolf/delete-deployment-environment@v2.2.3
        with:
          token: ${{ secrets.GH_PAT_TOKEN }}
          environment: ${{ github.event.pull_request.head.ref || github.head_ref || github.ref_name }}
```

