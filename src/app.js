const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();


let usuarios = [];
let idCounter = 1;
const filePath = './users.json';

if (fs.existsSync(filePath)) {
  const data = fs.readFileSync(filePath, 'utf-8');
  usuarios = JSON.parse(data);
  idCounter = usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1;
}

function guardarUsuarios() {
  fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));
}

const publicDirectorypath = path.join(__dirname, '../public');
console.log(publicDirectorypath);

app.use(express.static(publicDirectorypath));

app.use(express.json());

// Operaciones CRUD
// Crear un nuevo usuario
app.post('/api/users', (req, res) => {
  const { nombre, email, edad } = req.body;


  if (!nombre || !email || !edad) {
    return res.status(400).send({
      mensaje: 'Todos los campos son obligatorios'
    });
  }

  const nuevoUsuario = {
    id: idCounter,
    nombre,
    email,
    edad,
    activo: true
  };

  idCounter++;

  usuarios.push(nuevoUsuario);
  guardarUsuarios();

  res.status(201).send({
    mensaje: 'Usuario creado correctamente',
    usuario: nuevoUsuario
  });
});

//operacion de lectura para Get
app.get('/api/users', (req, res) => {
  res.send(usuarios);
});

  
// para actualizar
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, email, edad } = req.body;

  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).send({
      mensaje: 'Usuario no encontrado'
    });
  }

  usuario.nombre = nombre || usuario.nombre;
  usuario.email = email || usuario.email;
  usuario.edad = edad || usuario.edad;

  res.send({
    mensaje: 'Usuario actualizado correctamente',
    usuario
  });
  guardarUsuarios();
});

// eliminar un usuario
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const usuarioIndex = usuarios.findIndex(u => u.id === id);

  if (usuarioIndex === -1) {
    return res.status(404).send({
      mensaje: 'Usuario no encontrado'
    });
  }

  usuarios.splice(usuarioIndex, 1);
  
  res.send({
    mensaje: 'Usuario eliminado correctamente'
  });
  guardarUsuarios();
});

app.get('/', (req, res) => {
  res.send({ usuarios});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});