async function cargarUsuarios() {
  try {
    const res = await fetch('/api/users');
    const usuarios = await res.json();

    const lista = document.getElementById('lista-usuarios');
    lista.innerHTML = '';

    usuarios.forEach(u => {
      const li = document.createElement('li');
      li.textContent = `${u.id} - ${u.nombre} - ${u.email} - ${u.edad}`;
      lista.appendChild(li);
    });

  } catch (error) {
    console.error('Error cargando usuarios:', error);
  }
}