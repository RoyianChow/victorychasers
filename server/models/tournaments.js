//File name: comp229_midterm_301256903
//Name: Royian Chowdhury
// Student ID: 301256903
// Web app name: comp229-w2023-midterm-301256903.azurewebsites.net
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TournamentSchema = new Schema({
    name: String,
    game: String,
    organizer: String,
    start_date: String,
    end_date: String,
    max_players: Number,
    description: String
}, {
    timestamps: true,
    collection: 'tournaments'
});

export default mongoose.model('Tournaments', TournamentSchema);