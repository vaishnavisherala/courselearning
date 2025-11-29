import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
export default function VideoPlayer({ src }:{ src?:string }){
  const ref = useRef<HTMLVideoElement|null>(null);
  useEffect(()=>{
    const video = ref.current;
    if(!video || !src) return;
    if(Hls.isSupported()){
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, ()=>{});
      return ()=> hls.destroy();
    } else {
      video.src = src;
    }
  },[src]);
  return <video ref={ref} controls style={{width:'100%',maxHeight:360}} />;
}
