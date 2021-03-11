#!/usr/bin/env bash

# Create .env file with Youtube and Spotify Client ID

echo 'Post clone...'
echo '${APPCENTER_SOURCE_DIRECTORY}'
echo 'Creating .env file'

cat > ./.env <<EOL
YOUTUBE_CLIENT_ID=${YOUTUBE_CLIENT_ID}
SPOTIFY_CLIENT_ID=${SPOTIFY_CLIENT_ID}
EOL