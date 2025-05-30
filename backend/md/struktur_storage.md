=> contoh struktur folder untuk file video <=
hls/  => file zip harus nama movies
├── movies/
│   └── avengers-endgame-2019/
│       ├── index.m3u8
│       ├── 360p.m3u8
│       ├── 360p/
│       │   ├── segment0.ts
│       │   ├── segment1.ts
│       │   └── ...
│       ├── 720p.m3u8
│       ├── 720p/
│       │   ├── segment0.ts
│       │   └── ...
│       └── subtitles/
│           ├── en.vtt
│           ├── id.vtt
│           └── ...
├── series/
│   └── the-office/
│       ├── season-1/
│       │   ├── episode-1/
│       │   │   ├── index.m3u8
│       │   │   ├── 360p/
│       │   │   └── subtitles/
│       │   └── episode-2/
│       └── season-2/
│           └── ...
├── animations/
│   ├── film/
│   │   └── spirited-away-2001/
│   │       ├── index.m3u8
│   │       └── ...
│   └── series/
│       └── naruto/
│           └── season-1/
│               └── episode-1/
│                   └── ...



=> contoh struktur folder untuk file poster <=
posters/
├── movies/
│   └── avengers-endgame-2019.jpg
├── series/
│   └── the-office.jpg
├── animations/
│   ├── film/
│   │   └── spirited-away-2001.jpg
│   └── series/
│       └── naruto.jpg

