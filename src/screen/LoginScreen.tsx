// src/screen/LoginScreen.tsx
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../navigators/navigation';
import styles from '../styles/LoginStyles';
import { auth } from '../utils/firebaseConfig';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful, navigating to Home...');
      navigation.navigate('Main', { screen: 'Home' }); // Chuyển hướng đến Home trong BottomTabsNavigator
    } catch (error: any) {
      console.error('Error logging in:', error);
      if (error.code === 'auth/user-not-found') {
        Alert.alert('User not found');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Wrong password');
      } else {
        Alert.alert('An error occurred', error.message);
      }
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    navigation.navigate('Forgot');
  };

  const handleNavigateToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>
      
      <View style={styles.inputContainer}>
        <Image style={styles.icon} source={require('../assets/profile.png')} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image style={styles.icon} source={require('../assets/vector2.png')} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNavigateToSignup}>
        <Text style={styles.signupLink}>
          Don’t have an account? <Text style={styles.create}>Create</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <LinearGradient style={styles.gradient} colors={['#f97794', '#623aa2']}>
          <Text style={styles.loginButtonText}>Sign in</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Image
        style={styles.loginChild}
        resizeMode="cover"
        source={require('../assets/vector-1.png')}
      />
      <Image
        style={styles.loginItem}
        resizeMode="cover"
        source={require('../assets/vector-2.png')}
      />
    </View>
  );
};

export default LoginScreen;
