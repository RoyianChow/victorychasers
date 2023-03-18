import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  name: String,
  joinedTournaments: [{ type: Schema.Types.ObjectId, ref: 'Tournaments' }],
}, {
  timestamps: true,
  collection: 'players'
});

export default mongoose.model('Players', PlayerSchema);
