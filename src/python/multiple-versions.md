---
description: Python version management using pyenv for installing and switching between multiple Python versions.
---
# Managing Multiple Python Versions

The [pyenv CLI tool](https://github.com/pyenv/pyenv) is similar to NVM from the Javascript world. And makes it easy to manage multiple versions of python being installed on the same machine. 


## Installation

Installation is simple and available in most package managers, see the docs for full details https://github.com/pyenv/pyenv?tab=readme-ov-file#getting-pyenv

```sh
brew install pyenv              # MacOS - HomeBrew
curl https://pyenv.run | bash   # Unix / Automatic Installer 

# Add environment variables to your appropriate shell, and restart your terminal afterwards
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo '[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
```

## Usage

### Install a specific Python version
```sh
pyenv install 3.13.0
```

### Switch Version
```sh
pyenv global 3.13.0
```

### List all installed python versions
```sh
pyenv versions
```

### List all installable python versions
```sh
pyenv install -l
```

### Uninstall a Python Version
```sh
pyenv uninstall 3.13.0
```
