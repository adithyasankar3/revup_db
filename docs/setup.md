<p align="center">
  <a href="https://www.newagesmb.com/" target="_blank"><img src="https://raw.githubusercontent.com/NewAgeSMBDevelopers/smb-logo/main/smb-logo.png" width="320" alt="Newage Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nestjs.com/" target="_blank">NestJs</a> framework for building efficient and scalable server-side applications.</p>

# Setup

[Back to docs](./index.md)


## Clone and Setup a new project

```bash
$ git clone git@github.com:NewAgeSMBDevelopers/nest-core-framework.git <PROJECT_NAME>
$ cd <PROJECT_NAME>
$ git remote rename origin core
$ git remote add origin git@github.com:NewAgeSMBDevelopers/<PROJECT_NAME>.git
$ git push -u origin main
```

Note: Change name in package.json (Required)

## Pull latest core changes to your projects

```bash
$ git checkout -b <TEMP_BRANCH>
$ git fetch core
$ git merge core/main #fix conflict if any
$ git checkout <WORKING_BRANCH>
$ git merge <TEMP_BRANCH>
$ git branch -d <TEMP_BRANCH>
```

Note: Make sure to pull latest changes once in a week

## Installation

```bash
$ npm install
```


## Environment setup

```bash
# create .env file using .env.sample and update env variables
$ cp .env.sample .env
```

## Running the app

```bash
# development
$ npm run start

# production mode
$ npm run prod
```


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

# testing a service individually
# create a test script under testers/ folder and run using npx
$ npx ts-node -r tsconfig-paths/register testers/twilio-sendSms.ts
```


## Build & Production

```bash
# build
$ npm run build

# start
$ npm run prod:start

# build and start
$ npm run prod
```
