geo.setAttribute('position', new THREE.BufferAttribute(positions, 3)); // Menghubungkan buffer posisi dengan geometri, tiga angka untuk setiap titik.
geo.setAttribute('color', new THREE.BufferAttribute(colors, 3)); // Menghubungkan buffer warna RGB dengan geometri.

const mat = new THREE.PointsMaterial({ size: 0.025, vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }); // Mengatur ukuran titik, warna per titik, transparansi, dan pencampuran cahaya aditif.
const cloud = new THREE.Points(geo, mat); // Membuat kumpulan titik dari geometri dan material.
scene.add(cloud); // Menambahkan kumpulan partikel ke ruang tiga dimensi.
camera.position.z = 8; // Menempatkan kamera delapan satuan di depan pusat objek.

let targetPos = shapes.GALAXY; // Menetapkan galaksi sebagai target bentuk pertama.
let targetCol = new THREE.Color(0x00d4ff); // Menetapkan biru sian sebagai warna target pertama.
let mode = "GALAXY"; // Menyimpan nama bentuk yang sedang aktif.
