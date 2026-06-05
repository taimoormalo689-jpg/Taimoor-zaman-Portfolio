import "./styles/Career.css";

const experiences = [
  {
    title: "Senior AI Developer",
    company_name: "Try Soft AI Pakistan",
    date: "Sep 2023 – Present",
    points: [
      "Architected and deployed large-scale AI automation systems using Python and LLM-powered AI agents, achieving up to 70% reduction in manual business operations across enterprise clients.",
      "Designed and optimized end-to-end RAG pipelines integrated with vector databases (Pinecone, FAISS), improving AI response accuracy and contextual reliability for production deployments.",
      "Built and deployed multi-agent AI systems using LangGraph and LangChain, enabling autonomous task distribution, memory retention, and adaptive decision-making across complex workflows.",
      "Engineered n8n-based automation workflows connecting 10+ third-party platforms including Meta API, Google Sheets, Twilio, and email services — reducing cross-platform process overhead by 60%.",
      "Implemented MLOps best practices including CI/CD pipelines, model versioning, performance monitoring, and automated retraining to ensure continuous model reliability in production.",
      "Mentored junior engineers on AI agent development, prompt engineering, and scalable system design, accelerating team delivery capability."
    ]
  },
  {
    title: "AI Engineer",
    company_name: "Try Soft AI Pakistan",
    date: "Jan 2022 – Aug 2023",
    points: [
      "Developed, fine-tuned, and deployed deep learning and machine learning models for predictive analytics and intelligent process automation using TensorFlow and PyTorch.",
      "Implemented transformer-based NLP architectures (BERT, GPT variants) and LSTM models for text classification, entity extraction, and conversational AI applications.",
      "Designed scalable data pipelines and early n8n-based AI automation frameworks, laying the foundation for enterprise-wide workflow automation.",
      "Integrated REST APIs, cloud services (AWS), and database systems to enable dynamic data processing, real-time inference, and improved automation reliability.",
      "Collaborated with product and business teams to translate requirements into production-ready AI-driven solutions, reducing manual reporting effort by 40%."
    ]
  },
  {
    title: "Junior Machine Learning Engineer",
    company_name: "Try Soft AI Pakistan",
    date: "Sep 2019 – Dec 2021",
    points: [
      "Built and trained foundational ML models for classification, regression, and predictive analytics, contributing to early-stage AI automation prototypes.",
      "Performed data preprocessing, feature engineering, and hyperparameter tuning to optimize model performance and reduce inference latency.",
      "Integrated trained models into Python-based automation workflows using Flask and REST APIs, improving execution time by 30%.",
      "Collaborated with senior engineers on proof-of-concept AI systems for data-driven decision-making, supporting successful client demonstrations.",
      "Participated in model evaluation, A/B testing, and technical documentation to ensure production readiness and stakeholder alignment."
    ]
  }
];

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
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
              <ul style={{ paddingLeft: "20px", marginTop: "10px", listStyleType: "disc", color: "#ccc", lineHeight: "1.6" }}>
                {exp.points.map((point, i) => (
                  <li key={i} style={{ marginBottom: "8px" }}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
