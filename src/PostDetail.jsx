import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PostDetail.css';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data));

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => response.json())
      .then((data) => setComentarios(data));
  }, [id]);

  if (!post) {
    return <div className="loading-screen">Cargando detalle...</div>;
  }

  return (
    <div className="detail-container">
      
      <Link to="/">
        <button className="btn-back">← Volver al listado</button>
      </Link>

      <div className="post-content">
        <h1 className="detail-title">{post.title}</h1>
        <p className="detail-body">{post.body}</p>
      </div>

      <hr className="divider" />

      <h2 style={{ marginBottom: '20px' }}>Comentarios ({comentarios.length})</h2>
      
      <div className="comments-grid">
        {comentarios.map((comentario) => (
          <div key={comentario.id} className="comment-card">
            <h4 className="comment-email">{comentario.email}</h4>
            <p className="comment-body">{comentario.body}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default PostDetail;