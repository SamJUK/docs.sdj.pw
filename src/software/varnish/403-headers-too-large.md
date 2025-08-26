# Varnish 403 - Headers Too Large

Varnish has a set maximum length value for headers accepted, this can be easily overloaded by Magento cache tags or CSP allow headers.

Varnish will output an error message in varnishlog complaining that the headers are too long/large.

## Resolution

You can increase the max header length for Varnish, by editing the launch params to specify `http_resp_hdr_len` to a larger value.

Edit Launch Params (systemd)
```sh
systemctl edit varnish.service --full
```

Edit the ExecStart and add `-p http_resp_hdr_len=64000`

Then reload the systemd daemon and restart varnish.

```sh
systemctl daemon-reload
systemctl restart varnish
```

