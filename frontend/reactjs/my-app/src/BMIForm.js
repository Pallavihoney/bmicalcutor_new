import React, { useState } from 'react';
import './bmiform.css'; // Import the CSS file
import NormalImage from './images/Normal.png';
import ObesityImage from './images/Obesity.png';
import UnderweightImage from './images/underweight.png';
import OverweightImage from './images/overweight.png';
import axios from 'axios';

      
const App = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [bmi, setBMI] = useState('');
  const [error, setError] = useState('');
  const [image, setImage] = useState('');

  const calculateBMI = () => {
    const heightInMeters = height / 100; // Convert height to meters
    const bmiResult = weight / (heightInMeters * heightInMeters);
    setBMI(bmiResult.toFixed(2));

    if (bmiResult >= 30) {
      setImage(ObesityImage);
    } else if (bmiResult >= 25) {
      setImage(OverweightImage);
    } else if (bmiResult >= 18.5) {
      setImage(NormalImage);
    } else {
      setImage(UnderweightImage);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      calculateBMI();
      saveUserData();
    }
  };

  const validateForm = () => {
    if (!name.trim() || !/^[a-zA-Z]+$/.test(name)) {
      setError('Please enter a valid name.');
      return false;
    }
    if (!age || age <= 0) {
      setError('Please enter a valid age.');
      return false;
    }
    if (!height || height <= 0) {
      setError('Please enter a valid height.');
      return false;
    }
    if (!weight || weight <= 0) {
      setError('Please enter a valid weight.');
      return false;
    }
    if (!mobileNumber || !/^[6-9]\d{9}$/.test(mobileNumber)) {
      setError('Please enter a valid Indian mobile number.');
      return false;
    }

    setError('');
    return true;
  };

  const saveUserData = () => {
    const userData = {
      name: name,
      age: age,
      height: height,
      weight: weight,
      mobile_number: mobileNumber,
    };

    axios
    .post('api/', userData)
    .then((response) => {
      console.log('User data saved successfully:', response.data);
    })
    .catch((error) => {
      console.error('Error saving user data:', error);
    });
};

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Height (cm):</label>
          <input
            type="number"
            className="form-control"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Weight (kg):</label>
          <input
            type="number"
            className="form-control"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Mobile Number:</label>
          <input
            type="tel"
            className="form-control"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Calculate BMI</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {bmi && (
        <div className="bmi-result">
          <h3>BMI Result:</h3>
           <p>{bmi}</p>
          {image && <img src={image} alt="BMI category" />}
        </div>
      )}
    </div>
  );
};


export default App;
