For example, add this to build it for GitHub Pages:

  "homepage": "http://myname.github.io/myapp",

The build folder is ready to be deployed.
You may also serve it locally with a static server:

  npm install -g pushstate-server
  pushstate-server build
  open http://localhost:9000