# AgriVision App Next.js + Tailwind + Node.js + MongoDB

## Features of this Application:

### 1. Authentication (Login, Signup, Logout) with JWT and bcrypt.js

This section describes the implementation of login, signup, and logout functionalities using JWT for token-based authentication, bcrypt.js for password hashing, and Node.js as the backend framework. User data is stored in MongoDB for persistence.

```js
npm install express mongoose jsonwebtoken bcryptjs dotenv
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRATION=1h
```
### 2. API Endpoints
- POST /api/auth/signup
- POST /api/auth/login
- POST /api/auth/logout
![Screenshot (460)](https://github.com/user-attachments/assets/c4ff2b74-a9f6-4745-a45e-fe9c58fde3a6)
![Screenshot (461)](https://github.com/user-attachments/assets/3e83a536-2287-4f15-8812-4d492486775c)

## 3. Profile Modal
-A modal pop-up is implemented for viewing user profiles. Displays user details in a visually appealing modal.
![Screenshot (462)](https://github.com/user-attachments/assets/38252d9e-9c28-4f23-8ec1-4d3056163ed1)


### 4. Test Series Data: Dummy JSON for MongoDB Cloud
This section provides the dummy JSON data structure for test_series, designed for seamless import into MongoDB Cloud. The data is structured in an array format, where each object represents a test series.

```
const testSeriesData = [
  {
    subject: "ThermoDynamics",
    test_series:[
     {
      name: "THELT1"
      questions: 41
      totalMarks: 82
      duration: "65 minutes"
      language:"Hindi"
      syllabus: "Second Law of Thermodynamics, Entropy, Thermodynamic Cycles"
     }, .....
    ]
  },
.......
```

### 5. Sidebar Functionality: Test Series Section
The application currently features a single active section in the sidebar: Test Series.
- Displays a list of test series fetched from the MongoDB database.
- Includes details such as title, description, difficulty, and price.
  
![Screenshot (463)](https://github.com/user-attachments/assets/ad1e7b25-dd1f-4355-b0c8-059ea41e3a2f)


### 6. Expanding the ESLint configuration

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
