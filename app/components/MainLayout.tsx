import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"

import {
  Home,
  Search,
  Library,
  Download,
  Heart,
  Play,
  Shuffle,
  SkipBack,
  Pause,
  SkipForward,
  Volume2,
  ChevronLeft,
  MoreVertical,
  List,
  Repeat,
  ChevronDown,
  MoreHorizontal,
  Cast,
  Share2,
  Rewind,
  FastForward,
} from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"


const BottomNav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 w-full h-16 text-white flex items-center justify-around border-t border-zinc-700 z-20 transition-all duration-300 backdrop-blur-md ${scrolled ? "bg-black" : "bg-black/50"
        }`}
    >
      <div className="flex flex-col items-center text-xs">
        <Home size={20} />
        <span>Home</span>
      </div>
      <div className="flex flex-col items-center text-xs">
        <Search size={20} />
        <span>Search</span>
      </div>
      <div className="flex flex-col items-center text-xs">
        <Library size={20} />
        <span>Your Library</span>
      </div>
      <div className="flex flex-col items-center text-xs">
        <Download size={20} />
        <span>Get App</span>
      </div>
    </div>

  );
};

const images = [
  {
    src: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84ec782462ad3e757fce6a1c11',
    title: 'Galliyan',
    subtitle: 'Ankit Tiwari, Manoj Muntashir'
  },
  {
    src: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8477ef554ce79359be928fae5d',
    title: 'Tum Hi Ho',
    subtitle: 'Arijit Singh'
  },
  {
    src: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da843cdf544ad09980c839a8d00d',
    title: 'Tera Ban Jaunga',
    subtitle: 'Akhil Sachdeva, Tulsi Kumar'
  }
]

const AudioPlayer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const current = images[currentIndex]

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      {/* Bottom Mini Player */}
      <div
        className="fixed bottom-16 left-0 w-full bg-[#7c0a02] text-white p-3 flex justify-between items-center z-30"
        onClick={() => setIsOpen(true)}
      >
        <div>
          <p className="text-sm font-bold">{current.title}</p>
          <p className="text-xs text-white/80">{current.subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          <Heart size={20} className="text-green-400" />
          <Play size={24} className="text-white" />
        </div>
      </div>

      {/* Full Drawer Player */}
      <Drawer open={isOpen} onClose={() => setIsOpen(false)} shouldScaleBackground={false}>
        <DrawerContent className="h-screen w-screen max-w-none rounded-none bg-gradient-to-b from-gray-900 to-black">


          <div className="relative flex flex-col h-screen bg-black text-white overflow-hidden">
            {/* Blurred Background Image */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${images[currentIndex].src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(80px)',
                opacity: 0.7,
                transform: 'scale(1.2)'
              }}
            />

            {/* Dark overlay to ensure text readability */}
            <div className="absolute inset-0 z-0 bg-black bg-opacity-30" />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full overflow-y-auto scrollbar-hide">
              {/* Header */}
              <div className="flex justify-center items-center p-4">
                <div className="text-center">
                  <button className="text-white" onClick={() => setIsOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 90.64 30.831" width="24" height="8">
                      <path d="m4.486 14.456 32.352 13.938c3.156 1.387 5.552 2.437 8.48 2.437 2.932 0 5.357-1.05 8.484-2.437l32.353-13.938c2.612-1.192 4.485-3.514 4.485-6.42C90.64 3.184 87.085 0 83 0c-2.279 0-5.172 1.325-7.569 2.42L42.845 16.358h4.95L15.21 2.42C12.812 1.325 9.948 0 7.636 0 3.55 0 0 3.184 0 8.036c0 2.906 1.873 5.228 4.486 6.42z"></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Album Art with Animation */}
              <div className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-md aspect-square relative">
                  <div className="w-full h-full rounded-md overflow-hidden shadow-2xl">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={current.src}
                        src={current.src}
                        alt="Album Cover"
                        className="w-full h-full object-cover"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      />
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Track Info */}
              <div className="px-4 pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">{current.title}</h3>
                    <p className="text-gray-300 text-sm">{current.subtitle}</p>
                  </div>
                  <button className="p-2">
                    <Heart className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="px-4 py-2">
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <div className="bg-white h-1 rounded-full w-1/12"></div>
                </div>
                <div className="flex justify-between text-xs mt-1 text-gray-300">
                  <span>0:01</span>
                  <span>5:40</span>
                </div>
              </div>

              {/* Controls */}
              <div className="p-4">
                <div className="flex justify-center items-center">
                  <div className="flex space-x-8 md:space-x-20 items-center">
                    <button onClick={handlePrev}>
                      <Rewind className="w-8 h-8" />
                    </button>
                    <button onClick={handlePrev} className="active:scale-105">
                      <svg
                        width="30"
                        height="30"
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M6.3 3a.7.7 0 0 1 .7.7v6.805l11.95-6.899a.7.7 0 0 1 1.05.606v15.576a.7.7 0 0 1-1.05.606L7 13.495V20.3a.7.7 0 0 1-.7.7H4.7a.7.7 0 0 1-.7-.7V3.7a.7.7 0 0 1 .7-.7h1.6z" />
                      </svg>
                    </button>
                    <button className="bg-white text-black rounded-full p-4 active:scale-105">
                      <svg
                        width="24"
                        height="24"
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" />
                      </svg>
                    </button>
                    <button onClick={handleNext} className="active:scale-105">
                      <svg
                        width="30"
                        height="30"
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.7 3a.7.7 0 0 0-.7.7v6.805L5.05 3.606A.7.7 0 0 0 4 4.212v15.576a.7.7 0 0 0 1.05.606L17 13.495V20.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-1.6z" />
                      </svg>
                    </button>
                    <button onClick={handleNext}>
                      <FastForward className="w-8 h-8" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="p-4 flex justify-between">
                <button className="p-2">
                  <div className="w-6 h-6 border-2 border-white flex items-center justify-center">
                    <span className="text-xs">HD</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}



const Section = ({ title, children }) => (
  <div className="mb-6">
    {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}
    <div className="flex gap-4 overflow-x-auto">
      {children}
    </div>
  </div>


);

const Card = ({ title, img }) => (
  <div className="min-w-[150px] shrink-0">
    <img
      src={img}
      alt={title}
      className="w-full h-[150px] object-cover rounded-lg mb-2"
    />
    <p className="text-sm font-medium">{title}</p>
  </div>
);

const SpotifyLikeLayout = ({ children }) => {
  return (
    <div className="bg-black text-white min-h-screen pb-36">
      {/* Header */}
      <header className="px-4 pt-4">
        <h1 className="text-2xl font-bold mb-6">Good evening</h1>
      </header>

      {/* Main Content */}
      <main className="px-4 overflow-y-auto pb-24">
        {/* Example Sections */}
        <Section>
          <Card title="Trending Now India" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
          <Card title="Bollywood Dance Music" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
          <Card title="WWE Royal Rumble 2025 Entry" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
        </Section>

        <Section>
          <Card title="Trending Now India" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
          <Card title="Bollywood Dance Music" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
          <Card title="WWE Royal Rumble 2025 Entry" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
        </Section>  <Section>
          <Card title="Trending Now India" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
          <Card title="Bollywood Dance Music" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
          <Card title="WWE Royal Rumble 2025 Entry" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
        </Section>  <Section>
          <Card title="Trending Now India" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
          <Card title="Bollywood Dance Music" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
          <Card title="WWE Royal Rumble 2025 Entry" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
        </Section>  <Section>
          <Card title="Trending Now India" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
          <Card title="Bollywood Dance Music" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
          <Card title="WWE Royal Rumble 2025 Entry" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
        </Section>  <Section>
          <Card title="Trending Now India" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
          <Card title="Bollywood Dance Music" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
          <Card title="WWE Royal Rumble 2025 Entry" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
        </Section>  <Section>
          <Card title="Trending Now India" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
          <Card title="Bollywood Dance Music" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
          <Card title="WWE Royal Rumble 2025 Entry" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
        </Section>  <Section>
          <Card title="Trending Now India" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
          <Card title="Bollywood Dance Music" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
          <Card title="WWE Royal Rumble 2025 Entry" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
        </Section>  <Section>
          <Card title="Trending Now India" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
          <Card title="Bollywood Dance Music" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
          <Card title="WWE Royal Rumble 2025 Entry" img="https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png" />
        </Section>
        {/* Inject additional page content */}
        {children}
      </main>

      {/* Footer and Nav */}
      <AudioPlayer />
      <BottomNav />
    </div>
  );
};

export default SpotifyLikeLayout;
