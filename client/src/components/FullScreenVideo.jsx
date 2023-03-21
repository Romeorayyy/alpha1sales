import React from "react";
import video from "./video.mp4";

const FullScreenVideo = () => {
  return (
    <div style={{ height: "100vh" }}>
      <video 
        style={{ width: "100%", height: "100%" }}
        src={video}
        autoPlay
        loop
        muted
      />
    </div>
  );
};

export default FullScreenVideo;
