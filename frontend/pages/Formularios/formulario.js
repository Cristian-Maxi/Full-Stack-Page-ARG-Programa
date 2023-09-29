import styles from "../../styles/formulario.module.css";
import Head from 'next/head';
import { useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';

function Formulario() {

  const router = useRouter();

  //Disparador para regresar a home
  function Regresar() {
    router.push("/")
  }

  const [confirmacion, setConfirmacion] = useState(false);

  //Confimracion de envio del formulario
  const MostrarConfirmacion = async (evento) => {
    evento.preventDefault();
    setConfirmacion(true);
    //Para que nos regresea home despues de 3 segundos.
    setTimeout(Regresar,3000)
  
    // Datos del formulario que se enviaran con axios a mi api donde se ecuentran los usuarios
    const formData = new FormData(evento.target);
    try {
      const response = await axios.post('http://127.0.0.1:8000/formulario/post/', formData);
      console.log('Respuesta del servidor:', response.data);
      setTimeout(Regresar, 3000);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div className={styles.body}>
      <Head>
        <style>
          {`
            body {
              background-image: linear-gradient(to right top, #383e46, #224879, #184baa, #4e43d2, #9612eb);
            }
          `}
        </style>
      </Head>
    <h1 className={styles.titulo}>Ingresa tus datos</h1>
    <div className={styles.contenedor}>
      <div className={styles.imagen}>
        <img src="/formulario.png" alt="Formulario" />
      </div>
      <div className={styles.formulario}>
        {confirmacion ? (
            <div>
              <p className={styles.mensaje}>Tu formulario ha sido enviado correctamente. Redirigiendote!</p>
            </div>
          ) : (
        <form onSubmit={MostrarConfirmacion} action="#" method="post">
          <div className={styles.elemento}>
            <input type="text" name="nombre" id="nombre" required />
            <label htmlFor="nombre">Nombre</label>
          </div>
          <div className={styles.elemento}>
            <input type="text" name="apellido" id="apellido" required />
            <label htmlFor="contraseña">Apellido</label>
          </div>
          <div className={styles.elemento}>
            <input type="text" name="usuario" id="usuario" required />
            <label htmlFor="usuario">Usuario</label>
          </div>
          <div className={styles.elemento}>
            <input type="password" name="contraseña" id="contraseña" required />
            <label htmlFor="contraseña">Contraseña</label>
          </div>
          <div className={styles.elemento}>
            <input type="email" name="email" id="email" required />
            <label htmlFor="email">Email</label>
          </div>
          <input type="checkbox" name="recibir_notifiaciones" value="True" /> Recibir notificaciones
          <div className={styles.elemento}>
            <input type="submit" value="Enviar" />
          </div>
        </form>
        )} 
      </div>
    </div>
  </div>
  )
}
export default Formulario;
