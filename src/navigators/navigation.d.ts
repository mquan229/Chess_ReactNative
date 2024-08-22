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
  GameController : undefined;
  CompetitiveGame : undefined;
  AIGame : undefined;
  OnlineGame : undefined;
};

// Các loại cho Bottom Tab Navigator
export type RootTabParamList = {
  Home: undefined;
  Settings: undefined;
  Room: undefined;
  Profile: undefined;
  Board : undefined;
  CompetitiveGame : undefined;
  AIGame : undefined;
  OnlineGame : undefined;
};
