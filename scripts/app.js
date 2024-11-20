const token = "c38e85a11d69c5a903fbd21f01285b6b";

async function start() {
    try {
        const url = "https://api.mediastack.com/v1/news?access_key=" + token + "&languages=en,-de";
        const resp = await fetch(url);
        const respBody = await resp.json();
        const data = respBody.data;

        renderAllPosts(data);
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

start();

// for all posts
const postContainer = document.querySelector('.posts-section');
let renderedPosts = new Set();

function renderAllPosts(posts = []) {
    const html = posts
        .filter(post => post.image !== null && isValidImage(post.image))
        .filter(post => !renderedPosts.has(post.url))
        .map(toHTML)
        .join('');
    
    postContainer.insertAdjacentHTML('beforeend', html);

    posts.forEach(post => {
        if (post.url) {
            renderedPosts.add(post.url);
        }
    });
}



function isValidImage(imageUrl) {
    const regex = /(https?:\/\/[^\s]+(?:\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.svg))/;
    const match = imageUrl.match(regex);
    return match && match[0];
}

function toHTML(post) {
    const author = post.author ? post.author : 'Anonim';

    let description = post.description;
    if (description.length > 197) {
        description = description.slice(0, 197) + '...';
    }

    const imageUrl = isValidImage(post.image) ? post.image.match(/(https?:\/\/[^\s]+(?:\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.svg))/)[0] : null;

    return imageUrl ? `
    <!-- vertical card -->
    <div class="col-12 col-lg-4 col-md-6 mb-4 card-item" data-categories="${post.category}">
        <div class="card vertical-card w-100">
            <img src="${imageUrl}" class="card-img-top" alt="Image for ${post.title}">
            <div class="card-body">
                <h5 class="card-title card-text-title">${post.title}</h5>
                <p class="card-text">
                    <small class="text-body-secondary">
                        <span class="content-author">${author}</span> • 
                        <span class="content-date">${new Date(post.published_at).toLocaleDateString()}</span>
                    </small>
                </p>
                <p class="card-text card-text-subtitle">${description}</p>
            </div> 
            <div class="card-body">
                <a href="#" class="card-link post-badge">${post.category}</a>
            </div>
        </div>
    </div>
    ` : '';
}
