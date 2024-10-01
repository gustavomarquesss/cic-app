import React, { useState, useEffect, useRef, forwardRef, LegacyRef } from "react";
import { TextInput, View, Text, TextInputProps, TouchableOpacity, Animated, Image, Alert, StyleProp, TextStyle, Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Logo from '../assets/logo.png';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import 'react-native-gesture-handler';

// Estilos (consolidados dentro de Login.tsx)
const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff', // Cor de fundo branca aplicada
  },
  groupContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: -135,
  },
  boxTop: {
    height: Dimensions.get('window').height / 3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxMid: {
    height: Dimensions.get('window').height / 4,
    width: '100%',
    paddingHorizontal: 37,
    paddingVertical: 40,
  },
  boxBottom: {
    height: Dimensions.get('window').height / 3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 455,
  },
  input: {
    height: '100%',
    width: '90%',
    borderRadius: 40,
  },
  titleInput: {
    marginLeft: 5,
    color: "#6B7588",
    marginTop: 20,
  },
  textBottom: {
    fontSize: 12,
    color: '#3A3A3C',
    marginLeft: -120,
    marginTop: 24,
  },
  button: {
    width: 345,
    height: 53,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0350C4',
    borderRadius: 10,
    paddingVertical: 15,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 130,
  },
  inputWrapper: {
    width: '100%',
    borderWidth: 0.3,
    borderRadius: 10,
    borderColor: '#708090',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  inputText: {
    height: '100%',
    width: '90%',
    borderRadius: 40,
    paddingHorizontal: 5,
  },
  buttonIcon: {
    width: '10%',
  },
  iconStyle: {
    width: '100%',
    color: "#3A3A3C",
  }
};

// Componente de Input consolidado
const Input = forwardRef((props: TextInputProps & {
  IconLeft?: React.ComponentType<React.ComponentProps<typeof MaterialIcons>>,
  IconRigth?: React.ComponentType<React.ComponentProps<typeof MaterialIcons>>,
  iconLeftName?: string,
  iconRightName?: string,
  title?: string,
  onIconLeftPress?: () => void,
  onIconRigthPress?: () => void,
  height?: number,
  labelStyle?: StyleProp<TextStyle>
}, ref: LegacyRef<TextInput> | null) => {
  const { IconLeft, IconRigth, iconLeftName, iconRightName, title, onIconLeftPress, onIconRigthPress, height, labelStyle, ...rest } = props;

  const calculateSizeWidth = () => {
    if (IconLeft && IconRigth) {
      return '80%';
    } else if (IconLeft || IconRigth) {
      return '90%';
    } else {
      return '100%';
    }
  };

  const calculateSizePaddingLeft = () => {
    if (IconLeft && IconRigth) {
      return 0;
    } else if (IconLeft || IconRigth) {
      return 10;
    } else {
      return 20;
    }
  };

  return (
    <>
      {title && <Text style={[styles.titleInput, labelStyle]}>{title}</Text>}
      <View style={[styles.inputWrapper, { paddingLeft: calculateSizePaddingLeft(), height: height ? height : 40 }]}>
        {IconLeft && iconLeftName && (
          <TouchableOpacity onPress={onIconLeftPress} style={styles.buttonIcon}>
            <IconLeft name={iconLeftName as any} size={20} color="#708090" />
          </TouchableOpacity>
        )}
        <TextInput 
          {...rest}
          style={[styles.inputText, { width: calculateSizeWidth(), height: '100%' }]}
          ref={ref}
        />
        {IconRigth && iconRightName && (
          <TouchableOpacity onPress={onIconRigthPress} style={styles.buttonIcon}>
            <Text><IconRigth name={iconRightName as any} size={20} color="#708090" /></Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
});

export default function Login() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [email, setEmail] = useState('insight@cic.com');
  const [password, setPassword] = useState('Eaibonitao');
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  // Animações
  const logoPosition = useRef(new Animated.Value(0)).current; // Logo começa no centro
  const inputsPosition = useRef(new Animated.Value(300)).current; // Inputs e botões começam fora da tela (300px abaixo)
  const fadeAnim = useRef(new Animated.Value(0)).current; // Começa com opacidade 0

  useEffect(() => {
    // Iniciar as animações simultaneamente
    Animated.parallel([
      Animated.timing(logoPosition, {
        toValue: -170, // O valor que representa o quanto o logo vai subir (ajuste conforme necessário)
        duration: 500, // Duração do movimento
        useNativeDriver: true,
      }),
      Animated.timing(inputsPosition, {
        toValue: 0, // O valor final para os inputs e botão
        duration: 500, // Mesma duração da animação do logo
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1, // O fade-in até opacidade 1
        duration: 300, // Duração do fade-in
        delay: 200, // Delay para iniciar após o movimento do logo
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  async function getLogin() {
    try {
      setLoading(true);
  
      if (!email || !password) {
        return Alert.alert('Atenção', 'Informe os campos obrigatórios!');
      }
  
      // Em vez de redirecionar diretamente para "Home", redirecione para "MainApp"
      navigation.reset({ routes: [{ name: 'MainApp' }] });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      {/* Adicionando TouchableWithoutFeedback para dispensar o teclado ao clicar na tela */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Novo container que agrupa todos os elementos */}
          <View style={styles.groupContainer}>
            {/* Logo animado */}
            <Animated.View style={[styles.boxTop, { transform: [{ translateY: logoPosition }] }]}>
              <Image 
                source={Logo} 
                style={styles.logo}
                resizeMode="contain"
              />
            </Animated.View>

            {/* Inputs e botões com fade-in */}
            <Animated.View style={[styles.boxMid, { opacity: fadeAnim, transform: [{ translateY: inputsPosition }] }]}>
              <Input
                title="E-MAIL"
                value={email}
                onChangeText={setEmail}
                IconRigth={MaterialIcons}
                iconRightName="email"
                onIconRigthPress={() => console.log('Email icon pressed')}
              />
              <Input
                title="SENHA"
                value={password}
                onChangeText={setPassword}
                IconRigth={Octicons}
                iconRightName={showPassword ? "eye-closed" : "eye"}
                onIconRigthPress={() => setShowPassword(!showPassword)}
                secureTextEntry={showPassword}
              />
            </Animated.View>

            <Animated.View style={[{ opacity: fadeAnim, transform: [{ translateY: inputsPosition }] }]}>
              <Text style={styles.textBottom}>
                Esqueceu sua senha?{' '}
                <Text style={{ color: '#0063F7' }} onPress={() => console.log('Button pressed')}>
                  Clique aqui!
                </Text>
              </Text>
            </Animated.View>

            <Animated.View style={[styles.containerLogin, { opacity: fadeAnim, transform: [{ translateY: inputsPosition }] }]}>
              <TouchableOpacity onPress={getLogin} style={styles.button}>
                <Text style={styles.buttonText}>
                  {loading ? 'Carregando...' : 'Entrar'}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  );
}
