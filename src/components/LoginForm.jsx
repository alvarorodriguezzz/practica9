import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Obtener usuarios registrados
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Verificar credenciales
    const validUser = users.find(
      user => user.email === email && user.password === password
    );

    if (validUser) {
      // Guardamos la sesión en localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(validUser));

      // Redirigir al Home (o adonde quieras)
      window.location.href = '/';
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            required
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2">Contraseña:</label>
          <input
            type="password"
            required
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
