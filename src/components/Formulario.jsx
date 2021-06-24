import {useState} from 'react';

const Formulario = () => {

  const [termino, setTermino] = useState('');

  return (
    <form>
      <div className="row">
        <div className="form-group col-md-8">
          <input 
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca una imagen por ejemplo: Café, Futbol, Sopa"
            onChange={e => setTermino(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input 
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </