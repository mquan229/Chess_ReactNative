// src/types/navigation.ts

// Các loại cho Stack Navigator
export type RootStackParamList = {
  Auth: undefined;
  Main: {screen :Home };
  Modal: undefined;
  Login: undefined;
  Signup: undefined;
  Forgot: undefined;
  Create: undefined;
  Game: { roomId: number };
  Piece: undefined;
  Notation : undefined;
  Board : undefined;
};

// Các loại cho Bottom Tab Navigator
export type RootTabParamList = {
  Home: undefined;
  Settings: undefined;
  Room: undefined;
  Profile: undefined;
  Board : undefined;
};
