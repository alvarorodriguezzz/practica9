import React, { useEffect, useState } from 'react';

export default function PurchasedCourses() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    // Leer la lista de cursos comprados desde localStorage
    const storedCourses = JSON.parse(localStorage.getItem('purchasedCourses')) || [];
    setPurchasedCourses(storedCourses);
  }, []);

  if (!purchasedCourses.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No has comprado ningún curso aún.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {purchasedCourses.map((course) => (
        <div
          key={course.id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
        >
          {/* Imagen del curso */}
          <img
            src={course.imagen || 'https://via.placeholder.com/300x200'}
            alt={course.titulo}
            className="w-full h-48 object-cover"
          />
          
          <div className="p-4">
            {/* Título del curso */}
            <h2 className="text-lg font-bold text-gray-800">{course.titulo}</h2>
            
            {/* Descripción */}
            <p className="text-gray-600 line-clamp-2">
              {course.descripcion || "Sin descripción"}
            </p>

            {/* Enlace al curso */}
            <a
              href={`/posts/${course.id}`}
              className="block mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors text-center"
            >
              Ir al curso
            </a>          
          </div>
        </div>
      ))}
    </div>
  );
}
