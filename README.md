# Extreme Todo Postgres
### But why?
Like most over-engineered apps, this is purely educational purposes - hopefully.

The topics that will be explored will include:
* Database migration with [drizzle-orm](https://orm.drizzle.team/)
* [Postgres](https://www.postgresql.org/) async streaming replication. (read-replicas)
* [Kubernetes](https://kubernetes.io/) using [Minikube](https://minikube.sigs.k8s.io/docs/start/?arch=%2Fmacos%2Fx86-64%2Fstable%2Fbinary+download)

Note: Now `.env` is committed in this repo. Obviously leave this out in an actual application.

# Simple
Single postgres instance with custom configs. `pg_stat_statements` enables query performance monitoring through the `query_performance` view. 

# Repmgr
Master with read slave using [repmgr](https://www.repmgr.org/). Similar setup to the "simple" example.
