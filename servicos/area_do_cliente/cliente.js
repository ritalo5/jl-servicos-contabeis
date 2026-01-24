// Alteramos o nome da variável para evitar conflito com a biblioteca
const SB_URL = 'https://qdgsmnfhpbkbovptwwjp.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkZ3NtbmZocGJrYm92cHR3d2pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxNTQ1MzYsImV4cCI6MjA4MzczMDUzNn0.-fpxGBv738LflicnI2edM7ywwAmed3Uka4111fzTj8c';

// Aqui está o segredo: usamos o objeto global 'supabase' para criar o nosso 'supabaseClient'
const supabaseClient = supabase.createClient(SB_URL, SB_KEY);

const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Usando a nova variável supabaseClient
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            alert("Erro no login: " + error.message);
        } else {
            console.log("Sucesso!");
            window.location.href = 'dashboard.html';
        }
    });
}

// Funções globais usando a nova variável
async function checkUser() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
        window.location.href = 'index.html';
    }
    return user;
}

async function logout() {
    await supabaseClient.auth.signOut();
    window.location.href = 'index.html';
}
