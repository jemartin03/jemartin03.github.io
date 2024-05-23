import React, { useEffect, useState } from 'react';
import Banner from "./Banner";
import { getAuthUrl, getAccessToken, getTopTracks, getTopArtists, getUserPlaylists } from './SpotifyAuth';
import { useLocation } from 'react-router-dom';

const Spotify = () => {
  const [data, setData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dataType, setDataType] = useState('top-tracks'); // Default to top tracks
  const [timeRange, setTimeRange] = useState('medium_term'); // Default to medium term
  const location = useLocation();
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    const options = {
      threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, options);

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    if (code && !isAuthenticated) {
      authenticate(code);
    }
  }, [location, isAuthenticated]);

  const authenticate = async (code) => {
    try {
      const token = await getAccessToken(code);
      setAccessToken(token);
      setIsAuthenticated(true);
      fetchData(token, dataType, timeRange);
    } catch (error) {
      console.error('Error during authentication', error);
    }
  };

  const fetchData = async (token, type, range) => {
    try {
      let result;
      switch (type) {
        case 'top-tracks':
          result = await getTopTracks(token, range);
          break;
        case 'top-artists':
          result = await getTopArtists(token, range);
          break;
        case 'playlists':
          result = await getUserPlaylists(token);
          break;
        default:
          result = await getTopTracks(token, range);
      }
      setData(result);
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
    }
  };

  const handleDataTypeChange = (event) => {
    const newType = event.target.value;
    setDataType(newType);
    if (isAuthenticated) {
      fetchData(accessToken, newType, timeRange);
    }
  };

  const handleTimeRangeChange = (event) => {
    const newRange = event.target.value;
    setTimeRange(newRange);
    if (isAuthenticated) {
      fetchData(accessToken, dataType, newRange);
    }
  };

  const handleLogin = () => {
    window.location.href = getAuthUrl();
  };

  return (
    <>
      <section id="spotify" className="section">
        <Banner page="spotify" />
        <div className="spotify-container">
          <h1>Spotify Data</h1>
          {!isAuthenticated && (
            <button onClick={handleLogin}>Login with Spotify</button>
          )}
          {isAuthenticated && (
            <>
              <div>
                <label htmlFor="data-type">Select Data Type: </label>
                <select id="data-type" onChange={handleDataTypeChange} value={dataType}>
                  <option value="top-tracks">Top Tracks</option>
                  <option value="top-artists">Top Artists</option>
                  <option value="playlists">Playlists</option>
                </select>
              </div>
              {dataType !== 'playlists' && (
                <div>
                  <label htmlFor="time-range">Select Time Range: </label>
                  <select id="time-range" onChange={handleTimeRangeChange} value={timeRange}>
                    <option value="short_term">Last 4 Weeks</option>
                    <option value="medium_term">Last 6 Months</option>
                    <option value="long_term">This Year</option>
                  </select>
                </div>
              )}
              <DataTable data={data} type={dataType} />
            </>
          )}
        </div>
      </section>
    </>
  );
};

const DataTable = ({ data, type }) => {
  if (type === 'top-tracks') {
    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {data.map((track, index) => (
            <tr key={index}>
              <td>{track.name}</td>
              <td>{track.artists && Array.isArray(track.artists) ? track.artists.map(artist => artist.name).join(', ') : 'N/A'}</td>
              <td>{track.album ? track.album.name : 'N/A'}</td>
              <td>
                {track.preview_url ? (
                  <audio controls>
                    <source src={track.preview_url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                ) : (
                  'No preview available'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (type === 'top-artists') {
    return (
      <table>
        <thead>
          <tr>
            <th>Artist</th>
            <th>Genres</th>
            <th>Popularity</th>
          </tr>
        </thead>
        <tbody>
          {data.map((artist, index) => (
            <tr key={index}>
              <td>{artist.name}</td>
              <td>{artist.genres && Array.isArray(artist.genres) ? artist.genres.join(', ') : 'N/A'}</td>
              <td>{artist.popularity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (type === 'playlists') {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Tracks</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {data.map((playlist, index) => (
            <tr key={index}>
              <td>{playlist.name}</td>
              <td>{playlist.tracks ? playlist.tracks.total : 'N/A'}</td>
              <td>
                <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                  Open in Spotify
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    return <p>No data available.</p>;
  }
};

export default Spotify;
