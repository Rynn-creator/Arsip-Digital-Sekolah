document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle a");
    const dropdown = document.querySelector(".dropdown");
    const menuIcon = document.querySelector(".menu-toggle i");

    menuToggle.addEventListener("click", function (event) {
        event.preventDefault();
        dropdown.classList.toggle("show");

        // Putar ikon menu saat dropdown aktif
        if (dropdown.classList.contains("show")) {
            menuIcon.style.transform = "rotate(90deg)";
        } else {
            menuIcon.style.transform = "rotate(0deg)";
        }
    });

    // Tutup dropdown jika klik di luar
    document.addEventListener("click", function (event) {
        if (!menuToggle.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.remove("show");
            menuIcon.style.transform = "rotate(0deg)"; // Kembalikan ikon ke posisi awal
        }
    });
});

document.querySelector(".menu-toggle").addEventListener("click", function () {
    let dropdown = document.querySelector(".dropdownMenu");
    dropdown.classList.toggle("show"); // Toggle class 'show'
});


document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const results = document.getElementById('searchResults');

    const items = ["Dokumen Sekolah", "Laporan Keuangan", "Rapat Guru", "Absensi Siswa"];
    results.innerHTML = '';

    if (query) {
        const filteredItems = items.filter(item => item.toLowerCase().includes(query));
        if (filteredItems.length > 0) {
            results.style.display = 'block'; // Tampilkan hasil pencarian
            filteredItems.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                results.appendChild(li);
            });
        } else {
            results.style.display = 'none'; // Sembunyikan jika tidak ada hasil
        }
    } else {
        results.style.display = 'none'; // Sembunyikan jika input kosong
    }
});

// Sembunyikan dropdown jika klik di luar
document.addEventListener('click', function(e) {
    if (!document.querySelector('.search-box').contains(e.target)) {
        document.getElementById('searchResults').style.display = 'none';
    }
});

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Konfigurasi Firebase (sesuaikan dengan proyekmu)
const firebaseConfig = {
    apiKey: "AIzaSyCnbzhCKjdS1fsOQVCVzoFbFSnxZlB2Spg",
    authDomain: "arsip-digital-95087.firebaseapp.com",
    projectId: "arsip-digital-95087",
    storageBucket: "arsip-digital-95087.firebasestorage.app",
    messagingSenderId: "554203376915",
    appId: "1:554203376915:web:61630254fd0a20a1323ee6",
    measurementId: "G-C7TL3XPYQ4"
  };

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Fungsi Upload File
document.getElementById("uploadBtn").addEventListener("click", () => {
    const fileInput = document.getElementById("fileInput").files[0];
    if (!fileInput) {
        alert("Pilih file terlebih dahulu!");
        return;
    }

    const storageRef = ref(storage, `uploads/${fileInput.name}`); // Simpan di folder 'uploads/'
    
    uploadBytes(storageRef, fileInput)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((downloadURL) => {
            alert("File berhasil diupload! Link: " + downloadURL);
            console.log("Download URL:", downloadURL);
        })
        .catch((error) => {
            console.error("Upload gagal:", error);
        });
});
