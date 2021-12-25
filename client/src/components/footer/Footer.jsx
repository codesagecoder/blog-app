import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="about-us" data-aos="fade-right" data-aos-delay="200">
          <h2>About us</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            quia atque nemo ad modi officiis iure, autem nulla tenetur
            repellendus.
          </p>
        </div>
        <div className="newsletter">
          <h2>Newsletter</h2>
          <p>Stay updated</p>
          <div className="form-element">
            <input type="text" placeholder="Email" />
            <span>
              <i className="fas fa-chevron-right"></i>
            </span>
          </div>
        </div>
        <div className="authors">
          <h2>Authors</h2>
          <div className="flex-row">
            <img src="/images/thumb-card3.png" alt="insta1" />
            <img src="/images/thumb-card4.png" alt="insta2" />
            <img src="/images/thumb-card5.png" alt="insta3" />
          </div>
          <div className="flex-row">
            <img src="/images/thumb-card6.png" alt="insta4" />
            <img src="/images/thumb-card7.png" alt="insta5" />
            <img src="/images/thumb-card8.png" alt="insta6" />
          </div>
        </div>
        <div className="follow">
          <h2>Follow us</h2>
          <div>
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>
      </div>
      <div className="rights flex-row">
        <h4 className="text-gray">Copyright ©2021 All rights reserved</h4>
      </div>
      <div
        className="move-up"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <span>
          <i className="fas fa-arrow-circle-up fa-2x"></i>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
