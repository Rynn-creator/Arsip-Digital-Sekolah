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


document.addEventListener("DOMContentLoaded", async () => {
    const searchInput = document.getElementById("searchInput");
    const resultsContainer = document.getElementById("results");

    // Fungsi untuk mendapatkan file dari Supabase
    async function getUploadedFiles() {
        const { data, error } = await supabase.storage.from('Arsip-Digital').list('Upload/');
        if (error) {
            console.error('Error fetching files:', error);
            return [];
        }
        return data.map(file => ({
            name: file.name,
            url: `${"https://byseuxjiqggbctokhrec.supabase.co"}/storage/v1/object/public/${"Arsip-Digital"}/Upload/${file.name}`
        }));
    }

    // Ambil daftar file dari Supabase saat halaman dimuat
    const uploadedFiles = await getUploadedFiles();

    // Fungsi untuk mencari file
    function searchFiles(query) {
        return uploadedFiles.filter(file => 
            file.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    // Menampilkan hasil pencarian di bawah input
    function displayResults(results) {
        resultsContainer.innerHTML = ""; // Kosongkan hasil sebelumnya
        if (results.length === 0) {
            resultsContainer.innerHTML = "<p>Tidak ada hasil ditemukan</p>";
            return;
        }

        results.forEach(file => {
            const item = document.createElement("div");
            item.classList.add("result-item");

            // Buat elemen gambar preview
            const img = document.createElement("img");
            img.src = file.url;
            img.alt = file.name;
            img.classList.add("result-img");

            const Pdf = document.createElement("Pdf");
            Pdf.src = file.url;
            Pdf.alt = file.name;
            Pdf.classList.add("result-Pdf");

            // Buat elemen teks nama file
            const text = document.createElement("p");
            text.textContent = file.name;

            item.appendChild(img);
            item.appendChild(Pdf);
            item.appendChild(text);

            // Klik file akan membukanya
            item.addEventListener("click", () => {
                window.open(file.url, "_blank");
            });

            resultsContainer.appendChild(item);
        });
    }

    // Event listener untuk pencarian
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.trim();
        if (query.length > 0) {
            const results = searchFiles(query);
            displayResults(results);
        } else {
            resultsContainer.innerHTML = ""; // Kosongkan hasil jika input kosong
        }
    });
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
    console.log("Isi file:", file);
    console.log("Nama file:", file ? file.name : "Tidak ada file!");
    
        // Pastikan bucket sudah benar
        const { data, error } = await window.supabase.storage
            .from("Arsip-Digital")  // Ganti dengan nama bucket di Supabase
            .upload(`Upload/${file.name}`, file, { upsert: true });

        if (error) throw error;

        console.log("Upload berhasil!", data);
        alert("Upload berhasil! File tersimpan.");
        window.location.href = "./folderku.html"; // Ganti dengan URL halaman "Folderku"
    } catch (error) {
        console.error("Upload gagal:", error.message);
        alert("Upload gagal! " + error.message);
    }
    

        console.log("URL File:", fileUrl);
}

console.log("Supabase Object:", window.supabase);
console.log("Supabase Storage:", window.supabase?.storage);

document.querySelector("button").addEventListener("click", uploadFile);


const { createClient } = supabase;

const supabaseUrl = "https://byseuxjiqggbctokhrec.supabase.co"; // Ganti dengan URL Supabase kamu
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5c2V1eGppcWdnYmN0b2tocmVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0OTcxMzYsImV4cCI6MjA1NzA3MzEzNn0.VyaQMbjhWTJosC-D2ODBcHsXplsKTHFw1nZjBLPWTM8"; // Ganti dengan API Key kamu

window.supabase = createClient(supabaseUrl, supabaseKey);

console.log("Supabase Initialized:", window.supabase);

