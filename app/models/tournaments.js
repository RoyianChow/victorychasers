import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TournamentSchema = new Schema({
name: String,
game: String,
organizer: String,
start_date: Date,
end_date: Date,
max_players: Number,
current_players: Number,
location: String,
description: String,
status: String
}, {
timestamps: true,
collection: 'tournaments'
});

export default mongoose.model("Tournaments", TournamentSchema);