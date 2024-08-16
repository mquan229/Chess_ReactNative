import { useNavigation } from '@react-navigation/native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore'; // Import các phương thức cần thiết
import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/ForgotPasswordStyles';
import { auth, db } from '../utils/firebaseConfig'; // Giả định bạn đã export auth từ firebaseConfig

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Password reset email sent!');
      navigation.navigate('Login'); // Chuyển hướng đến Login sau khi gửi email
    } catch (error: any) {
      console.error('Error sending password reset email:', error);
      Alert.alert('Error sending password reset email: ' + error.message);
    }
  };

  const handleBacktoLogin = () => {
    navigation.navigate('Login');
  };

  // Đặt lệnh cập nhật thông tin người dùng vào hook useEffect
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Người dùng đã đăng nhập
        try {
          await updateDoc(doc(db, 'users', user.uid), {
            lastPasswordChange: new Date()
          });
          console.log('Cập nhật thông tin người dùng thành công');
        } catch (error) {
          console.error('Lỗi khi cập nhật thông tin người dùng:', error);
        }
      } else {
        // Người dùng chưa đăng nhập
      }
    });

    // Cleanup the subscription
    return () => unsubscribe();
  }, [db]);

  return (
    <View style={styles.forgotPassword}>
      <TouchableOpacity onPress={handleBacktoLogin} style={styles.backIcon}>
        <Icon name="arrow-back-circle-outline" size={40} color="black" />
      </TouchableOpacity>
      <Text style={styles.resetPassword}>Reset Password</Text>
      
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

      <TouchableOpacity style={styles.resetButton} onPress={handlePasswordReset}>
        <LinearGradient
          style={[styles.gradient]}
          locations={[0, 1]}
          colors={['#f97794', '#623aa2']}
        >
          <Text style={styles.reset}>Reset</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Image
        style={styles.forgotPasswordChild}
        resizeMode="cover"
        source={require('../assets/vector-1.png')}
      />
      <Image
        style={styles.forgotPasswordItem}
        resizeMode="cover"
        source={require('../assets/ellipse-1.png')}
      />
      <Image
        style={styles.forgotPasswordChild1}
        resizeMode="cover"
        source={require('../assets/vector-21.png')}
      />
    </View>
  );
};

export default ForgotPasswordScreen;
