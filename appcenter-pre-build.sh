#!/usr/bin/env bash

echo 'Source directory => $APPCENTER_SOURCE_DIRECTORY'

# Create .env file with Youtube and Spotify Client ID

echo 'Creating .env file'

cat > ./.env <<EOL
YOUTUBE_CLIENT_ID=${YOUTUBE_CLIENT_ID}
SPOTIFY_CLIENT_ID=${SPOTIFY_CLIENT_ID}
EOL

# Creating appcenter-config.json file

echo 'Creating appcenter-config.json file with app_secret'

cat > ./android/app/src/main/assets/appcenter-config.json <<EOL
{
    "app_secret": "${APP_SECRET}"
}
EOL