import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'; // Adicionado o Image aqui

const ProgressoFlashImage = require('../assets/ProgressoFlash.png');
const FlashcardImage = require('../assets/Flashcard.png');
const ConfImage = require('../assets/Conformidade.png');
const StarImage = require('../assets/Star.png');
const ReverImage = require('../assets/Rever.png');
const DificilImage = require('../assets/Difícil.png');
const okImage = require('../assets/Ok.png');
const facilImage = require('../assets/Fácil.png');

export default function Flashcard() {
  const { height, width } = Dimensions.get('window');
  const [selectedButton, setSelectedButton] = useState(null); // Estado para rastrear o botão selecionado

  // Função que define o botão pressionado
  const handleButtonPress = (color) => {
    setSelectedButton(color); // Atualiza a cor da borda com base no botão selecionado
  };

  return (
    <View style={styles.container}>
      {/* Adicionando a imagem ProgressoFlash */}
      <Image source={FlashcardImage} style={styles.FlashcardImage} />
      <Image source={ProgressoFlashImage} style={styles.ProgressoFlashImage} />
      
      {/* Área branca central com borda dinâmica */}
      <View style={[styles.whiteBox, selectedButton && { borderColor: selectedButton, borderWidth: 2 }]}>
       <Image source={ConfImage} style={styles.ConfImage} />
       <Image source={StarImage} style={styles.StarImage} />
      </View>

      {/* Botões na parte inferior */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.redButton]} 
          onPress={() => handleButtonPress('#D32F2F')} // Define a cor da borda para vermelho
        >
          <Image source={ReverImage} style={styles.ReverImage} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.orangeButton]} 
          onPress={() => handleButtonPress('#F57C00')} // Define a cor da borda para laranja
        >
          <Image source={DificilImage} style={styles.DificilImage} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.greenButton]} 
          onPress={() => handleButtonPress('#388E3C')} // Define a cor da borda para verde
        >
          <Image source={okImage} style={styles.okImage} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.blueButton]} 
          onPress={() => handleButtonPress('#0288D1')} // Define a cor da borda para azul
        >
          <Image source={facilImage} style={styles.FacilImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0350C4', // Cor de fundo azul
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    width: '88%',
    height: '50%', // Ajuste a altura conforme necessário
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 30, // Espaço entre a área branca e os botões
    borderColor: 'transparent', // Define a cor padrão da borda como transparente
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '88%',
    paddingHorizontal: 0, // Adiciona espaço entre os botões
    marginBottom: -35, // Espaço inferior
  },
  button: {
    width: 80, // Largura dos botões
    height: 55, // Altura dos botões
    borderRadius: 7,
    marginRight: 15,
  },
  redButton: {
    backgroundColor: '#D32F2F', // Botão vermelho
  },
  orangeButton: {
    backgroundColor: '#F57C00', // Botão laranja
  },
  greenButton: {
    backgroundColor: '#388E3C', // Botão verde
  },
  blueButton: {
    backgroundColor: '#0288D1', // Botão azul
  },
  ProgressoFlashImage: {
    width: '87%', // Largura da imagem conforme a necessidade
    resizeMode: 'contain', // Redimensiona mantendo a proporção
    position: 'absolute', // Usa posicionamento absoluto para não afetar os outros elementos
    top: '12%', // Posição vertical ajustada para deslocar para baixo
    right: '6%', // Ajuste para movê-la um pouco para a direita
  },
  FlashcardImage: {
    width: '38%', // Largura da imagem conforme a necessidade
    resizeMode: 'contain', // Redimensiona mantendo a proporção
    position: 'absolute', // Usa posicionamento absoluto para não afetar os outros elementos
    top: '7%', // Posição vertical ajustada para deslocar para baixo
    right: '55%', // Ajuste para movê-la um pouco para a direita
  },
  ConfImage: {
    width: '88%', // Largura da imagem conforme a necessidade
    resizeMode: 'contain', // Redimensiona mantendo a proporção
    position: 'absolute', // Usa posicionamento absoluto para não afetar os outros elementos
    top: '-18%', // Posição vertical ajustada para deslocar para baixo
    right: '5.5%', // Ajuste para movê-la um pouco para a direita
  },
  StarImage: {
    width: '5%', // Largura da imagem conforme a necessidade
    resizeMode: 'contain', // Redimensiona mantendo a proporção
    position: 'absolute', // Usa posicionamento absoluto para não afetar os outros elementos
    top: '1%', // Posição vertical ajustada para deslocar para baixo
    right: '5%', // Ajuste para movê-la um pouco para a direita
  },
  ReverImage: {
    width: '55%', // Largura da imagem conforme a necessidade
    resizeMode: 'contain', // Redimensiona mantendo a proporção
    position: 'absolute', // Usa posicionamento absoluto para não afetar os outros elementos
    top: '21%', // Posição vertical ajustada para deslocar para baixo
    right: '22%', // Ajuste para movê-la um pouco para a direita
  },
  DificilImage: {
    width: '53%', // Largura da imagem conforme a necessidade
    resizeMode: 'contain', // Redimensiona mantendo a proporção
    position: 'absolute', // Usa posicionamento absoluto para não afetar os outros elementos
    top: '19%', // Posição vertical ajustada para deslocar para baixo
    right: '22%', // Ajuste para movê-la um pouco para a direita
  },
  okImage: {
    width: '26%', // Largura da imagem conforme a necessidade
    resizeMode: 'contain',
    position: 'absolute',
    top: '19%',
    right: '37%',
  },
  FacilImage: {
    width: '43%',
    resizeMode: 'contain',
    position: 'absolute',
    top: '19%',
    right: '27%',
  },
});
