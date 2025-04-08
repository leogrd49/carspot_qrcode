import React, { useEffect, useState } from 'react';

const AutoRedirector = () => {
  const [isRedirecting, setIsRedirecting] = useState(true);
  
  // URLs exactes de votre application Carspot
  const APP_STORE_URL = 'https://apps.apple.com/us/app/carspot/id6670397628';
  const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.eazymedia.carspot&hl=fr';
  
  useEffect(() => {
    // Détecte l'appareil et redirige immédiatement
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    setTimeout(() => {
      // iOS
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.location.href = APP_STORE_URL;
      } 
      // Android
      else if (/android/i.test(userAgent)) {
        window.location.href = PLAY_STORE_URL;
      } 
      // Autre (desktop) - affiche les deux options
      else {
        setIsRedirecting(false);
      }
    }, 500); // Délai minime pour permettre le chargement de la page
  }, []);
  
  if (isRedirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-4">
          <p className="text-xl mb-2">Redirection vers l'application Carspot...</p>
          <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }
  
  // Seulement si l'utilisateur est sur desktop et la redirection automatique ne fonctionne pas
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6">Téléchargez Carspot</h1>
        <p className="mb-6">Veuillez choisir votre plateforme :</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href={APP_STORE_URL} 
            className="bg-black text-white py-3 px-6 rounded-lg flex items-center justify-center"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <span>App Store (iOS)</span>
          </a>
          <a 
            href={PLAY_STORE_URL} 
            className="bg-blue-500 text-white py-3 px-6 rounded-lg flex items-center justify-center"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <span>Google Play (Android)</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AutoRedirector;