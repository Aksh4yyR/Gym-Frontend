import React from 'react'
import Header from './HeadFoot/Header'
import Footer from './HeadFoot/Footer';
import './App.css'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import gnc from './assets/gnc2.jpg';
import mtech from './assets/muscletech.jpg';
import opm from './assets/optimum.jpg';
import { Link } from 'react-router-dom';
import { Card,  Container, Row, Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

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
import Toast from 'react-bootstrap/Toast';
const LandingPage = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
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
        

  <div className="d-flex justify-content-center align-items-center min-vh-100 mt-5 ">
  <div className="supplement-section container p-5 rounded shadow">
    <h2 style={{fontSize:'60px'}} className="text-center mb-4 text-danger fw-bolder ">Fuel Your <span className='text-white'>Workout with Top</span> Supplements</h2>
    
    <div className="row">
      {/* Supplement 1 */}
      <div className="col-md-6 mb-4">
        <img src={whey} style={{ width: '100%', height: 'auto' }} alt="Protein Supplement" className="rounded  animate__animated animate__backInDown" />
        <h3 style={{fontFamily:'revert-layer'}} className="mt-3 text-danger fw-bolder text-center">Whey Protein</h3>
        <p className='text-white'>Boost muscle growth and recover faster with high-quality whey protein, essential for athletes and fitness enthusiasts.</p>
        <Link className="btn btn-danger mt-2" to ='/login'> Shop Now </Link>
      </div>
      
      {/* Supplement 2 */}
      <div className="col-md-6 mb-4">
        <img src={pre} style={{ width: '100%', height: '600px' }} alt="Pre-workout Supplement" className="rounded animate__animated animate__backInDown" />
        <h3 className="mt-3 text-danger fw-bolder text-center">Pre-Workout</h3>
        <p className='text-white'>Enhance your energy and endurance with our powerful pre-workout blend, designed to keep you going strong.</p>
        <Link className="btn btn-danger mt-2" to ='/login'> Shop Now </Link>
      </div>
    </div>
    
    <div className="row">
      {/* Supplement 3 */}
      <div className="col-md-6 mb-4">
        <img src={bcaa} style={{ width: '100%', height: 'auto' }} alt="BCAAs Supplement" className="rounded  animate__animated animate__headShake" />
        <h3 className="mt-3 text-danger fw-bolder text-center">BCAAs</h3>
        <p className='text-white'>Support muscle recovery and reduce fatigue with essential amino acids, perfect for post-workout recovery.</p>
        <Link className="btn btn-danger mt-2 align-center" to ='/login'> Shop Now </Link>
      </div>
      
      {/* Supplement 4 */}
      <div className="col-md-6 mb-4">
        <img src={creatine} style={{ width: '100%', height: '400px' }} alt="Creatine Supplement" className="rounded  animate__animated animate__backInDown" />
        <h3 className="mt-3 text-danger fw-bolder text-center">Creatine</h3>
        <p className='text-white'>Build strength and power with premium creatine, ideal for weightlifters and strength trainers looking to maximize gains.</p>
        <Link className="btn btn-danger mt-2" to ='/login'> Shop Now </Link>
      </div>
    </div>
  </div>
</div>
<div className='cards'>
<Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-black">
      <Row className="justify-content-center">
        <h1 style={{fontSize:'70px'}} className='text-center text-white fw-bolder '>Whey Protein</h1>
        {/* Card 1 */}
        <Col xs={12} md={4} className="mb-4">
          <Card style={{ width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',background:'black' }}>
            <Card.Img  variant="top" src={on_whey} style={{ height: '100%', objectFit: 'cover',borderRadius:'30px' }} />
            <Card.Body style={{ textAlign: 'center' }}>
              <Card.Title className='text-white fw-bolder' style={{ fontSize: '1.2rem', color: '#333',fontSize:'30px' }}>Optimum Nutrition Whey</Card.Title>
              <p className='text-success fw-bolder'>20% Offer</p>
              <Card.Text style={{ display: 'flex', justifyContent: 'center', color: '#FFD700' }}>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            </Card.Text>
              
            <Link className='btn btn-danger' to='/login'>Shop now</Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 2 */}
        <Col xs={12} md={4} className="mb-4">
          <Card style={{ width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',background:'black' }}>
            <Card.Img variant="top" src={nitro_whey} style={{ height: '100%', objectFit: 'cover',borderRadius:'30px' }} />
            <Card.Body style={{ textAlign: 'center' }}>
              <Card.Title className='text-white fw-bolder'  style={{ fontSize: '1.2rem', color: '#333',fontSize:'30px' }}>Nitrotech Whey</Card.Title>
              <p className='text-success fw-bolder'>25% Offer</p>
              <Card.Text style={{ display: 'flex', justifyContent: 'center', color: '#FFD700' }}>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star-half" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            </Card.Text>
              
            <Link className='btn btn-danger' to='/login'>Shop now</Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 3 */}
        <Col xs={12} md={4} className="mb-4">
          <Card style={{ width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',background:'black' }}>
            <Card.Img variant="top" src={gnc_whey} style={{ height: '100%', objectFit: 'cover',borderRadius:'30px' }} />
            <Card.Body style={{ textAlign: 'center' }}>
              <Card.Title className='text-white fw-bolder'  style={{ fontSize: '1.2rem', color: '#333',fontSize:'30px'}}>GNC Whey Protein</Card.Title>
              <p className='text-success fw-bolder'>15% Offer</p>
              <Card.Text style={{ display: 'flex', justifyContent: 'center', color: '#FFD700' }}>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star-half" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            </Card.Text>
              
            
              <Link className='btn btn-danger' to='/login'>Shop now</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

    {/* creatine */}

    <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-black" style={{marginTop:'120px'}}>
      <Row className="justify-content-center" >
        <h1 style={{fontSize:'70px'}} className='text-center text-white fw-bolder '>Creatine Monohydate</h1>
        {/* Card 1 */}
        <Col xs={12} md={4} className="mb-4" >
          <Card style={{ width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',background:'black' }}>
            <Card.Img  variant="top" src={tech_creat} style={{ height: '100%', objectFit: 'cover',borderRadius:'30px' }} />
            <Card.Body style={{ textAlign: 'center' }}>
              <Card.Title className='text-white fw-bolder' style={{ fontSize: '1.2rem', color: '#333',fontSize:'30px' }}>Nitrotech Creatine Monohydate</Card.Title>
              <p className='text-success fw-bolder'>20% Offer</p>
              <Card.Text style={{ display: 'flex', justifyContent: 'center', color: '#FFD700' }}>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            </Card.Text>
              
            <Link className='btn btn-danger' to='/login'>Shop now</Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 2 */}
        <Col xs={12} md={4} className="mb-4">
          <Card style={{ width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',background:'black' }}>
            <Card.Img variant="top" src={on_creat} style={{ height: '100%', objectFit: 'cover',borderRadius:'30px' }} />
            <Card.Body style={{ textAlign: 'center' }}>
              <Card.Title className='text-white fw-bolder'  style={{ fontSize: '1.2rem', color: '#333',fontSize:'30px' }}>Optimum Nutrition Creatine Monohydate</Card.Title>
              <p className='text-success fw-bolder'>25% Offer</p>
              <Card.Text style={{ display: 'flex', justifyContent: 'center', color: '#FFD700' }}>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star-half" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            </Card.Text>
              
            <Link className='btn btn-danger' to='/login'>Shop now</Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 3 */}
        <Col xs={12} md={4} className="mb-4">
          <Card style={{ width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',background:'black' }}>
            <Card.Img variant="top" src={wellcore} style={{ height: '100%', objectFit: 'cover',borderRadius:'30px' }} />
            <Card.Body style={{ textAlign: 'center' }}>
              <Card.Title className='text-white fw-bolder'  style={{ fontSize: '1.2rem', color: '#333',fontSize:'30px'}}>Wellcore Creatine</Card.Title>
              <p className='text-success fw-bolder'>15% Offer</p>
              <Card.Text style={{ display: 'flex', justifyContent: 'center', color: '#FFD700' }}>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star-half" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            </Card.Text>
              
            
              <Link className='btn btn-danger' to='/login'>Shop now</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

    {/* Other supplements */}
    <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-black" style={{marginTop:'120px'}}>
      <Row className="justify-content-center" >
        <h1 style={{fontSize:'70px'}} className='text-center text-white fw-bolder '>Other <span className='text-danger'>Essential</span> Supplements</h1>
        {/* Card 1 */}
        <Col xs={12} md={4} className="mb-4" >
          <Card style={{ width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',background:'black' }}>
            <Card.Img  variant="top" src={fish} style={{ height: '100%', objectFit: 'cover',borderRadius:'30px' }} />
            <Card.Body style={{ textAlign: 'center' }}>
              <Card.Title className='text-white fw-bolder' style={{ fontSize: '1.2rem', color: '#333',fontSize:'30px' }}>Fish Oil</Card.Title>
              <p className='text-success fw-bolder'>20% Offer</p>
              <Card.Text style={{ display: 'flex', justifyContent: 'center', color: '#FFD700' }}>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            </Card.Text>
              
            <Link className='btn btn-danger' to='/login'>Shop now</Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 2 */}
        <Col xs={12} md={4} className="mb-4">
          <Card style={{ width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',background:'black' }}>
            <Card.Img variant="top" src={bcaa1} style={{ height: '100%', objectFit: 'cover',borderRadius:'30px' }} />
            <Card.Body style={{ textAlign: 'center' }}>
              <Card.Title className='text-white fw-bolder'  style={{ fontSize: '1.2rem', color: '#333',fontSize:'30px' }}>BCAA</Card.Title>
              <p className='text-success fw-bolder'>25% Offer</p>
              <Card.Text style={{ display: 'flex', justifyContent: 'center', color: '#FFD700' }}>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star-half" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            </Card.Text>
              
            <Link className='btn btn-danger' to='/login'>Shop now</Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 3 */}
        <Col xs={12} md={4} className="mb-4">
          <Card style={{ width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',background:'black' }}>
            <Card.Img variant="top" src={vitamin} style={{ height: '100%', objectFit: 'cover',borderRadius:'30px' }} />
            <Card.Body style={{ textAlign: 'center' }}>
              <Card.Title className='text-white fw-bolder'  style={{ fontSize: '1.2rem', color: '#333',fontSize:'30px'}}>Daily Multi-Vitamins</Card.Title>
              <p className='text-success fw-bolder'>15% Offer</p>
              <Card.Text style={{ display: 'flex', justifyContent: 'center', color: '#FFD700' }}>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            <i className="fa-solid fa-star-half" style={{ fontSize: '1.5rem', margin: '0 2px' }}></i>
            </Card.Text>
              
            
              <Link className='btn btn-danger' to='/login'>Shop now</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
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