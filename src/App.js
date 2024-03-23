import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Form, Button } from 'react-bootstrap';


const apiUrl = 'https://api.escuelajs.co/api/v1/categories';

function App() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', image: '' });
  const [editing, setEditing] = useState(false);

  // Cargar categorías
  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => console.error('Hubo un error al cargar las categorías', error));
  }, []);

  // Manejar cambios en los inputs
  const handleInputChange = (event) => {
    setNewCategory({ ...newCategory, [event.target.name]: event.target.value });
  };

  // Crear nueva categoría
  const createCategory = () => {
    axios.post(apiUrl, newCategory)
      .then(response => {
        setCategories([...categories, response.data]);
        setNewCategory({ name: '', image: '' });
        Alert.success('Categoría creada con éxito');
      })
      .catch(error => Alert.error('Error al crear categoría'));
  };

  // Actualizar categoría
  const updateCategory = (id) => {
    axios.put(`${apiUrl}/${id}`, newCategory)
      .then(response => {
        setCategories(categories.map(category => category.id === id ? response.data : category));
        setEditing(false);
        setNewCategory({ name: '', image: '' });
        Alert.success('Categoría actualizada con éxito');
      })
      .catch(error => Alert.error('Error al actualizar categoría'));
  };

  // Eliminar categoría
  const deleteCategory = (id) => {
    axios.delete(`${apiUrl}/${id}`)
      .then(() => {
        setCategories(categories.filter(category => category.id !== id));
        Alert.success('Categoría eliminada con éxito');
      })
      .catch(error => Alert.error('Error al eliminar categoría'));
  };

  return (
    <div>
      <h1>CRUD de Categorías</h1>
      <Form>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="name" value={newCategory.name} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Imagen URL</Form.Label>
          <Form.Control type="text" name="image" value={newCategory.image} onChange={handleInputChange} />
        </Form.Group>
        {editing ? (
          <Button variant="primary" onClick={() => updateCategory(newCategory.id)}>Actualizar</Button>
        ) : (
          <Button variant="success" onClick={createCategory}>Crear</Button>
        )}
      </Form>
      {/* Listado de categorías */}
      {/* ... */}
    </div>
  );
}

export default App;

