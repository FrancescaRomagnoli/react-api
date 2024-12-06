import { useState, useEffect } from "react";

function App() {
  // # api logic
  const [postsList, setPostsList] = useState([]);

  const fetchPosts = () => {
    fetch("http://localhost:3000/posts/")
      .then((res) => res.json())
      .then((data) => {
        setPostsList(data);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deletePost = (deleteId) => {
    fetch("http://localhost:3000/posts/" + deleteId, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        setPostsList(data);
      });

    const newPostList = postsList.filter((post) => post.id !== deleteId);

    setPostsList(newPostList);
  };

  // # submit form logic

  const [articlesList, setArticleList] = useState([]);
  const [articleFields, setArticleFields] = useState({
    title: "",
    description: "",
    image: "",
    tags: [],
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
      description: articleFields.description,
      image: articleFields.image,
      category: articleFields.category,
    };

    fetch("http://localhost:3000/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newArticle),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedArticlesList = [...postsList, data];

        fetchPosts();

        setArticleList(updatedArticlesList);
        setArticleFields({
          title: "",
          description: "",
          image: "",
          category: "",
        });
        console.log(updatedArticlesList);
      });
  };

  useEffect(() => {
    // console.log(articlesList);
  }, [articlesList]);

  const deleteArticle = (deleteIndex) => {
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
        {/* input section */}
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
                    <label htmlFor="post-description" className="form-label">
                      Contenuto
                    </label>
                    <textarea
                      onChange={handleArticleForm}
                      value={articleFields.description}
                      type="text"
                      id="post-description"
                      name="description"
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
                      <option value="Economy">Economy</option>
                      <option value="Politics">Politics </option>
                      <option value="Environment">Environment</option>
                    </select>
                  </div>

                  {/* campo url immagine */}
                  <div className="mb-2">
                    <label htmlFor="post-img" className="form-label">
                      Url Immagine
                    </label>
                    <input
                      onChange={handleArticleForm}
                      value={articleFields.image}
                      type="text"
                      id="post-img"
                      name="image"
                      className="form-control"
                      placeholder="Inserisci un url"
                    />
                  </div>

                  {/* bottone submit */}
                  <button className="btn btn-info mt-2">Crea</button>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* articles section */}
        <section>
          <div className="container mb-3">
            <h3 className="mb-3">I tuoi post:</h3>

            {/* api articles div */}
            <div className="row row-cols-3">
              {postsList.length ? (
                postsList.map((post) => {
                  return (
                    <div key={post.id} className="col mb-4">
                      <div className="card h-100">
                        <button
                          onClick={() => deletePost(post.id)}
                          className="btn btn-close"
                        ></button>
                        <img
                          src={`${post.image}`}
                          className="card-img-top"
                          alt={post.title}
                        />
                        <div className="card-body">
                          <h4 className="card-title">{post.title}</h4>
                          <p className="card-text fs-6">{post.description}</p>
                        </div>
                        <div className="card-footer">
                          <a href="#" className="card-link">
                            {post.category}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <h6>Nessun post disponibile</h6>
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
