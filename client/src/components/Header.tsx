import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import AppointmentModal from './AppointmentModal';

import etnoDentLogo from '../assets/etnoDent.png';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsMenuOpen(false); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false); 
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Clinic Name (ИСПРАВЛЕНО) */}
            <div 
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={scrollToTop}
            >
              {/* img*/}
              <img
                src={etnoDentLogo}
                alt="Логотип EtnoDent"
                className="h-8 w-auto"
              />
              <h1 className="text-2xl font-bold text-gray-800">EtnoDent</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('services')}
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
              >
                Послуги
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
              >
                Про Нас
              </button>
              <button 
                onClick={() => scrollToSection('doctors')}
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
              >
                Наша Команда
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
              >
                Контакти
              </button>
            </nav>

            {/* Book Appointment Button - Desktop */}
            <div className="hidden md:block">
              <Button 
                onClick={openModal}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Записатися
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-left"
                >
                  Полсуги
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-left"
                >
                  Про нас
                </button>
                <button 
                  onClick={() => scrollToSection('doctors')}
                  className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-left"
                >
                  Наша команда
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-left"
                >
                  Контакти
                </button>
                <Button 
                  onClick={openModal}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 w-full"
                >
                  Book Appointment
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Appointment Modal */}
      <AppointmentModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Header;