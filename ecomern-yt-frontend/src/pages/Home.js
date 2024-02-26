import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import categories from '../categories';
import { LinkContainer } from 'react-router-bootstrap';
import { Col, Row } from 'react-bootstrap';
import "./Home.css";
import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateProducts } from '../features/productSlice';
import ProductPreview from '../components/ProductPreview';
import { Carousel } from 'react-bootstrap';
import '../images/carousel4.jpg'
function Home() {
 const dispatch = useDispatch();
 const products = useSelector(state => state.products);
 const lastProducts = products.slice(0,8)

useEffect(()=>{
    axios .get('/products').then(({data}) => dispatch(updateProducts(data)))
}, []) 

return (
    <div>
      <img src="https://res.cloudinary.com/learn-code-10/image/upload/v1653947013/yqajnhqf7usk56zkwqi5.png" className="home-banner"  style={{
      width: '100%', 
      height: 'auto', 
      display: 'block', 
    }} />
      <div className='featured-products-container container mt-4' >
        <h2>Lastest products</h2>
        <div className="d-flex justify-content-center flex-wrap"  >
        {lastProducts.map((product) =>(
          <ProductPreview {...product} />
        )) }
        </div>
      </div>
      <Link to="/category/all" style={{ textAlign: "right", display: "block", textDecoration: "none" }}>
        See more {">>"}</Link>
      <div>
      </div>
      {/*sale banner*/}
      <div className="sale__banner--container mt-4">
  <img
    src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png"
    alt="Sale Banner"
    style={{
      width: '100%', 
      height: 'auto', 
      display: 'block', 
    }}
  />
</div>

      <div className="recent-products-container container mt-4">
        <h2>Categories</h2>
        <Row>
          {categories.map((category) => (
            <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`}>
              <Col md={4}>
                <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`, gap: "10px" }} className="category-tile">
                  {category.name}
                </div>


              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
      <footer>
        {/* <div class="foot-panel1">Back to Top</div> */}
        <div class="foot-panel2">
            <ul>
                <p>Get to Know Us</p>
                <a href="">Careers</a>
                <a href="">Blog</a>
                <a href="">About ShopIto</a>
                <a href="">Investor Relations</a>
                <a href="">ShopIto Devices</a>
                <a href="">ShopIto Science</a>
            </ul>
            <ul>
                <p>Connect with us</p>
                <a href="">Facebook</a>
                <a href="">Twitter</a>
                <a href="">Instagram</a>
                <a href=""></a>
                
            </ul>
            <ul>
                <p>Make Money with us</p>
                <a href="">Sell on ShopIto</a>
                <a href="">Become an Affiliate</a>
                <a href="">Fulfilment by ShopIto</a>
                <a href="">Advertise Your Products</a>
                <a href="">Protect and Build Your Brand</a>
                <a href="">ShopIto Global Selling</a>
            </ul>
            <ul>
                <p>Let Us Help You</p>
                <a href="">Your Account</a>
                <a href="">Returns Centre</a>
                <a href="">100% Purchase Protection</a>
                <a href="">ShopIto App Download</a>
                <a href="">Help</a>
               
            </ul>

        </div>
        {/* <div class="foot-panel3">
            <div class="logo"></div>
        </div> */}
        <div class="foot-panel4">
            <div class="pages">
                <a>Conditions of Use</a>
                <a>Privacy Notice</a>
                <a>Your Ads Privacy Choices</a>
            </div>
            <div class="copyright">© 1996-2023, ShopIto.com, Inc. or its affiliates</div>
        </div>
    </footer>
    </div>
  )
}

export default Home


