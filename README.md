# DockerCon Swarm App

A simple [ExpressJS](https://expressjs.com/) app designed for load balancing on a Docker swarm. It updates the req/s per second of each container via a Redis channel for use on the [Raspberry Pi-powered Swarm monitor](https://github.com/developius/dockercon-monitor)

## Running

`docker stack deploy -c docker-compose.yml dockercon`

_Note: you must have at least one worker and one manager in the swarm cluster because the worker apps are limited to only run on worker nodes. Redis will run on the manager_.
