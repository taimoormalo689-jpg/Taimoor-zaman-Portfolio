import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import WebGLErrorBoundary from "./WebGLErrorBoundary";

const TechStack = lazy(() => import("./TechStack"));

// Fallback for devices that don't support WebGL — shows skills as nice pills
const TechStackFallback = () => {
  const skills = [
    "Python", "TensorFlow", "PyTorch", "LangChain", "LangGraph",
    "n8n", "FastAPI", "Flask", "AWS", "Docker", "MySQL",
    "PostgreSQL", "Pinecone", "React", "Node.js", "OpenCV",
    "HuggingFace", "OpenAI", "Supabase", "Git",
  ];
  return (
    <div style={{
      width: "100%",
      padding: "60px 20px",
      textAlign: "center",
      background: "transparent",
    }}>
      <h2 style={{
        background: "linear-gradient(to bottom, #ffffff 20%, #5eead4 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: "4px",
        fontSize: "clamp(36px, 8vw, 80px)",
        textTransform: "uppercase",
        fontWeight: 400,
        marginBottom: "40px",
      }}>My Techstack</h2>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        justifyContent: "center",
        maxWidth: "800px",
        margin: "0 auto",
      }}>
        {skills.map((skill, i) => (
          <span key={i} style={{
            padding: "10px 20px",
            borderRadius: "50px",
            background: "rgba(94,234,212,0.1)",
            border: "1px solid rgba(94,234,212,0.3)",
            color: "#5eead4",
            fontSize: "14px",
            fontWeight: 500,
            letterSpacing: "1px",
          }}>{skill}</span>
        ))}
      </div>
    </div>
  );
};

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            {/* Show TechStack on ALL screen sizes with Error Boundary fallback */}
            <WebGLErrorBoundary fallback={<TechStackFallback />}>
              <Suspense fallback={
                <div style={{ textAlign: "center", padding: "60px", color: "#5eead4" }}>
                  Loading 3D...
                </div>
              }>
                <TechStack />
              </Suspense>
            </WebGLErrorBoundary>
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
