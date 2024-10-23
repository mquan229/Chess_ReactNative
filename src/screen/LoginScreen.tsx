import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../navigators/navigation';
import styles from '../styles/LoginStyles';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    // Load saved email and password from AsyncStorage
    const loadSavedCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('email');
        const savedPassword = await AsyncStorage.getItem('password');
        const savedRememberMe = await AsyncStorage.getItem('rememberMe');
        if (savedEmail) setEmail(savedEmail);
        if (savedPassword) setPassword(savedPassword);
        if (savedRememberMe === 'true') setRememberMe(true);
      } catch (error) {
        console.error('Error loading saved credentials:', error);
      }
    };
    loadSavedCredentials();
    // Kiểm tra token khi mở app
    checkToken();
  }, []);

  // Hàm gọi API get-token
  const getToken = async () => {
    try {
      const response = await fetch('http://covua.coi.vn/api/*/auth/get-token', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        const currentTime = new Date().getTime();
        const expireTime = currentTime + 15 * 24 * 60 * 60 * 1000; // Hết hạn sau 15 ngày trên client
        await AsyncStorage.setItem('TOKEN_ACCESS', data.token);
        await AsyncStorage.setItem('TOKEN_EXPIRE', expireTime.toString());
        return data.token;
      } else {
        console.error('Failed to get token');
        return null;
      }
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  };

  // Hàm gọi API refresh-token
  const refreshToken = async (token) => {
    try {
      const response = await fetch('http://covua.coi.vn/api/*/auth/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        const currentTime = new Date().getTime();
        const expireTime = currentTime + 15 * 24 * 60 * 60 * 1000; // Hết hạn sau 15 ngày trên client
        await AsyncStorage.setItem('TOKEN_ACCESS', data.token);
        await AsyncStorage.setItem('TOKEN_EXPIRE', expireTime.toString());
        return data.token;
      } else {
        console.error('Failed to refresh token');
        return null;
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  };

  // Hàm kiểm tra và lấy token
  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN_ACCESS');
      const expireTime = await AsyncStorage.getItem('TOKEN_EXPIRE');

      if (!token || !expireTime) {
        console.log('Chưa có token, gọi API get-token mới');
        return await getToken();
      } else {
        const currentTime = new Date().getTime();
        const expireDate = parseInt(expireTime);

        if (currentTime >= expireDate) {
          console.log('Token đã hết hạn, gọi API get-token mới');
          return await getToken();
        } else {
          const daysSinceIssue = (currentTime - expireDate) / (24 * 60 * 60 * 1000);
          if (daysSinceIssue > 15) {
            console.log('Token đã quá 15 ngày, đang gọi API refresh-token');
            const refreshedToken = await refreshToken(token);
            if (!refreshedToken) {
              console.log('Lỗi refresh-token, gọi API get-token mới');
              return await getToken();
            }
            return refreshedToken;
          }
          console.log('Token vẫn còn hạn, tiếp tục sử dụng');
          // console.log("====================token",token)
          return token;
        }
      }
    } catch (error) {
      console.error('Error checking token:', error);
      return null;
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation error', 'Email and password cannot be empty');
      return;
    }

    try {
      // Lấy token
      const token = await checkToken();
      if (!token) {
        Alert.alert('Failed to get token');
        return;
      }

      // Thực hiện yêu cầu đăng nhập
      const response = await fetch('http://covua.coi.vn/api/v1.0.0/user/login', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': `${token}`,
          'X-Access-OS': 'ANDROID',
          'X-Access-Version': '1.0.0',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        if (rememberMe) {
          await AsyncStorage.setItem('email', email);
          await AsyncStorage.setItem('password', password);
        } else {
          await AsyncStorage.removeItem('email');
          await AsyncStorage.removeItem('password');
        }
        await AsyncStorage.setItem('rememberMe', rememberMe ? 'true' : 'false');
        navigation.navigate('Main', { screen: 'Home' });
      } else {
        Alert.alert('Login failed', 'Please check your credentials.');
      }
    } catch (error: any) {
      console.error('Error logging in:', error);
      Alert.alert('An error occurred', error.message);
    }
  };

  const handleForgotPassword = () => {
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
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image style={styles.icon} source={require('../assets/vector2.png')} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.rememberMeContainer}>
      <BouncyCheckbox 
        text="Remember me"
        isChecked={rememberMe}
        onPress={() => setRememberMe(!rememberMe)}
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
