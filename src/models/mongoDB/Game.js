import { mongoose } from 'mongoose';
const currYear = new Date().getFullYear();
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    year: {
        type: Number,
        required: true,
        min: [1958, "Year must be at least 1958 (the year the first video game was created)"],
        max: [currYear, "Year cannot exceed the current year"]
    },

    developer: {
        type: String,
        required: true,
        trim: true
    },

    platform: {
        type: [String],
        required: true
    },

    genre: {
        type: [String],
        required: true
    },

    rating: {
        type: Number,
        default: 5,
        min: [0, "Minimum rating is 0"],
        max: [10, "Maximum rating is 10"]
    },

    coverImage: {
        type: String,
        required: true,
        trim: true
    },

    multiplayer: {
        type: Boolean,
        default: false
    },

    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const Game = mongoose.model("Game", GameSchema);
export default Game;
