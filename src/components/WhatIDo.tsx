import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    title: "AI AGENT DEVELOPMENT",
    subtitle: "Multi-agent systems",
    description: "Multi-agent systems using LangGraph & LangChain, autonomous task distribution & memory retention.",
    tags: ["LangGraph", "LangChain", "Autonomous Agents", "Memory"],
  },
  {
    title: "RAG PIPELINE ENGINEERING",
    subtitle: "Retrieval-Augmented Generation",
    description: "Retrieval-Augmented Generation with vector databases, Pinecone, FAISS, and Supabase integrations.",
    tags: ["Pinecone", "FAISS", "Supabase", "Vector DBs"],
  },
  {
    title: "WORKFLOW AUTOMATION",
    subtitle: "Connecting 10+ platforms",
    description: "n8n-based automation connecting 10+ platforms including Meta API, Google Sheets, Twilio, and Email services.",
    tags: ["n8n", "Meta API", "Google Sheets", "Twilio"],
  },
  {
    title: "LLM APP DEVELOPMENT",
    subtitle: "Custom fine-tuned models",
    description: "OpenAI, HuggingFace, custom fine-tuned models, and FastAPI-powered production deployments.",
    tags: ["OpenAI", "HuggingFace", "FastAPI", "Python"],
  },
];

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
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
        <div className="what-box-in">
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
          {services.map((service, index) => (
            <div
              key={index}
              className="what-content what-noTouch"
              ref={(el) => setRef(el, index)}
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
                <p>{service.description}</p>
                <h5>Skillset & tools</h5>
                <div className="what-content-flex">
                  {service.tags.map((tag, tagIndex) => (
                    <div key={tagIndex} className="what-tags">
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="what-arrow"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
