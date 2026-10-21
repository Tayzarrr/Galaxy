<div align="center">

# 🌌 GALAXY
### Hand Gesture · 3D Particle Experience

**Gerakkan tanganmu. Ubah ribuan partikel menjadi bentuk yang berbeda.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)
![MediaPipe](https://img.shields.io/badge/MediaPipe-0097A7?style=for-the-badge&logo=google&logoColor=white)

**20.000 partikel · 5 bentuk · 1 tangan**

[Mulai](#-mulai-dalam-tiga-langkah) · [Kontrol](#-kontrol-gestur) · [Struktur](#-struktur-proyek) · [Push GitHub](PANDUAN_GITHUB.md)

</div>

---

## ✨ Tentang proyek

Galaxy adalah visualisasi partikel tiga dimensi yang dikendalikan melalui kamera. Three.js menggambar partikel di browser, sedangkan MediaPipe Hands membaca titik penanda tangan untuk memilih bentuk dan menggerakkan objek.

Proyek ini merupakan pemisahan dari `galaxy(6).html`. HTML, CSS, dan JavaScript dipisahkan berdasarkan tugasnya agar mudah dipelajari serta dikembangkan. Setiap baris kode aktif dilengkapi komentar penjelasan berbahasa Indonesia.

## 🚀 Fitur utama

| Fitur | Pengalaman |
| --- | --- |
| Lima bentuk partikel | Galaksi spiral, hati, roket, tangan, dan Saturnus bercincin |
| Kontrol gestur | Mengganti bentuk melalui posisi jari |
| Pelacakan gerakan | Objek mengikuti posisi tangan dengan penghalusan |
| Transisi bertahap | Partikel bergerak dan berganti warna menuju target |
| Animasi bentuk | Rotasi galaksi, putaran Saturnus, dan ayunan tangan |
| Penyesuaian jendela | Rasio kamera dan kanvas diperbarui saat ukuran layar berubah |
| Pesan kamera | Petunjuk muncul jika kamera gagal diaktifkan |

## ⚡ Mulai dalam tiga langkah

### 1. Siapkan perangkat

Gunakan browser desktop yang mendukung WebGL dan kamera, misalnya Chrome atau Edge. Siapkan webcam, koneksi internet, dan Python jika memakai server di bawah. Internet diperlukan untuk memuat Three.js, MediaPipe, dan aset modelnya dari CDN.

### 2. Jalankan server lokal

Ekstrak ZIP, masuk ke folder yang berisi `index.html`, lalu buka PowerShell di folder tersebut. Jalankan:

```powershell
py -m http.server 8000 --bind 127.0.0.1
```

Jika perintah `py` tidak tersedia tetapi Python sudah terpasang:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Alternatif tanpa Python: buka folder proyek di VS Code dan gunakan ekstensi **Live Server** pada `index.html`.

### 3. Buka dan izinkan kamera

Kunjungi **http://localhost:8000**, izinkan kamera, lalu arahkan satu tangan ke webcam. Biarkan PowerShell server tetap terbuka. Tekan `Ctrl+C` untuk menghentikan server.

Gunakan localhost atau hosting HTTPS agar akses kamera memiliki konteks yang sesuai. Membuka berkas HTML langsung bukan cara menjalankan yang direkomendasikan.

## 🖐️ Kontrol gestur

| Gerakan tangan | Bentuk | Warna |
| --- | --- | --- |
| Kepalkan empat jari: telunjuk, tengah, manis, dan kelingking | 🪐 Saturnus | Emas |
| Tegakkan telunjuk, tengah, dan manis; tekuk kelingking | ❤️ Love / hati | Merah muda |
| Tegakkan kelingking dan tekuk telunjuk | 👋 Tangan | Hijau mint |
| Tegakkan telunjuk dan tengah; tekuk jari manis | 🚀 Roket | Jingga |
| Gestur lain, misalnya telapak terbuka | 🌌 Galaxy | Biru sian |

**Tips:** posisikan tangan tegak, jari mengarah ke atas, dan gunakan pencahayaan yang cukup. Deteksi membandingkan posisi vertikal ujung jari dengan sendi; tangan yang miring atau terbalik dapat terbaca berbeda. Ibu jari tidak dipakai sebagai syarat pemilihan bentuk.

Urutan prioritas deteksi: **Saturnus → Love → Tangan → Roket → Galaxy**. Ikon 🤟 di panel mengikuti tampilan sumber; pemicu Love yang sebenarnya adalah **tiga jari telunjuk–tengah–manis**, sesuai tabel. Saat tangan hilang, bentuk dan posisi terakhir dipertahankan; pada awal program bentuknya Galaxy.

## 📁 Struktur proyek

| Berkas | Tanggung jawab |
| --- | --- |
| `index.html` | Struktur halaman, video sumber, petunjuk, dan urutan pemuatan skrip |
| `css/style.css` | Latar, teks status, kotak petunjuk, dan penyembunyian video |
| `js/scene.js` | Elemen halaman, jumlah partikel, ruang 3D, kamera, renderer, dan buffer |
| `js/shapes.js` | Persamaan dan koordinat untuk kelima bentuk |
| `js/particles.js` | Atribut geometri, material, objek partikel, dan target awal |
| `js/gestures.js` | Pelacakan tangan, pemilihan bentuk, warna, dan kamera |
| `js/animation.js` | Transisi koordinat, interpolasi warna, rotasi, dan perubahan ukuran |
| `PANDUAN_GITHUB.md` | Tutorial PowerShell dari ekstraksi sampai push dan pembaruan |
| `.gitignore` | Daftar berkas lokal yang tidak perlu disimpan di Git |
| `.gitattributes` | Aturan normalisasi akhir baris |

Skrip menggunakan **classic scripts** dengan `defer`, sehingga berjalan berurutan setelah HTML selesai dibaca. Urutannya adalah `scene → shapes → particles → gestures → animation`. Variabel lintas berkas berbagi lingkup global; pertahankan urutan ini. Tidak diperlukan npm, bundler, atau proses build.

## 🧠 Cara kerja

1. Program membuat 20.000 posisi untuk setiap bentuk.
2. Kamera mengirim bingkai ke MediaPipe Hands untuk memperoleh 21 titik penanda tangan.
3. Perbandingan titik jari menentukan bentuk dan warna tujuan.
4. Posisi tangan menggerakkan objek dengan penghalusan.
5. Setiap bingkai animasi mendekatkan koordinat dan warna partikel ke target, lalu Three.js menggambarnya.

Video disembunyikan dari halaman, tetapi tetap dipakai untuk pelacakan. Kode aplikasi tidak menambahkan perekaman, penyimpanan, atau endpoint unggah video. Pustaka dan model eksternal tetap diunduh dari CDN.

## 🛠️ Kustomisasi cepat

| Yang ingin diubah | Lokasi |
| --- | --- |
| Jumlah titik / beban GPU | `PARTICLE_COUNT` pada `js/scene.js` |
| Ukuran partikel | `size` pada `js/particles.js` |
| Jarak kamera | `camera.position.z` pada `js/particles.js` |
| Warna masing-masing bentuk | `targetCol.setHex(...)` pada `js/gestures.js` |
| Kecepatan perubahan bentuk | Faktor `0.12` pada `js/animation.js` |
| Tampilan teks dan kotak petunjuk | `css/style.css` |

## 🧩 Pemecahan masalah

| Kendala | Langkah yang dapat dicoba |
| --- | --- |
| Kamera tidak aktif | Izinkan kamera dari ikon izin situs, tutup aplikasi lain yang memakai webcam, dan muat ulang |
| Teks terus menunggu kamera | Periksa koneksi CDN, izin kamera, dan pesan di Console browser (`F12`) |
| Layar kosong | Pastikan seluruh folder diekstrak, jalankan server dari folder `index.html`, dan periksa dukungan WebGL |
| Gestur sulit dikenali | Gunakan satu tangan yang tegak dan terlihat utuh dengan cahaya cukup |
| Animasi terasa berat | Turunkan `PARTICLE_COUNT`, misalnya menjadi `10000` |
| Port 8000 sudah dipakai | Gunakan port `8001`, kemudian buka `http://localhost:8001` |

## 📤 Upload ke GitHub

Panduan lengkap ada di **[PANDUAN_GITHUB.md](PANDUAN_GITHUB.md)**, termasuk pembuatan repository kosong, cara membuka PowerShell, konfigurasi Git, push pertama, dan pembaruan berikutnya.

## 📝 Catatan pengembangan

Logika bentuk, pemetaan gestur, warna, dan 20.000 partikel mengikuti sumber. Versi terpisah menambahkan deklarasi HTML5, viewport, deskripsi halaman, penanganan kegagalan startup kamera, serta penyesuaian kanvas ketika jendela berubah ukuran.

Three.js memakai versi **r128** seperti sumber. URL MediaPipe mengikuti sumber dan belum mengunci versi. Proyek memerlukan internet dan tidak menyertakan pustaka eksternal untuk penggunaan offline. Tidak ada lisensi distribusi yang ditambahkan karena lisensi kode sumber belum ditentukan pemiliknya.

---

<div align="center">

**🌌 Galaxy — a little universe, moved by your hand.**

</div>
