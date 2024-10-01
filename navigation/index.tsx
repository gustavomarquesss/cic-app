import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'; // CardStyleInterpolators para animação personalizada
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Quiz from '../screens/Quiz';
import Flashcard from '../screens/Flashcard';
import Perfil from '../screens/Perfil';

// Importando os ícones PNG para os dois estados (focado e não focado)
const homeIconCinza = require('../assets/homeCinza.png');
const homeIconAzul = require('../assets/homeAzul.png');
const quizIconCinza = require('../assets/quizCinza.png');
const quizIconAzul = require('../assets/quizAzul.png');
const flashcardIconCinza = require('../assets/flashCinza.png');
const flashcardIconAzul = require('../assets/flashAzul.png');
const perfilIconCinza = require('../assets/perfilCinza.png');
const perfilIconAzul = require('../assets/perfilAzul.png');

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainApp() {
  const tabBarPosition = useRef(new Animated.Value(150)).current; // Inicia fora da tela (150px abaixo)

  useEffect(() => {
    // Quando o componente monta (ou seja, a tab bar é exibida após o login), a animação será disparada
    Animated.timing(tabBarPosition, {
      toValue: 0, // Move a tab bar para sua posição visível
      duration: 600, // Duração da animação
      useNativeDriver: true, // Melhora o desempenho da animação
    }).start();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Envolvemos a tabBar separadamente na View de animação */}
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // Remover o header superior
          tabBarShowLabel: false, // Ocultar os rótulos na barra inferior
          tabBarStyle: { ...styles.tabBar, transform: [{ translateY: tabBarPosition }] }, // Estilo customizado da barra com animação
          tabBarIconStyle: styles.tabBarIcon, // Estilo para ícones
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused ? homeIconAzul : homeIconCinza} // Alterna entre os ícones de acordo com o estado focado
                style={{
                  width: 28, // Tamanho fixo
                  height: 28,
                  marginLeft: 10, // Remover para voltar a original
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Quiz"
          component={Quiz}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused ? quizIconAzul : quizIconCinza} // Alterna entre os ícones de acordo com o estado focado
                style={{
                  width: 28, // Tamanho fixo
                  height: 28,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Flashcard"
          component={Flashcard}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused ? flashcardIconAzul : flashcardIconCinza} // Alterna entre os ícones de acordo com o estado focado
                style={{
                  width: 28, // Tamanho fixo
                  height: 28,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={Perfil}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused ? perfilIconAzul : perfilIconCinza} // Alterna entre os ícones de acordo com o estado focado
                style={{
                  width: 28, // Tamanho fixo
                  height: 28,
                  marginRight: 10, // Remover para voltar a original
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }} // Remover o header de todas as telas do Stack
      >
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{
            // Aplica uma transição vertical personalizada de cima para baixo
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
        />
        <Stack.Screen 
          name="MainApp" 
          component={MainApp} 
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos customizados
const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100, // Altura da barra de navegação
    backgroundColor: '#ffffff', // Cor de fundo branca
    borderTopLeftRadius: 0, // Borda arredondada no canto superior esquerdo
    borderTopRightRadius: 0, // Borda arredondada no canto superior direito
    shadowColor: '#000', // Cor da sombra
    shadowOffset: { width: 0, height: -5 }, // Posição da sombra
    shadowOpacity: 0.07, // Opacidade da sombra
    shadowRadius: 5, // Raio da sombra
    elevation: 5, // Elevação para Android
    borderTopWidth: 0, // Remover a borda superior padrão da barra
  },
  tabBarIcon: {
    marginBottom: -10, // Ajuste para centralizar os ícones
  },
});
