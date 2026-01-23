import { supabase } from './supabase.js'

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdown = document.querySelector('.menu-item.dropdown');

/* MENU MOBILE (ABRIR/FECHAR O HAMBÚRGUER) */
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
}

/* DROPDOWN INTELIGENTE (MOBILE) */
if (dropdownToggle) {
  let isDropdownOpen = false;

  dropdownToggle.addEventListener('click', (e) => {
    // Só aplica a lógica especial se a tela for menor que 768px
    if (window.innerWidth <= 768) {
      
      // Se for o primeiro clique, ele abre a lista em vez de seguir o link
      if (!isDropdownOpen) {
        e.preventDefault(); 
        e.stopPropagation();
        
        dropdown.classList.add('active');
        const subMenu = dropdown.querySelector('.dropdown-menu');
        if (subMenu) {
          subMenu.style.display = 'block';
        }
        
        isDropdownOpen = true; // Agora o próximo clique funcionará como link
      }
      // Se clicar de novo com ele aberto, o preventDefault não será chamado e ele seguirá o link para /servicos/index.html
    }
  });

  // Fecha o dropdown se clicar fora dele
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      const subMenu = dropdown.querySelector('.dropdown-menu');
      if (subMenu) subMenu.style.display = 'none';
      dropdown.classList.remove('active');
      isDropdownOpen = false;
    }
  });
}

/* SUPABASE - TESTE SEGURO */
async function testSupabase() {
  try {
    const { data, error } = await supabase.from('servicos').select('*');
    if (error) throw error;
    console.log('Supabase conectado com sucesso!');
  } catch (error) {
    console.warn('Supabase: Conexão ativa, mas verifique as tabelas.', error.message);
  }
}

testSupabase();
