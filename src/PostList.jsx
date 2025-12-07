import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PostList.css';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const postsPorPagina = 10;

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const indiceUltimoPost = paginaActual * postsPorPagina;
  const indicePrimerPost = indiceUltimoPost - postsPorPagina;
  const postsActuales = posts.slice(indicePrimerPost, indiceUltimoPost);

  const siguientePagina = () => {
    if (paginaActual < posts.length / postsPorPagina) setPaginaActual(paginaActual + 1);
  };

  const anteriorPagina = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const scrollArriba = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="list-container">
      
      <div className="list-header">
        <h2 className="student-name">OSVALDO PARTIDA GONZALEZ - 327940</h2>
        <h1 className="list-title">Lista de Publicaciones</h1>
      </div>

      <ul className="post-list">
        {postsActuales.map((post) => (
          <li key={post.id} className="post-card">
            <div className="post-info">
              <span className="post-id">#{post.id}</span>
              <span className="post-title">{post.title}</span>
            </div>
            
            <Link to={`/post/${post.id}`}>
              <button className="btn-detail">Ver Detalles</button>
            </Link>
          </li>
        ))}
      </ul>

      <div className="pagination-container">
        <button 
          className="btn-nav" 
          onClick={() => { anteriorPagina(); scrollArriba(); }} 
          disabled={paginaActual === 1}
        >
          ← Anterior
        </button>

        <span className="page-info">
          Página <strong>{paginaActual}</strong> de {posts.length / postsPorPagina}
        </span>

        <button 
          className="btn-nav" 
          onClick={() => { siguientePagina(); scrollArriba(); }} 
          disabled={paginaActual === posts.length / postsPorPagina}
        >
          Siguiente →
        </button>
      </div>

    </div>
  );
}

export default PostList;