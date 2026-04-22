import { useState } from 'react'
import './styles.css'
import '../common.css'

const Write = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Article soumis:', { title, content, category, tags })
  }

  return (
    <div className="page write-page">
      <section className="hero">
        <h1>Écrire un Article</h1>
        <p>Partagez vos connaissances avec la communauté</p>
      </section>
      
      <section className="editor-container">
        <form className="article-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Titre de l'article</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Entrez un titre percutant..."
              className="form-input"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Catégorie</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select"
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="data-science">Data Science</option>
                <option value="data-engineering">Data Engineering</option>
                <option value="machine-learning">Machine Learning</option>
                <option value="software-development">Software Development</option>
                <option value="tutoriel">Tutoriel</option>
                <option value="cas-pratique">Cas Pratique</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="python, machine-learning, tutorial..."
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="content">Contenu de l'article</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Rédigez votre article ici..."
              className="form-textarea"
              rows={20}
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="open-btn btn-secondary">Sauvegarder brouillon</button>
            <button type="submit" className="btn-primary">Publier l'article</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Write
