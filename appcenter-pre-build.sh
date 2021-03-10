#!/usr/bin/env bash

# Create .env file with Youtube and Spotify Client ID

echo "YOUTUBE_CLIENT_ID=$YOUTUBE_CLIENT_ID" >> .env
echo "SPOTIFY_CLIENT_ID=$SPOTIFY_CLIENT_ID" >> .env

echo "Youtube client ID => $YOUTUBE_CLIENT_ID"
echo "Spotify client ID => $SPOTIFY_CLIENT_ID"