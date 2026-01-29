'use client';
import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import Icon from '../base/Icon';   // Pastikan path sesuai struktur foldermu
import Button from '../base/Button'; // Pastikan path sesuai struktur foldermu
import UspCard from '../base/cards/UspCard';
import { uspData } from '../../messages/os-usp';

import './styles/section.sass';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import SplitText from '../base/text/SplitText';

export default function OneStream() {
   
    const [prevEl, setPrevEl] = useState(null);
    const [nextEl, setNextEl] = useState(null);
    const [paginationEl, setPaginationEl] = useState(null);

  return (
    <section id="one-stream" className="sectionProduct relative min-h-screen overflow-hidden flex items-center justify-center">
        
      <div className="container mx-auto py-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between relative gap-10 md:gap-4">
            
            <div className="device-image device-image__left osplus-image w-full h-full" data-aos="fade-up" data-aos-delay="200">
                <img className='img-stb' src="/assets/devices/stb.png" alt="One Stream Plus Device" />
                <img className='img-remote' src="/assets/devices/remote.png" alt="One Stream Plus Device" />
            </div>
            <div className="sectionHead max-w-[50%]" data-aos="fade-up">
                    <img src="/assets/logos/logo-onestream-white.svg" className="h-9 w-auto" alt="" />
                    <h2 className="text-headline-h2 text-white mt-4">
                        <SplitText
                            text="ONE SMALL BOX, OPEN A NEW BIG WORLD"
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
                       One Stream Smart Box is designed to meet your everyday entertainment needs. Powered by Android TV, it supports a wide range of apps available on the Play Store — from streaming and gaming to browsing and social media — all accessible easily on your TV with just one simple device.
                    </p>
                    <div className="cta flex mt-8 gap-6">
                        <Button size='lg' variant='secondary-outline'>
                            Get One Stream Now
                        </Button>
                        <Button size='lg' variant='secondary-plain'>
                            About Device
                        </Button>
                    </div>

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


        
        
    </section>
  );
}