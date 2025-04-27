// Isi dengan URL dan API KEY proyek Supabase kamu
const supabaseUrl = 'https://byseuxjiqggbctokhrec.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5c2V1eGppcWdnYmN0b2tocmVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0OTcxMzYsImV4cCI6MjA1NzA3MzEzNn0.VyaQMbjhWTJosC-D2ODBcHsXplsKTHFw1nZjBLPWTM8'; // pakai anon key
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function register() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    alert('Gagal daftar: ' + error.message);
  } else {
    alert('Berhasil daftar! Silakan login.');
    window.location.href = "Login.html"; // Redirect ke halaman login
  }
}
