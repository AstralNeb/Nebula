// Хранение данных о лайках/дизлайках по IP
const votedIPs = {};

// Функция для получения IP пользователя (заглушка)
function getIP() {
    return "user-ip"; // В реальном проекте используйте серверный метод для получения IP
}

// Добавление поста
document.getElementById('post-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const postContent = document.getElementById('post-content').value;

    if (postContent.trim() !== '') {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        postElement.innerHTML = `
            <div class="post-content">${postContent}</div>
            <div class="post-actions">
                <button onclick="likePost(this)"><i class="fas fa-thumbs-up"></i> <span>0</span></button>
                <button onclick="dislikePost(this)"><i class="fas fa-thumbs-down"></i> <span>0</span></button>
                <button onclick="showCommentForm(this)"><i class="fas fa-comment"></i> Comment</button>
            </div>
            <div class="comments"></div>
        `;

        document.getElementById('post-list').prepend(postElement);
        document.getElementById('post-content').value = '';
    }
});

// Лайк поста
function likePost(button) {
    const post = button.closest('.post');
    const postId = Array.from(document.querySelectorAll('.post')).indexOf(post);
    const ip = getIP();

    if (!votedIPs[postId]) {
        votedIPs[postId] = { liked: false, disliked: false };
    }

    if (!votedIPs[postId].liked) {
        const likeCount = button.querySelector('span');
        const newCount = parseInt(likeCount.textContent) + 1;
        likeCount.textContent = newCount;
        votedIPs[postId].liked = true;
        button.classList.add('liked');

        if (votedIPs[postId].disliked) {
            const dislikeButton = post.querySelector('.post-actions button:nth-child(2)');
            const dislikeCount = dislikeButton.querySelector('span');
            dislikeCount.textContent = Math.max(0, parseInt(dislikeCount.textContent) - 1);
            dislikeButton.classList.remove('disliked');
            votedIPs[postId].disliked = false;
        }
    }
}

// Дизлайк поста
function dislikePost(button) {
    const post = button.closest('.post');
    const postId = Array.from(document.querySelectorAll('.post')).indexOf(post);
    const ip = getIP();

    if (!votedIPs[postId]) {
        votedIPs[postId] = { liked: false, disliked: false };
    }

    if (!votedIPs[postId].disliked) {
        const dislikeCount = button.querySelector('span');
        const newCount = parseInt(dislikeCount.textContent) + 1;
        dislikeCount.textContent = newCount;
        votedIPs[postId].disliked = true;
        button.classList.add('disliked');

        if (votedIPs[postId].liked) {
            const likeButton = post.querySelector('.post-actions button:nth-child(1)');
            const likeCount = likeButton.querySelector('span');
            likeCount.textContent = Math.max(0, parseInt(likeCount.textContent) - 1);
            likeButton.classList.remove('liked');
            votedIPs[postId].liked = false;
        }
    }
}

// Показать форму комментария
function showCommentForm(button) {
    const post = button.closest('.post');
    const commentsSection = post.querySelector('.comments');

    if (!post.querySelector('.comment-form')) {
        const commentForm = document.createElement('div');
        commentForm.classList.add('comment-form');
        commentForm.innerHTML = `
            <textarea placeholder="Write a comment..." required></textarea>
            <button onclick="addComment(this)">Add Comment</button>
        `;
        commentsSection.prepend(commentForm);
    }
}

// Добавление комментария
function addComment(button) {
    const commentForm = button.closest('.comment-form');
    const commentContent = commentForm.querySelector('textarea').value;

    if (commentContent.trim() !== '') {
        const commentsSection = commentForm.closest('.comments');
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <div class="comment-content">${commentContent}</div>
            <div class="comment-actions">
                <button onclick="likeComment(this)"><i class="fas fa-thumbs-up"></i> <span>0</span></button>
                <button onclick="dislikeComment(this)"><i class="fas fa-thumbs-down"></i> <span>0</span></button>
            </div>
        `;
        commentsSection.appendChild(commentElement);
        commentForm.querySelector('textarea').value = '';
    }
}

// Лайк комментария
function likeComment(button) {
    const comment = button.closest('.comment');
    const commentId = Array.from(comment.parentElement.children).indexOf(comment);
    const ip = getIP();

    if (!votedIPs[`comment-${commentId}`]) {
        votedIPs[`comment-${commentId}`] = { liked: false, disliked: false };
    }

    if (!votedIPs[`comment-${commentId}`].liked) {
        const likeCount = button.querySelector('span');
        const newCount = parseInt(likeCount.textContent) + 1;
        likeCount.textContent = newCount;
        votedIPs[`comment-${commentId}`].liked = true;
        button.classList.add('liked');

        if (votedIPs[`comment-${commentId}`].disliked) {
            const dislikeButton = comment.querySelector('.comment-actions button:nth-child(2)');
            const dislikeCount = dislikeButton.querySelector('span');
            dislikeCount.textContent = Math.max(0, parseInt(dislikeCount.textContent) - 1);
            dislikeButton.classList.remove('disliked');
            votedIPs[`comment-${commentId}`].disliked = false;
        }
    }
}

// Дизлайк комментария
function dislikeComment(button) {
    const comment = button.closest('.comment');
    const commentId = Array.from(comment.parentElement.children).indexOf(comment);
    const ip = getIP();

    if (!votedIPs[`comment-${commentId}`]) {
        votedIPs[`comment-${commentId}`] = { liked: false, disliked: false };
    }

    if (!votedIPs[`comment-${commentId}`].disliked) {
        const dislikeCount = button.querySelector('span');
        const newCount = parseInt(dislikeCount.textContent) + 1;
        dislikeCount.textContent = newCount;
        votedIPs[`comment-${commentId}`].disliked = true;
        button.classList.add('disliked');

        if (votedIPs[`comment-${commentId}`].liked) {
            const likeButton = comment.querySelector('.comment-actions button:nth-child(1)');
            const likeCount = likeButton.querySelector('span');
            likeCount.textContent = Math.max(0, parseInt(likeCount.textContent) - 1);
            likeButton.classList.remove('liked');
            votedIPs[`comment-${commentId}`].liked = false;
        }
    }
}