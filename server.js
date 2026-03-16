import express from "express";
import { Client, GatewayIntentBits } from "discord.js";

const app = express();

app.use(express.static("public"));

let currentTrack = null;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences
  ]
});

client.on("presenceUpdate", (oldPresence, newPresence) => {

  if(!newPresence) return;

  const activity = newPresence.activities.find(a => a.name === "Spotify");

  if (!activity || !activity.timestamps || !activity.assets?.largeImage) {
    currentTrack = null;
    return;
  }

  // Discord presence activity fields can sometimes be missing; validate before using.
  const start = Number(activity.timestamps.start);
  const end = Number(activity.timestamps.end);
  const coverId = activity.assets.largeImage?.replace?.("spotify:", "") || "";

  currentTrack = {
    song: activity.details,
    artist: activity.state,
    cover: coverId ? `https://i.scdn.co/image/${coverId}` : "",
    start: Number.isFinite(start) ? start : null,
    end: Number.isFinite(end) ? end : null
  };

});

const token = process.env.DISCORD_BOT_TOKEN;
if (!token) {
  console.error("Missing DISCORD_BOT_TOKEN env var. Set it in your environment or .env file.");
  process.exit(1);
}

client.login(token);

app.get("/api/spotify",(req,res)=>{

  if(!currentTrack){
    return res.json({playing:false});
  }

  const now = Date.now();

  const start = Number(currentTrack.start);
  const end = Number(currentTrack.end);
  const duration = Number.isFinite(end) && Number.isFinite(start) ? Math.max(0, end - start) : 0;
  const progress = Number.isFinite(start) ? Math.min(duration, Math.max(0, now - start)) : 0;

  res.json({
    playing:true,
    song:currentTrack.song,
    artist:currentTrack.artist,
    cover:currentTrack.cover,
    progress,
    duration
  });

});

app.listen(3000,()=>{
  console.log("Running: http://localhost:3000");
});