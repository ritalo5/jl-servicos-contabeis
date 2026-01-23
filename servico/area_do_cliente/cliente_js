const SB_URL = 'https://qdgsmnfhpbkbovptwwjp.supabase.co;
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkZ3NtbmZocGJrYm92cHR3d2pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxNTQ1MzYsImV4cCI6MjA4MzczMDUzNn0.-fpxGBv738LflicnI2edM7ywwAmed3Uka4111fzTj8c'
const supabase = supabase.createClient(SB_URL, SB_KEY);

const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            alert("Erro no login: " + error.message);
        } else {
            // Login bem sucedido, vai para o dashboard
            window.location.href = 'dashboard.html';
        }
    });
}

// Função para verificar se o usuário está logado (usar no dashboard.html)
async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        window.location.href = 'index.html'; // Se não estiver logado, volta pro login
    }
    return user;
}

// Função para deslogar
async function logout() {
    await supabase.auth.signOut();
    window.location.href = 'index.html';
}
