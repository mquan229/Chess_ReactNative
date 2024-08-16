// import { auth, db } from '../../database/firebase'; // Đảm bảo đường dẫn đúng

// export const loginUser = async (email: string, password: string) => {
//   try {
//     const userCredential = await auth.signInWithEmailAndPassword(email, password);
//     const user = userCredential.user;
    
//     if (user) {
//       return user;
//     }
//   } catch (error) {
//     console.error('Error logging in user:', error);
//     throw error;
//   }
// };

// export const registerUser = async (username: string, password: string, email: string, mobile: string) => {
//   try {
//     const userCredential = await auth.createUserWithEmailAndPassword(email, password);
//     const user = userCredential.user;
    
//     if (user) {
//       await db.collection('user').doc(user.uid).set({
//         username: username,
//         email: email,
//         mobile: mobile,
//       });
//       return user;
//     }
//   } catch (error) {
//     console.error('Error registering user:', error);
//     throw error;
//   }
// };
