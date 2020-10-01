#!/bin/sh

if [ "$NODE_ENV" = "production" ]
then
  node_modules/.bin/nuxt build && node_modules/.bin/nuxt start
else
  node_modules/.bin/nuxt --max_old_space_size=8192
fi
