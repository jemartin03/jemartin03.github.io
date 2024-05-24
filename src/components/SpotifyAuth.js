import axios from 'axios';

const clientId = 'c6904566ce8f443a85996d88a3928fc0';
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = 'https://jemartin03.github.io/#/callback';

const scopes = 'user-read-private user-read-email user-top-read playlist-read-private';

export const getAuthUrl = () => {
  const encodedRedirectUri = encodeURIComponent(redirectUri);
  console.log({encodedRedirectUri});
  const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodedRedirectUri}&scope=${encodeURIComponent(scopes)}&show_dialog=true`;
  return url;
};

export const getAccessToken = async (code) => {
  const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  console.log(`redirecting ${response}`)
  return response.data.access_token;
};

export const getTopTracks = async (accessToken, timeRange = 'medium_term') => {
  const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    params: {
      time_range: timeRange
    }
  });

  return response.data.items;
};

export const getTopArtists = async (accessToken, timeRange = 'medium_term') => {
  const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    params: {
      time_range: timeRange
    }
  });

  return response.data.items;
};

export const getUserPlaylists = async (accessToken) => {
  const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return response.data.items;
};