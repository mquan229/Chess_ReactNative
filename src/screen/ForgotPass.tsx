import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/ForgotPasswordStyles';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const navigation = useNavigation();

  const getToken = async () => {
    try {
      const response = await fetch('http://covua.coi.vn/api/v1.0.0/auth/get-token', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Validation error', 'Email cannot be empty');
      return;
    }

    try {
      const token = await getToken();
      if (!token) {
        Alert.alert('Failed to get token');
        return;
      }

      const response = await fetch('http://covua.coi.vn/api/v1.0.0/user/forgot-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': `${token}`,
          'X-Access-OS': 'ANDROID',
          'X-Access-Version': '1.0.0',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log("=========", data);

      if (response.ok) {
        // Fetch the user ID after requesting password reset
        const id = await checkEmailExisted(email);
        if (id) {
          setUserId(id);
          setModalVisible(true);
        }
      } else {
        Alert.alert('Request failed', data.message || 'Please check your information and try again.');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const checkEmailExisted = async (email: string): Promise<string | null> => {
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert('Failed to get token');
        return null;
      }

      const response = await fetch('http://covua.coi.vn/api/v1.0.0/user/check-email', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': `${token}`,
          'X-Access-OS': 'ANDROID',
          'X-Access-Version': '1.0.0',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log("========data", data);

      if (response.ok && data && data.data && data.data.length > 0) {
        const userId = data.data[0]._id;
        console.log("User ID:", userId);
        return userId;
      } else {
        Alert.alert('Email not found');
        return null;
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
      return null;
    }
  };

  const handleResetPassword = async () => {
    if (!resetCode || !newPassword || !userId) {
      Alert.alert('Validation error', 'All fields must be filled');
      return;
    }

    try {
      const token = await getToken();
      if (!token) {
        Alert.alert('Failed to get token');
        return;
      }

      const response = await fetch('http://covua.coi.vn/api/v1.0.0/user/reset-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': `${token}`,
          'X-Access-OS': 'ANDROID',
          'X-Access-Version': '1.0.0',
        },
        body: JSON.stringify({
          id: userId,
          password: newPassword,  // Ensure this is MD5 hashed
          verify: resetCode,
        }),
      });

      const data = await response.json();
      console.log("=========", data);

      if (response.ok) {
        Alert.alert('Password reset successfully');
        navigation.navigate('Login'); // Redirect to login page
      } else {
        Alert.alert('Reset failed', data.message || 'Please check your information and try again.');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleBacktoLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.forgotPassword}>
      <TouchableOpacity onPress={handleBacktoLogin} style={styles.backIcon}>
        <Icon name="arrow-back-circle-outline" size={40} color="black" />
      </TouchableOpacity>
      <Text style={styles.resetPassword}>Reset Password</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleForgotPassword}>
        <LinearGradient
          style={[styles.gradient]}
          locations={[0, 1]}
          colors={['#f97794', '#623aa2']}
        >
          <Text style={styles.reset}>Request Reset Code</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Modal for entering reset code and new password */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Reset Code and New Password</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Reset Code"
              value={resetCode}
              onChangeText={text => setResetCode(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={text => setNewPassword(text)}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleResetPassword}>
              <LinearGradient
                style={[styles.gradient]}
                locations={[0, 1]}
                colors={['#f97794', '#623aa2']}
              >
                <Text style={styles.reset}>Reset Password</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
