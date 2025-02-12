import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";

// Importa los estilos de Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const reviews = [
  {
    id: 1,
    nombre: "Juan Pérez",
    curso: "Python Básico",
    reseña: "Este curso me ayudó a comenzar desde cero. Muy claro y bien explicado.",
    calificacion: 5
  },
  {
    id: 2,
    nombre: "Ana López",
    curso: "Java Profesional",
    reseña: "Muy completo y con ejemplos prácticos. Recomendado para avanzados.",
    calificacion: 4
  },
  {
    id: 3,
    nombre: "Carlos García",
    curso: "HTML y CSS para Principiantes",
    reseña: "Perfecto para entender las bases del desarrollo web. Muy recomendable.",
    calificacion: 5
  },
  {
    id: 4,
    nombre: "Sofía Martínez",
    curso: "Introducción a React",
    reseña: "Me encantó cómo explicaron los hooks y el estado. Súper práctico.",
    calificacion: 5
  },
  {
    id: 5,
    nombre: "Luis Torres",
    curso: "JavaScript Intermedio",
    reseña: "Buen curso, aunque me hubiera gustado más ejercicios prácticos.",
    calificacion: 4
  }
];

export default function ReviewSlider() {
  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">Reseñas de Nuestros Cursos</h2>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 3000 }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        className="w-full"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">{review.nombre}</h3>
              <p className="text-gray-500 text-sm mb-2">Curso: {review.curso}</p>
              <p className="text-gray-700 mb-4">{review.reseña}</p>
              <div className="flex items-center">
                {Array(review.calificacion)
                  .fill()
                  .map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568L24 9.423l-6 6.173 1.419 8.404L12 18.521l-7.419 5.479L6 15.596 0 9.423l8.332-1.268L12 .587z" />
                    </svg>
                  ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
