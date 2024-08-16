import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/SignupStyles';
import { auth } from '../utils/firebaseConfig';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Lưu thêm thông tin vào Firestore (nếu cần)
      const db = getFirestore();
      await setDoc(doc(db, 'users', user.uid), {
        username,
        email,
        password,
        mobile
      });
  
      navigation.navigate('Login'); // Chuyển hướng đến Login sau khi đăng ký
    } catch (error) {
      console.error('Error signing up:', error);
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

      <View style={styles.inputContainer}>
        <AntDesign name="mobile1" size={24} style={styles.mobileIcon}/>
        <TextInput
          style={styles.input}
          placeholder="Mobile"
          value={mobile}
          onChangeText={text => setMobile(text)}
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
