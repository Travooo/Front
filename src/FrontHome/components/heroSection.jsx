import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const observerRef = useRef(null);
  
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, options);
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
      observer.observe(el);
    });
    
    observerRef.current = observer;
    
    return () => {
      if (observerRef.current) {
        elements.forEach(el => {
          observerRef.current.unobserve(el);
        });
      }
    };
  }, []);

  return (
    <section className="flex absolute right-0 bottom-0 z-0 flex-col pb-24 h-[966px] w-[1372px] max-md:pb-24 max-md:max-w-full">
      <div className="px-5 pt-32 mb-0 w-full max-md:px-5 max-md:pt-24 max-md:mb-2.5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-[44%] max-md:ml-0 max-md:w-full">
            <div className="mt-2 mr-0 max-md:mt-10 max-md:max-w-full">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-7xl font-bold tracking-tighter leading-[80px] text-stone-900 max-md:max-w-full max-md:text-4xl max-md:leading-10"
              >
                Viajando ou não, aproveite o presente!
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-14 mr-10 text-xl font-medium leading-7 text-gray-500 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full"
              >
                Descubra os melhores lugares e eventos com apenas um clique: o
                mundo espera por você no Travo!
              </motion.p>
              
              <div className="mt-10 animate-on-scroll opacity-0 transition-opacity duration-1000">
                <div className="flex flex-wrap gap-4">
                  <div className="bg-amber-100 rounded-lg p-6 shadow-md flex-1 min-w-[200px]">
                    <div className="bg-amber-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Explore Locais</h3>
                    <p className="text-gray-600">Descubra os melhores lugares para visitar, comer e se divertir.</p>
                  </div>
                  
                  <div className="bg-amber-100 rounded-lg p-6 shadow-md flex-1 min-w-[200px]">
                    <div className="bg-amber-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Economize Tempo</h3>
                    <p className="text-gray-600">Planeje suas visitas com eficiência e aproveite ao máximo seu tempo.</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="bg-amber-100 rounded-lg p-6 shadow-md flex-1 min-w-[200px]">
                    <div className="bg-amber-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Experiências Únicas</h3>
                    <p className="text-gray-600">Viva momentos inesquecíveis nos melhores lugares da cidade.</p>
                  </div>
                  
                  <div className="bg-amber-100 rounded-lg p-6 shadow-md flex-1 min-w-[200px]">
                    <div className="bg-amber-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Conecte-se</h3>
                    <p className="text-gray-600">Compartilhe suas experiências e descubra recomendações de outros viajantes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-5 w-[56%] max-md:ml-0 max-md:w-full">
            <div className="animate-on-scroll opacity-0 transition-opacity duration-1000">
              <div className="relative">
                <img
                  src="/travel-illustration.png" // Atualizado para usar o arquivo .png conforme sua estrutura
                  alt="Travel illustration"
                  className="object-contain w-full aspect-[0.89] max-md:mt-10 max-md:max-w-full"
                />
                <div className="absolute -top-10 right-10 bg-white rounded-full p-4 shadow-lg animate-bounce">
                  <div className="bg-amber-500 rounded-full w-16 h-16 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;