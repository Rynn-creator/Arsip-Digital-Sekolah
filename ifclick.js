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

// Fungsi untuk ngetik teks sekali
  function typeTextOnce(id, text, delay = 50, callback) {
    let el = document.getElementById(id);
    let i = 0;
    function type() {
      if (i < text.length) {
        el.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, delay);
      } else if (callback) {
        callback();
      }
    }
    type();
  }

  // Fungsi animasi ketik & hapus loop
  
  // Fungsi ngetik & hapus teks dari array
  function typeMultiple(id, texts, typingDelay = 60, erasingDelay = 40, pause = 1500) {
    const el = document.getElementById(id);
    let textIndex = 0;
    let charIndex = 0;
    let typing = true;

    function animate() {
      const currentText = texts[textIndex];
      
      if (typing) {
        if (charIndex < currentText.length) {
          el.textContent += currentText.charAt(charIndex);
          charIndex++;
          setTimeout(animate, typingDelay);
        } else {
          typing = false;
          setTimeout(animate, pause);
        }
      } else {
        if (charIndex > 0) {
          el.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
          setTimeout(animate, erasingDelay);
        } else {
          typing = true;
          textIndex = (textIndex + 1) % texts.length;
          setTimeout(animate, 500);
        }
      }
    }

    animate();
  }

  // Fungsi ketik judul sekali, lalu animasi subjudul loop
  window.onload = () => {
    const subjudulList = [
      "Jelajahi ribuan dokumen dan koleksi digital yang tersimpan dengan rapi.",
      "Temukan arsip penting dari berbagai kategori.",
      "Bagikan dan simpan dokumen digital dengan mudah."
    ];

    // Ketik judul utama sekali
    typeTextOnce("hero-title", "Selamat Datang di Arsip Digital", 60, () => {
      typeMultiple("hero-subtitle", subjudulList);
    });
  };

  // Fungsi ketik judul sekali
  function typeTextOnce(id, text, delay = 50, callback) {
    let el = document.getElementById(id);
    let i = 0;
    function type() {
      if (i < text.length) {
        el.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, delay);
      } else if (callback) {
        callback();
      }
    }
    type();
  }

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

const wrapper = document.querySelector(".carousel-wrapper");
const cards = document.querySelectorAll(".review-card");
const indicators = document.querySelectorAll(".indicator");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentIndex = 1; // Mulai dari tengah (review ke-2)

function updateCarousel() {
    cards.forEach((card, index) => {
        if (index === currentIndex) {
            card.style.filter = "none"; // Review yang aktif terlihat jelas
            card.style.transform = "scale(1.1)"; // Efek zoom untuk yang aktif
            card.style.opacity = "1"; 
        } else {
            card.style.filter = "blur(5px)"; // Review yang tidak aktif ngeblur
            card.style.transform = "scale(0.9)"; 
            card.style.opacity = "0.5"; 
        }
    });

    indicators.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}

prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
});

nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
});

indicators.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
    });
});

// Set posisi awal
updateCarousel();

document.addEventListener("DOMContentLoaded", function () {
    let questions = document.querySelectorAll(".question");

    questions.forEach(function (question) {
        question.addEventListener("click", function () {
            let answer = this.nextElementSibling;
            let icon = this.querySelector(".icon");

            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                answer.style.padding = "0 60px"; // Biar tetap rapi pas nutup
                question.classList.remove("active");
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.style.padding = "60px"; // Tambah padding pas dibuka
                question.classList.add("active");
            }
        });
    });
});
