#!/bin/bash

# Setup the Environment variables for the REST Server

#1. Set up the card to be used
export COMPOSER_CARD=admin@sopb

#2. Set up the namespace usage    always |  never
export COMPOSER_NAMESPACES=never

#3. Set up the REST server Authhentcation    true | false
export COMPOSER_AUTHENTICATION=true

#4. Set up the Passport strategy provider
export COMPOSER_PROVIDERS='{
  "google": {
        "provider": "google",
        "module": "passport-google-oauth2",
        "clientID": "293657718331-rm3mpbooibunstu5lu340iq8q3ujafcs.apps.googleusercontent.com",
        "clientSecret": "yWeBsliK_4g5JHDwSq8HA0vp",
        "authPath": "/auth/google",
        "callbackURL": "/auth/google/callback",
        "scope": "https://www.googleapis.com/auth/plus.login",
        "successRedirect": "/",
        "failureRedirect": "/"
  }
}'

#5. Execute the REST server
composer-rest-server