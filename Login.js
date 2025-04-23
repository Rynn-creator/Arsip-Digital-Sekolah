const supabaseUrl = 'https://<project-ref>.supabase.co';
const supabaseKey = '<your-anon-public-api-key>';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    document.getElementById('message').textContent = 'Login gagal: ' + error.message;
  } else {
    // redirect ke homepage (misalnya index.html)
    window.location.href = "index.html";
  }
}
