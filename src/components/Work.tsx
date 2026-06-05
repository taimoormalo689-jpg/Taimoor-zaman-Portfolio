import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "Multi-Agentic AI System",
    category: "Workflow Orchestration",
    tools: "LangGraph, LangChain, Python",
    image: "/images/multiagent.png",
    link: "https://github.com/taimoor-aidev",
  },
  {
    title: "WhatsApp AI Automation",
    category: "Appointment Booking System",
    tools: "n8n, Meta API, Python",
    image: "/images/whatsapp_ai.png",
    link: "https://github.com/taimoor-aidev",
  },
  {
    title: "AI Voice Calling Agent",
    category: "Inbound & Outbound Voice AI",
    tools: "Vapi, ElevenLabs, Twilio",
    image: "/images/voice_agent.png",
    link: "https://github.com/taimoor-aidev",
  },
  {
    title: "AI Content Automation",
    category: "Social Media & Blogs",
    tools: "n8n, OpenAI, Google Drive",
    image: "/images/content_automation.png",
    link: "https://github.com/taimoor-aidev",
  },
  {
    title: "AI Podcast-to-Viral Clips",
    category: "Video Processing Pipeline",
    tools: "Gemini, n8n, LLM",
    image: "/images/podcast_clips.png",
    link: "https://github.com/taimoor-aidev",
  },
  {
    title: "AI Video Generation Workflow",
    category: "Automated Video Production",
    tools: "n8n, Runway API, Python",
    image: "/images/video_gen.png",
    link: "https://github.com/taimoor-aidev",
  },
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
          <div className="carousel-dots">
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
        </div>
      </div>
    </div>
  );
};

export default Work;
