const supabaseUrl = 'https://byseuxjiqggbctokhrec.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5c2V1eGppcWdnYmN0b2tocmVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0OTcxMzYsImV4cCI6MjA1NzA3MzEzNn0.VyaQMbjhWTJosC-D2ODBcHsXplsKTHFw1nZjBLPWTM8'; // Ganti dengan key asli kamu
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function login() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        alert("Login gagal: " + error.message);
        return;
    }

    // Kalau login berhasil, redirect ke halaman homepage
    window.location.href = "folderku.html"; // Ganti dengan homepage kamu
}
