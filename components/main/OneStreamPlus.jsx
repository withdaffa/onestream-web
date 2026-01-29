'use client';
import { useState } from 'react';
import { useRef, useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Icon from '../base/Icon';   // Pastikan path sesuai struktur foldermu
import Button from '../base/Button'; // Pastikan path sesuai struktur foldermu
import UspCard from '../base/cards/UspCard';
import { uspData } from '../../messages/uspData';


import './styles/section.sass';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import SplitText from '../base/text/SplitText';

gsap.registerPlugin(ScrollTrigger);



export default function OneStreamPlus() {
   
    const [prevEl, setPrevEl] = useState(null);
    const [nextEl, setNextEl] = useState(null);
    const [paginationEl, setPaginationEl] = useState(null);

    const sectionRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
        
        // ANIMASI EXPAND TO FULL WIDTH
        gsap.fromTo(cardRef.current, 
            {
            width: "85%",        // Mulai: Lebar 85% (seperti container)
            borderRadius: "48px", // Mulai: Sudut bulat
            },
            {
            width: "98%",       // Akhir: Lebar 100% (Full Width)
            borderRadius: "32px",  // Akhir: Sudut tajam (menyatu dengan layar)
            ease: "none",        // Linear (dikontrol scroll)
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",   // Mulai saat section masuk dari bawah
                end: "center center",  // Selesai saat section di tengah
                scrub: 1,              // Smooth scrubbing
            }
            }
        );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

  return (
    <section id="one-stream-plus" className="sectionProduct relative min-h-screen overflow-hidden">
        
      <div className="container mx-auto py-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between relative gap-10 md:gap-4">
            <div className="sectionHead max-w-[48%]" data-aos="fade-up">
                    <img src="/assets/logos/logo-onestreamplus-white.png" className="h-8 w-auto" alt="" />
                    <h2 className="text-headline-h2 text-white mt-4">
                        <SplitText
                            text="Smart Entertainment. Spectacular Experience."
                            delay={100}
                            duration={0.5}
                            ease="power3.out"
                            splitType="words"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            textAlign="left"
                        />
                    </h2>
                    <p className="text-body-b4 text-neutral-400 mt-3">
                        One Stream+ delivers a world-class entertainment experience in one elegant box, supported with Audio by Bang & Olufsen, Dolby Vision–Atmos technology, and thousands of apps from Google Certified Android TV.
                    </p>
                    <div className="cta flex mt-8 gap-6">
                        <Button size='lg' variant='secondary-outline'>
                            Get One Stream+ Now
                        </Button>
                        <Button size='lg' variant='secondary-plain'>
                            About Device
                        </Button>
                    </div>

            </div>
            <div className="device-image device-image__right osplus-image w-full h-full" data-aos="fade-up" data-aos-delay="200">
                <img className='img-full img-updown' src="/assets/devices/device-osplus-full.png" alt="One Stream Plus Device" />
            </div>
        </div>

        {/* --- SWIPER CAROUSEL --- */}
        <div className="swiperUSP relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24} // Jarak antar card (var(--space-24))
            slidesPerView={1.2} // Mobile: Intip sedikit card sebelahnya
            grabCursor={true}
            // Konfigurasi Navigasi Custom
            navigation={{
                prevEl: prevEl,
                nextEl: nextEl,
            }}
            pagination={{
                el: paginationEl, // Use a valid DOM element here
                type: "bullets",
                clickable: true,
                // bulletClass: "bg-amber-400",
                // bulletActiveClass: "bg-green-400",
            }}
            // Responsive Breakpoints
            breakpoints={{
              640: {
                slidesPerView: 2.2, // Tablet portrait
              },
              1024: {
                slidesPerView: 3.2, // Tablet landscape / Laptop
              },
              1280: {
                slidesPerView: 4, // Desktop lebar
              },
            }}
            className="pb-16" // Padding bawah untuk tempat pagination/navigasi
          >
            {uspData.map((item) => (
              <SwiperSlide key={item.id} className="h-auto"> 
                {/* h-auto penting agar semua card tingginya sama rata */}
                <UspCard 
                  iconSrc={item.iconSrc}
                  title={item.title}
                  desc={item.desc}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* --- CUSTOM NAVIGATION BUTTONS (Bottom Right) --- */}
          <div className="relative mt-5 w-full gap-5 z-20 flex items-center justify-end">
            <div className="swiper-pagination-usp w-auto" ref={(node) => setPaginationEl(node)}></div>
            <div className="flex gap-2">
                {/* Prev Button */}
                <button 
                    ref={(node) => setPrevEl(node)}
                    className="w-14 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <Icon name="chevron-left" style={{ width: '24px', height: '24px' }} />
                </button>

                {/* Next Button */}
                <button 
                    ref={(node) => setNextEl(node)}
                    className="w-14 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <Icon name="chevron-right" style={{ width: '24px', height: '24px' }} />
                </button>
            </div>
          </div>

        </div>
        
        
      </div>
        <div className="image-ornament">
            <img src="/assets/bg/soundwave.png" alt="Soundwave" />
        </div>


        <section 
              ref={sectionRef} 
              className="flex mt-10 flex-col items-center justify-center overflow-hidden"
            >
        
              {/* CARD CONTAINER (Target Animasi) 
                  - Kita set mx-auto agar start dari tengah
                  - height diset fix (misal 600px) atau aspect-ratio
              */}
              <div 
                ref={cardRef}
                className="relative h-[500px] md:h-[700px] bg-neutral-900 overflow-hidden shadow-2xl mx-auto"
              >
                
                {/* IMAGE ASSET */}
                <img 
                  src="/assets/bg/family-in-livingroom.png" 
                  alt="Family in living room" 
                  className="w-full h-full object-cover"
                />
        
                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-500" />
        
                {/* CONTENT CENTER */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  
                  {/* Play Button */}
                  <button className="group relative flex items-center justify-center w-20 h-20 md:w-28 md:h-28 bg-white/10 backdrop-blur-md border border-white/30 rounded-full transition-transform duration-300 hover:scale-110 hover:bg-white/20 cursor-pointer">
                    <Icon name="play" className="text-white w-8 h-8 md:w-12 md:h-12 ml-1" />
                  </button>
        
                  {/* <h3 className="mt-8 text-headline-h4 md:text-headline-h2 text-white font-bold drop-shadow-lg text-center px-4">
                    Entertainment for everyone.
                  </h3> */}
                  
                </div>
        
              </div>
            </section>


        
        
    </section>
  );
}