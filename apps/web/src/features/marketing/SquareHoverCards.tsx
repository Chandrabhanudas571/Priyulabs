import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface SquareCardItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  video: string;
  link: string;
}

const squareCards: SquareCardItem[] = [
  {
    id: 'pos',
    badge: 'Card 01',
    title: 'Smart POS',
    subtitle: 'Fast checkouts, contactless billing & live receipting.',
    image: '/assets/pos_billing_preview.jpg',
    video: '/assets/pos-checkout.mp4',
    link: '/pos',
  },
  {
    id: 'inventory',
    badge: 'Card 02',
    title: 'Complete Management System',
    subtitle: 'Real-time AI inventory tracking & automated accounting.',
    image: '/assets/inventory_ocr_preview.jpg',
    video: '/assets/warehouse-inventory.mp4',
    link: '/solutions',
  },
  {
    id: 'website',
    badge: 'Card 03',
    title: 'Website & Store Building',
    subtitle: 'Launch custom branded e-commerce storefronts in minutes.',
    image: '/assets/website-builder-bg-poster.jpg',
    video: '/assets/website-builder-mockup.mp4',
    link: '/solutions',
  },
  {
    id: 'marketing',
    badge: 'Card 04',
    title: 'Digital Marketing & Ads',
    subtitle: 'Automated campaign funnels across Google and social channels.',
    image: '/assets/gst_payment_preview.jpg',
    video: '/assets/marketing-charts.mp4',
    link: '/solutions',
  },
];

function SquareCard({
  card,
  isHovered,
  hasActiveHover,
  onHover,
  onLeave,
}: {
  card: SquareCardItem;
  isHovered: boolean;
  hasActiveHover: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isTouchActive, setIsTouchActive] = useState(false);

  const active = isHovered || isTouchActive;

  const handleMouseEnter = () => {
    onHover();
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    onLeave();
    setIsTouchActive(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleTouchStart = () => {
    if (!isTouchActive) {
      setIsTouchActive(true);
      onHover();
      if (videoRef.current) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    }
  };

  return (
    <div
      className={`flex flex-col gap-3 transition-all duration-500 ease-out group relative shrink-0 snap-start ${
        active ? 'w-[520px]' : 'w-[320px]'
      }`}
      style={{
        opacity: hasActiveHover && !isHovered ? 0.88 : 1,
        transform: 'translateZ(0)',
      }}
    >
      {/* Interactive Card Container (Height remains strictly fixed at 400px, expands horizontally) */}
      <Link
        to={card.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        className={`relative block h-[400px] w-full overflow-hidden rounded-2xl bg-slate-900 shadow-md transition-shadow duration-500 ease-out dark:border dark:border-white/10 ${
          active ? 'shadow-2xl z-20' : 'hover:shadow-2xl'
        }`}
      >
        {/* Static Thumbnail Photo */}
        <img
          src={card.image}
          alt={card.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Stacked HTML5 Video Layer */}
        <video
          ref={videoRef}
          src={card.video}
          muted
          loop
          playsInline
          preload="metadata"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            active ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Smooth Dark Gradient Overlay */}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 ${
            active ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Descriptive text and action link sliding up from bottom inside expanded card */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 p-5 transition-all duration-500 ease-out ${
            active
              ? 'translate-y-0 opacity-100'
              : 'translate-y-6 opacity-0'
          }`}
        >
          <span className="inline-flex self-start items-center rounded-full bg-white/25 px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-white backdrop-blur-md border border-white/20">
            {card.badge}
          </span>
          <h4 className="text-lg font-black text-white drop-shadow-md">
            {card.title}
          </h4>
          <p className="text-xs font-medium leading-relaxed text-slate-200 line-clamp-2">
            {card.subtitle}
          </p>
          <span className="mt-1 inline-flex items-center gap-1.5 self-start rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-md border border-white/30 transition-transform duration-300 group-hover:translate-x-1">
            <span>Explore Solution</span>
            <ArrowRight size={13} />
          </span>
        </div>
      </Link>

      {/* Card label/title sits below the card box */}
      <div className="pt-1">
        <Link
          to={card.link}
          className="inline-block text-base font-bold text-slate-900 underline decoration-1.5 underline-offset-4 transition-colors hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
        >
          {card.title}
        </Link>
      </div>
    </div>
  );
}

export function SquareHoverCards() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const leaveResetTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleCardHover = (cardId: string) => {
    if (leaveResetTimeout.current) {
      clearTimeout(leaveResetTimeout.current);
      leaveResetTimeout.current = null;
    }
    setHoveredId(cardId);

    const slider = sliderRef.current;
    if (!slider) return;

    if (cardId === 'website') {
      // 3rd slide: auto-swipe right just enough so expanded width is fully in view (210px)
      const target = 210;
      slider.scrollTo({ left: target, behavior: 'smooth' });
    } else if (cardId === 'marketing') {
      // 4th slide: auto-swipe to end
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      slider.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else if (cardId === 'pos') {
      // ONLY 1st slide scrolls back to start
      if (slider.scrollLeft > 0) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }
    // Note: 'inventory' (Slide 2) intentionally does NOT scroll so Slide 1 doesn't steal focus!
  };

  const handleSliderLeave = () => {
    setHoveredId(null);
    if (leaveResetTimeout.current) clearTimeout(leaveResetTimeout.current);
    leaveResetTimeout.current = setTimeout(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 500);
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const firstChild = sliderRef.current.firstElementChild as HTMLElement;
      const scrollStep = firstChild ? firstChild.offsetWidth + 24 : 324;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollStep : scrollStep,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8">
      {/* Section Header */}
      <div className="text-center">
        <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
          Our 4 Core Services
        </span>
        <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white sm:text-5xl">
          4 Power-Packed Solutions in 1 Platform
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">
          Choose from a range of sleek options for however you do business. All equally easy to use.
        </p>
      </div>

      {/* Top action bar with link and carousel arrows */}
      <div className="mt-10 mb-6 flex items-center justify-between">
        <a
          href="#contact"
          className="text-sm font-bold text-slate-900 underline decoration-1.5 underline-offset-4 transition-opacity hover:opacity-70 dark:text-white"
        >
          Shop deals
        </a>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollSlider('left')}
            aria-label="Previous slide"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-800 transition hover:scale-110 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollSlider('right')}
            aria-label="Next slide"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-800 transition hover:scale-110 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* 4 Cards Slider */}
      <div
        ref={sliderRef}
        onMouseLeave={handleSliderLeave}
        className={`flex gap-6 items-start overflow-x-auto scroll-smooth ${
          hoveredId ? '' : 'snap-x snap-mandatory'
        } pt-4 pb-12 px-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-h-[490px]`}
      >
        {squareCards.map((card) => (
          <SquareCard
            key={card.id}
            card={card}
            isHovered={hoveredId === card.id}
            hasActiveHover={hoveredId !== null}
            onHover={() => handleCardHover(card.id)}
            onLeave={() => setHoveredId((curr) => (curr === card.id ? null : curr))}
          />
        ))}
      </div>
    </section>
  );
}
