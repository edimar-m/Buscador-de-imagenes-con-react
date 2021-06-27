const Imagen = ({imagen}) => {
  const {largeImageURL, likes, previewURL, tags, views } = imagen;
  return(
    <div className="col-12 col-ms-6 col-md-4 col-lg-3">
      <div className="card mt-4">
      <img 
        src={previewURL} 
        alt={tags}
        className="card-img-top imagen" 
      />
      <div className="card-body">
        <p className="card-text">{likes}: Me gusta ❤️</p>
        <p className="card-text">{views}: Vistas</p>
      </div>
      <div className="card-footer">
      <a
        href={largeImageURL}
        target="_blank"
        rel="noreferrer"
        className="btn btn-primary btn-block"
      >Ver Imagen</a>
      </div>
      </div>
    </div>
  );
};

export default Imagen;