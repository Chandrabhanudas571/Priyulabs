import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * PriyuLabs Opening Preloader
 * Plays the branded P animation (/assets/priyulabs_intro_transparent.webp)
 * with 100% alpha transparency, zero lag, and no background card.
 * Landing page videos are held paused at 0:00 until the intro finishes, then immediately play.
 */
export function PriyuLabsPreloader() {
  // SessionStorage check: initialize as invisible only if navigating internally within the same session
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        let isReload = false;
        if (window.performance && window.performance.getEntriesByType) {
          const nav = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
          if (nav && nav.type === 'reload') isReload = true;
        }
        if (!isReload && window.performance && (window.performance as any).navigation) {
          if ((window.performance as any).navigation.type === 1) isReload = true;
        }

        const isInternalNav = !isReload && document.referrer && (document.referrer.indexOf(window.location.host) !== -1);

        if (isReload) {
          sessionStorage.removeItem('preloaderPlayed');
          return true;
        }
        if (isInternalNav && sessionStorage.getItem('preloaderPlayed') === 'true') {
          return false;
        }
      } catch (e) {}
    }
    return true;
  });
  const [isFading, setIsFading] = useState(false);

  const startLandingVideos = () => {
    const otherVideos = document.querySelectorAll<HTMLVideoElement>('video:not(#intro-video)');
    otherVideos.forEach((v) => {
      try {
        v.muted = true;
        v.play().catch(() => {});
      } catch (e) {}
    });
  };

  const handleDismiss = () => {
    if (isFading) return;
    setIsFading(true);
    // Immediately start landing page videos when intro completes!
    startLandingVideos();

    // Clear video source to prevent any background reloading or looping
    const introVideo = document.getElementById('intro-video') as HTMLVideoElement | null;
    if (introVideo && introVideo.tagName === 'VIDEO') {
      try {
        introVideo.pause();
        introVideo.removeAttribute('src');
        introVideo.src = '';
        if (typeof introVideo.load === 'function') {
          introVideo.load();
        }
      } catch (e) {}
    }

    setTimeout(() => {
      setIsVisible(false);
    }, 550);
  };

  useEffect(() => {
    // 1. Session check: guarantee animation runs on open and reload, suppress on internal navigation
    let isReload = false;
    try {
      if (window.performance && window.performance.getEntriesByType) {
        const nav = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
        if (nav && nav.type === 'reload') isReload = true;
      }
      if (!isReload && window.performance && (window.performance as any).navigation) {
        if ((window.performance as any).navigation.type === 1) isReload = true;
      }
    } catch (e) {}

    const isInternalNav = !isReload && document.referrer && (document.referrer.indexOf(window.location.host) !== -1);

    let alreadyPlayed = false;
    try {
      if (isReload) {
        sessionStorage.removeItem('preloaderPlayed');
        alreadyPlayed = false;
      } else if (isInternalNav && sessionStorage.getItem('preloaderPlayed') === 'true') {
        alreadyPlayed = true;
      }
    } catch (e) {}

    if (alreadyPlayed) {
      startLandingVideos();
      setIsVisible(false);
      return;
    }

    // Set sessionStorage flag for the session
    try {
      sessionStorage.setItem('preloaderPlayed', 'true');
    } catch (e) {}

    // 2. Accessibility: Respect prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        startLandingVideos();
        setIsVisible(false);
        return;
      }
    }

    // 3. Prevent landing page videos from playing early
    const preventEarlyPlay = (e: Event) => {
      const target = e.target as HTMLVideoElement;
      if (target && target.tagName === 'VIDEO' && target.id !== 'intro-video') {
        try {
          target.pause();
          target.currentTime = 0;
        } catch (err) {}
      }
    };
    document.addEventListener('play', preventEarlyPlay, true);

    const freezeSiteVideos = () => {
      const allVids = document.querySelectorAll<HTMLVideoElement>('video:not(#intro-video)');
      allVids.forEach((v) => {
        if (!v.paused) {
          try {
            v.pause();
            v.currentTime = 0;
          } catch (err) {}
        }
      });
    };
    const freezeTimer = setInterval(freezeSiteVideos, 50);

    // 4. Animation duration timer: 2700ms (plays the transparent P animation, then fades out)
    const fallbackTimer = setTimeout(() => {
      handleDismiss();
    }, 2700);

    return () => {
      document.removeEventListener('play', preventEarlyPlay, true);
      clearInterval(freezeTimer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="priyulabs-preloader"
          id="priyulabs-preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: isFading ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed inset-0 z-[99999] flex h-screen w-screen items-center justify-center overflow-hidden ${
            isFading ? 'preloader-hidden' : ''
          }`}
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.38) 0%, rgba(250, 246, 238, 0.28) 60%, rgba(240, 234, 220, 0.35) 100%)',
            backdropFilter: 'blur(12px) saturate(145%)',
            WebkitBackdropFilter: 'blur(12px) saturate(145%)',
            pointerEvents: isFading ? 'none' : 'auto',
          }}
          aria-hidden={isFading ? 'true' : 'false'}
        >
          {/* Ambient Liquid Glass Backdrop Orbs (Subtle sheen) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
            <div
              className="absolute rounded-full pointer-events-none mix-blend-soft-light"
              style={{
                top: '20%',
                left: '25%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(63, 93, 66, 0.12) 0%, rgba(63, 93, 66, 0) 70%)',
                filter: 'blur(60px)',
              }}
            />
            <div
              className="absolute rounded-full pointer-events-none mix-blend-soft-light"
              style={{
                bottom: '20%',
                right: '22%',
                width: '440px',
                height: '440px',
                background: 'radial-gradient(circle, rgba(184, 134, 59, 0.12) 0%, rgba(184, 134, 59, 0) 70%)',
                filter: 'blur(65px)',
              }}
            />
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '460px',
                height: '320px',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 70%)',
                filter: 'blur(45px)',
              }}
            />
          </div>

          {/* Center Section: 100% Transparent Branded P Animation (Zero grey background box) */}
          <div
            className="intro-logo-center relative z-10 flex items-center justify-center pointer-events-none"
            style={{
              width: 'min(260px, 68vw)',
              height: 'min(260px, 68vw)',
              aspectRatio: '1 / 1',
              background: 'transparent',
              boxShadow: 'none',
              border: 'none',
            }}
          >
            <img
              id="intro-logo-anim"
              src="/assets/priyulabs_intro_transparent.webp"
              alt="PriyuLabs"
              className="intro-logo-anim w-full h-full object-contain pointer-events-none select-none block"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

