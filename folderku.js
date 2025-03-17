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

const { createClient } = supabase;

const supabaseUrl = "https://byseuxjiqggbctokhrec.supabase.co"; // Ganti dengan URL Supabase kamu
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5c2V1eGppcWdnYmN0b2tocmVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0OTcxMzYsImV4cCI6MjA1NzA3MzEzNn0.VyaQMbjhWTJosC-D2ODBcHsXplsKTHFw1nZjBLPWTM8"; // Ganti dengan API Key kamu

window.supabase = createClient(supabaseUrl, supabaseKey);

console.log("Supabase Initialized:", window.supabase);


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

async function fetchFiles() {
    const { data, error } = await supabase.storage.from("Arsip-Digital").list('Upload/'); // Sesuaikan path folder

    if (error) {
        console.error("Error mengambil file:", error);
        return;
    }

    const fileList = document.getElementById('file-list');
    fileList.innerHTML = ''; // Kosongkan daftar sebelum update

    data.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.classList.add('file-item');

        // URL file
        const fileUrl = `${"https://byseuxjiqggbctokhrec.supabase.co"}/storage/v1/object/public/${"Arsip-Digital"}/Upload/${file.name}`;

        // Cek ekstensi file
        const ext = file.name.split('.').pop().toLowerCase();
        let thumbnailSrc;

        if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
            // Jika file adalah gambar, gunakan sebagai thumbnail
            thumbnailSrc = fileUrl;
        } else if (ext === "pdf") {
            thumbnailSrc = "pdficon.png"; // Ikon PDF
        } else if (["doc", "docx"].includes(ext)) {
            thumbnailSrc = "wordicon.png"; // Ikon Word
        } else if (["xlsm", "xlsx", "Xlsm"].includes(ext)) {
            thumbnailSrc = "excelicon.png"; // Ikon Excel
        } else if (["mp4", "mkv", "avi"].includes(ext)) {
            thumbnailSrc = "videoicon.png"; // Ikon Video
        } else {
            thumbnailSrc = "fileicon.png"; // Ikon default untuk file lain
        }

        // Elemen gambar atau ikon
        const filePreview = document.createElement('img');
        filePreview.src = thumbnailSrc;
        filePreview.classList.add('file-preview');

        // Elemen teks nama file
        const fileName = document.createElement('p');
        fileName.textContent = file.name;
        fileName.classList.add('file-name');

        // Tombol Download
        const downloadBtn = document.createElement('button');
        downloadBtn.textContent = "Download";
        downloadBtn.classList.add('download-btn');
        downloadBtn.onclick = () => downloadFile(fileUrl, file.name);

        // Susun elemen ke dalam fileItem
        fileItem.appendChild(filePreview);
        fileItem.appendChild(fileName);
        fileItem.appendChild(downloadBtn);

        // Tambahkan fileItem ke dalam daftar file
        fileList.appendChild(fileItem);
    });
}

async function downloadFile(fileUrl, fileName) {
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Panggil fungsi saat halaman dimuat
fetchFiles();
