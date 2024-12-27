import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './HeadFoot/Header';
import Footer from './HeadFoot/Footer';
import './App.css';

const BMICalculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');
    const [recommendations, setRecommendations] = useState('');

    // For navigation
    const navigate = useNavigate();

    // Calculate BMI
    const calculateBMI = () => {
        if (weight && height) {
            const heightInMeters = height / 100; // Convert height to meters
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
            setBmi(bmiValue);

            // Determine the BMI category and recommendations
            if (bmiValue < 18.5) {
                setCategory('Underweight');
                setRecommendations('You should consider using weight gain supplements and increase calorie intake.');
            } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
                setCategory('Normal weight');
                setRecommendations('Maintain your weight with balanced nutrition and regular workouts.');
            } else if (bmiValue >= 25 && bmiValue <= 29.9) {
                setCategory('Overweight');
                setRecommendations('Consider using fat-burning supplements and focus on a calorie deficit diet.');
            } else {
                setCategory('Obese');
                setRecommendations('Consult a doctor and consider weight loss products and healthy lifestyle changes.');
            }
        } else {
            alert('Please enter both weight and height');
        }
    };

    
    const goToCategories = () => {
        navigate('/categories');
    };

    return (
        <>
            <Header />
            <div className="bmi-container">
                <h2 className="bmi-title">BMI Calculator</h2>
                <div className="bmi-form">
                    <div className="input-group">
                        <label className="input-label">Weight (kg):</label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="Enter your weight in kg"
                            className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Height (cm):</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="Enter your height in cm"
                            className="input-field"
                        />
                    </div>
                    <button onClick={calculateBMI} className="calculate-btn">
                        Calculate BMI
                    </button>
                </div>

                {bmi && (
                    <div className="bmi-result">
                        <h3>Your BMI: {bmi}</h3>
                        <p className="category-text">Category: <span className="category">{category}</span></p>
                        <p className="recommendations">Recommendations: {recommendations}</p>
                    </div>
                )}

                {/* Button to navigate to categories page */}
                <button onClick={goToCategories} className="navigate-btn">
                    Choose Supplements
                </button>
            </div>
            <Footer/>
        </>
    );
};

export default BMICalculator;
