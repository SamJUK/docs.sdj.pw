# Poetry

Poetry is a dependency management & packaging tool. 

The following [Reddit Comment](https://www.reddit.com/r/learnpython/comments/xjyz13/comment/ipba11z/) sums up the differences between Poetry and requirements.txt quite well.

## Installation

```sh
pipx install poetry
```

You can optionally configure auto completion. Refer to the [poetry docs](https://python-poetry.org/docs/#enable-tab-completion-for-bash-fish-or-zsh) for your shell. 

## Initialise a Project

You can either initiate a new project via the cli with `poetry init` or by creating a `pyproject.toml` file with the following content

```toml
[tool.poetry]
package-mode = false

[tool.poetry.dependencies]
python = "^3.12"
...
```

## Launch the virtual environment

You need to launch the virtual environment each time you work on the project. Todo that, you can run the following from the root.

```sh
poetry shell
```

## General Commands

The general commands are fairly simple and work as most other dependency management systems.

```sh
poetry install                  # Installs with the versions from the lock file
poetry update                   # Updates packages within the constraints
poetry add "requests^1.0.0"     # Adds a new package to the project
poetry remove "requests"        # Removes a package from the project
```
A full list of commands can be found on the [Poetry Docs](https://python-poetry.org/docs/cli/)