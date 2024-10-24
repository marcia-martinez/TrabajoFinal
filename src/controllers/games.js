import { json } from "express";
import Game from "../models/mongoDB/Game.js";

export const gameController = {

    async getAll(req, res) {
        try {
            const games = await Game.find();
            games.length ?
                res.status(200).json({ success: true, message: "Games collection", data: games }) :
                res.status(404).json({ success: false, message: "Games database is empty" });
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },

    async createOne(req, res) {
        const { title, year, developer, platform, genre, rating, coverImage, multiplayer, description } = req.body;
        try {
            const newGame = new Game({
                title,
                year,
                developer,
                platform,
                genre,
                rating,
                coverImage,
                multiplayer,
                description
            });
            const savedGame = await newGame.save();
            res.status(200).json({ success: true, message: "New game created", data: savedGame });
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },

    async updateOne(req, res) {
        try {
            const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedGame) {
                return res.status(404).json({ success: false, message: "Update failed, Game not found" });
            }
            res.status(200).json({ success: true, message: "Game updated", data: updatedGame });
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },

    async deleteOne(req, res) {
        try {
            const game = await Game.findByIdAndDelete(req.params.id);
            if (!game) {
                return res.status(404).json({ success: false, message: "Delete failed, Game not found." });
            }
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ success: false, message: `Internal Server Error --> ${error}` });
        }
    },
};

