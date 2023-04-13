import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const PlayerSchema = new Schema({
  team_name: String,
tournament: { 
   type: Schema.Types.ObjectId,
   ref: "TournamentSchema"
}
}, {
  timestamps: true,
  collection: 'players'
});

export default mongoose.model('Players', PlayerSchema) ;