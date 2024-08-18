import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useButtonStyles } from '../App';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const headerStyle: React.CSSProperties = {
  	fontSize: '24px',
  	fontWeight: 'bold',
  	marginBottom: '16px',
  	marginTop: '48px',
  	textAlign:'center'
  };

  const buttonStyle = useButtonStyles();

  return (
  	<div>
	      <header style={headerStyle}>Welcome!</header>	    
	      <button style={buttonStyle} onClick={() => navigate('/search')}>Get Started</button>
    </div>
  );
};

export default Welcome;
