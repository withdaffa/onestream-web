'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import Button from '../base/Button';
import Icon from '../base/Icon';
import { hospitalityData } from '../../messages/hospitalityData';

// Styles
import 'swiper/css';
import 'swiper/css/effect-fade';

// Register GSAP
gsap.registerPlugin(ScrollTrigger);

export default function Hospitality() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null); // Ini div yang akan membesar
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- LOGIC PIN & GROW (Persis TVC Section) ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",   // Mulai saat section menyentuh atas layar
          end: "+=100%",      // Jarak scroll untuk menyelesaikan animasi grow
          pin: true,          // Tahan section
          scrub: 1,           // Haluskan gerakan (delay 1s)
        }
      });

      // Animasi Membesar
      tl.to(cardRef.current, {
        width: "100vw",       // Lebar penuh
        height: "100vh",      // Tinggi penuh
        borderRadius: 0,      // Sudut tajam
        ease: "power2.inOut"  // Easing halus
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);


    // Data Benefit
  const benefitsData = [
    { icon: 'shield', text: 'Secure & controlled access' },
    { icon: 'diamond', text: 'Supports premium sound & picture quality' },
    { icon: 'world', text: 'Centralized content management' },
    { icon: 'full-screen', text: 'Customizable home screen for property branding' },
    { icon: 'building', text: 'Multi-room deployment' },
    { icon: 'plug-and-play', text: 'Plug-and-play for large installations' }
  ];


  return (
    // Section pembungkus (height screen agar pas saat dipin)
    <section 
      id="hospitality" 
    >
      
        {/* Section Head */}
        <div className="container mx-auto text-start">
            <h2 className="text-headline-h3 text-white font-bold max-w-4xl leading-tight">
            Our OTT solutions extend beyond homes.
            </h2>
        </div>

      {/* --- CARD CONTAINER YANG MEMBESAR ---
         Initial State: width 90%, height 80%, rounded-32px
      */}
      <div ref={sectionRef} className="h-screen w-full flex items-center justify-center overflow-hidden">
        <div 
            ref={cardRef}
            className="relative w-[90%] md:w-[85%] h-[90vh] bg-neutral-900 rounded-[32px] overflow-hidden shadow-2xl z-10"
            style={{ willChange: 'width, height, borderRadius' }}
        >
            
            {/* --- ISI KONTEN (SWIPER) --- */}
            <Swiper
            modules={[EffectFade, Autoplay]}
            effect={'fade'}
            speed={700}
            allowTouchMove={true}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="w-full h-full"
            >
            {hospitalityData.map((item) => (
                <SwiperSlide key={item.id} className="relative w-full h-full">
                
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                    <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover" 
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
                </div>

                {/* Content Card (Posisi Absolute di atas background) */}
                <div className="absolute inset-0 flex items-center px-6 md:px-20 pb-20">
                    <div className="w-full max-w-md p-8 rounded-3xl border border-white/20 bg-white/5">
                    
                    {/* Tag */}
                    <div className="flex items-center gap-2 mb-4 text-neutral-300">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10">
                        <Icon name="pin-map" className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium">{item.label}</span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-headline-h3 text-white font-bold mb-6 leading-tight">
                        {item.title}
                    </h3>

                    {/* Features */}
                    <ul className="flex flex-col gap-4 mb-8">
                        {item.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <Icon name="check" className="w-4 h-4 text-yellow-500 mt-1" />
                            <span className="text-body-b4 text-white/90">
                            {feat}
                            </span>
                        </li>
                        ))}
                    </ul>

                    <Button variant="primary" size='lg' className="bg-white text-black hover:bg-gray-200 border-none w-full md:w-auto justify-center">
                        Schedule a Demo
                    </Button>
                    </div>
                </div>

                </SwiperSlide>
            ))}
            </Swiper>

            {/* --- CUSTOM TABS NAVIGATION (UPDATED) --- */}
            <div className="absolute bottom-8 md:bottom-12 left-0 right-0 z-30 flex justify-center px-6">
            {/* Perubahan Logic: 
                - Hapus container background (bg-black/50)
                - Ganti border container dengan 'gap-3' antar item
                - Style inactive: bg-white/30 (Transparan Terang)
                - Style active: bg-black/60 (Transparan Gelap)
            */}
            <div className="flex items-center justify-start md:justify-center gap-3 overflow-x-auto no-scrollbar w-full max-w-5xl py-2">
                {hospitalityData.map((item, idx) => (
                <button
                    key={item.id}
                    onClick={() => swiperInstance?.slideTo(idx)}
                    className={`
                    px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap backdrop-blur-md border bg__glassBorder
                    ${activeIndex === idx 
                        ? 'opacity-100' // Active: Dark Glass
                        : 'opacity-50 hover:opacity-90' // Inactive: Light Milky Glass
                    }
                    `}
                >
                    {item.label}
                </button>
                ))}
            </div>
            </div>

        </div>
      </div>


        {/* =========================================
          DIV 2: HOSPITALITY BENEFIT (Static)
         ========================================= */}
      <div className="relative w-full z-10 mt-20">
        <div className="container mx-auto px-6 w-full max-w-7xl">
          
          <h3 className="text-headline-h3 text-white font-bold mb-6 text-left">
              Enterprise-Grade Hospitality Features
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
              {/* Left: Image */}
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden group col-span-3"
                // shadow-2xl  border border-white/10 
              >
                  <img 
                      src="/assets/photos/hospitality-benefit.png"
                      alt="Hospitality Benefits" 
                      className="w-full h-full object-cover"
                    //   transition-transform duration-700 group-hover:scale-105
                  />
                  {/* <div className="absolute inset-0"
                    // bg-gradient-to-t from-black/50 to-transparent
                  /> */}
              </div>

              {/* Right: List */}
              <div className="flex flex-col col-span-2">
                  {benefitsData.map((benefit, idx) => (
                      <div 
                          key={idx} 
                          className="flex items-center gap-6 py-6 border-b border-white/10 last:border-none group transition-colors hover:bg-white/5 hover:border-0 px-4 hover:rounded-xl"
                      >
                          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0 group-hover:border-white/40 transition-colors">
                              <Icon name={benefit.icon} className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-body-b3 text-neutral-200 group-hover:text-white transition-colors">
                              {benefit.text}
                          </span>
                      </div>
                  ))}
              </div>
          </div>

        </div>
      </div>

    </section>
  );
}