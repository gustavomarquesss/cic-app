import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Dimensions, Animated, Image, ScrollView } from 'react-native';

const StatsPerfilImage = require('../assets/StatsPerfil.png');
const PerfilImage = require('../assets/Perfil.png');
const imgPerfilImage = require('../assets/User.png');
const RankingImage = require('../assets/Ranking.png');


export default function Perfil() {
  const { height, width } = Dimensions.get('window'); // Obtenção das dimensões da tela para garantir responsividade

  // Estados de animação
  const fadeAnim = useRef(new Animated.Value(0)).current; // Controle do fade-in para o retângulo cinza
  const positionAnim = useRef(new Animated.Value(500)).current; // Controle da posição vertical inicial (abaixo)

  // Animação da caixa branca
  const whiteBoxFade = useRef(new Animated.Value(0)).current;

  // Defina o ponto em que o fade-out deve completar
  const fadeOutPoint = 150;

  useEffect(() => {
    // Animação de entrada da caixa cinza
    Animated.timing(positionAnim, {
      toValue: 0, // Mover para sua posição final
      duration: 900, // Duração do movimento
      useNativeDriver: true,
    }).start();

    // Animação de fade-in da caixa cinza
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      // Animação paralela para o fade-in da caixa branca
      Animated.timing(whiteBoxFade, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    // Calcula o fade-out
    const fadeValue = Math.max(1 - scrollY / fadeOutPoint, 0);
    whiteBoxFade.setValue(fadeValue);
  };

  return (
    <View style={styles.container}> 
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} bounces={true} onScroll={handleScroll}>

          <Image source={PerfilImage} style={styles.PerfilImage} />

      <View style={styles.imageContainer}>
          <Image source={imgPerfilImage} style={styles.imgPerfilImage} />
        </View>

        {/* Caixa branca no topo com animação */}
        <Animated.View style={[styles.overlayContainer, { opacity: whiteBoxFade }]}>
          <View style={styles.whiteBox}>
          <Image source={StatsPerfilImage} style={styles.StatsPerfilImage} />
          </View>
        </Animated.View>

        {/* Caixa cinza com animação */}
        <Animated.View style={[ styles.roundedBox, { opacity: fadeAnim, transform: [{ translateY: positionAnim }], },]}>
          <View style={styles.innerContent}>
          <View style={styles.rankingContainer}>
          <Image source={RankingImage} style={styles.RankingImage} />
          </View>
            <Text style={styles.boxText}>Conteúdo do perfil</Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0350C4',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  overlayContainer: {
    position: 'absolute',
    top: 150,
    width: '100%',
    alignItems: 'center',
    zIndex: 2,
  },
  whiteBox: {
    width: '89%',
    height: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 155,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 9.65,
    elevation: 8, // Para Android
  },
  boxText: {
    color: '#000',
    fontSize: 18,
  },
  roundedBox: {
    width: '100%',
    height: '83%',
    backgroundColor: '#F2F2F5',
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
    position: 'absolute',
    bottom: -240,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '5%',
    paddingBottom: 50,
  },
  innerContent: {
    width: '90%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  StatsPerfilImage: {
    width: '105%', // Largura da imagem conforme a necessidade
    resizeMode: 'contain', // Redimensiona mantendo a proporção
    position: 'absolute', // Usa posicionamento absoluto para não afetar os outros elementos
  },
PerfilImage: {
  width: '30%', // Largura da imagem conforme a necessidade
  resizeMode: 'contain', // Redimensiona mantendo a proporção
  position: 'absolute', // Usa posicionamento absoluto para não afetar os outros elementos
  top: '7%', // Posição vertical ajustada para deslocar para baixo
  right: '60%', // Ajuste para movê-la um pouco para a direita
},
imgPerfilImage: {
    width: '38%', // Largura da imagem conforme a necessidade
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain', // Redimensiona mantendo a proporção
    position: 'absolute', // Usa posicionamento absoluto para não afetar os outros elementos
},
imageContainer: {
    marginTop:70,
    alignItems: 'center', // Centraliza as imagens dentro deste contêiner
    marginVertical: 20, // Adiciona margem vertical, se necessário
},

RankingImage:{ 
  marginTop: -200,
  width: '100%',
  resizeMode: 'contain',
},
rankingContainer: {
  width: '100%', // Mantém a largura do contêiner
  alignItems: 'center', // Centraliza a imagem horizontalmente
  justifyContent: 'center', // Centraliza a imagem verticalmente
  position: 'relative', // Para permitir o uso do absolute em RankingImage
  height: 'auto', // Permite que a altura se ajuste ao conteúdo
  paddingVertical: 20,
},
});