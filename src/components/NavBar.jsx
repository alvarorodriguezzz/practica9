// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // 1. Al montar, cargar el usuario logueado desde localStorage.
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      setLoggedInUser(user);
    }

    // 2. (Opcional) Escuchar cambios en 'storage' para cuando se modifique
    //    localStorage en otras pestañas o al cerrar sesión desde otra vista.
    function handleStorageChange() {
      const updatedUser = JSON.parse(localStorage.getItem('loggedInUser'));
      setLoggedInUser(updatedUser || null);
    }
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Borrar del localStorage al usuario
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    // Redirigir a la página principal (o donde gustes)
    window.location.href = '/';
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img
              src="/src/assets/logoP9.png"
              alt="CursosMason Logo"
              className="h-10 w-15 mr-2"
            />
            <span className="text-xl font-bold text-gray-800">CursosMason</span>
          </a>
        </div>

        {/* Botón Hamburguesa (versión móvil) */}
        <div className="md:hidden">
          <button
            onClick={handleToggle}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              // Ícono de Cerrar
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Ícono de Hamburguesa
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Enlaces del Menú */}
        <div
          className={`flex-1 justify-end md:flex md:items-center md:static ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 mt-2 md:mt-0">
            {loggedInUser ? (
              /* Si hay usuario logueado, mostrar "Mis Cursos" y "Cerrar Sesión" */
              <>
                <li>
                  <a
                    href="/misCursos"
                    className="text-blue-600 hover:text-blue-800 px-4 py-1"
                  >
                    Mis Cursos
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 border border-red-600 px-4 py-1 rounded hover:bg-red-50"
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              /* Si NO hay usuario, mostrar "Login" y "Registrarse" */
              <>
                <li>
                  <a
                    href="/login"
                    className="text-gray-700 px-4 py-1 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="/register"
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                  >
                    Registrarse
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
