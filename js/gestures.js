const hands = new Hands({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` }); // Membuat pelacak tangan dan menentukan alamat berkas model MediaPipe.
hands.setOptions({ maxNumHands: 1, modelComplexity: 1, minDetectionConfidence: 0.8, minTrackingConfidence: 0.8 }); // Mendeteksi satu tangan dengan kompleksitas model 1 dan ambang keyakinan 0,8.

hands.onResults((results) => { // Mendaftarkan pemrosesan hasil deteksi setiap bingkai kamera.
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) { // Melanjutkan pembacaan gestur ketika setidaknya satu tangan terdeteksi.
        const h = results.multiHandLandmarks[0]; // Mengambil 21 titik penanda dari tangan pertama.
        smoothX += ((h[9].x - 0.5) * -15 - smoothX) * 0.15; // Memetakan posisi horizontal pangkal jari tengah ke gerakan objek dengan penghalusan.
        smoothY += ((h[9].y - 0.5) * -10 - smoothY) * 0.15; // Memetakan posisi vertikal pangkal jari tengah ke gerakan objek dengan penghalusan.
        cloud.position.set(smoothX, smoothY, 0); // Memindahkan partikel mengikuti posisi tangan yang sudah diperhalus.

        // GESTURE DETECTION
        const isPinky = h[20].y < h[18].y && h[8].y > h[6].y; // Mendeteksi kelingking terangkat dan telunjuk tertekuk.
        const isPeace = h[8].y < h[6].y && h[12].y < h[10].y && h[16].y > h[14].y; // Mendeteksi telunjuk serta jari tengah terangkat dan jari manis tertekuk.

        // ✊ PUKUL/FIST (Semua jari ditekuk)
        const isFist = h[8].y > h[6].y && h[12].y > h[10].y && h[16].y > h[14].y && h[20].y > h[18].y; // Mendeteksi empat ujung jari berada di bawah sendinya sebagai gestur mengepal.

        // 🤟 3 JARI (Telunjuk, Tengah, Manis tegak)
        const isThree = h[8].y < h[6].y && h[12].y < h[10].y && h[16].y < h[14].y && h[20].y > h[18].y; // Mendeteksi telunjuk, tengah, dan manis terangkat sementara kelingking tertekuk.

        if (isFist) { // Memprioritaskan gestur mengepal untuk memilih Saturnus.
            targetPos = shapes.SATURN; targetCol.setHex(0xffcc66); mode = "SATURN"; // Memilih koordinat Saturnus, warna emas, dan mode SATURN.
            statusDisplay.innerText = "🪐 SATURNUS"; // Menampilkan label Saturnus pada halaman.
        } else if (isThree) { // Memilih bentuk hati ketika tiga jari terangkat.
            targetPos = shapes.LOVE; targetCol.setHex(0xff0088); mode = "LOVE"; // Memilih koordinat hati, warna merah muda, dan mode LOVE.
            statusDisplay.innerText = "❤️ LOVE"; // Menampilkan label LOVE pada halaman.
        } else if (isPinky) { // Memilih bentuk tangan ketika gestur kelingking terdeteksi.
            targetPos = shapes.HAND; targetCol.setHex(0x00ffaa); mode = "HAND"; // Memilih koordinat tangan, warna hijau mint, dan mode HAND.
            statusDisplay.innerText = "👋 TANGAN"; // Menampilkan label TANGAN pada halaman.
        } else if (isPeace) { // Memilih roket ketika gestur dua jari terdeteksi.
            targetPos = shapes.ROCKET; targetCol.setHex(0xff4400); mode = "ROCKET"; // Memilih koordinat roket, warna jingga, dan mode ROCKET.
            statusDisplay.innerText = "🚀 ROKET"; // Menampilkan label ROKET pada halaman.
        } else { // Menjalankan cabang alternatif ketika kondisi sebelumnya tidak terpenuhi.
            targetPos = shapes.GALAXY; targetCol.setHex(0x00d4ff); mode = "GALAXY"; // Memilih koordinat galaksi, warna biru sian, dan mode GALAXY.
            statusDisplay.innerText = "🌌 GALAXY"; // Menampilkan label GALAXY pada halaman.
        } // Mengakhiri blok perulangan, kondisi, atau fungsi di atas.
    } // Mengakhiri blok perulangan, kondisi, atau fungsi di atas.
}); // Mengakhiri fungsi pemrosesan hasil deteksi tangan.

new Camera(videoElement, { onFrame: async () => { await hands.send({image: videoElement}); }, width: 1280, height: 720 }).start().catch((error) => { // Memulai kamera dan menangani kegagalan izin atau perangkat.
    statusDisplay.innerText = "KAMERA GAGAL: periksa izin kamera dan gunakan localhost atau HTTPS."; // Memberikan petunjuk jika kamera tidak dapat diaktifkan.
    console.error("Kamera gagal diaktifkan:", error); // Mencatat rincian kesalahan untuk pemeriksaan di konsol browser.
}); // Mengakhiri penanganan kesalahan kamera.
