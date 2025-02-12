import React, { useState, useEffect } from "react";

export default function VideoModal({ videoUrl, title, courseId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  // Validar acceso al curso
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      setHasAccess(false);
      return;
    }

    const purchasedCourses = JSON.parse(localStorage.getItem("purchasedCourses") || "[]");
    const hasPurchased = purchasedCourses.some(course => course.id === courseId); // Validamos por ID
    setHasAccess(hasPurchased);
  }, [courseId]);

  if (!hasAccess) {
    return (
      <div className="mt-8 bg-red-50 p-4 rounded-lg text-red-700">
        <p>No tienes acceso a este curso. Por favor, cómpralo para acceder al contenido.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
      >
        Ver Contenido del Curso
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-4 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
            >
              X
            </button>

            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <iframe
              width="100%"
              height="315"
              src={videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full rounded-lg shadow-md"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
