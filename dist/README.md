[![Travis build status shield](https://img.shields.io/travis/crash/bilanorientation/master.svg)](https://travis-ci.org/crash/bilanorientation)
[![Github Release version shield](https://img.shields.io/github/tag/crash/bilanorientation.svg)](https://github.com/crash/bilanorientation/releases)
[![jest](https://facebook.github.io/jest/img/jest-badge.svg)](https://github.com/facebook/jest)


# Bilanorientation

## What's Bilanorientation?
If you need to deploy it, you need to build it and deploy it manually. 

Latest deployed branch: master

### Install

Hacking the Cozy Bilanorientation app requires you to [setup a dev environment][setup].

You can then clone the app repository and install dependencies:

```sh
$ git clone https://github.com/cozy/bilanorientation.git
$ cd bilanorientation
$ yarn install
```

:pushpin: If you use a node environment wrapper like [nvm] or [ndenv], don't forget to set your local node version before doing a `yarn install`.

Cozy's apps use a standard set of _npm scripts_ to run common tasks, like watch, lint, test, build…

