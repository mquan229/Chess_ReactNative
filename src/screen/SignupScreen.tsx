import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/SignupStyles';



const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [fullname, setFullname] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigation = useNavigation();


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
  
  const handleSignup = async () => {
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert('Failed to get token');
        return;
      }
  
      // Validate password and confirm password
      if (password !== passwordConfirm) {
        Alert.alert('Passwords do not match', 'Please make sure both passwords are the same.');
        return;
      }
  
      const response = await fetch('http://covua.coi.vn/api/v1.0.0/user/register', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': `${token}`,
          'X-Access-OS': 'ANDROID',
          'X-Access-Version': '1.0.0'
        },
        body: JSON.stringify({
          fullname: fullname,
          username: username,
          email: email,
          password: password,  // Make sure the server hashes this properly
          password_confirm: password, // Confirm password
        }),
      });
  
      const data = await response.json();
      console.log('Response data:', data);
  
      // Check if response status is successful
      if (response.ok) {
        console.log('Signup successful:', data);
        Alert.alert('Signup successful', 'Your account has been created.');
        navigation.navigate('Login'); // Navigate to login after success
      } else {
        Alert.alert('Signup failed', data.message || 'Please check your input.');
      }
    } catch (error: any) {
      console.error('Error signing up:', error);
      Alert.alert('An error occurred', error.message);
    }
  };

  const handleBacktoLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.signup}>
      <TouchableOpacity onPress={handleBacktoLogin} style={styles.backIcon}>
        <Icon name="arrow-back-circle-outline" size={40} color="black" />
      </TouchableOpacity>
      <Text style={styles.createAccount}>Create account</Text>
      
      <View style={styles.inputContainer}>
        <Image
          style={styles.profileIcon}
          resizeMode="cover"
          source={require('../assets/profile.png')}
        />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullname}
          onChangeText={text => setFullname(text)}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Image
          style={styles.profileIcon}
          resizeMode="cover"
          source={require('../assets/profile.png')}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Image
          style={styles.vectorIcon}
          resizeMode="cover"
          source={require('../assets/vector2.png')}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Image
          style={styles.vectorIcon}
          resizeMode="cover"
          source={require('../assets/vector2.png')}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={passwordConfirm}
          onChangeText={text => setPasswordConfirm(text)} // Xử lý input cho password confirm
          secureTextEntry
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Image
          style={styles.emailIcon}
          resizeMode="cover"
          source={require('../assets/email.png')}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      
      <Text style={styles.orCreateAccount}>
        Or create account using social media
      </Text>
      
      <TouchableOpacity style={styles.createButton} onPress={handleSignup}>
        <LinearGradient
          style={[styles.gradient]}
          locations={[0, 1]}
          colors={['#f97794', '#623aa2']}
        >
          <Text style={styles.create}>Create</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Image
        style={styles.signupChild}
        resizeMode="cover"
        source={require('../assets/vector-1.png')}
      />
      <Image
        style={styles.signupItem}
        resizeMode="cover"
        source={require('../assets/ellipse-1.png')}
      />
      
      <View style={styles.socialIconsContainer}>
        <TouchableOpacity>
          <Image
            style={styles.facebookIcon}
            resizeMode="cover"
            source={require('../assets/facebook.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.twitterIcon}
            resizeMode="cover"
            source={require('../assets/twitter.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.googleIcon}
            resizeMode="cover"
            source={require('../assets/google.png')}
          />
        </TouchableOpacity>
      </View>
      
      <Image
        style={styles.signupChild1}
        resizeMode="cover"
        source={require('../assets/vector-21.png')}
      />
    </View>
  );
};

export default SignupScreen;
