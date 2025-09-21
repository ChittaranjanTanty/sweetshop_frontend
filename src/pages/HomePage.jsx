import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import "./HomePage.css";

function HomePage() {
  const [sweets, setSweets] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // example for login state

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
        const res = await fetch(`${baseURL}/api/sweets`, {
          method: "GET",
          credentials: "include", // include cookies if any
        });

        const data = await res.json();
        if (res.ok) {
          setSweets(data.data || []); // <- use data.data
        } else {
          console.error("Failed to fetch sweets:", data.message);
        }
      } catch (err) {
        console.error("Error fetching sweets:", err);
      }
    };

    fetchSweets();
  }, []);

  return (
    <div className="homePageWrapper">
      <Navbar isLoggedIn={isLoggedIn} showSearch={true} />

      <main className="mainContent">
        <section className="heroSection">
          <h1 className="heroTitle">Welcome to SweetShop</h1>
          <p className="heroSubtitle">Discover & order your favorite sweets</p>
        </section>

        <section className="sweetsGrid">
          {sweets.length === 0 ? (
            <p>No sweets available</p>
          ) : (
            sweets.map((sweet) => (
              <div className="sweetCard" key={sweet._id}>
                <img src={sweet.imageUrl} alt={sweet.name} className="sweetImage" />
                <h3 className="sweetName">{sweet.name}</h3>
                <p className="sweetPrice">₹{sweet.price}</p>
                <button className="buyBtn">Buy Now</button>
              </div>
            ))
          )}
        </section>
      </main>

      <footer className="footerWrapper">
        <p>
          Built with 💖 by{" "}
          <a href="http://github.com/chittaranjanTanty" className="footerLink">
            Chittaranjan
          </a>
        </p>
      </footer>
    </div>
  );
}

export default HomePage;



