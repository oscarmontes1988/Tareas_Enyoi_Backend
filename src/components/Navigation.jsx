//ESTE CODIGO ES EL HEADER DE LA PAGINA

// Importa el componente Link de react-router-dom para navegar entre rutas sin recargar la página.
import { Link } from "react-router-dom";

// Define y exporta un componente funcional llamado Navigation.
export function Navigation() {
  return (
    // Define una barra de navegación con una clase CSS 'navbar'.
    <nav className="navbar">

      {/* Enlace que redirige a la ruta '/tasks-create'. Representa la opción para crear nuevas tareas. */}
      <Link to="/tasks/create" className="navbar-button">
        {/* Imagen representativa para el botón de crear tareas */}
        <img className="icon-img"
          src="https://res.cloudinary.com/dfed81ssz/image/upload/v1746559415/CREAR1_vthsa3.png"
          alt="Crear Tareas"
        />
        {/* Título debajo del ícono, centrado y sin margen */}
        <h5 style={{ textAlign: "center", margin: 0 }}>Crear Tareas</h5>
      </Link>

      {/* Enlace que redirige a la ruta '/tasks'. Representa la opción para consultar tareas existentes. */}
      <Link to="/task" className="navbar-button">
        {/* Imagen representativa para el botón de consultar tareas */}
        <img className="icon-img"
          src="https://res.cloudinary.com/dfed81ssz/image/upload/v1746559415/CONSULTAR1_nn3bd2.png"
          alt="Consultar Tareas"
        />
        {/* Título debajo del ícono, centrado y sin margen */}
        <h5 style={{ textAlign: "center", margin: 0 }}>Consultar Tareas</h5>
      </Link>
    </nav>
  );
}
