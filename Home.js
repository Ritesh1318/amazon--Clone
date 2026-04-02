import React, { useState, useEffect } from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  const banners = [
    "https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/Machum/2025/Uber_PC_Hero_3000x1200_BAU._CB551371933_.jpg",
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners.length]); // ✅ Added banners.length

  return (
    <div className="home">
      <div className="home__container">
        {/* Sliding Banner Section */}
        <div className="home__bannerContainer">
          <img
            className="home__image fade"
            src={banners[currentBanner]}
            alt="Hero Banner"
          />
        </div>

        {/* First Row */}
        <div className="home__row">
          <Product
            id="1"
            title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback"
            price={19.99}
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
            rating={5}
          />
          <Product
            id="2"
            title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
            price={239.0}
            image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"
            rating={4}
          />
        </div>

        {/* Second Row */}
        <div className="home__row">
          <Product
            id="3"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
            price={199.99}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX450_.jpg"
          />
          <Product
            id="4"
            title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
            price={98.99}
            rating={5}
            image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
          />
          <Product
            id="5"
            title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
            price={598.99}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX450_.jpg"
          />
        </div>

        {/* Third Row */}
        <div className="home__row">
          <Product
            id="6"
            title="Samsung Galaxy Watch 4 - Black, 44mm"
            price={249.99}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
