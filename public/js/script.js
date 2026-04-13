async function cargarUsuarios() {
  try {
    const res = await fetch('/api/users');
    const data = await res.json();

    const lista = document.getElementById('lista-usuarios');

    lista.innerHTML = '';

    data.forEach(usuario => {
      const li = document.createElement('li');
      li.textContent = `${usuario.nombre} - ${usuario.email} - ${usuario.edad}`;
      lista.appendChild(li);
    });

  } catch (error) {
    console.log('Error:', error);
  }
}


cargarUsuarios();