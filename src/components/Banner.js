import React, { useEffect, useState } from 'react';

const Banner = ({page}) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true)
    }, []) // empty square brackets: RUN THIS FUNCTION WHEN THIS COMPONENT LOADS
    let classes = loaded ? "visible "  :  ""
    if(page === 'home') {
        classes = classes + "fullpage"
    }
    return (
        <div id="banner" className={classes } >
        <h1>{page === "home" ? "Julia Martin" : page}</h1>
        </div>
    );
};

export default Banner;