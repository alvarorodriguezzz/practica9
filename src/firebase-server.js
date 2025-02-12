// src/firebase-server.js

import { db } from './firebase'; // Usar la misma configuración de Firebase

// Función para obtener todos los cursos desde Firebase
export async function getAllCourses() {
  const snapshot = await db.ref('categorias_educativas').once('value');
  const data = snapshot.val();
  
  if (!data) return [];

  return Object.values(data).flatMap(category => 
    Object.values(category.cursos || {}).map(course => ({
      ...course,
      category: category.nombre,
      id: course.id.toString(),
      price: course.precio || 0,
      level: course.nivel || 'Principiante'
    }))
  );
}

// Obtener un curso específico por ID
export async function getCourseById(id) {
  const courses = await getAllCourses();
  return courses.find(course => course.id === id);
}

// Función que devuelve los parámetros estáticos para Astro
export async function getStaticCourses() {
  const courses = await getAllCourses();
  return courses.map(course => ({
    params: { post: course.id },  // Generar rutas dinámicas en Astro
    props: { course }  // Enviar los datos del curso como props
  }));
}
