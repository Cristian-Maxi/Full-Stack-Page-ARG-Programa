import styles from "../../styles/tareas.module.css"
import Head from 'next/head';
import { useState,useEffect } from 'react';
import { useRouter } from "next/router";
import { fetchTareas, createTarea, updateTarea, deleteTarea } from './api'; // Importa las funciones API
import axios from 'axios';


function Tareas() {

  const router = useRouter();
  const { usuario, contraseña } = router.query;

  const Regresar = () => {
    router.push("/")
  }

  const [toDo, setToDo] = useState([])
  const [toDos, setToDos] = useState([])
  const [Editar, setEditar] = useState(null)
  const [EditarTexto, setEditarTexto] = useState("")
  // const [descripcion, setDescripcion] = useState("");


  //Este useEffect es el que se encarga de mostrar las tareas que quedaron cargadas en NEXT como asi tambien las tareas que ya estan dentro de la api, usando el metodo GET
  useEffect(() => {

    const temp = localStorage.getItem("tareas")
    const tareas_cargadas = JSON.parse(temp)

    fetchTareas()
    .then((data) => {
      setToDos(data);
      console.log(data);
    })
    .catch((error) => {
      console.error('Error al obtener tareas:', error);
    });

    if (tareas_cargadas) {
      setToDos(tareas_cargadas)
    }
  }, [])

  useEffect(() => {
    const jason = JSON.stringify(toDos)
    localStorage.setItem("tareas", jason)
  }, [toDos])


  //Esta funcion es la que se encarga
  function Submit(evento) {
    evento.preventDefault()

    const newToDo = {
      id: new Date().getTime(),
      tarea: toDo,
      // descripcion: descripcion,
      completo: false,
    }

    setToDos([...toDos].concat(newToDo))
    setToDo("")
    // setDescripcion("");

    createTarea(newToDo)
    .then((data) => {
      setToDos([...toDos].concat(data));
      setToDo('');
    })
    .catch((error) => {
      console.error('Error al crear tarea:', error);
    });
  }

  //Esta función va a borar la tarea tanto de la api usando el metodo DELETE como de la interfaz de NEXT
  function Borrar(id) {
    const UpdateToDos = [...toDos].filter((todo) => todo.id !== id)

    setToDos(UpdateToDos)

    deleteTarea(id)
    .then(() => {
      const updatedToDos = [...toDos].filter((todo) => todo.id !== id);
      setToDos(updatedToDos);
    })
    .catch((error) => {
      console.error('Error al eliminar tarea:', error);
    });
  }

  //Esto maneja el checbox de cada tarea
  function Tildado(id) {
    const UpdateToDos = [...toDos].map((todo) => {
      if(todo.id == id) {
        todo.completo = !todo.completo
      }
      return todo
    })
    setToDos(UpdateToDos)
  }
  
  //Esta función se encarga de modificar la tarea tanto de la api con el metodo PUT como de la intefaz de NEXT
  function EditarToDo(id) {
    const UpdateToDos = [...toDos].map((todo) => {
      if(todo.id == id) {
        todo.tarea = EditarTexto
      }
      return todo
    })
    setToDos(UpdateToDos)
    setEditar(null)
    setEditarTexto("")

    const taskToUpdate = toDos.find((todo) => todo.id === id);

    if (!taskToUpdate) {
      return;
    }
  
    const updatedData = {
      tarea: EditarTexto,
    };
  
    updateTarea(id, updatedData)
      .then(() => {
        const updatedToDos = [...toDos].map((todo) => {
          if (todo.id === id) {
            todo.tarea = EditarTexto;
          }
          return todo;
        });
        setToDos(updatedToDos);
        setEditar(null);
        setEditarTexto('');
      })
      .catch((error) => {
        console.error('Error al actualizar tarea:', error);
      });
  }

  const EliminarCuenta = async () => {

    const confirmarEliminacion = window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.");
    if (confirmarEliminacion) {
      try {
        // Realiza una solicitud a tu API Django para eliminar la cuenta
        const response = await axios.post('http://127.0.0.1:8000/login/eliminar', {
            usuario: usuario,
            contraseña: contraseña,
          });

        if (response.data.eliminado) {
            alert("Cuenta eliminada exitosamente.");
              router.push("/");
        } else {
          alert("Usuario o contraseña incorrectos");
        }
        } catch (error) {
          console.error("Error al eliminar cuenta:", error);
          alert("Error al eliminar cuenta. Por favor, inténtalo de nuevo más tarde.");
        }
      }
  }

  return (
    <div className={styles.contenedor}>
      <Head>
        <style>
          {`
            body {
              
            }
          `}
        </style>
      </Head>
      <h1 className={styles.titulo}><i className="bi bi-check2-square"></i> Lista de tareas</h1>
      <form className={styles.agregar} onSubmit={Submit}>
        <input type="text" value={toDo} placeholder="Tarea" onChange={(evento) => setToDo(evento.target.value)}/>
        {/* <input type="text" placeholder="Descripción" value={descripcion} onChange={(evento) => setDescripcion(evento.target.value)}/> */}
        <button className={styles.boton_add} type="submit">Agregar <i className="bi bi-plus-square-fill"></i></button>
      </form>
      <div>
        {toDos.map((todo) =>
        <div className={styles.contenido} key={todo.id}>
          <div className={`${styles.todo_text} ${todo.completo ? styles.checked : ''}`}>
            <input className={styles.checkbox} type="checkbox" onChange={() => Tildado(todo.id)} checked={todo.completo}/>
            {Editar === todo.id ?
            <input type="text" className={styles.input_editar} value={EditarTexto} onChange={(evento) => setEditarTexto(evento.target.value)}/>
            :
            <div>{todo.tarea}</div>}
            {/* <div className={styles.descripcion}>{"- " + todo.descripcion}</div> ##Agrega la descripción aquí */}
          </div>
          <div className={styles.todo_actions}>
            <button onClick={() => Borrar(todo.id)}>Borrar <i className="bi bi-trash3-fill"></i></button>
            {Editar === todo.id ?
            <button onClick={() => EditarToDo(todo.id)}>Guardar <i className="bi bi-save"></i></button>
            :
            <button onClick={() => setEditar(todo.id)}>Editar <i className="bi bi-pencil-square"></i></button>}
          </div>
        </div>)}
      </div>
      <button className={styles.regresar} onClick={Regresar}>Volver al inicio</button>
      <button className={styles.eliminar} onClick={EliminarCuenta}>Eliminar cuenta</button>
    </div>
  )
}
export default Tareas;