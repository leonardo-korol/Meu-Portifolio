// Selecionando o botão e o campo de texto
const postButton = document.getElementById('postButton');
const newPostText = document.getElementById('newPostText');

// Função para criar uma nova postagem
postButton.addEventListener('click', () => {
  const postContent = newPostText.value.trim();
  
  if (postContent !== "") {
    const newPost = document.createElement('section');
    newPost.classList.add('post');
    newPost.innerHTML = `
      <div class="post-header">
        <img src="img_/pessoa_1.jpg" alt="Usuário" class="profile-pic">
        <div class="post-info">
          <strong>João Silva</strong>
          <p>Agora</p>
        </div>
      </div>
      <div class="post-body">
        <p>${postContent}</p>
      </div>
      <div class="post-actions">
        <button class="like-btn">Curtir</button>
        <button class="comment-btn">Comentar</button>
        <button class="share-btn">Compartilhar</button>
      </div>
      <div class="post-likes">
        <p>Curtido por <strong>Maria Souza</strong> e <strong>outras 10 pessoas</strong></p>
      </div>
      <div class="comments-section" style="display: none;">
        <input type="text" class="comment-input" placeholder="Escreva um comentário..." />
        <button class="submit-comment">Comentar</button>
        <div class="comments-list"></div>
      </div>
    `;

    // Adiciona a nova postagem ao feed
    const feed = document.querySelector('.main-content');
    feed.insertBefore(newPost, feed.firstChild);

    // Limpa o campo de texto após a postagem
    newPostText.value = "";

    // Função de curtir/descurtir
    const likeButton = newPost.querySelector('.like-btn');
    const likesText = newPost.querySelector('.post-likes p');
    let liked = false;

    likeButton.addEventListener('click', () => {
      if (liked) {
        likeButton.textContent = 'Curtir';
        likesText.innerHTML = `Curtido por <strong>Maria Souza</strong> e <strong>outras 10 pessoas</strong>`;
      } else {
        likeButton.textContent = 'Descurtir';
        likesText.innerHTML = `Curtido por <strong>Maria Souza</strong> e <strong>outras 10 pessoas</strong>, <strong>Você</strong>`;
      }
      liked = !liked;
    });

    // Função de comentar
    const commentButton = newPost.querySelector('.comment-btn');
    const commentSection = newPost.querySelector('.comments-section');
    const commentInput = newPost.querySelector('.comment-input');
    const commentList = newPost.querySelector('.comments-list');
    const submitCommentButton = newPost.querySelector('.submit-comment');

    commentButton.addEventListener('click', () => {
      commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
    });

    submitCommentButton.addEventListener('click', () => {
      const commentText = commentInput.value.trim();
      if (commentText !== "") {
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.textContent = commentText;
        commentList.appendChild(newComment);
        commentInput.value = '';  // Limpa o campo de comentário
      }
    });
  } else {
    alert("Por favor, escreva algo antes de publicar!");
  }
});
