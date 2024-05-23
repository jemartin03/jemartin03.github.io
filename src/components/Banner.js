import React, { useEffect, useState } from 'react';

const Banner = ({page}) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true)
    }, []) // empty square brackets: RUN THIS FUNCTION WHEN THIS COMPONENT LOADS
    let classes = loaded ? "visible "  :  ""
    let title;
    switch (page) {
        case 'thoughts':
          title = 'My Thoughts';
          break;
        case 'resume':
          title = 'My Resume';
          break;
        case 'contact':
          title = 'Contact Me';
          break;
          case 'spotify':
            title = 'Spotify';
          break;
        default:
          title = 'Julia Martin';
      }
    
      return (
        <div id="banner" className={classes}>
          <h1>{title}</h1>
        </div>
      );
    };
    
    export default Banner;