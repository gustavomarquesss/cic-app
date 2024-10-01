import React, { useEffect, useRef } from 'react'; 
import { Text, View, StyleSheet, Dimensions, Image, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

// Importando as imagens da pasta ./assets
const top1Image = require('../assets/Top1home.png');
const medalImage = require('../assets/medalha1.png');
const anaImage = require('../assets/Ana.png');
const ProgressoImage = require('../assets/Progresso1.png');
const RefineImage = require('../assets/Refine.png');
const LogoHeaderImage = require('../assets/LogoHeader.png');
const SinoImage = require('../assets/Sino.png');
const PercebemosImage = require('../assets/Percebemos.png');
const xpImage = require('../assets/SetaRight.png');
const L1Image = require('../assets/L1.png');
const L2Image = require('../assets/L2.png');
const L3Image = require('../assets/L3.png');
const L4Image = require('../assets/L4.png');
const L5Image = require('../assets/L5.png');

export default function Home() {
  const navigation = useNavigation();
  const { height, width } = Dimensions.get('window'); // Obtenção das dimensões da tela para garantir responsividade

  // Estados de animação
  const fadeAnim = useRef(new Animated.Value(0)).current; // Controle do fade-in para o retângulo cinza
  const positionAnim = useRef(new Animated.Value(500)).current; // Controle da posição vertical inicial (abaixo)

  // Animações individuais para os outros elementos
  const top1ImageFade = useRef(new Animated.Value(0)).current;
  const innerYellowBoxFade = useRef(new Animated.Value(0)).current;
  const medalImageFade = useRef(new Animated.Value(0)).current;
  const anaImageFade = useRef(new Animated.Value(0)).current;
  const ProgressoImageFade = useRef(new Animated.Value(0)).current;

  // Novos elementos
  const whiteBoxFade = useRef(new Animated.Value(0)).current;
  const refineImageFade = useRef(new Animated.Value(0)).current;
  const logoHeaderFade = useRef(new Animated.Value(1)).current; // Inicialmente visível
  const sinoImageFade = useRef(new Animated.Value(1)).current; // Inicialmente visível
  const percebemosImageFade = useRef(new Animated.Value(0)).current;
  const xpImageFade = useRef(new Animated.Value(0)).current;

  // Animações para as imagens L1 a L5
  const L1ImageFade = useRef(new Animated.Value(0)).current;
  const L2ImageFade = useRef(new Animated.Value(0)).current;
  const L3ImageFade = useRef(new Animated.Value(0)).current;
  const L4ImageFade = useRef(new Animated.Value(0)).current;
  const L5ImageFade = useRef(new Animated.Value(0)).current;

  // Defina o ponto em que o fade-out deve completar
  const fadeOutPoint = 150; 

  useEffect(() => {
    // Animação de entrada do retângulo cinza
    Animated.timing(positionAnim, {
      toValue: 0, // Mover para sua posição final
      duration: 900, // Duração do movimento
      useNativeDriver: true,
    }).start();

    // Animação de fade-in do retângulo cinza
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      // Animação paralela para os outros elementos após o fade do retângulo
      Animated.parallel([
        Animated.timing(top1ImageFade, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(innerYellowBoxFade, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(medalImageFade, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(anaImageFade, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(ProgressoImageFade, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        // Novos elementos
        Animated.timing(whiteBoxFade, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(refineImageFade, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(percebemosImageFade, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(xpImageFade, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    // Calcula o fade-out
    const fadeValue = Math.max(1 - scrollY / fadeOutPoint, 0);
    logoHeaderFade.setValue(fadeValue);
    sinoImageFade.setValue(fadeValue);

    // Sincroniza o fade-in das imagens L com o fade-out de LogoHeader e SinoImage
    const fadeInValue = 1 - fadeValue; // Quando fadeValue se aproxima de 0, fadeInValue se aproxima de 1
    L1ImageFade.setValue(Math.min(fadeInValue, 0.3)); // L1 aparece primeiro
    L2ImageFade.setValue(Math.min(fadeInValue - 0.4, 0.3)); // L2 após L1
    L3ImageFade.setValue(Math.min(fadeInValue - 0.5, 0.4)); // L3 após L2
    L4ImageFade.setValue(Math.min(fadeInValue - 0.6, 0.5)); // L4 após L3
    L5ImageFade.setValue(Math.min(fadeInValue - 0.7, 0.6)); // L5 aparece por último

    // Verifica se a opacidade da L5Image atingiu 100%
    if (fadeInValue >= 1) {
      navigation.navigate('Quiz'); // Redireciona para a tela 'Quiz'
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      bounces={true}
      onScroll={handleScroll} // Adiciona o evento de rolagem
      scrollEventThrottle={16} // Atualiza a cada 16ms para suavidade
    >
      {/* Retângulo branco com o botão azul e slider acima do retângulo cinza */}
      <Animated.View style={[styles.overlayContainer, { opacity: whiteBoxFade }]}>
        <View style={styles.whiteBox}>
          <Animated.Image source={RefineImage} style={[styles.RefineImage, { opacity: refineImageFade }]} />
          <Animated.Image source={PercebemosImage} style={[styles.PercebemosImage, { opacity: percebemosImageFade }]} />
          <Animated.Image source={LogoHeaderImage} style={[styles.LogoHeaderImage, { opacity: logoHeaderFade }]} />
          <Animated.Image source={SinoImage} style={[styles.SinoImage, { opacity: sinoImageFade }]} />

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Quiz')}
          >
            <Text style={styles.buttonText}>Responder agora</Text>
            <Animated.Image source={xpImage} style={[styles.xpImage, { opacity: xpImageFade }]} />
          </TouchableOpacity>
        </View>
        <View style={styles.sliderContainer}>
          <Entypo name="dot-single" size={24} color="#95BFFF" />
          <Entypo name="dot-single" size={24} color="lightgray" />
          <Entypo name="dot-single" size={24} color="lightgray" />
          <Entypo name="dot-single" size={24} color="lightgray" />
        </View>
      </Animated.View>

      {/* Retângulo com borda arredondada (cinza) com animação */}
      <Animated.View
        style={[
          styles.roundedBox,
          {
            opacity: fadeAnim,
            transform: [{ translateY: positionAnim }],
          },
        ]}
      >
        <Animated.Image source={top1Image} style={[styles.top1Image, { opacity: top1ImageFade }]} />
        <Animated.View style={[styles.innerYellowBox, { opacity: innerYellowBoxFade }]}>
          <Animated.Image source={medalImage} style={[styles.medalImage, { opacity: medalImageFade }]} />
          <Animated.Image source={anaImage} style={[styles.anaImage, { opacity: anaImageFade }]} />
          <Animated.Image source={ProgressoImage} style={[styles.ProgressoImage, { opacity: ProgressoImageFade }]} />

          {/* Imagens L1 a L5 com fade-in controlado */}
          <Animated.Image source={L1Image} style={[styles.loadingImage, { opacity: L1ImageFade }]} />
          <Animated.Image source={L2Image} style={[styles.loadingImage, { opacity: L2ImageFade }]} />
          <Animated.Image source={L3Image} style={[styles.loadingImage, { opacity: L3ImageFade }]} />
          <Animated.Image source={L4Image} style={[styles.loadingImage, { opacity: L4ImageFade }]} />
          <Animated.Image source={L5Image} style={[styles.loadingImage, { opacity: L5ImageFade }]} />
        </Animated.View>
      </Animated.View>
    </ScrollView>
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
    width: '93%',
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    alignItems: 'flex-start',
    padding: 0,
  },
  button: {
    width: '100%',
    backgroundColor: '#0063f7',
    paddingVertical: 19,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    marginTop: 146,
    borderTopWidth: 3,
    borderTopColor: '#E5B800',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 12,
    marginLeft: 14,
    marginTop: -2,
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
    marginRight: 6,
  },
  roundedBox: {
    width: '100%',
    height: '81%',
    backgroundColor: '#F2F2F5',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: 'absolute',
    bottom: -240,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '5%',
    paddingBottom: 50,
  },
  top1Image: {
    width: '40%',
    aspectRatio: 4 / 1,
    resizeMode: 'contain',
    marginBottom: 10,
    marginRight: 202,
    marginTop: -4,
  },
  innerYellowBox: {
    width: '90%',
    height: '15%',
    backgroundColor: '#E5B800',
    borderRadius: 15,
    marginTop: 2,
    justifyContent: 'center',
  },
  medalImage: {
    width: 78,
    height: 77,
    position: 'absolute',
    right: 18,
    bottom: 20.5,
    resizeMode: 'contain',
  },
  anaImage: {
    width: 217,
    height: 220,
    position: 'absolute',
    right: 126,
    bottom: -61,
    resizeMode: 'contain',
  },
  ProgressoImage: {
    width: 372,
    height: 400,
    position: 'absolute',
    right: 0,
    bottom: -306,
    resizeMode: 'contain',
  },
  loadingImage: {
    width: 70,
    height: 70,
    position: 'absolute',
    right: 152,
    bottom: -285,
    resizeMode: 'contain',
  },
  RefineImage: {
    width: 310,
    height: 400,
    position: 'absolute',
    right: 53,
    marginBottom: 1,
    bottom: -45,
    resizeMode: 'contain',
  },
  PercebemosImage: {
    width: 310,
    height: 400,
    position: 'absolute',
    right: 50,
    marginBottom: -1,
    bottom: -105,
    resizeMode: 'contain',
  },
  xpImage: {
    width: 17,
    height: 400,
    position: 'absolute',
    right: 24,
    marginBottom: -6.3,
    bottom: -168,
    resizeMode: 'contain',
  },
  LogoHeaderImage: {
    width: 115,
    height: 400,
    position: 'absolute',
    right: 263,
    marginBottom: -5,
    bottom: 65,
    resizeMode: 'contain',
  },
  SinoImage: {
    width: 23,
    height: 400,
    position: 'absolute',
    right: 14,
    marginBottom: -7,
    bottom: 68,
    resizeMode: 'contain',
  },
});
