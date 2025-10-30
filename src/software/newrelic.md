---
description: New Relic optimization guide for reducing usage costs by disabling unnecessary tracing data in PHP applications.
---
# Optimise Newrelic Usage

A very large portion of typical newrelic usage is Tracing data. In most simple use cases of newrelic (Dashboards, APM etc) you do not need this data. You should be able to confirm this by looking at your usage graph.

If we decide, the tracing data is not valuable for us, then we can set the following configuration options in the newrelic PHP ini file to stop sending tracing data. Make sure the changes cover CLI & FPM if your configuration is separate.

```ini
newrelic.distributed_tracing_enabled = false
newrelic.span_events_enabled = false
```

A few days after actioning this change, you should see a massive reduction in the amount of data ingested into NewRelic. And if we run into a situation where we would benefit from tracing, its simple enough to re-enable by revering the previous changes.