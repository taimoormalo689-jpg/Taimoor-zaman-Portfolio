import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Get In Touch</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Let's connect</h4>
            <p style={{ lineHeight: "1.6", color: "#ccc", marginBottom: "20px" }}>
              Have a project in mind or want to automate your business processes with AI?
              Whether you need an AI agent, RAG system, or custom automation workflow —
              I'd love to help. Let's build something intelligent together!
            </p>
            <h4>Direct</h4>
            <p>
              <a
                href="mailto:taimoorzaman.456@gmail.com"
                data-cursor="disable"
              >
                taimoorzaman.456@gmail.com
              </a>
            </p>
            <p>+92-331-555-8803</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/taimoor-aidev"
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
