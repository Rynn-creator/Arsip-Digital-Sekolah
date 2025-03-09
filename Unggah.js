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


// Inisialisasi Firebase tanpa import
const firebaseConfig = {
    apiKey: "AIzaSyCnBckj5dIsfQOVCVOzFb5nxZlBZ5ps",
    authDomain: "arsip-digital-95087.firebaseapp.com",
    projectId: "arsip-digital-95087",
    storageBucket: "arsip-digital-95087.appspot.com",
    messagingSenderId: "554293373619",
    appId: "1:554293373619:web:xxxxxx"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Akses Firebase Storage
const storage = firebase.storage();



