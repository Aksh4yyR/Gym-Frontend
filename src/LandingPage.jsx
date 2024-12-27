import React, { useEffect } from 'react'
import Header from './HeadFoot/Header'
import Footer from './HeadFoot/Footer';
import './App.css'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import gnc from './assets/gnc2.jpg';
import mtech from './assets/muscletech.jpg';
import opm from './assets/optimum.jpg';
import { Link, Navigate } from 'react-router-dom';
import { Card,  Container, Row, Col } from 'react-bootstrap';
import { Toast } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';
import gnclogo from './assets/gnclogo.jpg'
import mblogo from './assets/mblogo.jpg'
import onlogo from './assets/onlogo.jpg'
import avatar from './assets/avatar.jpg'


import whey from './assets/whey.jpg'
import pre from './assets/pre.jpg'
import bcaa from './assets/bcaa.jpg'
import creatine from './assets/creatine.jpg'

import on_whey from './assets/on-whey.jpg.webp'
import nitro_whey from './assets/nitro-whey.jpg'
import gnc_whey from './assets/gnc-whey.jpg'

import tech_creat from './assets/mtech-creat.jpg'
import on_creat from './assets/on-creatine.jpg'
import wellcore from './assets/wellcore.jpg'

import fish from './assets/fish.jpg'
import bcaa1 from './assets/bcaa1.jpg'
import vitamin from './assets/dm.jpg'
import { viewReviews } from './services/allAPI';

const LandingPage = () => {
  const Navigate=useNavigate()
  const [index, setIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  console.log(reviews);
  
  const [loading, setLoading] = useState(true);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await viewReviews();
        console.log(response.data);
        
        if (response && response.data) {
          setReviews(response.data); // Assuming 'data' contains the list of reviews
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);
  
  return (
    <div id='landing' className='bg-black'>
        <Header/>
        <div className="img-slider">
        <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img style={{height:'60vh'}} src={gnc} alt=""  className="d-block w-100 "/>
      </Carousel.Item>
      <Carousel.Item>
      <img style={{height:'60vh'}} src={mtech} alt=""  className="d-block w-100 " />
      </Carousel.Item>
      <Carousel.Item>
      <img style={{height:'60vh'}} src={opm} alt=""  className="d-block w-100 " />
      </Carousel.Item>
    </Carousel>
        </div>
        <h1 className="text-center text-danger" style={{ fontSize: '4.5em', color: '#333', fontWeight: 'bold', margin: '20px 0',marginBottom:'50px',marginLeft:'40px' }}>
      Our <span className='text-white'> Brand</span> Partners
        </h1>
        <marquee  behavior="" direction="right">
          <img style={{height:'80px',width:'300px',marginLeft:'150px'}} src={gnclogo} alt="" /> <img style={{height:'80px',width:'300px',marginLeft:'150px'}} src={mblogo} alt="" /> <img style={{height:'80px',width:'300px',marginLeft:'150px'}} src={onlogo} alt="" /> <img style={{height:'80px',width:'300px',marginLeft:'150px'}} src={avatar} alt="" />
          <img style={{height:'80px',width:'300px',marginLeft:'150px'}} src={gnclogo} alt="" /> <img style={{height:'80px',width:'300px',marginLeft:'150px'}} src={mblogo} alt="" /> <img style={{height:'80px',width:'300px',marginLeft:'150px'}} src={onlogo} alt="" /> <img style={{height:'80px',width:'300px',marginLeft:'150px'}} src={avatar} alt="" />

        </marquee>
        

<div class="d-flex justify-content-center align-items-center min-vh-100 mt-5">
  <div class="supplement-section container p-5 rounded shadow">
    <h2 class="text-center mb-4">
      Fuel Your <span class="text-white">Workout with Top</span> Supplements
    </h2>

    <div class="row">
      {/* <!-- Supplement 1 --> */}
      <div class="col-12 col-md-6 mb-4">
        <div class="supplement-card">
          <img src={whey} alt="Whey Protein"/>
          <div class="supplement-description">
            <h3>Whey Protein</h3>
            <p>Boost muscle growth and recover faster with high-quality whey protein, essential for athletes and fitness enthusiasts.</p>
            <a href="/login">Shop Now</a>
          </div>
        </div>
      </div>

      {/* <!-- Supplement 2 --> */}
      <div class="col-12 col-md-6 mb-4">
        <div class="supplement-card">
          <img src={pre} alt="Pre-workout"/>
          <div class="supplement-description">
            <h3>Pre-Workout</h3>
            <p>Enhance your energy and endurance with our powerful pre-workout blend, designed to keep you going strong.</p>
            <a href="/login">Shop Now</a>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      {/* <!-- Supplement 3 --> */}
      <div class="col-12 col-md-6 mb-4">
        <div class="supplement-card">
          <img src={bcaa} alt="BCAAs"/>
          <div class="supplement-description">
            <h3>BCAAs</h3>
            <p>Support muscle recovery and reduce fatigue with essential amino acids, perfect for post-workout recovery.</p>
            <a href="/login">Shop Now</a>
          </div>
        </div>
      </div>

      {/* <!-- Supplement 4 --> */}
      <div class="col-12 col-md-6 mb-4">
        <div class="supplement-card">
       
          <img src={creatine} alt="Creatine"/>
          <div class="supplement-description">
            <h3>Creatine</h3>
            <p>Build strength and power with premium creatine, ideal for weightlifters and strength trainers looking to maximize gains.</p>
            <a href="/login">Shop Now</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{/* card slider */}
<h2 className="text-danger fw-bolder">Exclusive Products</h2>
<div className="slider-container">
  <div className="card-slider">
    <div className="card">
      <img src={on_whey} alt="ON Whey Protein" />
    </div>
    <div className="card">
      <img src={nitro_whey} alt="Nitro Whey Protein" />
    </div>
    <div className="card">
      <img src={gnc_whey} alt="GNC Whey Protein" />
    </div>
    <div className="card">
      <img src={tech_creat} alt="Mtech Creatine" />
    </div>
    <div className="card">
      <img src={on_creat} alt="ON Creatine" />
    </div>
    <div className="card">
      <img src={wellcore} alt="Wellcore Creatine" />
    </div>
    <div className="card">
      <img src={fish} alt="Fish Oil" />
    </div>
    <div className="card">
      <img src={bcaa1} alt="BCAA" />
    </div>
    <div className="card">
      <img src={vitamin} alt="Vitamin Supplement" />
    </div>
  </div>
</div>









<section className="about-section py-5">
      <Container>
        <Row className="text-center mb-4">
          <Col>
            <h2 className="fw-bold text-danger">Why Choose Us?</h2>
            <p className="">Discover the benefits of premium supplements.</p>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="text-center">
            <i className="fas fa-dumbbell fa-3x text-danger mb-3"></i>
            <h5 className="">Top Quality Products</h5>
            <p className="">Our supplements are carefully sourced for maximum effectiveness.</p>
          </Col>
          <Col md={4} className="text-center">
            <i className="fas fa-shipping-fast fa-3x text-danger mb-3"></i>
            <h5 className="">Fast Shipping</h5>
            <p className="">Get your supplements delivered to your door quickly and safely.</p>
          </Col>
          <Col md={4} className="text-center">
            <i className="fas fa-star fa-3x text-danger mb-3"></i>
            <h5 className="">Customer Satisfaction</h5>
            <p className="">Our priority is your health and happiness.</p>
          </Col>
        </Row>
      </Container>
    </section>
    {/* reviews */}
    <div className="reviews-container">
      <h2 className="reviews-title">User Reviews</h2>
      {loading ? (
        <p className="reviews-loading">Loading reviews...</p>
      ) : (
        <div className="reviews-marquee">
          <div className="reviews-content">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <span 
                  key={review._id} 
                  className="review-card"
                >
                  <h3 className="review-username">{review.username}</h3>
                  <p className="review-text">"{review.review}"</p>
                </span>
              ))
            ) : (
              <p className="reviews-empty">No reviews yet!</p>
            )}
          </div>
        </div>
      )}
    </div>





