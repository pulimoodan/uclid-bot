import axios from "axios";
import twitterClient from "./client.js";

// tweet the message to twitter
export const tweet = async (message) => {
    try {
        await twitterClient.v2.tweet(message);
    } catch (error) {
        console.log(error);
    }
}

// get a random joke from the api
const generateJoke = async () => {
    const res = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
    return res.data;
}


// convert the api response to message with tags
export const generateMessage = async () => {
    const jokeData = await generateJoke();
    const message = `${jokeData.joke} \n\n #${jokeData.category}`

    return message;
}