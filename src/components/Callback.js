import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    if (code) {
      navigate(`/spotify?code=${code}`);
    } else {
      console.error('Authorization code not found');
    }
  }, [location, navigate]);

  return (
    <div>
      <h2>Processing...</h2>
    </div>
  );
};

export default Callback;
