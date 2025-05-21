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
        resultsContainer.innerHTML = ""; 
    }
});
});


const API_KEY = "cmLHa3mMPKPJReANzKQ0wrapAH5lULG7BxeCqxX0"; 
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const clearBtn = document.getElementById("clear-history");
const toggleModeBtn = document.getElementById("toggle-mode");

// Load history
let history = JSON.parse(localStorage.getItem("chatHistory")) || [];
history.forEach(({ role, content }) => addMessage(role, content));

function addMessage(role, content, typing = false) {
  const div = document.createElement("div");
  div.className = `bubble ${role}`;
  div.innerText = typing ? "" : content;

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;

  if (typing) {
    let i = 0;
    const interval = setInterval(() => {
      if (i < content.length) {
        div.innerText += content.charAt(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 25);
  }
}

async function sendMessage() {
  const question = input.value.trim();
  if (!question) return;

  addMessage("user", question);
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  addMessage("ai", "Mengetik...", false);

  try {
    const response = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "Cohere-Version": "2022-12-06"
      },
      body: JSON.stringify({
        model: "command-r",
        message: question
      })
    });

    const result = await response.json();
    const answer = result.text.trim();

    // Ganti "Mengetik..." dengan jawaban
    const lastAiBubble = chatBox.querySelector(".bubble.ai:last-child");
    if (lastAiBubble) chatBox.removeChild(lastAiBubble);
    addMessage("ai", answer, true);

    // Simpan ke localStorage
    history.push({ role: "user", content: question });
    history.push({ role: "ai", content: answer });
    localStorage.setItem("chatHistory", JSON.stringify(history));
  } catch (err) {
    console.error("Gagal menjawab:", err);
  }
}

// Tombol hapus history
clearBtn.addEventListener("click", () => {
  localStorage.removeItem("chatHistory");
  chatBox.innerHTML = "";
});

// Dark mode toggle
toggleModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
