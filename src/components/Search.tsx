import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Autocomplete from "react-google-autocomplete";
import { useButtonStyles } from '../App';

const GOOGLE_API_KEY = 'AIzaSyALM6ynCmH6p53EiNxdHCG2aG47ou7BB-o';

const Search: React.FC = () => {
	const navigate = useNavigate();
	const [city, setCity] = useState('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCity(event.target.value);
	};

	const handleSearch = () => {
		setCity((document.getElementById('cityInput') as HTMLInputElement)?.value);
    	navigate(`/weather?city=${city}`);
    };

    const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
	    const cityFromPlace = place.address_components?.find(component => component.types.includes("locality"))?.long_name;
	    if (cityFromPlace) {
	      setCity(cityFromPlace);
	    } else {
	      console.error('Could not extract city from place');
	    }
	};

    const textboxStyle: React.CSSProperties = {
	  	display: 'block',
	  	fontSize: '16px',
	  	margin: 'auto',
	  	marginBottom: '16px',
  		marginTop: '48px',
  		padding: '4px',
  	}

  	const buttonStyle = useButtonStyles();

    return (
    	<div>
			<Autocomplete
				id="cityInput"
				apiKey={GOOGLE_API_KEY}
				placeholder='Enter a city name'
				value={city}
				onChange={handleChange}
				onPlaceSelected={handlePlaceSelected}
				style={textboxStyle}
			/>
    		<button style={buttonStyle} onClick={handleSearch}>Search</button>
    	</div>
    );
};

export default Search; 