{/* frequently asked questions */}
<h1 className='text-danger text-center fw-bolder mt-5'>Frequently <span className='text-white'>Asked</span> Questions</h1>
<div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
  <div style={{ width: '60%' }}>
    <Accordion style={{ backgroundColor: 'black', color: 'white' }}>
      <Accordion.Item eventKey="0">
        <Accordion.Header style={{ color: 'white' }}> What is use of Whey Protein?</Accordion.Header>
        <Accordion.Body style={{ backgroundColor: 'black', color: 'white' }}>
        Whey protein is a supplement that some people use alongside resistance exercise to help boost muscle protein synthesis and the growth of lean muscle mass. Other possible benefits include helping with weight loss and lowering cholesterol.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header style={{ color: 'white' }}>What is the use of Creatine Monohydrate?</Accordion.Header>
        <Accordion.Body style={{ backgroundColor: 'black', color: 'white' }}>
        Creatine supplies energy to your muscles. Many people take creatine supplements to build strength and promote brain health. Creatine supplements are safe for most people to take, but you should first talk to a healthcare provider to ensure they're right for you.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header style={{ color: 'white' }}>What is the use of Fish Oil?</Accordion.Header>
        <Accordion.Body style={{ backgroundColor: 'black', color: 'white' }}>
        Fish oil is a dietary source of omega-3 fatty acids. Your body needs omega-3 fatty acids for many functions, from muscle activity to cell growth. Omega-3 fatty acids are derived from food. They can't be manufactured in the body.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header style={{ color: 'white' }}>What is use of BCAA?</Accordion.Header>
        <Accordion.Body style={{ backgroundColor: 'black', color: 'white' }}>
        BCAAs are essential amino acids. The body cannot make them, so a person needs to get BCAAs from their diet or as supplements. Research suggests that taking BCAA supplements may improve muscle mass and performance and may reduce muscle damage from exercise. BCAAs may also benefit people with liver disease.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </div>
</div>




<Footer/>
</div>

  )
}


export default LandingPage