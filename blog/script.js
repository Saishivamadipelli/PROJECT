document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const loginSection = document.getElementById("login-section");
    const blogSection = document.getElementById("blog-section");
    const postsContainer = document.getElementById("posts-container");

    let users = JSON.parse(localStorage.getItem("users")) || {};
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let currentUser = null;

    // Show posts
    const renderPosts = () => {
        postsContainer.innerHTML = "";
        posts.forEach((post, index) => {
            const postElement = document.createElement("div");
            postElement.className = "post";
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <small>By: ${post.author}</small>
                ${post.author === currentUser ? `<button onclick="deletePost(${index})">Delete</button>` : ""}
            `;
            postsContainer.appendChild(postElement);
        });
    };

    // Login / Register
    document.getElementById("login-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (!users[username]) {
            users[username] = password;
            localStorage.setItem("users", JSON.stringify(users));
        } else if (users[username] !== password) {
            alert("Incorrect password!");
            return;
        }

        currentUser = username;
        loginSection.classList.add("hidden");
        blogSection.classList.remove("hidden");
        logoutBtn.style.display = "inline";
        loginBtn.style.display = "none";
        renderPosts();
    });

    // Logout
    logoutBtn.addEventListener("click", () => {
        currentUser = null;
        blogSection.classList.add("hidden");
        loginSection.classList.remove("hidden");
        logoutBtn.style.display = "none";
        loginBtn.style.display = "inline";
    });

    // Create post
    document.getElementById("blog-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;

        posts.push({ title, content, author: currentUser });
        localStorage.setItem("posts", JSON.stringify(posts));
        renderPosts();
    });

    // Delete post
    window.deletePost = (index) => {
        posts.splice(index, 1);
        localStorage.setItem("posts", JSON.stringify(posts));
        renderPosts();
    };

    // Initialize
    if (currentUser) {
        loginSection.classList.add("hidden");
        blogSection.classList.remove("hidden");
        logoutBtn.style.display = "inline";
    }
    renderPosts();
});
