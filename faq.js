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
});

// Tutup dropdown jika klik di luar
document.addEventListener("click", function (event) {
    if (!menuToggle.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove("show");
        menuIcon.style.transform = "rotate(0deg)"; // Kembalikan ikon ke posisi awal
    }
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


const API_KEY = "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";

async function askAI() {
    const question = document.getElementById("userQuestion").value;
    const aiAnswerDiv = document.getElementById("aiAnswer");

    if (!question) {
        aiAnswerDiv.innerText = "Silakan masukkan pertanyaan.";
        return;
    }

    aiAnswerDiv.innerText = "Sedang menjawab...";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: question }]
            })
        });

        const data = await response.json();
        aiAnswerDiv.innerText = data.choices[0].message.content.trim();
    } catch (error) {
        aiAnswerDiv.innerText = "Gagal menjawab: " + error.message;
    }
}
