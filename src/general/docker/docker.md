# Docker

## MacOS Docker Engine Refusing to Start

A handful of times I've ran into a problem where docker engine refuses to start. Currently the only way I have found to fix this is to reset your docker instance. 

::: danger
You will lose all docker data. Containers, Images, Builds, Everything.
:::


```sh
rm -rf ~/Library/Containers/com.docker.*
rm -rf ~/Library/Group\ Containers/group.com.docker
rm -rf ~/Library/Application\ Support/Docker\ Desktop
```