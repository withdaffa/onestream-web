'use client';

import './styles/hero.css';
import SplitText from '../base/text/SplitText';
import { useState, useEffect} from 'react';
import Icon from '../base/Icon'; 
import Button from '../base/Button';

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Hero() {
    const [parallax, setParallax] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            // Parallax hanya berjalan sampai 300px scroll
            const scrolled = Math.min(window.scrollY, 300);
            setParallax(scrolled);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        AOS.init();
      }, []);

    return (
        <section id="start" className="osHero min-h-screen flex items-end justify-center">
            <div className="osHero__gradient"></div>
            <div className="osHero__background">
                    <img src="/assets/bg/family-in-livingroom.png" alt="One Stream" />
            </div>
            <div className="container mx-auto px-6 text-center">
                <div data-aos="fade-up" data-aos-delay="50" className="osHero__content min-h-screen flex flex-col items-start h-full justify-between pt-40 md:pt-56">
                    <div className="osHero__headline md:px-80">
                            <p className="text-body-b3 text-white font-medium animate-pulse">
                                #EntertainmentElevated
                            </p>
                            <h1 className="text-headline-h1 font-bold text-white mt-4">
                                <SplitText
                                text="FLEXIBLE OTT SOLUTIONS TO POWER YOUR BUSINESS"
                                delay={100}
                                duration={0.5}
                                ease="power3.out"
                                splitType="words"
                                from={{ opacity: 0, y: 40 }}
                                to={{ opacity: 1, y: 0 }}
                                threshold={0.1}
                                textAlign="center"
                                />
                            </h1>
                            <p className="text-body-b3 text-neutral-100 md:px-16 mx-auto">
                                Driving business transformation and delivering world-class viewing experiences through premium, next-generation OTT solutions.
                            </p>
                            <Button 
                                variant="secondary-plain" 
                                size='lg'
                                className="mt-4 !border-gray-400 !text-white hover:!border-white"
                                iconLeft={<Icon name="play" colorClass="icon--white" />}
                            >
                                Watch Our Video
                            </Button>

                    </div>
                    
                    {/* --- NEW: PRODUCT CARDS SECTION --- */}
                    <div className="osHero__product mt-20 md:px-24">
                        
                        {/* Grid Layout: 1 col Mobile, 2 col Desktop */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Card 1: One Stream+ (Speaker) */}
                        <div className="osHero__card group bg__glass" data-aos="fade-up" data-aos-delay="150">
                            <div className="relative z-10 flex flex-col items-start h-full justify-between">
                            <div>
                                {/* Logo Placeholder */}
                                <div className="flex items-center gap-2 mb-4">
                                    <img src="/assets/logos/logo-onestreamplus-white.png"  className="h-6 md:h-7 w-auto" alt="One Stream Logo" />
                                </div>
                                
                                <h3 className="text-headline-h5 text-white max-w-[70%] font-medium text-left mb-6 uppercase">
                                    Smart Entertainment. Spectacular Experience.
                                </h3>
                            </div>

                            <Button 
                                variant="secondary-outline" 
                                className="!border-gray-400 !text-white hover:!border-white hover:!bg-white hover:!text-black"
                            >
                                Find Out One Stream+
                            </Button>
                            </div>

                            {/* Product Image Positioned Absolute Right */}
                            <div className="osHero__image-container">
                            {/* Ganti src dengan gambar STB Box kamu */}
                            <img src="/assets/devices/device-osplus.png" alt="One Stream Box" />
                            </div>
                        </div>


                        {/* Card 2: One Stream (STB) */}
                        <div className="osHero__card group bg__glass" data-aos="fade-up" data-aos-delay="250">
                            <div className="relative z-10 flex flex-col items-start h-full justify-between">
                            <div>
                                {/* Logo Placeholder */}
                                <div className="flex items-center gap-2 mb-4">
                                    <img src="/assets/logos/logo-onestream-white.svg" className="h-6 md:h-7 w-auto" alt="One Stream Logo" />
                                </div>
                                
                                <h3 className="text-headline-h5 text-white max-w-[70%] font-medium text-left mb-6 uppercase">
                                    One Small Box, Open a New Big World
                                </h3>
                            </div>

                            <Button 
                                variant="secondary-outline" 
                                className="!border-gray-400 !text-white hover:!border-white hover:!bg-white hover:!text-black"
                            >
                                Find Out One Stream
                            </Button>
                            </div>

                            {/* Product Image Positioned Absolute Right */}
                            <div className="osHero__image-container">
                            {/* Ganti src dengan gambar STB Box kamu */}
                            <img src="/assets/devices/device-os.png" alt="One Stream Box" />
                            </div>
                        </div>

                        </div>

                        {/* Bottom Link */}
                        <div className="w-full flex justify-center mt-8">
                            <Button 
                                variant="secondary-plain" 
                                size='lg'
                                className="!border-gray-400 !text-white hover:!border-white"
                                iconRight={<Icon name="chevron-right" colorClass="icon--white" />}
                            >
                                See Hospitality Usage
                            </Button>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}