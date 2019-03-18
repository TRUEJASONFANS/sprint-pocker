#!/bin/bash
if [   $SPRINT_SERVER_HOME   ];then
  npm run build
  rm  $SPRINT_SERVER_HOME/web/src/main/resources/static/*.js
  rm  $SPRINT_SERVER_HOME/web/src/main/resources/static/*.css
  rm  $SPRINT_SERVER_HOME/web/src/main/resources/static/index.html
  cd dist/
  mv * $SPRINT_SERVER_HOME/web/src/main/resources/static
  cd ..
  rm -rf dist
fi

