import axios from 'axios';

const clientId = 'c6904566ce8f443a85996d88a3928fc0';
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const redirectUri = 'https://jemartin03.github.io/#/callback';

const scopes = 'user-read-private user-read-email user-top-read playlist-read-private';

export const getAuthUrl = () => {
  const encodedRedirectUri = encodeURIComponent(redirectUri);
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

export const getGeneralAccessToken = async () => {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', 
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret
      }), 
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching general access token:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const fetchNewReleases = async (token) => {
  const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data.albums.items;
};

export const fetchFeaturedPlaylists = async (token) => {
  const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data.playlists.items;
};

export const fetchCategories = async (token) => {
  const response = await axios.get('https://api.spotify.com/v1/browse/categories', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data.categories.items;
};
