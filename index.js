import express from "express";
import cron from "node-cron";
import "dotenv/config";
import { generateMessage, tweet } from "./tweet.js";

const port = process.env.port || 3000;
  
const app = express(); // Initializing app
  
// Creating a cron job which runs on every 12 hours
cron.schedule("0 0 */12 * * *", async () => {
    console.log("Tweeting a joke every 12 hours.");
    const message = await generateMessage();
    await tweet(message);
});

app.get("/tweet", async (_req, res) => {
    const message = await generateMessage();
    await tweet(message);
    res.status(200).json({status: "Tweeted", message});
})

app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
});

process.on("uncaughtException", (error) => {
    console.log(error);
})