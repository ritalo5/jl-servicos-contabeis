import { supabase } from './supabase.js'

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdown = document.querySelector('.menu-item.dropdown');

/* MENU MOBILE (ABRIR/FECHAR) */
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
}

/* DROPDOWN MOBILE (CLIQUE NO CELULAR) */
if (dropdownToggle) {
  dropdownToggle.addEventListener('click', (e) => {
    // Só age como clique se a tela for pequena
    if (window.innerWidth <= 768) {
      e.preventDefault();
      e.stopPropagation(); // Evita fechar o menu ao clicar
      dropdown.classList.toggle('active'); // Usaremos 'active' para o mobile
      
      const subMenu = dropdown.querySelector('.dropdown-menu');
      if (subMenu) {
        subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
      }
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
    console.warn('Supabase: Verifique as tabelas ou conexão.', error.message);
  }
}

testSupabase();
