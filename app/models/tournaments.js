import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TournamentSchema = new Schema({
  name: String,
  game: String,
  organizer: String,
  start_date: String,
  end_date: String,
  max_players: Number,
  description: String,
 

  players: [{
    type: Schema.Types.ObjectId,
    ref: "PlayerSchema"
 }]}, {
  timestamps: true,
  collection: 'tournaments'
});


export default mongoose.model('Tournaments', TournamentSchema); 

