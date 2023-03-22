import React from "react";
import "../assets/css/home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
    {/* header section */}
    <header>
      <div className="container header-section flex">
        <div className="header-left">
          <h1>Host a PDF Online</h1>
          <p>
            Host is a simple tool to upload and host your PDF online. Sharing your
            PDF online can be complicated.
          </p>
          <Link to="/signin" className="primary-button get-started-btn">
            Get Started
          </Link>
        </div>
        <div className="header-right">
        <img src={require('../assets/images/asset 2.png')} alt="" />

        </div>
      </div>
    </header>
    {/* big features section */}
    <section className="big-feature-section">
      <div className="container flex big-feature-container">
        <div className="feature-img">
          <img src={require('../assets/images/asset 18.png')} alt="" />
        </div>
        <div className="feature-desc flex">
          {/* <h4>Effortless validation for</h4> */}
          <h2>Password protect PDFs</h2>
          <p>
            Secure your PDFs by easily adding a password to restrict viewers.Web
            Services allowing your visitors to access your PDF very quickly
            wherever they are in the world.
          </p>
        </div>
      </div>
    </section>
    <section className="big-feature-section">
      <div
        className="container flex big-feature-container"
        id="second-big-feature"
      >
        <div className="feature-img">
          <img src={require('../assets/images/asset 21.png')} alt="" />
        </div>
        <div className="feature-desc flex">
          <h2>Free Of Cost</h2>
          <p>
            Host is a static hosting tool which means its very cheap to host your
            PDF regardless of how large it is or number of viewers.
          </p>
        </div>
      </div>
    </section>
    <section className="big-feature-section">
      <div className="container flex big-feature-container">
        <div className="feature-img">
          <img src={require('../assets/images/asset 24.png')}  alt="" />
        </div>
        <div className="feature-desc flex">
          <h2>Drag &amp; drop upload</h2>
          <p>
            No need for any hosting knowledge, simply drag &amp; drop your PDF
            file.provides a very reliable service to share your PDF.
          </p>
        </div>
      </div>
    </section>
    {/* cta section */}
    <section className="cta-section">
      <div className="container flex cta-section-container">
        <h2>Start Sharing today</h2>
        <p>
          You can store and share files (photos, PDFs) With Jumpshare you can do
          more than view PDF files. You can upload and share large PDF documents
          within seconds via cloud sharing,
        </p>
        <Link to="/signin" className="primary-button">
          Get Started
        </Link>
      </div>
    </section>
  </>
  
  );
};

export default Home;
