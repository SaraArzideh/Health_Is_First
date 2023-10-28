// to use this hepler file it should be import in other files as follow:
// const { generateToken, formatDate, calculateBMI, determineBMICategory } = require('../utilities/helper');

const jwt = require('jsonwebtoken');
const config = require('../config');

// Function to generate a JWT token for user authentication
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, config.JWT_SECRET, {
        expiresIn: '1h' // Adjust the expiration as needed
    });
};

// Function to format the date into a readable string
const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
};

// Function to calculate the Body Mass Index (BMI)
const calculateBMI = (weightInKg, heightInCm) => {
    if (weightInKg > 0 && heightInCm > 0) { 
        const heightInM = heightInCm / 100;
        const bmi = weightInKg / (heightInM * heightInM);
        return parseFloat(bmi.toFixed(2));
    }
    return null;
};

// Function to determine BMI category
const determineBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) return 'Underweight';
    if (bmiValue >= 18.5 && bmiValue <= 24.9) return 'Normal weight';
    if (bmiValue >= 25 && bmiValue <= 29.9) return 'Overweight';
    if (bmiValue >= 30) return 'Obesity';
    return null;
};

module.exports = {
    generateToken,
    formatDate,
    calculateBMI,
    determineBMICategory
};