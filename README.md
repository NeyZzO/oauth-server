<h1 style="text-align: center">Full-Stack Auth System</h1>
<p style="text-align: center">My own implementation of a FullStack centralized authentication application using OAuth2-like system. Inspired by discord authentication system.</p>

---
### Table of contents
- [Table of contents](#table-of-contents)
- [Grant flow](#grant-flow)
- [Usage](#usage)

### Grant flow
<img src="./backend/charts/oauth_auth_flow.svg" style="background-color: white"/>
This is not a very complete way of representing things but a documentation could be done if there's interest in my projetct. It stills give you a nice overview on how it works.

### Usage
First, you need to clone the project using
```sh
git clone https://github.com/NeyZzO/oauth-server/
```
Then, `cd` into the cloned repo and install the dependencies for front-end and/or backend *(the backend contains a built version of the frontend in the `backend/views/` directory)* <br> I recommend using [pnpm](https://pnpm.io/fr/).
```sh
pnpm install
```

Then just start the project
```sh
# Into backend
pnpm start
```
The front-end is made using react, vite and tailwindcss.