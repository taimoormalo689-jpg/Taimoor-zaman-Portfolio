import { useEffect, useState, useRef } from "react";
import "./styles/Career.css";

const experiences = [
  {
    title: "Senior AI Engineer",
    company_name: "Try Soft AI • Pakistan",
    date: "NOW",
    description: "Architecting and deploying large-scale AI automation systems using Python and LLM-powered AI agents. Designing end-to-end RAG pipelines integrated with vector databases (Pinecone, FAISS) for production deployments. Building multi-agent AI systems using LangGraph and LangChain for autonomous task distribution and adaptive decision-making. Engineering n8n-based automation workflows connecting 10+ third-party platforms. Mentoring junior engineers on AI agent development and scalable system design."
  },
  {
    title: "AI Engineer",
    company_name: "Try Soft AI • Pakistan",
    date: "2022-23",
    description: "Developed, fine-tuned, and deployed deep learning and machine learning models for predictive analytics using TensorFlow and PyTorch. Implemented transformer-based NLP architectures (BERT, GPT variants) and LSTM models for text classification. Designed scalable data pipelines and early n8n-based AI automation frameworks. Integrated REST APIs, cloud services (AWS), and database systems to enable dynamic data processing and real-time inference."
  },
  {
    title: "Junior Machine Learning Engineer",
    company_name: "Try Soft AI • Pakistan",
    date: "2019-21",
    description: "Built and trained foundational ML models for classification, regression, and predictive analytics. Performed data preprocessing, feature engineering, and hyperparameter tuning to optimize model performance. Integrated trained models into Python-based automation workflows using Flask and REST APIs. Collaborated on proof-of-concept AI systems for data-driven decision-making."
  }
];

const Career = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fillHeight, setFillHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress relative to the container
      const startTrigger = windowHeight / 2;
      const progress = (startTrigger - rect.top) / rect.height;
      
      const clamped = Math.max(0, Math.min(1, progress));
      setFillHeight(clamped * 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="career-section section-container" id="experience">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info" ref={containerRef}>
          <div className="career-timeline" style={{ maxHeight: `${fillHeight}%` }}>
            <div className="career-dot"></div>
          </div>
          {experiences.map((exp, index) => (
            <div className="career-info-box" key={index}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{exp.title}</h4>
                  <h5>{exp.company_name}</h5>
                </div>
                <h3>{exp.date}</h3>
              </div>
              <p style={{ color: "#ccc", lineHeight: "1.6" }}>
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
