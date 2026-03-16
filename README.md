# Spotify Now-Playing Web Service

A simple Node.js + Express app that tracks your Spotify listening activity via Discord presence and exposes it via a REST API.  

## Features

- Tracks current Spotify track of a Discord user
- Provides a JSON API with song, artist, cover, progress, and duration
- Servable via Docker for easy deployment
- Ready to use with Discord bot token

## Demo

> Run locally using Docker to see your Spotify status at `http://localhost:3000`

---

## Requirements

- Node.js 20+ (if not using Docker)
- Docker & Docker Compose (optional, recommended)
- A Discord bot with `Presence Intent` enabled

---

## Installation

1. Clone this repository:

```bash
git clone https://github.com/danielbg14/spotify-status.git
cd spotify-status
````

2. Copy the example environment file:

```bash
cp .env.example .env
```

3. Set your Discord bot token in `.env`:

```
DISCORD_BOT_TOKEN=your_discord_bot_token_here
```

---

## Running with Docker

```bash
docker-compose up --build
```

The server will start on `http://localhost:3000`.

---

## Running Locally (Without Docker)

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

---

## API

**GET `/api/spotify`**

Returns JSON about the currently playing track:

```json
{
  "playing": true,
  "song": "Song Name",
  "artist": "Artist Name",
  "cover": "https://i.scdn.co/image/abc123",
  "progress": 60000,
  "duration": 180000
}
```

* `progress` and `duration` are in milliseconds
* `playing: false` if no track is currently active

---

## Environment Variables

| Variable            | Description                                         |
| ------------------- | --------------------------------------------------- |
| `DISCORD_BOT_TOKEN` | Your Discord bot token with presence intent enabled |

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Contributions

Contributions are welcome! Feel free to open issues or submit pull requests.
