import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import Marquee from "react-fast-marquee";

const topMarqueeItems = [
  { text: "AI AUTOMATION ENGINEER", cls: "kw-cyan" },
  { text: "GENERATIVE AI", cls: "kw-purple" },
  { text: "MULTI-AGENT SYSTEMS", cls: "kw-coral" },
  { text: "n8n WORKFLOWS", cls: "kw-white" },
  { text: "LangChain", cls: "kw-green" },
  { text: "COMPUTER VISION", cls: "kw-cyan" },
  { text: "LangGraph", cls: "kw-purple" },
  { text: "RAG PIPELINES", cls: "kw-coral" },
];

const bottomMarqueeItems = [
  { text: "COMPUTER VISION", cls: "kw-cyan" },
  { text: "AI AUTOMATION ENGINEER", cls: "kw-purple" },
  { text: "GENERATIVE AI", cls: "kw-coral" },
  { text: "MULTI-AGENT SYSTEMS", cls: "kw-white" },
  { text: "FastAPI", cls: "kw-green" },
  { text: "PyTorch", cls: "kw-cyan" },
  { text: "VOICE AGENTS", cls: "kw-purple" },
  { text: "PYTHON", cls: "kw-coral" },
];

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  if (percent >= 100) {
    setTimeout(() => {
      setLoaded(true);
      setTimeout(() => {
        setIsLoaded(true);
      }, 100);
    }, 100);
  }

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setClicked(true);
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 200);
      }
    });
  }, [isLoaded]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          TZ.ai
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">

        {/* Top scrolling marquee */}
        <div className="loading-marquee loading-marquee-top">
          <Marquee speed={60}>
            {topMarqueeItems.map((item, i) => (
              <span key={i} className={item.cls}>
                {item.text} &bull;&nbsp;
              </span>
            ))}
          </Marquee>
        </div>

        {/* Center loading pill */}
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Enter</span>
            </div>
          </div>
        </div>

        {/* Bottom scrolling marquee */}
        <div className="loading-marquee loading-marquee-bottom">
          <Marquee speed={50} direction="right">
            {bottomMarqueeItems.map((item, i) => (
              <span key={i} className={item.cls}>
                {item.text} &bull;&nbsp;
              </span>
            ))}
          </Marquee>
        </div>

      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 90) {
          percent = percent + Math.round(Math.random());
          setLoading(percent);
        } else {
          clearInterval(interval);
        }
      }, 50);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function destroy() {
    clearInterval(interval);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear, destroy };
};
