const { createClient } = supabase;

const supabaseUrl = "https://byseuxjiqggbctokhrec.supabase.co"; // Ganti dengan URL Supabase kamu
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5c2V1eGppcWdnYmN0b2tocmVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0OTcxMzYsImV4cCI6MjA1NzA3MzEzNn0.VyaQMbjhWTJosC-D2ODBcHsXplsKTHFw1nZjBLPWTM8"; // Ganti dengan API Key kamu

window.supabase = createClient(supabaseUrl, supabaseKey);

console.log("Supabase Initialized:", window.supabase);
