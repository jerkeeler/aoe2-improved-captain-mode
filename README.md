# AoE2 Improved Captain Mode (aoe2icm)

![server build status](https://img.shields.io/github/workflow/status/jerkeeler/aoe2-improved-captain-mode/Server?label=server) ![frontend build status](https://img.shields.io/github/workflow/status/jerkeeler/aoe2-improved-captain-mode/Frontend?label=frontend)

AoE2 Improved Captain Mode is hosted at [cm.aoestats.io](https://cm.aoestats.io).

This is a typescript based project for Age of Empires II competitive drafting between two "captains". This was heavily inspired by the [original captain's mode](https://github.com/aocpip/aoe2cm) made by pip. There are a couple of distinct changes however:

- Most of the logic is hoisted to the frontend, backend is strictly for validation and coordination
- This uses websockets and React to make it snappier and more responsive
- My own design!
- A plethora of new features...
  - DE civilizations!
  - Map drafting!
  - Replayable drafts! Go step by step to see how a draft played out, or go directly to the end. All in a neatly compact shareable string!
  - Shareable customized drafts! Draft configurations can be compressed into strings and shared easily!

This project is split up into three distinct chunks, each chunk contains its own README:

### frontend

This contains a React project, which is the frontend of the drafting mode. This application uses typescript with React and makes heavy use of Redux. It uses hooks exclusively, death to class based components! 

### server

This contains a NodeJS project that uses express and socket.io to handle the backend drafting logic and coordination. It also contains validations for each draft event to ensure that no cheating is had. It contains draft presets, civilizations, and the map base.

### shared

This contains shared type definitions and helper functions between the frontend and server components. Yay for using the same language on both the frontend and backend.

## Developing

In order to develop this project you will need to:

1. Download this repo
2. Run `npm install` at the root directory
3. Run `npm install` in all subdirectories:
    - frontend
    - shared
    - server

To get a local session going:

1. Start the backend by navigating to the server directory and run `npm run watch`
2. Start the frontend by navigating to the frontend directory and run `npm run start`

You should now be able to navigate to [localhost:3000](http://localhost:3000) which serves up the static assets from the frontend and forwards and socket and api requests to the backend server, which is running at [localhost:8000](http://localhost:8000). That should be it!

Changes made to either the frontend or server component will automatically be picked up and the development servers should restart automatically. If you make a change to the `shared` package you have to run `npm run build` in that package in order to have thc changes useable in the frontend and server.

### Comitting

In order to commit a change to the master branch, please submit a pull request and ensure that linting and tests pass. Tests are automatically run via GitHub actions. Linting is done on push time to speed up iteration cycles (this is handled by husky git hooks).


### Code Style

All three components use prettier and eslint to enforce styling. I suggest having this run on save. Please adhere to the styling recommendations. In fact, your build/push will fail if you do not adhere to the styling rules. This will ensure a consistent experience across the entire code base. Right now each package has its own individual style configs, but they are all the same. I really should symlink them or share them somehow.

## Deployment

I have setup the server component to be run by pm2 and have added an ecosystem.config.js file to that project. I prefer that setup, but feel free to run the server however you want. Note that if you choose something else it will break the deploy script. All built static assets (from both frontend and server) are expected to end up living in the same directory on the remote host. In the deploy script I default this to a repo level `build/` folder.

### Tags

Deployments are based on release tags. The tag versioning schema is as follows:

```
release-YYYY-MM-0000
```

That is, "release", followed by the year and month,  "YYYY-MM", followed by an incrementing version number "0000". For example, the first release in April 2020 would be `release-2020-04-0001`. Within the month the last number is incremented by one and at the beginning of the next month starts over again at 0000.

Please tag the commit you want to deploy and push it to github before deployment.

### Setup

In your local repo copy the .env.example to .env and fill with actual values. This will be used by the deploy script to connect to the remote server and deploy the application.

On the remote host copy server/.env.example to server/.env and fill with actual values. 

You can now run the deploy commands from your **local** repo to deploy the application.

### Commands

All commands can be run as npm scripts. Run them like: `npm run <command>`

#### deploy

Deploys both the frontend and backend given a release tag.

#### deploy:frontend

Deploy just the frontend

#### deploy:backend

Deploy just the backend
