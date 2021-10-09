const express = require("express");
const morgan = require("morgan");
const { list, find } = require("./postData");
const path = require("path");
const timeAgo = require('node-time-ago')

const app = express();

const staticMiddleware = express.static(path.join(__dirname, "public"));

app.use(staticMiddleware);
app.use(morgan("dev"));

// GET /
app.get("/", (req, res) => {
  const posts = list();

  const htmlDoc = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts
        .map(
          (post) => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲ </span><a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${timeAgo(post.date)}
          </small>
        </div>`
        )
        .join("")}
    </div>
  </body>
</html>`;

  res.send(htmlDoc);
});

// GET /posts/:id
app.get("/posts/:id", (req, res) => {
  const postId = req.params.id;
  const post = find(postId);
  if (!post.id) {
    throw new Error('Not Found')
  }
  //   res.status(404);

  //   const htmlDoc = `
  // <!DOCTYPE html>
  // <html>
  // <head>
  //   <title>Wizard News</title>
  //   <link rel="stylesheet" href="/style.css" />
  // </head>
  // <body>
  //   <header><img src="/logo.png"/>Wizard News</header>
  //   <div class="not-found">
  //     <p>Accio Page! 🧙‍♀️ ... Page Not Found</p>
  //     <img src="/dumbledore-404.gif" />
  //   </div>
  // </body>
  // </html>`;

  //   res.send(htmlDoc);
  // } else {
    const htmlDoc = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲ </span>${post.title}
            <small>(by ${post.name})</small>
          </p>
          <div><p>${post.content}</P></div>
          <small class="news-info">
            ${post.date}
          </small>
        </div>
   
    </div>
  </body>
</html>`;

    res.send(htmlDoc);
  // }
});

const { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
