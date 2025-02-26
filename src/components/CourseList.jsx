import React, { useEffect, useState, useRef } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import CartModal from './CartModal';

// Función para convertir el precio según la moneda seleccionada
function convertirPrecio(precio, moneda) {
  const tasasCambio = { EUR: 1, USD: 1.05, GBP: 0.83 }; 
  return (precio * tasasCambio[moneda]).toFixed(2);
}

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const coursesRef = useRef(null);

  // Estado para idioma y moneda
  const [idioma, setIdioma] = useState('es');
  const [moneda, setMoneda] = useState('EUR');

  // Obtener idioma y moneda al cargar el componente (solo en cliente)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedIdioma = localStorage.getItem('idioma') || 'es';
      const storedMoneda = localStorage.getItem('moneda') || 'EUR';
      setIdioma(storedIdioma);
      setMoneda(storedMoneda);
    }
  }, []);

  useEffect(() => {
    const handleFilter = (event) => {
      setSelectedCategory(event.detail);
      if (coursesRef.current) {
        coursesRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('filterCategory', handleFilter);
    return () => window.removeEventListener('filterCategory', handleFilter);
  }, []);

  useEffect(() => {
    const categoriesRef = ref(db, 'categorias_educativas');
    const unsubscribe = onValue(categoriesRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const allCourses = [];
          Object.values(data).forEach((category) => {
            Object.values(category.cursos).forEach((course) => {
              allCourses.push({
                ...course,
                category: category.nombre,
                id: course.id.toString(),
                price: course.precio || 0,
                level: course.nivel || 'Principiante',
              });
            });
          });
          setCourses(allCourses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const filteredCourses = courses.map((course) => ({
    ...course,
    titulo: idioma === "en" ? course.tituloEN || course.titulo : course.titulo,
    descripcion: idioma === "en" ? course.descripcionEN || course.descripcion : course.descripcion,
    priceSymbol: moneda === "EUR" ? `€${convertirPrecio(course.price, moneda)}` :
                 moneda === "USD" ? `$${convertirPrecio(course.price, moneda)}` :
                 `£${convertirPrecio(course.price, moneda)}`,
  })).filter((course) => {
    const matchesSearch =
      course.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.descripcion && course.descripcion.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory ? course.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (course) => {
    if (!cart.some(item => item.id === course.id)) {
      setCart([...cart, course]);
    } else {
      alert("El curso ya está en el carrito.");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando cursos...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Botón para abrir el carrito */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Carrito ({cart.length})
      </button>

      {/* Modal del carrito */}
      {isCartOpen && (
        <CartModal
          cart={cart}
          setCart={setCart}
          onClose={() => setIsCartOpen(false)}
        />
      )}

      {/* Barra de búsqueda y filtros */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder={idioma === "es" ? "🔍 Buscar cursos por título o descripción..." : "🔍 Search courses by title or description..."}
          className="w-full md:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory('')}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            {idioma === "es" ? "Limpiar filtros" : "Clear filters"}
          </button>
        )}
      </div>

      {selectedCategory && (
        <h2 className="text-2xl font-bold mb-6">
          {idioma === "es" ? "Mostrando cursos de:" : "Showing courses in:"} {selectedCategory}
        </h2>
      )}

      {/* Lista de cursos */}
      <div ref={coursesRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <a href={`/posts/${course.id}`}>
              <img
                src={course.imagen || 'https://th.bing.com/th/id/OIP.jAJq0Lj1krA6XGLvIiihKAHaEK?rs=1&pid=ImgDetMain'}
                alt={course.titulo}
                className="w-full h-48 object-cover"
                onError={(e) =>
                  (e.target.src =
                    'https://th.bing.com/th/id/OIP.jAJq0Lj1krA6XGLvIiihKAHaEK?rs=1&pid=ImgDetMain')
                }
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{course.titulo}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      course.level === 'Avanzado'
                        ? 'bg-red-100 text-red-800'
                        : course.level === 'Intermedio'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {course.level}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{course.descripcion}</p>
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold text-blue-600">{course.priceSymbol}</p>
                  <span className="text-sm text-gray-500">{course.category}</span>
                </div>
              </div>
            </a>
            <div className="p-4">
              <button
                onClick={() => addToCart(course)}
                className="w-full bg-blue-400 text-white py-2 rounded hover:bg-green-700 transition"
              >
                {idioma === "es" ? "Agregar al carrito" : "Add to cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;
