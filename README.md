# npm-preinstall

The module tries to solve [this issue](https://stackoverflow.com/questions/30043872/docker-compose-node-modules-not-present-in-a-volume-after-npm-install-succeeds).

## Usage

There are two ways

### Use in a startup script (recommended)

Suppose, you have a monorepo. Define a `workspace` `Yarn` instruction inside your `package.json` like this:
~~~~json
{
  ...
  "workspaces": {
    "packages": [
      "packages/*"
    ]
  }
}
~~~~

~~~~bash
npm install npm-preinstall -g
~~~~

Then, write a startup script like this:

~~~~
#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";

npm-preinstall --monorepo

docker stop $(docker ps -aq) > /dev/null
docker-compose -f ${DIR}/../docker/development.yml up
~~~~

With `--monorepo` key the module will look for `packages` folder one by one and install `node_modules` there.<br />
After this is done, `docker-compose` starts.

### Use inside Dockerfile

Go to your Dockerfile and re-write your CMD like this:
~~~~dockerfile
FROM node:8.10
RUN apt-get update && apt-get install -y --no-install-recommends vim && apt-get clean
WORKDIR /app
RUN npm install serverless npm-preinstall -g
CMD ["npm-preinstall", "npm", "run", "start"]
~~~~

Note, that it will some take time to install massive amount of files to a volume from a container. Also, sometimes `npm` simply fails to do that.
