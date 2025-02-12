import React from 'react';

export default function CartModal({ cart, setCart, onClose }) {
  const handleRemove = (id) => {
    setCart(cart.filter(course => course.id !== id));
  };

  const handlePurchase = () => {
    const user = localStorage.getItem('loggedInUser');
    if (!user) {
      alert("Debes iniciar sesión para comprar.");
      return;
    }
  
    const purchasedCourses = JSON.parse(localStorage.getItem('purchasedCourses') || '[]');
  
    // Cada elemento 'course' en el carrito DEBE tener la propiedad 'id'
    // para que luego .some(c => c.id === courseData.id) funcione.
    const newPurchases = [...purchasedCourses, ...cart];
  
    // Guardamos la nueva lista
    localStorage.setItem('purchasedCourses', JSON.stringify(newPurchases));
    setCart([]);
  
    alert("Compra realizada con éxito. Ahora puedes acceder a los cursos.");
    onClose();
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
        >
          X
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Carrito de Compras</h2>
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">No hay cursos en el carrito.</p>
        ) : (
          <>
            <ul className="space-y-2">
              {cart.map(course => (
                <li
                  key={course.id}
                  className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
                >
                  <span>{course.titulo} - ${course.price}</span>
                  <button
                    onClick={() => handleRemove(course.id)}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={handlePurchase}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Comprar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
