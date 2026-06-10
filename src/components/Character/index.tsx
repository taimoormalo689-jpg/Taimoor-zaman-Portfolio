import Scene from "./Scene";

// Check WebGL support once
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

const CharacterModel = () => {
  if (!isWebGLAvailable()) {
    // Silently skip 3D character on devices without WebGL (GPU disabled PCs)
    return null;
  }
  return <Scene />;
};

export default CharacterModel;
