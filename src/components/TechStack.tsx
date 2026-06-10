import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
} from "@react-three/rapier";



const skills = [
  "Python",
  "TensorFlow",
  "PyTorch",
  "LangChain",
  "LangGraph",
  "n8n",
  "FastAPI",
  "Flask",
  "AWS",
  "Docker",
  "MySQL",
  "PostgreSQL",
  "Pinecone",
  "React",
  "Node.js",
];

const themes = [
  { bg: "#9333ea", text: "#ffffff" }, // Purple
  { bg: "#06b6d4", text: "#ffffff" }, // Cyan
  { bg: "#f8f9fa", text: "#0f172a" }, // White
];

const textures = skills.map((skill, index) => {
  const theme = themes[index % themes.length];
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    // Background
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, 1024, 512);

    // Text
    ctx.font = "bold 110px 'Inter', sans-serif";
    ctx.fillStyle = theme.text;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Draw text twice to wrap around the sphere nicely
    ctx.fillText(skill, 256, 256);
    ctx.fillText(skill, 768, 256);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
});

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

// Each sphere has a fixed home position so they stay still and snap back
const spheres = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)] as number,
  homeX: THREE.MathUtils.randFloatSpread(14),
  homeY: THREE.MathUtils.randFloatSpread(9),
  homeZ: THREE.MathUtils.randFloatSpread(3),
}));

// Shared mutable ref — pointer active flag
const pointerActive = { value: false };

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  homeX: number;
  homeY: number;
  homeZ: number;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  scale,
  homeX,
  homeY,
  homeZ,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!api.current) return;
    delta = Math.min(0.05, delta);
    const t = api.current.translation();
    
    // If not active, homeY is way down so they hide at the bottom
    const targetY = isActive ? homeY : -30;
    
    // Pull back to exact home position every frame
    const strength = 30; // balanced strength for smooth return
    api.current.applyImpulse(
      {
        x: (homeX - t.x) * strength * delta,
        y: (targetY - t.y) * strength * delta,
        z: (homeZ - t.z) * strength * delta,
      },
      true
    );
  });

  return (
    <RigidBody
      linearDamping={4} // lower damping so they can be thrown by the mouse
      angularDamping={2}
      friction={0.1}
      position={[homeX, -30, homeZ]} // start at the bottom
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(0, 0, 10) }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    const targetVec = pointerActive.value
      ? new THREE.Vector3(
          (pointer.x * viewport.width) / 2,
          (pointer.y * viewport.height) / 2,
          0
        )
      : new THREE.Vector3(0, 0, 10);

    // Fast pointer tracking so it hits the balls hard
    const currentTarget = vec.lerp(targetVec, 0.4);
    ref.current?.setNextKinematicTranslation(currentTarget);
  });

  return (
    <RigidBody
      position={[0, 0, 10]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[3.5]} />
    </RigidBody>
  );
}

const terminalLines = [
  { prompt: "> Programming........", text: " Python, SQL, TensorFlow, PyTorch, OpenCV" },
  { prompt: "> Generative AI......", text: " LangChain, LangGraph, RAG, Vector DBs" },
  { prompt: "> Automation.........", text: " n8n, Meta API, Twilio, Vapi, ElevenLabs" },
  { prompt: "> Deployment.........", text: " AWS, FastAPI, Flask, Docker, CI/CD" },
  { prompt: "> Computer Vision....", text: " YOLOv8-v11, CNNs, GANs, OpenCV" },
  { prompt: "> Data & Tools.......", text: " MySQL, PostgreSQL, Supabase, Git, Postman" },
  { prompt: "> Vibe-Code Dev......", text: " React.js, Node.js, FastAPI, HTML, CSS" }
];

