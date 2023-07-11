import React, { Component } from 'react';
import './bmiform.css'; // Import the CSS file
import NormalImage from './images/Normal.png';
import ObesityImage from './images/Obesity.png';
import UnderweightImage from './images/underweight.png';
import OverweightImage from './images/overweight.png';

class BMIForm extends Component {
  state = {
    name: '',
    age: '',
    height: '',
    weight: '',
    mobileNumber: '',
    errors: {},
    bmi: null,
    category: '',
    image:null,
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  validateForm = () => {
    const { name, age, height, weight, mobileNumber } = this.state;
    const errors = {};

    // Regular expression to match alphabetic characters only
    const nameRegex = /^[A-Za-z]+$/;

    // Validate name field
    if (name.trim() === '') {
      errors.name = 'Please enter your name.';
    } else if (!nameRegex.test(name)) {
      errors.name = 'Name should contain only alphabetic characters.';
    }

    // Validate age field
    if (age.trim() === '' || isNaN(age) || parseInt(age, 10) <= 0) {
      errors.age = 'Please enter a positive integer for age.';
    }

    // Validate height field
    if (height.trim() === '' || isNaN(height) || parseFloat(height) <= 0) {
      errors.height = 'Please enter a positive number for height.';
    }

    // Validate weight field
    if (weight.trim() === '' || isNaN(weight) || parseFloat(weight) <= 0) {
      errors.weight = 'Please enter a positive number for weight.';
    }

    // Validate mobile number field
    const mobileNumberRegex = /^[6-9]\d{9}$/; // Indian mobile number format
    if (!mobileNumberRegex.test(mobileNumber)) {
      errors.mobileNumber = 'Please enter a valid Indian mobile number.';
    }

    this.setState({ errors });

    return Object.keys(errors).length === 0; // Return true if no errors found
  };

  calculateBMI = () => {
    const { height, weight } = this.state;

    // Convert height to meters if in centimeters
    const heightInMeters = parseFloat(height) / 100;

    // Calculate BMI using the formula: BMI = weight (kg) / (height (m) * height (m))
    const bmi = parseFloat(weight) / (heightInMeters * heightInMeters);

    // Determine BMI category
    
    let category = '';
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi < 25) {
      category = 'Normalweight';
    } else if (bmi < 30) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }
    let image='';
    if (category === 'Underweight') {
      image = <img src={UnderweightImage} alt="Underweight" />;
    } else if (category === 'Normal') {
      image = <img src={NormalImage} alt="Normal" />;
    } else if (category === 'Overweight') {
      image = <img src={OverweightImage} alt="Overweight" />;
    } else if (category === 'Obesity')  {
      image = <img src={ObesityImage} alt="Obesity" />;
    }
       this.setState({ bmi, category, image})
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.validateForm()) {
      this.calculateBMI();
    }
  };

  render() {
    // eslint-disable-next-line
    const { name, age, height, weight, mobileNumber, errors, bmi, category, image=image} = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={age}
            onChange={this.handleInputChange}
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>

        <div>
          <label>Height (cm):</label>
          <input
            type="number"
            name="height"
            value={height}
            onChange={this.handleInputChange}
          />
          {errors.height && <span className="error">{errors.height}</span>}
        </div>

        <div>
          <label>Weight (kg):</label>
          <input
            type="number"
            name="weight"
            value={weight}
            onChange={this.handleInputChange}
          />
          {errors.weight && <span className="error">{errors.weight}</span>}
        </div>

        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            name="mobileNumber"
            value={mobileNumber}
            onChange={this.handleInputChange}
          />
          {errors.mobileNumber && <span className="error">{errors.mobileNumber}</span>}
        </div>

        <button type="submit">Submit</button>

        {bmi && (
          <div>
            <h2>Results:</h2>
            <p>BMI: {bmi.toFixed(2)}</p>
            <p>Category: {category}</p>
            {image}
          </div>
        )}
      </form>
    );
  }
}

export default BMIForm; 