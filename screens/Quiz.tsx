import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importação do hook de navegação

const continuarImage = require('../assets/Continuar.png');
const QuizdiaImage = require('../assets/QuizDia1.png');
const QuestaoImage = require('../assets/Questao.png');
const ProgressBImage = require('../assets/ProgressBar.png');
const ProgressBRedImage = require('../assets/ProgressBarRed.png'); // Barra de progresso vermelha
const QualImage = require('../assets/Qual.png');
const imgQuestaoImage = require('../assets/imgQuestao.png');

// Imagens das alternativas
const alt1Image = require('../assets/Alternativa1.png');
const alt1ImagePressed = require('../assets/Alternativa1Pressed.png');
const alt2Image = require('../assets/Alternativa2.png');
const alt2ImagePressed = require('../assets/Alternativa2Pressed.png');
const alt3Image = require('../assets/Alternativa3.png');
const alt3ImagePressed = require('../assets/Alternativa3Pressed.png');

export default function Quiz() {
  const navigation = useNavigation(); // Hook de navegação para redirecionar para Flashcard
  const { height, width } = Dimensions.get('window');

  // Estado inicial com a alternativa 1 já selecionada
  const [selectedAlternative, setSelectedAlternative] = useState(1);

  // Define qual barra de progresso será exibida com base na alternativa selecionada
  const progressBarImage =
    selectedAlternative === 1 || selectedAlternative === 2
      ? ProgressBRedImage // Exibe a barra vermelha se a alternativa 1 ou 2 estiver selecionada
      : ProgressBImage; // Caso contrário, mantém a barra normal

  // Função para verificar a resposta quando o botão "Continuar" é pressionado
  const handleContinue = () => {
    if (selectedAlternative === 3) {
      // Se a resposta for correta (Alternativa 3)
      navigation.navigate('Flashcard'); // Redireciona automaticamente para Flashcard
    } else {
      // Se a resposta for incorreta
      Alert.alert('Errou meu chapa!', 'Bora se aprimorar?', [
        { text: 'Revisar', onPress: () => navigation.navigate('Flashcard') } // Redireciona para Flashcard após o alerta
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Posicionando a imagem fora do contentContainer para não influenciar outros componentes */}
      <Image source={QuizdiaImage} style={styles.QuizdiaImage} />

      {/* Container que agrupa a Caixa Branca e o Botão */}
      <View style={styles.contentContainer}>
        {/* Caixa Branca Central */}
        <View style={styles.whiteBox}>
          {/* Aqui você pode adicionar o conteúdo da caixa branca */}
          <Image source={QuestaoImage} style={styles.QuestaoImage} />

          {/* Barra de progresso que muda dinamicamente */}
          <Image source={progressBarImage} style={styles.ProgressBImage} />

          <Image source={QualImage} style={styles.QualImage} />
          <Image source={imgQuestaoImage} style={styles.imgQuestaoImage} />

          {/* Botões das alternativas */}
          <TouchableOpacity onPress={() => setSelectedAlternative(1)} style={styles.alt1Image}>
            <Image source={selectedAlternative === 1 ? alt1ImagePressed : alt1Image} style={styles.altImageStyle} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSelectedAlternative(2)} style={styles.alt2Image}>
            <Image source={selectedAlternative === 2 ? alt2ImagePressed : alt2Image} style={styles.altImageStyle} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSelectedAlternative(3)} style={styles.alt3Image}>
            <Image source={selectedAlternative === 3 ? alt3ImagePressed : alt3Image} style={styles.altImageStyle} />
          </TouchableOpacity>
        </View>

        {/* Botão Continuar com Imagem */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Image source={continuarImage} style={styles.continueButtonImage} />
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
  // Novo container para agrupar a whiteBox e o botão juntos
  contentContainer: {
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    width: '100%', // Largura completa do container
    marginBottom: -40,
  },
  whiteBox: {
    width: '90%',
    height: '71%',
    backgroundColor: '#FFFFFF', // Cor de fundo branco
    borderRadius: 10, // Bordas arredondadas
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  text: {
    fontSize: 18,
    color: '#000', // Cor do texto preto
  },
  continueButton: {
    width: '90.8%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -22, // Ajuste o espaçamento conforme necessário
  },
  continueButtonImage: {
    width: '100%', // Largura da imagem conforme a necessidade
    resizeMode: 'contain', // Redimensiona mantendo a proporção
  },
  QuizdiaImage: {
    width: '38%', // Largura da imagem conforme a necessidade
    resizeMode: 'contain', // Redimensiona mantendo a proporção
    position: 'absolute', // Usa posicionamento absoluto para não afetar os outros elementos
    top: '6.5%', // Posição vertical ajustada para deslocar para baixo
    right: '55%', // Ajuste para movê-la um pouco para a direita
  },
  QuestaoImage: {
    width: '25%', // Largura da imagem conforme a necessidade
    resizeMode: 'contain', // Redimensiona mantendo a proporção
    position: 'absolute', // Usa posicionamento absoluto para não afetar os outros elementos
    top: '2%', // Posição vertical ajustada para deslocar para baixo
    right: '70%', // Ajuste para movê-la um pouco para a direita
  },
  ProgressBImage: {
    width: '89%', // Largura da imagem conforme a necessidade
    resizeMode: 'contain', // Redimensiona mantendo a proporção
    position: 'absolute', // Usa posicionamento absoluto para não afetar os outros elementos
    top: '7%', // Posição vertical ajustada para deslocar para baixo
    right: '6%', // Ajuste para movê-la um pouco para a direita
  },
  QualImage: {
    width: '87%', // Largura da imagem conforme a necessidade
    resizeMode: 'contain', // Redimensiona mantendo a proporção
    position: 'absolute', // Usa posicionamento absoluto para não afetar os outros elementos
    top: '5%', // Posição vertical ajustada para deslocar para baixo
    right: '7.5%', // Ajuste para movê-la um pouco para a direita
  },
  imgQuestaoImage: {
    width: '89.5%', // Largura da imagem conforme a necessidade
    resizeMode: 'contain', // Redimensiona mantendo a proporção
    position: 'absolute', // Usa posicionamento absoluto para não afetar os outros elementos
    top: '14%', // Posição vertical ajustada para deslocar para baixo
    right: '5.5%', // Ajuste para movê-la um pouco para a direita
  },
  alt1Image: {
    position: 'absolute',
    top: '51%',
    right: '5.5%',
    width: '89.5%',
  },
  alt2Image: {
    position: 'absolute',
    top: '64%',
    right: '5.5%',
    width: '89.5%',
  },
  alt3Image: {
    position: 'absolute',
    top: '77%',
    right: '5.5%',
    width: '89.5%',
  },
  altImageStyle: {
    width: '100%',
    resizeMode: 'contain',
  },
});
