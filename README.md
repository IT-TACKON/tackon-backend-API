## TACKON BACKEND API

![GitHub top language](https://img.shields.io/github/languages/top/IT-TACKON/tackon-backend-API)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/IT-TACKON/tackon-backend-API)
![GitHub repo size](https://img.shields.io/github/repo-size/IT-TACKON/tackon-backend-API)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/IT-TACKON/tackon-backend-API)
![GitHub](https://img.shields.io/github/license/IT-TACKON/tackon-backend-API)

Tackon adalah aplikasi berupa forum untuk tanya jawab antar pengguna seputar akademik. Backend REST API untuk aplikasi Tackon, API bertanggung jawab untuk proses autentikasi pengguna dan melakukan interaksi dengan database. [Lihat dokumentasi API](https://docs.google.com/spreadsheets/d/126ti8iUJEdw6Q7MlRLklhBWytQNeGFnRederqeyw364/edit?usp=sharing)

## Requirement
- Nodejs v14.x
- MySQL v8.x

## Setup Database

Forward engineering model [tackon.mwb](database/tackon.mwb) atau menjalankan SQL [tackon.sql](database/tackon.sql)

## Setup Server

1. Rename file [`placeholder.env`](placeholder.env) menjadi `.env` dan isikan credential
2. Jalankan `npm i` untuk install semua dependencies.
3. _(Optional)_ Jalankan `npm run lint` untuk pastikan tidak ada error pada project

## Menjalankan Server

-   **Untuk server produksi**. Jalankan `npm run build` untuk build project, kemudian `npm start` untuk menjalankan server
-   **Untuk server debug**. Jalankan `npm run debug` untuk menjalankan server

## Semantic Commit Message

| Emoji       | Code               | Description              |
| ----------- | ------------------ | ------------------------ |
| :milky_way: | `:milky_way:`      | Inisialisasi             |
| 🐞          | `:beetle:`         | Fix Bug                  |
| 🌷          | `:tulip:`          | Penambahan pada Frontend |
| 📄          | `:page_facing_up:` | Menambah dokumentasi     |
| 💯          | `:100:`            | Testing                  |
| 💥          | `:boom:`           | Refactor & penghapusan   |
| 🤖          | `:robot:`          | Menambah otomasi         |
| 🚀          | `:rocket:`         | Deployment               |
| :lock:      | `:lock:`           | Keamanan                 |
| ✨          | `:sparkles:`       | Lain lain                |
