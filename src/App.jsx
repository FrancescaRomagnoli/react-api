import { useState, useEffect } from "react";

function App() {
  const fetchPosts = () => {
    fetch("http://localhost:3000/posts/")
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const [articlesList, setArticleList] = useState([]);
  const [articleFields, setArticleFields] = useState({
    title: "",
    content: "",
    category: "",
  });

  const handleArticleForm = (e) => {
    setArticleFields({
      ...articleFields,
      [e.target.name]: e.target.value,
    });
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    const newArticle = {
      title: articleFields.title,
      content: articleFields.content,
      category: articleFields.category,
    };

    const updatedArticlesList = [...articlesList, newArticle];

    setArticleList(updatedArticlesList);
    setArticleFields({
      title: "",
      content: "",
      category: "",
    });
  };

  useEffect(() => {
    console.log(articlesList);
  }, [articlesList]);

  const deletePost = (deleteIndex) => {
    const newArticlesList = articlesList.filter(
      (article, articleIndex) => articleIndex !== deleteIndex
    );

    setArticleList(newArticlesList);
  };

  return (
    <>
      <header>
        <div className="container mt-4 mb-3">
          <h1>Crea un nuovo post</h1>
        </div>
      </header>
      <main>
        <section>
          <div className="container mb-3">
            <div className="row">
              <div className="col-4">
                <form onSubmit={handlePostSubmit}>
                  {/* input titolo articolo */}
                  <div className="mb-2">
                    <label htmlFor="post-title" className="form-label">
                      Titolo
                    </label>
                    <input
                      onChange={handleArticleForm}
                      value={articleFields.title}
                      type="text"
                      id="post-title"
                      name="title"
                      className="form-control"
                      placeholder="Inserisci il titolo"
                    />
                  </div>

                  {/* input contenuto articolo */}
                  <div className="mb-2">
                    <label htmlFor="post-content" className="form-label">
                      Contenuto
                    </label>
                    <textarea
                      onChange={handleArticleForm}
                      value={articleFields.content}
                      type="text"
                      id="post-content"
                      name="content"
                      className="form-control"
                      placeholder="Inserisci il contenuto"
                    />
                  </div>

                  {/* select per categoria articolo */}
                  <div className="mb-2">
                    <label htmlFor="post-category" className="form-label">
                      Categoria
                    </label>
                    <select
                      onChange={handleArticleForm}
                      value={articleFields.category}
                      name="category"
                      id="post-category"
                      className="form-select"
                    >
                      <option value="1">Categoria 1</option>
                      <option value="2">Categoria 2</option>
                      <option value="3">Categoria 3</option>
                    </select>
                  </div>

                  {/* bottone submit */}
                  <button className="btn btn-info mt-2">Crea</button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container mb-3">
            <h3 className="mb-3">I tuoi post:</h3>
            <div className="row gap-3">
              {articlesList.length ? (
                articlesList.map((article, index) => {
                  return (
                    <div className="card col-3">
                      <div key={index} className="card-body">
                        <button
                          onClick={() => deletePost(index)}
                          className="btn btn-close"
                        ></button>
                        <h4 className="card-title">{article.title}</h4>
                        <h6 className="card-subtitle text-body-secondary">
                          {article.category}
                        </h6>
                        <p className="card-text">{article.content}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <h6>Nessun post creato</h6>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
