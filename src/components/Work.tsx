import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "Autonomous Multi-Agent Swarm",
    category: "Workflow Orchestration",
    tools: "LangGraph, LangChain, Python",
    image: "/images/ai_dashboard_1_1780940886565.png",
    link: "https://github.com/taimoormalo689-jpg/Taimoor-zaman-Portfolio",
  },
  {
    title: "Enterprise RAG & Knowledge Pipeline",
    category: "Vector Search & Document Q&A",
    tools: "Pinecone, FastAPI, OpenAI",
    image: "/images/ai_dashboard_2_1780940901270.png",
    link: "https://github.com/taimoormalo689-jpg/Taimoor-zaman-Portfolio",
  },
  {
    title: "n8n Complex Workflow Engine",
    category: "Business Process Automation",
    tools: "n8n, Node.js, Webhooks",
    image: "/images/ai_dashboard_3_1780940914087.png",
    link: "https://github.com/taimoormalo689-jpg/Taimoor-zaman-Portfolio",
  },
  {
    title: "Computer Vision QA System",
    category: "Real-time Defect Detection",
    tools: "YOLOv8, OpenCV, FastAPI",
    image: "/images/ai_dashboard_4_1780940927131.png",
    link: "https://github.com/taimoormalo689-jpg/Taimoor-zaman-Portfolio",
  },
  {
    title: "Real-Time AI Voice Agent",
    category: "Inbound & Outbound Voice AI",
    tools: "Vapi, ElevenLabs, Twilio",
    image: "/images/ai_dashboard_1_1780940886565.png",
    link: "https://github.com/taimoormalo689-jpg/Taimoor-zaman-Portfolio",
  },
  {
    title: "LLM-Powered Predictive CRM Analytics",
    category: "Salesforce Automation",
    tools: "Python, Pandas, OpenAI",
    image: "/images/ai_dashboard_2_1780940901270.png",
    link: "https://github.com/taimoormalo689-jpg/Taimoor-zaman-Portfolio",
  },
  {
    title: "Automated Video Synthesis Engine",
    category: "Video Processing Pipeline",
    tools: "Runway API, n8n, Python",
    image: "/images/ai_dashboard_3_1780940914087.png",
    link: "https://github.com/taimoormalo689-jpg/Taimoor-zaman-Portfolio",
  },
  {
    title: "AI Cold Email & Sales Automator",
    category: "Cold Email Personalization",
    tools: "GPT-4, n8n, SMTP",
    image: "/images/ai_dashboard_4_1780940927131.png",
    link: "https://github.com/taimoormalo689-jpg/Taimoor-zaman-Portfolio",
  },
  {
    title: "Healthcare Compliance AI Assistant",
    category: "HIPAA-compliant Chat Agent",
    tools: "AWS Bedrock, LangChain",
    image: "/images/ai_dashboard_1_1780940886565.png",
    link: "https://github.com/taimoormalo689-jpg/Taimoor-zaman-Portfolio",
  },
  {
    title: "Financial Document Parsing OCR",
    category: "PDF Parsing & Analysis",
    tools: "LlamaParse, FastAPI, SQL",
    image: "/images/ai_dashboard_2_1780940901270.png",
    link: "https://github.com/taimoormalo689-jpg/Taimoor-zaman-Portfolio",
  },
  {
    title: "Generative AI Social Media Automator",
    category: "Social Media & Blogs",
    tools: "n8n, OpenAI, Google Drive",
    image: "/images/ai_dashboard_3_1780940914087.png",
    link: "https://github.com/taimoormalo689-jpg/Taimoor-zaman-Portfolio",
  },
  {
    title: "WhatsApp AI Appointment Booker",
    category: "Appointment Booking System",
    tools: "n8n, Meta API, Python",
    image: "/images/ai_dashboard_4_1780940927131.png",
    link: "https://github.com/taimoormalo689-jpg/Taimoor-zaman-Portfolio",
  },
  {
    title: "Real-Time Speech-to-Speech",
    category: "Multi-Language Translator",
    tools: "Whisper, ElevenLabs, React",
    image: "/images/ai_dashboard_1_1780940886565.png",
    link: "https://github.com/taimoormalo689-jpg/Taimoor-zaman-Portfolio",
  },
  {
    title: "E-commerce AI Recommender",
    category: "Machine Learning & Analytics",
    tools: "TensorFlow, Python, AWS",
    image: "/images/ai_dashboard_2_1780940901270.png",
    link: "https://github.com/taimoormalo689-jpg/Taimoor-zaman-Portfolio",
  },
  {
    title: "Custom LLM Fine-Tuning & Deploy",
    category: "LLMOps & MLOps",
    tools: "HuggingFace, Docker, AWS",
    image: "/images/ai_dashboard_3_1780940914087.png",
    link: "https://github.com/taimoormalo689-jpg/Taimoor-zaman-Portfolio",
  }
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                        link={project.link}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '35px' }}>
            <button
              onClick={goToPrev}
              aria-label="Previous project"
              data-cursor="disable"
              className="carousel-dot-arrow"
            >
              <MdArrowBack />
            </button>
            <div className="carousel-dots" style={{ marginTop: 0 }}>
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                    }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to project ${index + 1}`}
                  data-cursor="disable"
                />
              ))}
            </div>
            <button
              onClick={goToNext}
              aria-label="Next project"
              data-cursor="disable"
              className="carousel-dot-arrow"
            >
              <MdArrowForward />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
