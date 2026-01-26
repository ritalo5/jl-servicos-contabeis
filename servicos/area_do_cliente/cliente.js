const SB_URL = 'https://qdgsmnfhpbkbovptwwjp.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkZ3NtbmZocGJrYm92cHR3d2pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxNTQ1MzYsImV4cCI6MjA4MzczMDUzNn0.-fpxGBv738LflicnI2edM7ywwAmed3Uka4111fzTj8c'; 
const supabaseClient = supabase.createClient(SB_URL, SB_KEY);

// --- LÓGICA DE LOGIN INTELIGENTE ---
const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert("Erro no login: " + error.message);
        } else {
            // Especialista: Primeiro buscamos a ROLE no profile para não depender só do e-mail
            const { data: profile } = await supabaseClient
                .from('profiles')
                .select('role')
                .eq('id', data.user.id)
                .single();

            const EMAIL_ADMIN = "jlservicoscontabeis0@gmail.com";

            // Se for Admin (pela role ou pelo email)
            if (profile?.role === 'admin' || data.user.email === EMAIL_ADMIN) {
                window.location.href = 'servicos/area_do_cliente/admin.html';
            } else {
                const urlParams = new URLSearchParams(window.location.search);
                const servicoEscolhido = urlParams.get('servico');
                
                // Se o login for feito na raiz, o caminho precisa ser completo
                const basePath = 'servicos/area_do_cliente/dashboard.html';
                window.location.href = servicoEscolhido 
                    ? `${basePath}?contratar=${servicoEscolhido}` 
                    : basePath;
            }
        }
    });
}

// --- FUNÇÕES DE APOIO PARA O DASHBOARD ---

async function checkUser() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
        window.location.href = '../../index.html'; // Volta para a raiz
        return null;
    }
    return user;
}

async function getProfileName(userId) {
    const { data } = await supabaseClient
        .from('profiles')
        .select('nome')
        .eq('id', userId)
        .single();
    return data ? data.nome : null;
}

// 3. Atualizado para a nova estrutura 'assinaturas' e 'cliente_id'
async function getUltimaAssinatura(userId) {
    const { data } = await supabaseClient
        .from('assinaturas') // Corrigido nome da tabela
        .select('*')
        .eq('cliente_id', userId) // Corrigido nome da coluna
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle(); // maybeSingle evita erro caso o cliente não tenha assinaturas
    
    return data;
}

async function logout() {
    await supabaseClient.auth.signOut();
    window.location.href = '../../index.html';
}
