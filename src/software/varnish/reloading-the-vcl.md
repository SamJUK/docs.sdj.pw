# Reloading the Varnish VCL

It is common to restart varnish entirely after updating the VCL, although, restarting the service looses the entire cache as well.

To reload the configuration without dropping the cache, the process is a bit more involved.

## Load & Apply the VCL
```sh
export TIME=$(date +%s)
varnishadm vcl.load varnish_$TIME /etc/varnish/default.vcl
varnishadm vcl.use varnish_$TIME
```

## List previously loaded VCLs
```sh
varnishadm vcl.list
```