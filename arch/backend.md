# Backend architecture

- The entire API is specified in the [OpenAPI](https://en.wikipedia.org/wiki/OpenAPI_Specification)
  format file, [`api.yaml`](./api.yaml).
    * You can explore the specification through [Swagger Editor](https://editor.swagger.io).

- Split serializers:
    * Each Model will have it's own serializer file.
    * For example, the `Quiz` model should have all of its serializers in `serializers/quiz.py`.

- Split views:
    * All `/tests/foo` endpoints will be placed in `serializers/tests.py`.

- Split models:
   * Every model should have it's own file.

- Common checks and queries should be written as model methods.

- Always use absolute imports.

- Follow PEP8 style conventions. Use `nox -s format` to fix your code.

## Structure

```
manage.py              # Never to edit
populate_db.py         # Contribute only through dedicated merges
requirements.txt       # See "requirements.txt" section
api/
├── apps.py            # Never to edit
├── tests.py           # Not to edit for now
├── urls.py
├── serializers/       # One file per serializer type (test, quiz, submission, etc)
│   ├── __init__.py    # See "__init__.py" section
│   ├── foo.py
│   ├── bar.py
│   └── ...
└── views/             # One file per view type
    ├── __init__.py    # See "__init__.py" section
    ├── foo.py
    ├── bar.py
    └── ...
moelasware/
├── settings.py        # Essentially, never to edit
├── urls.py            # Never to edit
├── wsgi.py            # Never to edit
├── migrations/        # Never to edit manually! Always through makemigrations
│   └── ...
└── models/            # One file per model type
    ├── __init__.py    # See "__init__.py" section
    ├── foo.py
    ├── bar.py
    └── ...
```

## `requirements.txt`

This file contains all dependencies needed by our REST API, pinned to minor versions through the `~=` operator.
It is very unlikely you will need to ever edit this, but in case you do, please reach out to an architect.

## `__init__.py`

In the event of creating a new file under a sub-module (such as `serializers` or `views`), you should make sure to 
re-export your file's contents in the module's `__init__.py`.

Like so: 
```py
from absolute.path.to.file import *
```

With this structure, there's no need to import things from each individual file, you can simply write 
```py
import api.views import some_view
```
