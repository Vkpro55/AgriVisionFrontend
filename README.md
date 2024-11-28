# AgriVision App Next.js + Tailwind + Node.js + MomgoDB

Features of this Application:

## 1. Authentication (Login, Signup, Logout) with JWT and bcrypt.js

This section describes the implementation of login, signup, and logout functionalities using JWT for token-based authentication, bcrypt.js for password hashing, and Node.js as the backend framework. User data is stored in MongoDB for persistence.

```js
npm install express mongoose jsonwebtoken bcryptjs dotenv
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRATION=1h
```
## API Endpoints
- POST /api/auth/signup
- POST /api/auth/login
- POST /api/auth/logout
![Screenshot (460)](https://github.com/user-attachments/assets/c4ff2b74-a9f6-4745-a45e-fe9c58fde3a6)
![Screenshot (461)](https://github.com/user-attachments/assets/3e83a536-2287-4f15-8812-4d492486775c)

## Profile Modal


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
