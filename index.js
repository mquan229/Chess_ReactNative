/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { PIECES } from "./src/components/Piece";

AppRegistry.registerComponent(appName, () => App);

export const assets = Object.values(PIECES);
