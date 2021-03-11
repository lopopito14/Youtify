#!/usr/bin/env bash

# Create .env file with Youtube and Spotify Client ID

echo 'Creating .env file'
echo 'Source directory => ${APPCENTER_SOURCE_DIRECTORY}'

cat > ./.env <<EOL
YOUTUBE_CLIENT_ID=${YOUTUBE_CLIENT_ID}
SPOTIFY_CLIENT_ID=${SPOTIFY_CLIENT_ID}
EOL