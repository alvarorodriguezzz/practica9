import React, { useState, useEffect } from 'react';
import logo from '../assets/logoP9.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [idioma, setIdioma] = useState('es');
  const [moneda, setMoneda] = useState('EUR');

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedIdioma = localStorage.getItem('idioma') || 'es';
      const storedMoneda = localStorage.getItem('moneda') || 'EUR';
      setIdioma(storedIdioma);
      setMoneda(storedMoneda);

      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      if (user) {
        setLoggedInUser(user);
      }

      function handleStorageChange() {
        const updatedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        setLoggedInUser(updatedUser || null);
      }

      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem('loggedInUser');
      setLoggedInUser(null);
      window.location.href = '/';
    }
  };

  const handleIdiomaChange = (e) => {
    const nuevoIdioma = e.target.value;
    setIdioma(nuevoIdioma);
    if (typeof window !== "undefined") {
      localStorage.setItem('idioma', nuevoIdioma);
      window.location.reload();
    }
  };

  const handleMonedaChange = (e) => {
    const nuevaMoneda = e.target.value;
    setMoneda(nuevaMoneda);
    if (typeof window !== "undefined") {
      localStorage.setItem('moneda', nuevaMoneda);
      window.location.reload();
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img src={logo.src} alt="CursosMason Logo" className="h-10 w-auto mr-3" />
            <span className="text-2xl font-bold text-gray-800">CursosMason</span>
          </a>
        </div>

        {/* Selectores de idioma y moneda (Centrados) */}
        <div className="flex items-center space-x-6">
          <select 
            value={idioma} 
            onChange={handleIdiomaChange} 
            className="border px-3 py-2 rounded-md text-gray-700 font-medium shadow-sm hover:bg-gray-100 transition"
          >
            <option value="es">🇪🇸 Español</option>
            <option value="en">🇬🇧 English</option>
          </select>

          <select 
            value={moneda} 
            onChange={handleMonedaChange} 
            className="border px-3 py-2 rounded-md text-gray-700 font-medium shadow-sm hover:bg-gray-100 transition"
          >
            <option value="EUR">€ EUR</option>
            <option value="USD">$ USD</option>
            <option value="GBP">£ GBP</option>
          </select>
        </div>

        {/* Menú de usuario */}
        <div className="hidden md:flex items-center space-x-4">
          {loggedInUser ? (
            <>
              <a href="/misCursos" className="text-blue-600 font-medium hover:text-blue-800 transition">
                {idioma === 'es' ? 'Mis Cursos' : 'My Courses'}
              </a>
              <button 
                onClick={handleLogout} 
                className="text-red-600 border border-red-600 px-4 py-2 rounded-md font-medium hover:bg-red-50 transition"
              >
                {idioma === 'es' ? 'Cerrar Sesión' : 'Logout'}
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="text-gray-700 font-medium px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                Login
              </a>
              <a href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition">
                {idioma === 'es' ? 'Registrarse' : 'Sign Up'}
              </a>
            </>
          )}
        </div>

        {/* Botón para menú en móvil */}
        <div className="md:hidden">
          <button onClick={handleToggle} className="text-gray-700 focus:outline-none" aria-label="Toggle menu">
            {isOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden bg-gray-100 rounded-md mt-2 p-4 shadow-lg">
          <ul className="space-y-4 text-center">
            {loggedInUser ? (
              <>
                <li>
                  <a href="/misCursos" className="text-blue-600 font-medium block">
                    {idioma === 'es' ? 'Mis Cursos' : 'My Courses'}
                  </a>
                </li>
                <li>
                  <button 
                    onClick={handleLogout} 
                    className="text-red-600 border border-red-600 px-4 py-2 rounded-md font-medium hover:bg-red-50 transition w-full"
                  >
                    {idioma === 'es' ? 'Cerrar Sesión' : 'Logout'}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/login" className="text-gray-700 font-medium block">
                    Login
                  </a>
                </li>
                <li>
                  <a href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition block">
                    {idioma === 'es' ? 'Registrarse' : 'Sign Up'}
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
