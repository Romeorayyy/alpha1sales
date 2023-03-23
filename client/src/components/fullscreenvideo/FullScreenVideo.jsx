import React from "react";
import "./video.css";
import video from "./video.mp4";

const FullScreenVideo = () => {
  return (
    <div className="fullscreen-video-container">
      <video 
        className="fullscreen-video"
        src={video}
        autoPlay
        loop
        muted
      />
    </div>
  );
};

export default FullScreenVideo;
