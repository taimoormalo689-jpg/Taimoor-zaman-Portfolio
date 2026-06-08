import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3 style={{ marginBottom: "40px" }}>Contact</h3>
        
        <div className="contact-flex">
          {/* Column 1: Connect & Education */}
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a href="mailto:taimoorzaman.456@gmail.com" data-cursor="disable">
                taimoorzaman.456@gmail.com
              </a>
            </p>
            <p>+92-331-555-8803</p>
            <p>Pakistan</p>
            <p style={{ marginTop: "20px" }}>LinkedIn — taimoor-aidev</p>

            <h4 style={{ marginTop: "40px" }}>Education</h4>
            <p style={{ color: "#ccc", fontSize: "14px" }}>
              BS Computer Science, COMSATS University Islamabad
            </p>
          </div>

          {/* Column 2: Social */}
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/taimoormalo689-jpg/Taimoor-zaman-Portfolio"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/taimoor-aidev/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
          </div>

          {/* Column 3: Copyright */}
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Taimoor Zaman</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
