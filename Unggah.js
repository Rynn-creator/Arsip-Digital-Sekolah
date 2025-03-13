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

const fileInput = document.querySelector('input[type="file"]');

async function uploadFile() {
    const file = fileInput.files[0];
    if (!file) {
        alert("Pilih file terlebih dahulu!");
        return;
    }

    try {
        // Pastikan supabase sudah ada
        if (!window.supabase) {
            alert("Supabase belum diinisialisasi!");
            return;
        }

        // Pastikan storage ada
        if (!window.supabase.storage) {
            alert("Supabase storage tidak ditemukan!");
            return;
        }

        // Pastikan bucket sudah benar
        const { data, error } = await window.supabase.storage
            .from("Arsip-Digital")  // Ganti dengan nama bucket di Supabase
            .upload(`Upload/${file.name}`, file, { upsert: true });

        if (error) throw error;

        console.log("Upload berhasil!", data);
        alert("Upload berhasil! File tersimpan.");
    } catch (error) {
        console.error("Upload gagal:", error.message);
        alert("Upload gagal! " + error.message);
    }
}

console.log("Supabase Object:", window.supabase);
console.log("Supabase Storage:", window.supabase?.storage);

document.querySelector("button").addEventListener("click", uploadFile);
