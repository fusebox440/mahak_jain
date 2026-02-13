// Playlist Configuration
// Add your Spotify track links here - just paste the full Spotify URL

window.PLAYLIST_CONFIG = {
  // Our romantic songs collection
  songs: [
    {
      name: "Perfect",
      artist: "Ed Sheeran", 
      spotifyUrl: "https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v",
      description: "Our perfect love song"
    },
    {
      name: "Thinking Out Loud", 
      artist: "Ed Sheeran",
      spotifyUrl: "https://open.spotify.com/track/1HNkqx9Ahdgi1Ixy2xkKkL",
      description: "When I think of you"
    },
    // Add more songs here by copying this format:
    // {
    //   name: "Song Title",
    //   artist: "Artist Name", 
    //   spotifyUrl: "https://open.spotify.com/track/TRACK_ID",
    //   description: "Why this song is special to us"
    // },
  ],
  
  // Playlist sections (you can create themed playlists)
  playlists: [
    {
      title: "Our Love Songs",
      description: "Songs that remind us of each other",
      songs: [0, 1] // indexes from the songs array above
    }
    // Add more themed playlists:
    // {
    //   title: "Dance Together", 
    //   description: "For our silly dance moments",
    //   songs: [2, 3, 4]
    // }
  ]
};