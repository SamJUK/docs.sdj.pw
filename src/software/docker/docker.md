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

## Endpoint already exists in network

Recently I have managed to corrupt my local docker network state. I believe it may have been due to force stopping/removing projects via the OrbStack interface. And have been having issues attempting to restart containers with the following message, despite having no relevant container running.

```
Error response from daemon: endpoint with name project-varnish-1 already exists in network project_default
```

To resolve this, we can forcefully remove the endpoint/container from the docker network with the following command. Followed by restarting the compose environment.
```sh
docker network disconnect -f <network name> <container name>
```
