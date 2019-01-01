# npm-preinstall

The module tries to solve [this issue](https://stackoverflow.com/questions/30043872/docker-compose-node-modules-not-present-in-a-volume-after-npm-install-succeeds).

## Usage

Go to your Dockerfile and re-write your CMD like this:
~~~~dockerfile
FROM node:8.10
RUN apt-get update && apt-get install -y --no-install-recommends vim && apt-get clean
WORKDIR /app
RUN npm install serverless npm-preinstall -g
CMD ["npm-preinstall", "npm", "run", "start"]
~~~~

You may also want to modify your `.gitignore` file:
~~~~gitignore
node_modules
.idea
.packagejson.lock
~~~~
