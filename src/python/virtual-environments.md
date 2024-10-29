# Managing Python Virtual Environments

Python offers a virtual environment module which lets us install project based requirements instead of maintain all requirements in a global scope.

Although its common for developers to utilise wrapper scripts such as [virtualenvwrapper](https://github.com/python-virtualenvwrapper/virtualenvwrapper) to manage venvs in a global location rather than in the project scope.


## Usage - Native venv

The python module comes as part of the standard library. Its standard practise to create virtual environments in a `venv` subfolder. This is often ignored from VCS and should not be committed as its unique to the individual system.

### Create a new environment
```sh
python -m venv venv # Create a new virtual environment, if a 'venv' subfolder
```

### Enable the environment
```sh
source venv/bin/activate
```

### Disable the environment
```sh
deactivate
```

## Usage - virtualenvwrapper

[virtualenvwrapper](https://github.com/python-virtualenvwrapper/virtualenvwrapper) helps manage multiple virtual environments within a global level rather than scattering `venv` directories across all your projects source code.

### Create a environment
```
mkvirtualenv myproject
```

### Enable the environment
```sh
workon myproject
```

### Deactivate the environment
```sh
deactivate
```

### List environments
```sh
lsvirtualenv
```

### Delete environment
```sh
rmvirtualenv myproject
```