const TechStack = () => {
  const isMobile = window.innerWidth < 768;
  const sphereCount = isMobile ? 15 : 30;
  const [isActive, setIsActive] = useState(false);
  const [typedLines, setTypedLines] = useState(0);
  const [currentText, setCurrentText] = useState("");

  // Check if WebGL is available — some PCs have GPU acceleration disabled
  const [webGLAvailable] = useState(() => {
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document
        .getElementById("work")!
        .getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isActive) return;

    if (typedLines < terminalLines.length) {
      const fullText = terminalLines[typedLines].text;
      if (currentText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setTypedLines((prev) => prev + 1);
          setCurrentText("");
        }, 200);
        return () => clearTimeout(timeout);
      }
    }
  }, [isActive, typedLines, currentText]);

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  return (
    <div className="techstack-section" style={{ width: "100%", position: "relative", marginBottom: "60px", marginTop: "50px" }}>
      <h2 style={{ 
        background: "linear-gradient(to bottom, #ffffff 20%, #5eead4 100%)", 
        WebkitBackgroundClip: "text", 
        WebkitTextFillColor: "transparent", 
        letterSpacing: isMobile ? "2px" : "5px", 
        fontSize: isMobile ? "clamp(30px, 10vw, 60px)" : "80px", 
        textAlign: "center", 
        textTransform: "uppercase", 
        fontWeight: 400, 
        position: "absolute", 
        width: "100%", 
        top: "0px", 
        zIndex: 2, 
        pointerEvents: "none" 
      }}>My Techstack</h2>
      <div 
        style={{ height: isMobile ? "50vw" : "60vh", width: "100%", position: "relative", overflow: "visible", marginTop: isMobile ? "50px" : "80px" }}
        onPointerEnter={() => { pointerActive.value = true; }}
        onPointerLeave={() => { pointerActive.value = false; }}
      >
        {webGLAvailable ? (
          <Canvas
            shadows
            gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
            camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
            onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
            className="tech-canvas"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}
          >
            <ambientLight intensity={1} />
            <spotLight
              position={[20, 20, 25]}
              penumbra={1}
              angle={0.2}
              color="white"
              castShadow
              shadow-mapSize={[512, 512]}
            />
            <directionalLight position={[0, 5, -4]} intensity={2} />
            <Physics gravity={[0, 0, 0]}>
              <Pointer isActive={isActive} />
              {spheres.slice(0, sphereCount).map((props, i) => (
                <SphereGeo
                  key={i}
                  {...props}
                  material={materials[Math.floor(Math.random() * materials.length)]}
                  isActive={isActive}
                />
              ))}
            </Physics>
            <Environment
              files="/models/char_enviorment.hdr"
              environmentIntensity={0.5}
              environmentRotation={[0, 4, 2]}
            />
            <EffectComposer enableNormalPass={false}>
              <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
            </EffectComposer>
          </Canvas>
        ) : (
          <div style={{
            position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
            display: "flex", flexWrap: "wrap", gap: "12px",
            alignItems: "center", justifyContent: "center", padding: "20px", boxSizing: "border-box"
          }}>
            {skills.map((skill, i) => {
              const theme = themes[i % themes.length];
              return (
                <span key={i} style={{
                  background: theme.bg, color: theme.text,
                  padding: "10px 20px", borderRadius: "50px",
                  fontWeight: 600, fontSize: "clamp(12px, 2vw, 16px)",
                  letterSpacing: "1px", boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                  transition: "transform 0.2s ease",
                  cursor: "default",
                }}>
                  {skill}
                </span>
              );
            })}
          </div>
        )}
      </div>

      <div className="terminal-container" style={{ position: "relative", margin: "0 auto", marginTop: "40px", zIndex: 10 }}>
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="close"></span>
            <span className="minimize"></span>
            <span className="maximize"></span>
          </div>
          <div className="terminal-title">skills.sh</div>
        </div>
        <div className="terminal-body">
          {terminalLines.map((line, index) => {
            if (index < typedLines) {
              return (
                <p key={index}>
                  <span className="terminal-prompt">{line.prompt}</span>
                  {line.text}
                </p>
              );
            } else if (index === typedLines) {
              return (
                <p key={index}>
                  <span className="terminal-prompt">{line.prompt}</span>
                  {currentText}
                  <span className="cursor" style={{ animation: "blink 1s step-end infinite" }}>_</span>
                </p>
              );
            }
            return null;
          })}
          {typedLines >= terminalLines.length && (
            <p>
              <span className="terminal-prompt">&gt; </span>
              <span className="cursor" style={{ animation: "blink 1s step-end infinite" }}>_</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
