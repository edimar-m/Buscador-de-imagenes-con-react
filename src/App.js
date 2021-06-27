import {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Error from './components/Error';
import ListadoImagenes from './components/ListadoImagenes';

const App = () => {

  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [peticionVacia, setPeticionVacia] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);


  useEffect(() => {
    setPaginaActual(1)
  }, [busqueda])

  useEffect(() => {
    // console.log('desde el useEffect')
    const consultarApi = async () => {
      if(busqueda === '') return;
  
      const imagenesPorPagina = 30;
      const key = '17997109-6aacfb96d3c78d72b639c185f';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page${paginaActual} `;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      if(resultado.total === 0 ){
        setPeticionVacia(true)
        return;
      }
      setPeticionVacia(false)
      setImagenes(resultado.hits);
                              // Calculo del total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina)
      setTotalPaginas(calcularTotalPaginas)

                              // Mover la pantalla para arriba 
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'});
    }
    consultarApi();

  },[busqueda, paginaActual])


  // ir a la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
    if(nuevaPaginaActual === 0) return;
    setPaginaActual(nuevaPaginaActual)
  }

  // ir a la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaSiguiente = paginaActual + 1;
    if(nuevaPaginaSiguiente > totalPaginas) return;
    setPaginaActual(nuevaPaginaSiguiente)
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center titulo">
          Buscador de Imagenes
        </p>
        <Formulario
          setBusqueda={setBusqueda}
        />
      </div>    
      <div className="row justify-content-center">
        {peticionVacia && <Error mensaje="No hay datos para mostrar" />}
        <ListadoImagenes
          imagenes={imagenes}
        />

        {(paginaActual === 1) ? null : (
          <button 
            type ="button"
            className="bbtn btn-info mr-1"
            onClick={paginaAnterior}
          >
            &laquo; Anterior
          </button>
        )}

        {(paginaActual !== totalPaginas) && (
          <button 
            type ="button"
            className="bbtn btn-info mr-1"
            onClick={paginaSiguiente}
          >
            Siguiente &raquo; 
          </button>
        )}

      </div>  
    </div>
  );
}

export default App;