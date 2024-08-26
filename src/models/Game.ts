import mongoose, { Document, Schema } from 'mongoose';

interface IGame extends Document {
  moves: string[];
  players: string[];
  status: string;
}

const GameSchema: Schema = new Schema({
  moves: { type: [String], default: [] },
  players: { type: [String], required: true },
  status: { type: String, default: 'waiting' },
});

const Game = mongoose.model<IGame>('Game', GameSchema);

export { Game };
export type { IGame };

