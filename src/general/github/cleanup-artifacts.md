# Github Artifact Cleanup

::: tip
You do not need to replace the values in brackets like {owner}. Github CLI infers this based on your configured Git remotes for the current Git context.
:::

## Delete all artifacts signed to a project.

::: danger
This one liner that will remove **ALL** the existing artifacts in a repository.
:::

I like to declare this is a shell alias `gh-purge-artifacts`. Although it a shell script, Makefile could also work well.

```sh
export GH_PAGER=cat
gh api repos/{owner}/{repo}/actions/artifacts --jq '.artifacts[] | .id' \
| xargs -I "<>" gh api -X DELETE "repos/{owner}/{repo}/actions/artifacts/<>"
```


## Useful Commands

### Listing Artifacts
We can list out artifacts with the following command, then we can filter artifacts down based on workflow, size, age. And even shake the object down before passing it onto other processes.

```sh
# List out current Artifacts
gh api repos/{owner}/{repo}/actions/artifacts

# List out current Artifacts with a subset of data for piping into other processes
GH_PAGER=cat gh api repos/{owner}/{repo}/actions/artifacts \
  --jq '.artifacts[] | { id: .id, name: .name, size: .size_in_bytes, expires: .expires_at, run_id: .workflow_run.id}'
```

### Deleting Artifacts
```sh
gh api -X DELETE repos/{owner}/{repo}/actions/artifacts/1234567
```