# Frontend architecture

- `App.js` is to be used only for routing purposes, and should not be used for rendering any group's pages. 
  There should be no `App.css`. Thou'nt shan't `App.css`.

- All pages should be placed in `src/pages`.
  * On top of that, each group should only have their pages in a subdirectory of `src/pages`, such as `src/pages/create_quiz` or `src/pages/review_quiz/`.

- Common components, to be shared between groups, should be placed in `src/components`

- All imports must be absolute, with `src` as the root.
  * This means that instead of writing `import ../components/RadioButton` you should write `import components/RadioButton`.

 
- All `fetch`'s to the API will be made through the class provided by `api.js`.
   * Path parameters (like `/api/quizzes/2`) should be passed as function arguments (like `API.get_quizzes(2)`)
   * JSON bodies are passed as an object parameter (`API.post_quiz({...})`)
   * Query parameters are also passed as an additional object parameter (`API.get_quizzes({limit: 50})`)

- All page URLs should follow a similar scheme to the endpoints (e.g. `/test/create`, `/test/solve`, etc)

- All page URLs should be defined as a constant in `urls.js`.

## Structure

```
jsconfig.json          # Never to edit
package-lock.json      # Never to edit
package.json
public/
├── index.html         # Never to edit
├── manifest.json      # Never to edit
└── robots.txt         # Never to edit
src/
├── App.jsx            # Only routing
├── index.js           # Never to edit
├── common.css         # Only Layouters should edit
├── urls.js
├── api.js             # Never to edit
├── assets/
│   ├── logo.svg
│   ├── success.svg
│   └── ...
├── components/
│   ├── Button.jsx
│   ├── QuizList.jsx
│   ├── Radiobutton.jsx
│   └── ...
└── pages/
    ├── Home.jsx
    ├── create_test/
    │   ├── menu/
    │   │   ├── CreateTestMenu.jsx
    │   ├── ...
    ├── create_quiz/
    │   ├── ...
    ├── review_quiz/
    │   ├── ...
    ├── solve_test/
    │   ├── ...
    ├── hall_of_fame/
    │   ├── ...
    ├── login_register/
    │   ├── ...
    └── profile/
        ├── ...

```
