import 'react-native-gesture-handler'; 
import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Navigation from './navigation';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simula o tempo de carregamento
      await SplashScreen.hideAsync();
      setIsAppReady(true); // A navegação e tela de login só serão renderizadas após a splash
    }

    prepareApp();
  }, []);

  if (!isAppReady) {
    return null; // Enquanto a SplashScreen não some, renderiza nada
  }

  return <Navigation />;
}
