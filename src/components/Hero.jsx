import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Hero = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('theme') || 'dark';
  });

  const themeStyles = {
    dark: {
      bg: 'linear-gradient(135deg, #040507 0%, #0a0d12 50%, #050608 100%)',
      halo: 'radial-gradient(circle at 32% 24%, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.12) 16%, rgba(255,255,255,0) 42%), radial-gradient(circle at 68% 66%, rgba(255,214,170,0.12) 0%, rgba(255,214,170,0) 55%)',
      vignette: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 35%, rgba(0,0,0,0.6) 100%)',
      heading: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #fef3c7 100%)',
      secondary: 'rgba(255,255,255,0.7)',
      accent: '#ffffff',
    },
    light: {
      bg: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #e0e7ff 100%)',
      halo: 'radial-gradient(circle at 32% 24%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.45) 16%, rgba(255,255,255,0) 42%), radial-gradient(circle at 68% 66%, rgba(255,206,160,0.25) 0%, rgba(255,206,160,0) 55%)',
      vignette: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 35%, rgba(0,0,0,0.15) 100%)',
      heading: 'linear-gradient(135deg, #1f2937 0%, #334155 50%, #b45309 100%)',
      secondary: 'rgba(51,65,85,0.75)',
      accent: '#1f2937',
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = theme;
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleThemeMode = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Sync theme with global html[data-theme] so light mode text doesn't stay white
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.type === 'attributes' && m.attributeName === 'data-theme') {
          const current = document.documentElement.dataset.theme;
          setTheme(current || 'dark');
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    gsap.set("#nama", { overflow: "hidden" });
    // Keep hero text visible by default; animations will still run when gsap timelines play
    gsap.set([".hero-subtitle", ".hero-description", ".scroll-text", ".scroll-arrow", ".github-container"], {
      opacity: 1,
      y: 0
    });

    let mm = gsap.matchMedia();

    const createTypewriterLoop = (chars, speed) => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      
      gsap.set(chars, { 
        opacity: 0, 
        y: 40,
        scale: 0.95,
        transformOrigin: "50% 50%",
      });
      
      // Enter animation - Smooth fade and slide up
      tl.to(chars, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "expo.out",
        stagger: {
          each: speed,
          from: "start"
        }
      })
      .to({}, { duration: 2.5 })
      // Exit animation - Smooth fade and slide out
      .to(chars, {
        opacity: 0,
        y: -20,
        scale: 0.95,
        duration: 0.5,
        ease: "expo.in",
        stagger: {
          each: speed * 0.6,
          from: "end"
        },
      });
      
      return tl;
    };

    mm.add("(min-width: 768px)", () => {
      const mainTl = gsap.timeline();

      mainTl.to(".hero-subtitle", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
      })
      .to(".hero-description", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
      }, "-=1")
      .to(".github-container", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
      }, "-=0.8")
      .add(() => {
        const chars = gsap.utils.toArray("#nama .char");
        const typewriterTl = createTypewriterLoop(chars, 0.09);
      }, "-=0.5")
      .to(".scroll-text", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      }, "-=0.3")
      .to(".scroll-arrow", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
      }, "-=0.5");
    });

    mm.add("(max-width: 767px)", () => {
      const mainTl = gsap.timeline();

      mainTl.to(".hero-subtitle", { opacity: 1, y: 0, duration: 1 })
        .add(() => {
          const chars = gsap.utils.toArray("#nama .char");
          const typewriterTl = createTypewriterLoop(chars, 0.07);
        }, "-=0.4")
        .to(".hero-description", { opacity: 1, y: 0, duration: 1 }, "-=0.6")
        .to(".github-container", { opacity: 1, y: 0, scale: 1, duration: 0.8 }, "-=0.4")
        .to(".scroll-text", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
        .to(".scroll-arrow", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");
    });

    // Enhanced scroll arrow animation
    gsap.to(".scroll-arrow", {
      y: -15,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 3
    });

  }, []);

  const renderNameWithSpans = () => {
    const name = "Rafaditya Syahputra";
    return name.split('').map((char, index) => (
      <span key={index} className="char">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <header
      ref={sectionRef}
      id="home"
      role="banner"
      style={{ 
        color: themeStyles[theme].accent,
        '--hover-gradient': themeStyles[theme].heading
      }}
      className={`font-sans flex flex-col items-center justify-center relative min-h-screen overflow-hidden pt-20 theme-${theme}`}
    >
      {/* Elegant Background - keep halo, drop vignette to avoid section edge darkening */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ background: themeStyles[theme].halo }} />
      </div>

      {/* Main Content Container - Adjusted spacing */}
      <div ref={containerRef} className="relative z-20 w-full max-w-6xl mx-auto px-6 mt-10"> {/* Added mt-10 */}
        {/* Konten */}
        <div className="text-center">
          <h1
            className="text-2xl sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[80px] font-bold leading-tight mb-6 tracking-tight px-4 font-heading"
            id="nama"
            style={{
              color: themeStyles[theme].accent,
              textShadow: theme === 'dark' ? '0 0 30px rgba(255,255,255,0.3)' : '0 0 18px rgba(15,23,42,0.12)'
            }}
          >
            {renderNameWithSpans()}
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl hero-subtitle font-semibold tracking-[0.08em] uppercase mb-4" aria-label="Hi, I'm">
            <span
              className="inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage: themeStyles[theme].heading,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Hi, I'm
            </span>
          </p>
          {/* Role */}
          <div className="relative mt-6">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed font-semibold tracking-[0.12em] uppercase">
              <span
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage: themeStyles[theme].heading,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                Full Stack Developer - Cloud Engineer
              </span>
            </h2>
          </div>
          
          {/* Hobby */}
          <div className="relative mt-2">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed font-medium tracking-[0.08em]">
              <span
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage: themeStyles[theme].heading,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                Photography Enthusiast
              </span>
            </p>
          </div>
          
           <p
             className="text-base sm:text-lg mt-6 max-w-2xl mx-auto italic"
             style={{ color: themeStyles[theme].secondary }}
           >
             “Jika kamu tidak tahan lelahnya belajar, maka kamu harus tahan menanggung perihnya kebodohan.”
          </p>
        </div>

        {/* Enhanced GitHub Button */}
        <div className="github-container flex items-center justify-center relative z-25 mt-8 lg:mt-12">
          <a
            href="https://github.com/raditt10"
            className="group relative"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                isHovered 
                  ? theme === 'light' 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 blur-xl'
                    : 'bg-gradient-to-r from-amber-200 to-yellow-500 blur-xl' 
                  : theme === 'light' ? 'bg-slate-300/50 blur-lg' : 'bg-white/20 blur-lg'
              }`} />
              
              {/* Main button */}
              <div className={`relative w-16 h-16 rounded-full flex items-center justify-center 
                            border backdrop-blur-sm transition-all duration-300 group-hover:scale-110 
                            group-hover:shadow-2xl ${
                              theme === 'light'
                                ? 'bg-gradient-to-br from-white to-gray-100 border-slate-300 group-hover:border-amber-500/50 group-hover:shadow-amber-600/25'
                                : 'bg-gradient-to-br from-gray-900 to-black border-white/20 group-hover:border-amber-300/50 group-hover:shadow-amber-400/25'
                            }`}>
                {/* Inline GitHub SVG - crisp at all sizes; fill controlled via Tailwind classes */}
                <svg
                  role="img"
                  aria-label="GitHub"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-8 h-8 transition-all duration-300 transform-gpu group-hover:scale-110 ${
                    theme === 'light' ? 'fill-slate-800 group-hover:fill-amber-600' : 'fill-white group-hover:fill-amber-300'
                  }`}
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.111.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.084-.73.084-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.931 0-1.31.47-2.381 1.235-3.221-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.804 5.624-5.475 5.921.43.372.823 1.103.823 2.222 0 1.606-.014 2.896-.014 3.286 0 .319.216.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z" />
                </svg>
                {/* Ring animation */}
                <div className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
                  isHovered 
                    ? theme === 'light' ? 'border-amber-500/50 animate-ping-slow' : 'border-amber-300/50 animate-ping-slow'
                    : 'border-transparent'
                }`} />
              </div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className={`backdrop-blur-sm text-sm px-3 py-2 rounded-lg border whitespace-nowrap ${
                theme === 'light' ? 'bg-white/90 text-slate-800 border-slate-200' : 'bg-black/80 text-white border-white/10'
              }`}>
                Visit my GitHub
                <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 border-l border-t ${
                  theme === 'light' ? 'bg-white/90 border-slate-200' : 'bg-black/80 border-white/10'
                }`} />
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Enhanced Scroll Indicator - Moved down */}
      <div className="mt-8 lg:mt-12 flex flex-col items-center gap-4 lg:gap-6 relative z-20">
        <h1
          className="scroll-text text-lg sm:text-xl lg:text-2xl font-light tracking-wide"
          style={{ color: themeStyles[theme].accent }}
        >
          Explore My Work
        </h1>
        <div className="scroll-arrow group cursor-pointer">
          <div className={`w-7 h-12 border-2 rounded-full flex justify-center pt-2 transition-all duration-300 group-hover:shadow-lg ${
            theme === 'light'
              ? 'border-slate-300/80 bg-white/50 group-hover:border-amber-400/70 group-hover:shadow-amber-500/20'
              : 'border-white/30 bg-white/5 group-hover:border-amber-300/60 group-hover:shadow-amber-400/20'
          }`}>
            <div className={`w-1.5 h-3 rounded-full animate-bounce ${
              theme === 'light'
                ? 'bg-gradient-to-b from-amber-400 to-orange-500'
                : 'bg-gradient-to-b from-white to-amber-200'
            }`} />
          </div>
          <div className={`absolute -inset-4 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            theme === 'light' ? 'bg-amber-400/15' : 'bg-amber-300/10'
          }`} />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg); 
            opacity: 0; 
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-100vh) translateX(100px) rotate(180deg); 
            opacity: 0; 
          }
        }

        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.3; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-float {
          animation: float 15s infinite linear;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 2s ease-in-out infinite;
        }

        .typing-cursor {
          animation: blink 0.8s infinite;
        }

        @keyframes pulse-fast {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes text-glitch-1 {
          0% {
            transform: translate(0);
            opacity: 0;
          }
          2% {
            transform: translate(-2px, 1px);
            opacity: 0.8;
          }
          4% {
            transform: translate(0);
            opacity: 0;
          }
          100% {
            transform: translate(0);
            opacity: 0;
          }
        }

        @keyframes text-glitch-2 {
          0% {
            transform: translate(0);
            opacity: 0;
          }
          2% {
            transform: translate(2px, -1px);
            opacity: 0.8;
          }
          4% {
            transform: translate(0);
            opacity: 0;
          }
          100% {
            transform: translate(0);
            opacity: 0;
          }
        }

        .char {
          display: inline-block;
          position: relative;
        }

        .char::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: var(--hover-gradient, linear-gradient(45deg, #00fff9, #ff00de));
          border-radius: 2px;
          opacity: 0;
          transition: opacity 0.3s;
          z-index: -1;
        }

        .char:hover::before {
          opacity: 0.3;
        }
      `}</style>
    </header>
  );
};

export default Hero;