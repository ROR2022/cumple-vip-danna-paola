"use client"
import { Sparkles } from "@/components/sparkles"
import { TypewriterText } from "@/components/typewriter-text"
import { useState, useEffect } from "react"
import { quinceMainData } from "../sections/data/main-data"
import BackgroundCarrousel from "../sections/BackgroundCarrousel"

const { videoFondos } = quinceMainData;

const message1Video = videoFondos.message1;

const imagesCarrousel=[
  "/images/dp01.jpg",
  "/images/dp02.jpg",
  "/images/dp03.jpg",
  "/images/dp04.jpg",
  "/images/dp05.jpg",
  "/images/dp06.jpg",
  "/images/dp07.jpg"
]


interface MessageScene1Props {
  onComplete: () => void
  isActive: boolean
}

export function MessageScene1({ onComplete, isActive }: MessageScene1Props) {
  const [textComplete, setTextComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)

  const message = `
  Con el corazón agradecido, le doy gracias a la vida por ti.
En tus 19 años le pido a Dios que te llene de alegría, luz y bendiciones,
y que todo lo hermoso que viene encuentre siempre tu camino. 🌷
  `

  // Handle video loading
  const handleVideoLoaded = () => {
    console.log('MessageScene1 - Video loaded successfully')
    setVideoLoaded(true)
  }

  const handleVideoError = () => {
    console.log('MessageScene1 - Video failed to load, using fallback')
    setVideoError(true)
    setVideoLoaded(true) // Proceed with fallback image
  }

  // Fallback timeout - if video doesn't load in 5 seconds, proceed anyway
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!videoLoaded) {
        console.log('MessageScene1 - Video loading timeout, proceeding with fallback')
        setVideoLoaded(true)
      }
    }, 5000) // 5 second timeout

    return () => clearTimeout(fallbackTimer)
  }, [videoLoaded])

  // Debug logging
  useEffect(() => {
    console.log('MessageScene1 - isActive:', isActive, 'textComplete:', textComplete, 'hasStarted:', hasStarted, 'videoLoaded:', videoLoaded);
  }, [isActive, textComplete, hasStarted, videoLoaded]);

  // Initialize scene when it becomes active for the first time AND video is loaded
  useEffect(() => {
    if (isActive && !hasStarted && videoLoaded) {
      console.log('MessageScene1 - Scene activated and video ready, initializing...');
      setTextComplete(false);
      setHasStarted(true);
    } else if (!isActive) {
      // Reset when scene becomes inactive
      setHasStarted(false);
      setTextComplete(false);
    }
  }, [isActive, hasStarted, videoLoaded]);

  // Handle 2 second delay before advancing to next scene
  useEffect(() => {
    if (textComplete && isActive) {
      console.log('MessageScene1 - Starting 2 second delay...');
      const timer = setTimeout(() => {
        console.log('MessageScene1 - Calling onComplete after delay');
        onComplete();
      }, 2000); // 2 seconds delay

      return () => clearTimeout(timer);
    }
  }, [textComplete, isActive, onComplete]);

  const handleTextComplete = () => {
    console.log('MessageScene1 - Text completed!');
    setTextComplete(true);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <Sparkles count={20} />

      <BackgroundCarrousel images={imagesCarrousel} />
      {/* Minimal overlay only where text appears - removed general dark overlay */}
      {/* <div className="absolute inset-0 bg-black/10 z-10" /> */}

      

      {/* Message Text */}
      { hasStarted && (
        <div className="relative z-20 max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="rounded-2xl p-8 md:p-12 lg:p-16">
            <TypewriterText
              text={message}
              delay={80}
              className="font-main-text text-2xl md:text-3xl lg:text-4xl text-white text-center leading-relaxed drop-shadow-lg"
              onComplete={handleTextComplete}
              isActive={true}
            />
          </div>
        </div>
      )}
    </div>
  )
}
