/* --------------------------
   My Beautiful Dark Twisted Fantasy — Kanye West (Demo playable)
   Public MP3s used for testing; replace with real tracks
--------------------------- */
const firstAlbumTracks = [
  {
    id: 301,
    title: "Dark Fantasy",
    artist: "Kanye West",
    album: "My Beautiful Dark Twisted Fantasy",
    artwork: "https://upload.wikimedia.org/wikipedia/en/0/04/My_Beautiful_Dark_Twisted_Fantasy.jpg",
    duration: "4:40",
    sources: { m4a: "", mp3: "https://archive.org/download/testmp3testfile/mpthreetest.mp3", flac: "" },
    video: ""
  },
  {
    id: 302,
    title: "Gorgeous",
    artist: "Kanye West",
    album: "My Beautiful Dark Twisted Fantasy",
    artwork: "https://upload.wikimedia.org/wikipedia/en/0/04/My_Beautiful_Dark_Twisted_Fantasy.jpg",
    duration: "5:58",
    sources: { m4a: "", mp3: "https://archive.org/download/testmp3testfile/mpthreetest.mp3", flac: "" },
    video: ""
  },
  {
    id: 303,
    title: "Power",
    artist: "Kanye West",
    album: "My Beautiful Dark Twisted Fantasy",
    artwork: "https://upload.wikimedia.org/wikipedia/en/0/04/My_Beautiful_Dark_Twisted_Fantasy.jpg",
    duration: "4:52",
    sources: { m4a: "", mp3: "https://archive.org/download/testmp3testfile/mpthreetest.mp3", flac: "" },
    video: ""
  },
  {
    id: 304,
    title: "All of the Lights (Interlude)",
    artist: "Kanye West",
    album: "My Beautiful Dark Twisted Fantasy",
    artwork: "https://upload.wikimedia.org/wikipedia/en/0/04/My_Beautiful_Dark_Twisted_Fantasy.jpg",
    duration: "1:02",
    sources: { m4a: "", mp3: "https://archive.org/download/testmp3testfile/mpthreetest.mp3", flac: "" },
    video: ""
  },
  {
    id: 305,
    title: "All of the Lights",
    artist: "Kanye West",
    album: "My Beautiful Dark Twisted Fantasy",
    artwork: "https://upload.wikimedia.org/wikipedia/en/0/04/My_Beautiful_Dark_Twisted_Fantasy.jpg",
    duration: "5:36",
    sources: { m4a: "", mp3: "https://archive.org/download/testmp3testfile/mpthreetest.mp3", flac: "" },
    video: ""
  },
  {
    id: 306,
    title: "Monster",
    artist: "Kanye West",
    album: "My Beautiful Dark Twisted Fantasy",
    artwork: "https://upload.wikimedia.org/wikipedia/en/0/04/My_Beautiful_Dark_Twisted_Fantasy.jpg",
    duration: "6:19",
    sources: { m4a: "", mp3: "https://archive.org/download/testmp3testfile/mpthreetest.mp3", flac: "" },
    video: ""
  },
  {
    id: 307,
    title: "So Appalled",
    artist: "Kanye West",
    album: "My Beautiful Dark Twisted Fantasy",
    artwork: "https://upload.wikimedia.org/wikipedia/en/0/04/My_Beautiful_Dark_Twisted_Fantasy.jpg",
    duration: "6:38",
    sources: { m4a: "", mp3: "https://archive.org/download/testmp3testfile/mpthreetest.mp3", flac: "" },
    video: ""
  },
  {
    id: 308,
    title: "Devil in a New Dress",
    artist: "Kanye West",
    album: "My Beautiful Dark Twisted Fantasy",
    artwork: "https://upload.wikimedia.org/wikipedia/en/0/04/My_Beautiful_Dark_Twisted_Fantasy.jpg",
    duration: "5:52",
    sources: { m4a: "", mp3: "https://archive.org/download/testmp3testfile/mpthreetest.mp3", flac: "" },
    video: ""
  },
  {
    id: 309,
    title: "Runaway",
    artist: "Kanye West",
    album: "My Beautiful Dark Twisted Fantasy",
    artwork: "https://upload.wikimedia.org/wikipedia/en/0/04/My_Beautiful_Dark_Twisted_Fantasy.jpg",
    duration: "9:08",
    sources: { m4a: "", mp3: "https://archive.org/download/testmp3testfile/mpthreetest.mp3", flac: "" },
    video: ""
  },
  {
    id: 310,
    title: "Hell of a Life",
    artist: "Kanye West",
    album: "My Beautiful Dark Twisted Fantasy",
    artwork: "https://upload.wikimedia.org/wikipedia/en/0/04/My_Beautiful_Dark_Twisted_Fantasy.jpg",
    duration: "5:22",
    sources: { m4a: "", mp3: "https://archive.org/download/testmp3testfile/mpthreetest.mp3", flac: "" },
    video: ""
  },
  {
    id: 311,
    title: "Blame Game",
    artist: "Kanye West",
    album: "My Beautiful Dark Twisted Fantasy",
    artwork: "https://upload.wikimedia.org/wikipedia/en/0/04/My_Beautiful_Dark_Twisted_Fantasy.jpg",
    duration: "7:49",
    sources: { m4a: "", mp3: "https://archive.org/download/testmp3testfile/mpthreetest.mp3", flac: "" },
    video: ""
  },
  {
    id: 312,
    title: "Lost in the World",
    artist: "Kanye West",
    album: "My Beautiful Dark Twisted Fantasy",
    artwork: "https://upload.wikimedia.org/wikipedia/en/0/04/My_Beautiful_Dark_Twisted_Fantasy.jpg",
    duration: "4:15",
    sources: { m4a: "", mp3: "https://archive.org/download/testmp3testfile/mpthreetest.mp3", flac: "" },
    video: ""
  },
  {
    id: 313,
    title: "Who Will Survive in America",
    artist: "Kanye West",
    album: "My Beautiful Dark Twisted Fantasy",
    artwork: "https://upload.wikimedia.org/wikipedia/en/0/04/My_Beautiful_Dark_Twisted_Fantasy.jpg",
    duration: "1:43",
    sources: { m4a: "", mp3: "https://archive.org/download/testmp3testfile/mpthreetest.mp3", flac: "" },
    video: ""
  }
];

/* Assign to player */
let tracks = firstAlbumTracks.slice();