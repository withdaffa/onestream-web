'use client';

import { useState, useEffect, useRef } from 'react';
import Icon from '../base/Icon';   // Pastikan path sesuai struktur foldermu
import Button from '../base/Button'; // Pastikan path sesuai struktur foldermu
// import '../styles/components/navbar.sass'; // JANGAN LUPA UNCOMMENT INI

export default function Navbar() {
  // State: Navigation & Scroll
  const [activeSection, setActiveSection] = useState('start');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // State: Mobile Menu & Language
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  // State: Sliding Indicator
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const tabsRef = useRef({});

  const menuItems = [
    { id: 'start', label: 'Start' },
    { id: 'one-stream-plus', label: 'One Stream+' },
    { id: 'one-stream', label: 'One Stream' },
    { id: 'hospitality', label: 'Hospitality' },
    { id: 'faq', label: 'FAQ' },
  ];

  // 1. Handle Scroll (Spy & Background)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollPos = window.scrollY + 120; // Offset
      for (const item of menuItems) {
        const el = document.getElementById(item.id);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(item.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Handle Sliding Indicator Position
  useEffect(() => {
    const activeTab = tabsRef.current[activeSection];
    if (activeTab) {
      setIndicatorStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
        opacity: 1
      });
    }
  }, [activeSection]);

  // 3. Handle Click Outside Language Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.language-dropdown')) {
        setIsLanguageDropdownOpen(false);
      }
    };
    if (isLanguageDropdownOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLanguageDropdownOpen]);

  // Helper: Navigation Click
  const handleNavClick = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <>
      {/* --- NAVBAR MAIN --- */}
      <nav className={`fixed top-0 left-0 right-0 z-[var(--z-sticky)] transition-all duration-300 ${isScrolled ? 'bg__glass py-3' : 'py-5'}`}>
        <div className="container-fluid mx-auto px-6 flex items-center justify-between">
          
          {/* LEFT: Logo */}
          <div data-aos="fade-down" className="flex-1 flex items-center">
            {/* Ganti src dengan path logo projectmu */}
            <img src="/assets/logos/logo-onestream-white.svg" alt="One Stream" className="h-8 md:h-9 w-auto" />
          </div>

          {/* CENTER: Menu Capsule (Desktop Only) */}
          <div data-aos="fade-down" data-aos-delay="200" className="desktop-only relative items-center p-1 rounded-full bg__glassBorder">
            
            {/* Sliding Indicator (Background Bergerak) */}
            <div 
              className="nav-indicator"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
            />

            {/* Menu Items */}
            {menuItems.map((item) => (
              <button
                key={item.id}
                ref={(el) => (tabsRef.current[item.id] = el)}
                onClick={() => handleNavClick(item.id)}
                className={`
                  menu-item px-5 py-2 rounded-full border-none cursor-pointer text-white font-medium text-body-b4
                  ${activeSection === item.id ? 'is-active font-bold' : ''}
                `}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* RIGHT: Actions (Desktop Only) */}
          <div data-aos="fade-down" className="desktop-only flex-1 justify-end items-center gap-6">
            
            {/* Language Dropdown */}
            <div className="relative language-dropdown">
              <Button
                size="lg"
                variant="secondary-plain"
                className='pl-0 pr-0 !text-white hover:!text-gray-200'
                iconLeft={<Icon name="world" colorClass="icon--white" />}
                iconRight={<Icon name="chevron-down" colorClass="icon--white" />} 
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                type="button"
              >
                {selectedLanguage}
              </Button>

              {isLanguageDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg z-20 min-w-[140px] overflow-hidden py-1">
                  {['EN', 'ID'].map((lang) => (
                    <button
                      key={lang}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 border-none bg-transparent cursor-pointer ${selectedLanguage === lang ? 'font-bold text-yellow-600' : 'text-gray-700'}`}
                      onClick={() => { setSelectedLanguage(lang); setIsLanguageDropdownOpen(false); }}
                    >
                      {lang === 'EN' ? 'English' : 'Bahasa'}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* CTA Button */}
            <Button variant="primary" size="lg">
              Get Started
            </Button>
          </div>

          {/* MOBILE TOGGLE (Mobile Only) */}
          <div data-aos="fade-down" className="mobile-only">
             <Button size='lg' variant='secondary-plain' onClick={() => setIsMobileMenuOpen(true)} className="bg-transparent border-none p-2 cursor-pointer">
                <Icon name="menu-hamburger" colorClass="icon--white" />
             </Button>
          </div>

        </div>
      </nav>


      {/* --- BOTTOM SHEET (Mobile Menu) --- */}
      {/* LOGIC ANIMASI OUT:
          1. Parent Container: 
             - Saat OPEN: 'visible' (muncul instan).
             - Saat CLOSE: 'invisible delay-300'. 
               (Artinya: Tunggu 300ms dulu baru benar-benar hilang/invisible. 
               Waktu 300ms ini digunakan agar animasi slide-down anak-anaknya selesai dulu).
      */}
      <div 
        className={`
          fixed inset-0 z-[var(--z-modal)] 
          ${isMobileMenuOpen ? 'visible' : 'invisible delay-300'}
        `}
      >
        
        {/* Backdrop / Overlay */}
        <div 
          className={`
            absolute inset-0 bg-black/60 backdrop-blur-sm 
            transition-opacity duration-300 ease-out
            ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}
          `}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Sheet Content */}
        <div 
          className={`
            bottom-sheet-content absolute bottom-0 left-0 right-0 bg-white p-6 pb-12 flex flex-col gap-4 
            transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}
          `}
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-2">
            <span className="text-headline-h6 font-bold text-neutral-900">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="border-none bg-transparent p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors">
              <Icon name="close" colorClass="icon--neutral-900" />
            </button>
          </div>

          {/* List Menu */}
          <div className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  text-left p-3 rounded-lg text-body-b3 font-medium border-none bg-transparent text-neutral-900 cursor-pointer transition-colors
                  ${activeSection === item.id ? 'bg-yellow-50 text-yellow-600 font-bold' : 'hover:bg-gray-50'}
                `}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Action Buttons */}
          <div className="mt-4 flex flex-col gap-3">
            <Button variant="primary" size="lg" className="w-full justify-center">
              Get Started
            </Button>
            
            {/* Language Toggle Mobile */}
            <div className="flex justify-center gap-4 pt-4 border-t border-gray-100">
               <button 
                onClick={() => setSelectedLanguage('EN')}
                className={`bg-transparent border-none text-sm ${selectedLanguage === 'EN' ? 'font-bold text-neutral-900' : 'text-neutral-500'}`}
               >English</button>
               <span className="text-neutral-300">|</span>
               <button 
                onClick={() => setSelectedLanguage('ID')}
                className={`bg-transparent border-none text-sm ${selectedLanguage === 'ID' ? 'font-bold text-neutral-900' : 'text-neutral-500'}`}
               >Bahasa</button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}