import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const PlayerSchema = new Schema({
  team_name: String,
  win_loss: String,
  win_loss2: String,
  win_loss3: String,

tournament: { 
   type: Schema.Types.ObjectId,
   ref: "TournamentSchema"
}
}, {
  timestamps: true,
  collection: 'players'
});

export default mongoose.model('Players', PlayerSchema) ;