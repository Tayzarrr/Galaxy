function animate() { // Mendefinisikan proses pembaruan animasi yang berulang setiap bingkai.
    requestAnimationFrame(animate); // Menjadwalkan bingkai animasi berikutnya sesuai laju tampilan browser.
    const p = geo.attributes.position.array; // Mengambil buffer koordinat partikel yang akan diperbarui.
    const c = geo.attributes.color.array; // Mengambil buffer warna partikel yang akan diperbarui.
    for (let i = 0; i < p.length; i++) { // Memperbarui setiap komponen koordinat pada buffer partikel.
        p[i] += (targetPos[i] - p[i]) * 0.12; // Mendekatkan koordinat sebesar 12 persen dari selisih menuju bentuk target.
        const i3 = Math.floor(i/3)*3; // Mengambil indeks RGB awal milik partikel untuk komponen koordinat ini.
        c[i3] += (targetCol.r - c[i3]) * 0.1; // Mendekatkan komponen merah sebesar 10 persen menuju warna target.
        c[i3+1] += (targetCol.g - c[i3+1]) * 0.1; // Mendekatkan komponen hijau sebesar 10 persen menuju warna target.
        c[i3+2] += (targetCol.b - c[i3+2]) * 0.1; // Mendekatkan komponen biru sebesar 10 persen menuju warna target.
    } // Mengakhiri blok perulangan, kondisi, atau fungsi di atas.
    if (mode === "HAND") cloud.rotation.z = Math.sin(Date.now()*0.005)*0.2; // Mengayunkan bentuk tangan pada sumbu Z menggunakan fungsi sinus.
    else if (mode === "SATURN") { cloud.rotation.x = 0.5; cloud.rotation.y += 0.01; } // Memiringkan Saturnus dan memutarnya pada sumbu Y.
    else { cloud.rotation.z *= 0.9; cloud.rotation.y += 0.005; } // Meredam rotasi Z dan memutar bentuk lainnya secara perlahan pada sumbu Y.
    geo.attributes.position.needsUpdate = true; // Memberi tahu GPU bahwa buffer posisi berubah.
    geo.attributes.color.needsUpdate = true; // Memberi tahu GPU bahwa buffer warna berubah.
    renderer.render(scene, camera); // Menggambar ruang tiga dimensi dari sudut pandang kamera.
} // Mengakhiri blok perulangan, kondisi, atau fungsi di atas.
animate(); // Memulai siklus animasi.

window.addEventListener('resize', () => { // Memperbarui tampilan ketika ukuran jendela berubah.
    camera.aspect = window.innerWidth / window.innerHeight; // Menghitung ulang rasio lebar dan tinggi kamera.
    camera.updateProjectionMatrix(); // Menerapkan rasio baru pada proyeksi kamera.
    renderer.setSize(window.innerWidth, window.innerHeight); // Menyesuaikan resolusi kanvas dengan ukuran terbaru.
}); // Mengakhiri penanganan perubahan ukuran jendela.
