## TACKON BACKEND API

![GitHub top language](https://img.shields.io/github/languages/top/IT-TACKON/tackon-backend-API)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/IT-TACKON/tackon-backend-API)
![GitHub repo size](https://img.shields.io/github/repo-size/IT-TACKON/tackon-backend-API)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/IT-TACKON/tackon-backend-API)
![GitHub](https://img.shields.io/github/license/IT-TACKON/tackon-backend-API)

Backend REST API untuk aplikasi Tackon. Tackon adalah forum berbasis website untuk tanya jawab seputar akademik.

## Setup Database
Forward engineering model [tackon.mwb](database/tackon.mwb) atau menjalankan SQL [tackon.sql](database/tackon.sql)

## Menjalankan Server
1. Rename file [`placeholder.env`](placeholder.env) menjadi `.env` dan isikan credential
2. Jalankan `npm i` untuk install semua dependencies.
3. _(Optional)_ Jalankan `npm run lint` untuk pastikan tidak ada error pada project
4. _Untuk server produksi_. Jalankan `npm run build` untuk build project, kemudian `npm start` untuk menjalankan server
5. _Untuk server debug_. Jalankan `npm run debug` untuk menjalankan server

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
