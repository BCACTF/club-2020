# BCA CTF Club 2020-21

This repository holds practice problems made for BCA CTF Club.

## Problem Format

Each problem is located in a folder in the repository's root directory.
The problem is described with a file called `challenge.yml`.
An example of such a file is presented in `example/`.

You are encouraged to add problem generation/solve scripts.

## Containers

Put `docker-compose.yml` in the problem folder.
Any `Dockerfile`s should be placed one directory deeper.

For now, simply hardcode the connection information in `challenge.yml`.
I am too tired to figure out how I want to automate things later.
