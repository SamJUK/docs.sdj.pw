---
description: OrbStack Docker alternative evaluation and migration guide for macOS development environments.
---
# Orbstack

::: info
Currently exploring the option of switching to Orbstack.
:::

Orbstack is a lighter weight drop in replacement for docker desktop. That is supposed improve performance whilst using less resources. It also can replace UTM for running virtual machines.

## Installation

Available via Homebrew on MacOS otherwise refer to the quick start guide https://docs.orbstack.dev/quick-start

```sh
brew install orbstack
```

## Migration

Once installing Orbstack, you can migrate existing docker desktop data into Orbstack.
```sh
orb migrate docker
```

## Switching between Orbstack and Docker Desktop

You can run both Orbstack and Docker Desktop, side by side for evaluation purposes. You can switch between them by selecting the relevant docker context.

```sh
# Switch to Orbstack
docker context use orbstack

# Switch to docker desktop
docker context use desktop-linux
```
