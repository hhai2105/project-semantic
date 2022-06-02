#!/bin/bash

node backend/index.js &
cd frontend/ && serve -s build
