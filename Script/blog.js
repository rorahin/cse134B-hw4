
// import { myAlert, myConfirm, myPrompt } from "./customdialog.js";

// const blogPostsElement = document.getElementById("blogPosts");

// // function to render the blog posts list
// function renderBlogPosts () {
//     const blogPosts = readPosts();

//     if (blogPosts.length === 0) {
//         blogPostsElement.innerHTML = "<p>No posts yet.</p>";
//     } else {
//         const blogPostsHtml = blogPosts
//             .map(
//                 (post) => `
//           <article>
//             <h2>${post.title}</h2>
//             <p>${post.date.toDateString()}</p>
//             <p>${post.summary}</p>
//             <button onclick="editPost(${post.id})">Edit</button>
//             <button onclick="deletePost(${post.id})">Delete</button>
//           </article>
//         `
//             )
//             .join("");
//         blogPostsElement.innerHTML = blogPostsHtml;
//     }
// }

// // function to add a blog post
// function addPostHandler (event) {
//     event.preventDefault();

//     const form = event.target;
//     const post = {
//         title: form.postTitle.value,
//         date: new Date(form.postDate.value),
//         summary: form.postSummary.value,
//     };

//     createPost(post);
//     renderBlogPosts();
//     closeDialog("addPostDialog");
// }

// // function to edit a blog post
// function editPostHandler (event) {
//     event.preventDefault();

//     const form = event.target;
//     const post = {
//         id: form.postId.value,
//         title: form.postTitle.value,
//         date: new Date(form.postDate.value),
//         summary: form.postSummaryvalue,
//     };

//     updatePost(post);
//     renderBlogPosts();
//     closeDialog("editPostDialog");
// }

// // function to handle editing a blog post
// function editPost (id) {
//     const post = readPosts().find((post) => post.id === id);

//     const form = document.getElementById("editPostForm");
//     form.postId.value = post.id;
//     form.postTitle.value = post.title;
//     form.postDate.valueAsDate = post.date;
//     form.postSummary.value = post.summary;

//     openEditPostDialog();
// }

// // function to handle deleting a blog post
// function deletePostHandler (id) {
//     deletePost(id);
//     renderBlogPosts();
// }

// // event listener for adding a blog post
// const addPostForm = document.getElementById("addPostForm");
// addPostForm.addEventListener("submit", addPostHandler);

// // event listener for editing a blog post
// const editPostForm = document.getElementById("editPostForm");
// editPostForm.addEventListener("submit", editPostHandler);

// // initialize the blog posts list
// renderBlogPosts();


import { myAlert, myConfirm, myPrompt } from './customdialog.js';

export let posts = [  /* Your Code here */];

export function deletePost (postId) {
    /******************* */
    let dialog = myConfirm('Are you sure to delete this post?');
    dialog.addEventListener('close', function () {
        if (this.returnValue) {
            posts.splice(postId, 1);
            renderPosts();
        }
    });
}

export function editPost (postId) {
    if (postId) {
        let post = posts[postId];
        document.getElementById('postTitle').value = post.title;
        document.getElementById('postDate').value = post.date;
        document.getElementById('postSummary').value = post.summary;
        document.getElementById('postId').value = postId;
    }
    document.querySelector('#addPostDialog').showModal();
}

export function addPost () {
    /** your code here add add CRUP functionality*/
    let post = {};
    post.title = document.getElementById('postTitle').value;
    post.date = document.getElementById('postDate').value;
    post.summary = document.getElementById('postSummary').value;
    if (!post.title || !post.date || !post.summary) {
        myAlert('All fields are required!');
        return;
    }

    if (document.getElementById('postId').value) {
        const postId = document.getElementById('postId').value;
        posts[postId] = post;
    } else {
        posts.push(post);
    }
    renderPosts();
    document.getElementById('postId').value = '';
    document.querySelector('#addPostForm').reset();
    document.querySelector('#addPostDialog').close();
}

export function renderPosts () {
    /**************************** */
    let markup = '';

    if (posts.length === 0) markup = 'No posts currently listed';
    else {
        markup = `<ul>
                    ${posts
                .map(
                    (post, index) => `
                                <li>${post.title} (${post.date}) - 
                                summary: ${post.summary}
                                <button onclick="editPost(${index})">
                                Edit
                                </button>
                                <button onclick ="deletePost(${index})">
                                Delete
                                </button>
                                </li>`
                )
                .join('')
            }
                  </ul>`
    }

    document.querySelector('#blogPosts').innerHTML = markup;
}


export function setUp () {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
        posts = JSON.parse(storedPosts);
    }
    renderPosts();
    document.getElementById('addPostBtn').addEventListener('click', () => {
        document.querySelector('#addPostDialog').showModal();
    })
    document.getElementById('cancelPostBtn').addEventListener('click', () => {
        document.querySelector('#addPostDialog').close();
    })
    document.getElementById('savePostBtn').addEventListener('click', addPost);
}

// window.addEventListener('beforeunload', () => {
//     localStorage.setItem('posts', JSON.stringify(posts))
// })