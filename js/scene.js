const videoElement = document.getElementById('input_video'); // Mengambil elemen video sebagai sumber gambar kamera.
const statusDisplay = document.getElementById('status-display'); // Mengambil elemen teks untuk menampilkan bentuk yang aktif.

let smoothX = 0, smoothY = 0; // Menyimpan posisi horizontal dan vertikal yang diperhalus.
const PARTICLE_COUNT = 20000; // Menentukan jumlah titik partikel sebanyak 20.000.

const scene = new THREE.Scene(); // Membuat ruang tiga dimensi untuk menampung objek.
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000); // Membuat kamera perspektif dengan sudut pandang 50 derajat dan rentang jarak 0,1–1.000.
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Membuat perender WebGL dengan penghalusan tepi dan latar transparan.
renderer.setSize(window.innerWidth, window.innerHeight); // Menyesuaikan resolusi kanvas dengan ukuran jendela.
document.body.appendChild(renderer.domElement); // Memasang kanvas WebGL ke halaman.

const geo = new THREE.BufferGeometry(); // Membuat geometri buffer untuk menyimpan data partikel.
const positions = new Float32Array(PARTICLE_COUNT * 3); // Menyediakan tiga angka koordinat untuk setiap partikel.
const colors = new Float32Array(PARTICLE_COUNT * 3); // Menyediakan tiga komponen warna RGB untuk setiap partikel.
const shapes = { GALAXY: [], LOVE: [], ROCKET: [], HAND: [], SATURN: [] }; // Menyiapkan tempat penyimpanan koordinat kelima bentuk.
