import { useEffect, useRef, useState } from "react";
import "./styles/WhatIDo.css";

const services = [
  {
    title: "AI & AUTOMATION",
    subtitle: "Intelligent Automation at Scale",
    description:
      "I build multi-agent AI systems, RAG pipelines, and LangChain/LangGraph workflows that automate complex business processes end-to-end.",
    tags: ["LangGraph", "LangChain", "Autonomous Agents", "n8n", "Vector DBs"],
  },
  {
    title: "BUILD & SCALE",
    subtitle: "Shipping AI in Production",
    description:
      "From FastAPI backends and Docker deployments to custom LLM apps and intelligent voice agents — production-ready systems, not prototypes.",
    tags: ["FastAPI", "Python", "Docker", "AWS", "OpenAI"],
  },
];

const WhatIDo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const boxInRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Make what-box-in visible immediately (skip GSAP dependency)
    if (boxInRef.current) {
      boxInRef.current.style.display = "flex";
      boxInRef.current.style.opacity = "1";
    }
  }, []);

  const handleToggle = (index: number) => {
    setActiveIndex(index === activeIndex ? index : index);
  };

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in" ref={boxInRef}>
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          {services.map((service, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={index}
                className={`what-content ${isActive ? "what-content-active" : "what-sibling"}`}
                onClick={() => handleToggle(index)}
                style={{ cursor: "pointer" }}
              >
                <div className="what-border1">
                  <svg height="100%">
                    {index === 0 && (
                      <line
                        x1="0"
                        y1="0"
                        x2="100%"
                        y2="0"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="6,6"
                      />
                    )}
                    <line
                      x1="0"
                      y1="100%"
                      x2="100%"
                      y2="100%"
                      stroke="white"
                      strokeWidth="2"
                      strokeDasharray="6,6"
                    />
                  </svg>
                </div>
                <div className="what-corner"></div>

                <div className="what-content-in">
                  <h3>{service.title}</h3>
                  <h4>{service.subtitle}</h4>
                  <div className={`what-expandable ${isActive ? "what-expanded" : ""}`}>
                    <p>{service.description}</p>
                    <h5>Skillset &amp; tools</h5>
                    <div className="what-content-flex">
                      {service.tags.map((tag, tagIndex) => (
                        <div key={tagIndex} className="what-tags">
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`what-arrow ${isActive ? "what-arrow-up" : ""}`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
