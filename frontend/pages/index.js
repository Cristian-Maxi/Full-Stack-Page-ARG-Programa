import styles from "../styles/Home.module.css";
import {useRouter} from "next/router";
import axios from 'axios';


function Home() {

  const router = useRouter();

  const Redirect_Formulario = () => {
    router.push("/Formularios/formulario")
  }

  const Redirect_Tareas = async (evento) => {
    evento.preventDefault();
    const usuarioInput = document.getElementById("usuario").value;
    const contraseñaInput = document.getElementById("contraseña").value;

    if (usuarioInput === "" || contraseñaInput === "") {
      alert("Por favor, completa todos los campos.");
    } else {
      try {
        // Realiza una solicitud a tu API Django para verificar las credenciales
        const response = await axios.post('http://127.0.0.1:8000/login/', {
          usuario: usuarioInput,
          contraseña: contraseñaInput,
        });
        // Si la autenticación es exitosa, redirige al usuario a la página de tareas
        if (response.data.autenticado) {
          router.push({
            pathname: "/Formularios/tareas",
            query: {
              usuario: usuarioInput,
              contraseña: contraseñaInput,
            },
          });
        } else {
          alert("Usuario o contraseña incorrectos");
        }
      } catch (error) {
        console.error("Error al autenticar:", error);
        alert("Error al autenticar. Por favor, inténtalo de nuevo más tarde.");
      }
    }
  };

  return (
    <div className={styles.body}>
      <h1 className={styles.titulo}><i className="bi bi-balloon-fill"></i> Bienvenido <i className="bi bi-balloon-fill"></i></h1>
      <div className={styles.contenedor}>
      <h2 className={styles.subtitulo}>Ingresar</h2>
      <form action="" method="post">
        <div className={styles.elemento}>
          <input type="text" name="usuario" id="usuario" required />
          <label htmlFor="usuario">Usuario</label>
        </div>
        <div className={styles.elemento}>
          <input type="password" name="contraseña" id="contraseña" required />
          <label htmlFor="contraseña">Contraseña</label>
        </div>
        <div className={styles.elemento}>
          <input type="submit" value="Enviar" onClick={Redirect_Tareas} />
        </div>
        <p>No tienes cuenta? <a href="#" onClick={Redirect_Formulario}>Registrate aquí</a></p>
        <div className={styles.iconos}>
          <a href="#"><i className="bi bi-whatsapp"></i></a>
          <a href="#"><i className="bi bi-facebook"></i></a>
          <a href="#"><i className="bi bi-twitter"></i></a>
          <a href="#"><i className="bi bi-google"></i></a>
        </div>
      </form>
      </div> 
    </div>
  )
}
export default Home;