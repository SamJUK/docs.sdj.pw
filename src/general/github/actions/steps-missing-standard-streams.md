---
description: GitHub Actions troubleshooting guide for capturing stdout and stderr outputs in workflow steps.
---
# Github Actions - Steps missing Standard Streams

One might assume a simple run step, would include the stdout and stderr outputs. But they would be wrong.

## How do you access the stdout or stderr of a Github Action Step?

If you require accessing this data from one of your steps, you need to manually capture it, and expose it. How Fun...

But luckily there is an Wrapper Action already made for this [mathiasvr/command-output](https://github.com/mathiasvr/command-output) which makes life simple. Which can be used like below

```yaml
- name: Get Date
  uses: mathiasvr/command-output@v2.0.0
  id: date
  with:
    run: date

- name: What is the Date?
  run: echo "The Date is {{ steps.date.outputs.stdout }}"
```
