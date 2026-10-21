// --- GENERASI BENTUK ---
for (let i = 0; i < PARTICLE_COUNT; i++) { // Membuat koordinat setiap bentuk untuk masing-masing partikel.
    const i3 = i * 3; // Menghitung indeks awal koordinat XYZ partikel saat ini.

    // 1. GALAXY
    const gAngle = 0.02 * i; // Menghitung sudut spiral galaksi berdasarkan indeks partikel.
    const gRad = 0.005 * i * (Math.random() * 0.4 + 0.6); // Menghitung radius spiral dengan variasi acak.
    shapes.GALAXY.push(Math.cos(gAngle) * gRad, (Math.random()-0.5) * 0.4, Math.sin(gAngle) * gRad); // Menyimpan koordinat spiral dengan ketebalan vertikal acak.

    // 2. LOVE
    const lt = Math.random() * Math.PI * 2; // Memilih sudut acak untuk persamaan kurva hati.
    shapes.LOVE.push(0.14*(16*Math.pow(Math.sin(lt),3)), 0.14*(13*Math.cos(lt)-5*Math.cos(2*lt)-2*Math.cos(3*lt)-Math.cos(4*lt)), (Math.random()-0.5)*0.2); // Menghitung kurva parametrik hati dan menambahkan ketebalan pada sumbu Z.

    // 3. ROKET
    let rx, ry, rz; // Menyiapkan koordinat sementara untuk bentuk roket.
    const rPart = Math.random(); // Memilih bagian roket secara acak.
    if (rPart < 0.5) { rx = Math.cos(i)*0.6; ry = (Math.random()-0.5)*3; rz = Math.sin(i)*0.6; } // Mengisi 50 persen partikel roket pada permukaan badan silinder.
    else if (rPart < 0.8) { const h = Math.random()*1.5; const r = 0.6*(1-h/1.5); rx=Math.cos(i)*r; ry=1.5+h; rz=Math.sin(i)*r; } // Mengisi 30 persen berikutnya pada kerucut kepala roket.
    else { const fa = (Math.floor(Math.random()*4)*Math.PI)/2; const fl=Math.random()*1.2; rx=Math.cos(fa)*(0.6+fl); ry=-1.5+(Math.random()*0.8); rz=Math.sin(fa)*(0.6+fl); } // Mengisi partikel sisanya pada empat sirip di bagian bawah roket.
    shapes.ROCKET.push(rx*0.8, ry*0.8, rz*0.8); // Menyimpan koordinat roket dengan skala 0,8.

    // 4. HAND 
    const hPart = Math.random(); // Memilih apakah partikel membentuk telapak atau jari.
    let hx, hy; // Menyiapkan koordinat horizontal dan vertikal bentuk tangan.
    if (hPart < 0.3) { hx = (Math.random()-0.5)*1.8; hy = (Math.random()-1)*1.8; } // Mengisi 30 persen partikel tangan pada bidang telapak.
    else { // Menjalankan bagian alternatif dari kondisi sebelumnya.
        const fIdx = Math.floor(Math.random()*5); // Memilih salah satu dari lima jari secara acak.
        let fX, fH, fY=0, fA=0; // Menyiapkan posisi pangkal, panjang, ketinggian, dan kemiringan jari.
        if(fIdx===0){ fX=-1.3; fH=1.0; fA=0.5; fY=-0.5; } // Menentukan bentuk ibu jari yang miring ke samping.
        else if(fIdx===1){ fX=-0.6; fH=1.8; } // Menentukan posisi dan panjang jari telunjuk.
        else if(fIdx===2){ fX=0; fH=2.2; } // Menentukan posisi dan panjang jari tengah.
        else if(fIdx===3){ fX=0.6; fH=1.9; } // Menentukan posisi dan panjang jari manis.
        else { fX=1.2; fH=1.5; } // Menentukan posisi dan panjang jari kelingking.
        const seg = Math.random()*fH; // Memilih titik acak sepanjang jari yang dipilih.
        hx = fX + (Math.sin(fA)*seg); hy = fY + (Math.cos(fA)*seg); // Menghitung posisi titik jari dengan mempertimbangkan kemiringannya.
    } // Mengakhiri blok perulangan, kondisi, atau fungsi di atas.
    shapes.HAND.push(hx, hy, (Math.random()-0.5)*0.2); // Menyimpan koordinat tangan dengan ketebalan acak pada sumbu Z.

    // 5. SATURNUS 
    let sx, sy, sz; // Menyiapkan tiga koordinat sementara untuk Saturnus.
    if (Math.random() < 0.5) { // Membagi partikel Saturnus antara permukaan planet dan cincin.
        const u = Math.random() * Math.PI * 2; // Memilih sudut azimut acak pada permukaan bola.
        const v = Math.acos(2 * Math.random() - 1); // Memilih sudut polar agar titik tersebar pada permukaan bola.
        const sr = 1.3; // Menetapkan radius planet sebesar 1,3 satuan.
        sx = sr * Math.sin(v) * Math.cos(u); // Mengubah koordinat bola menjadi komponen X.
        sy = sr * Math.sin(v) * Math.sin(u); // Mengubah koordinat bola menjadi komponen Y.
        sz = sr * Math.cos(v); // Mengubah koordinat bola menjadi komponen Z.
    } else { // Menjalankan cabang alternatif ketika kondisi sebelumnya tidak terpenuhi.
        const inner = 1.8, outer = 3.2; // Menentukan batas radius dalam dan luar cincin Saturnus.
        const rr = inner + Math.random() * (outer - inner); // Memilih radius partikel di antara batas cincin.
        const sa = Math.random() * Math.PI * 2; // Memilih sudut acak untuk posisi partikel pada cincin.
        sx = rr * Math.cos(sa); // Menghitung komponen X cincin Saturnus.
        sy = (Math.random()-0.5) * 0.1; // Memberikan ketebalan tipis pada cincin Saturnus.
        sz = rr * Math.sin(sa); // Menghitung komponen Z cincin Saturnus.
    } // Mengakhiri blok perulangan, kondisi, atau fungsi di atas.
    shapes.SATURN.push(sx, sy, sz); // Menyimpan koordinat planet atau cincin Saturnus.

    positions[i3] = shapes.GALAXY[i3]; // Mengisi koordinat X awal dari bentuk galaksi.
    positions[i3+1] = shapes.GALAXY[i3+1]; // Mengisi koordinat Y awal dari bentuk galaksi.
    positions[i3+2] = shapes.GALAXY[i3+2]; // Mengisi koordinat Z awal dari bentuk galaksi.
} // Mengakhiri blok perulangan, kondisi, atau fungsi di atas.
