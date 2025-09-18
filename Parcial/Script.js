const API_URL = 'https://jsonplaceholder.typicode.com/posts';


async function getPosts() {
  const response = await fetch(API_URL + '?_limit=8');
  const posts = await response.json();
  displayPosts(posts);
}


async function createPost(title, body) {
  const newPost = {
    title,
    body,
    userId: 1,
  };
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost),
  });
  const post = await response.json();
  addPostToDOM(post);
}


async function deletePost(id, card) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    card.remove();
  } else {
    alert('Error al eliminar el post');
  }
}


function displayPosts(posts) {
  const container = document.getElementById('posts-container');
  container.innerHTML = '';
  posts.forEach(post => addPostToDOM(post));
}


function addPostToDOM(post) {
  const container = document.getElementById('posts-container');
  const card = document.createElement('div');
  card.className = 'post-card';
  card.innerHTML = `
    <button class="delete-btn">Eliminar</button>
    <h2>${post.title}</h2>
    <p>${post.body}</p>
  `;
  card.querySelector('.delete-btn').onclick = () => deletePost(post.id, card);
  container.prepend(card);
}

document.getElementById('post-form').onsubmit = function(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  createPost(title, body);
  this.reset();
};


getPosts();