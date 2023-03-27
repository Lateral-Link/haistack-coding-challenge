# Haistack Coding Challenge

Coding challenge presented to candidates interviewing for a role at [Haistack.AI](https://www.linkedin.com/company/haistack/).

_#findyourneedle_

![A screenshot of the application](SCREENSHOT.png)

## Installation

1. Install [Docker Desktop](https://docs.docker.com/get-docker/).
2. [Clone this repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).
3. Copy the example [environment file](https://docs.docker.com/compose/environment-variables/env-file/).   
4. [Build the container image](https://docs.docker.com/engine/reference/commandline/compose_build/).
5. [Install JavaScript dependencies](https://classic.yarnpkg.com/en/docs/cli/install).
6. [Create and start the containers](https://docs.docker.com/engine/reference/commandline/compose_up/).

```shell
git clone git@github.com:Lateral-Link/haistack-coding-challenge.git

cd haistack-coding-challenge

cp .env.example .env

docker compose build --no-cache

docker compose --rm app yarn install

docker compose up
```

## Usage

Browse to http://localhost:3000.

### Running tests

```shell
docker compose run -e RAILS_ENV=test --rm app bundle exec rspec
```

## Support

Contact the authors in case of problems.  

## Contributing

Follow [these instructions](https://docs.github.com/en/get-started/quickstart/contributing-to-projects).

## Authors and acknowledgment

- [Mike Heise](mailto:mheise@haistack.ai)
- [Will Rosa](mailto:wrosa@haistack.ai)

## License

Copyright 2023 [Haistack.AI](https://www.linkedin.com/company/haistack/)
