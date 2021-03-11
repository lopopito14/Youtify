# Youtify

[![Build status](https://build.appcenter.ms/v0.1/apps/9968ae44-015c-4bba-8d92-73b5c7406747/branches/master/badge)](https://appcenter.ms)

---

## &#9989; About the application

This android application uses Youtube and Spotify APIs to manage your playlists. You automatically create monthly playlists and easilly synchronize them.

---

## &#9989; Requirements

To be able to use this application, you need to register it.

### ➡ Youtube

Follow the instructions at [Google APIs](https://console.developers.google.com) by creating a new project with your Gmail account and activate the [Youtube Data API v3](https://console.developers.google.com/apis/library/youtube.googleapis.com?id=125bab65-cfb6-4f25-9826-4dcc309bc508).

> &#x26A0; Create a new OAuth client (with android as application type) with **com.youtify** as package name.

### ➡ Spotify

Follow the instructions at [Spotify application registration](https://developer.spotify.com/documentation/general/guides/app-settings/).

> &#x26A0; In redirect URIS, you need to add the following callback : **com.youtify:/spotifyoauth2callback**

### ➡ Environment variables

Almost finished 😉 !  
Create a **.env** file at project root and add the next 2 following lines into it :

> YOUTUBE_CLIENT_ID=**The Youtube client ID defined by your registered application**  
> SPOTIFY_CLIENT_ID=**The Spotify client ID defined by your registered application**

---

## &#9989; Screenshots

### ➡ Settings view (drawer)

<p align="center">
    <img src="docs/Screenshot_1.jpg" alt="Build status" width="45%"/>
</p>

### &#8594; Youtube views

<p align="center">
    <img src="docs/Screenshot_2.jpg" alt="Build status" width="45%"/>
    <img src="docs/Screenshot_3.jpg" alt="Build status" width="45%"/>
</p>

### ➡ Spotify views

<p align="center">
    <img src="docs/Screenshot_7.jpg" alt="Build status" width="45%"/>
    <img src="docs/Screenshot_8.jpg" alt="Build status" width="45%"/>
</p>
<p align="center">
    <img src="docs/Screenshot_9.jpg" alt="Build status" width="45%"/>
</p>

### ➡ Synchronize views

<p align="center">
    <img src="docs/Screenshot_4.jpg" alt="Build status" width="45%"/>
    <img src="docs/Screenshot_5.jpg" alt="Build status" width="45%"/>
</p>

<p align="center">
    <img src="docs/Screenshot_6.jpg" alt="Build status" width="45%"/>
</p>
