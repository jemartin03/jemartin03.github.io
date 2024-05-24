import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();
  console.log("made it to callback");

  useEffect(() => {
    const currentUrl = window.location.href;
    const queryParams = currentUrl.split('?')[1];
    const code = new URLSearchParams(queryParams).get('code');

    if (code) {
      console.log("Authorization code:", code);
      navigate(`/spotify?code=${code}`);
    } else {
      console.error('Authorization code not found');
      navigate('/'); // Redirect to home or an error page
    }
  }, [navigate]);

  return (
    <div className="section">
      <h2>Processing...</h2>
    </div>
  );
};

export default Callback;
