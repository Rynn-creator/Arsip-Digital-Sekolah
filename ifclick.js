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
