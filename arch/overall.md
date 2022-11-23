# Overall Architecture

- [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) built with [Django REST Framework](https://www.django-rest-framework.org).
- Graphical client built with [React](https://reactjs.com) (not native!).
- Authentication and authorization with [JWT tokens](https://jwt.io).
- [Nox](https://nox.thea.codes) pipeline for formatting, linting and testing (backend-only for now).

## Naming schemes

To facilitate code revision and keep the project's consistency, some name schemes have been defined.

### Branches

Branch names should consist of three parts:

1. Author's group or role
2. Author's name
3. Really short summary of the task at hand

Here are some examples:

* `group_2/sergio-manuel/profile`
* `group_1/joao-silva/fix-login-page-css`
* `pm/joao-silva/add-batatas-endpoint`
* `deploy/sergio-manuel/fix-dockerfile`

### Files and directories

File and directory names should follow the [`lower_snake_case`](https://en.wikipedia.org/wiki/Snake_case) scheme, except for the following exceptions:

* React components -- they should follow [`PascalCase`](https://en.wikipedia.org/wiki/Pascal_case)

## Integration conduct

* Before creating a *branch* make sure that you `git pull`, so that you have the current version of the branch you're branching off of.

* No non-trivial change can be integrated without first being tested by at least two people not responsible for writing the code.

* Deployers have the duty and responsibility to closely review any changes submitted by their group, as well as testing those changes

* Branches should follow the already defined naming scheme. See naming schemes.

* Merge request need to have a title that matches its content. `Ambrósio-patch-1337` is not
  acceptable, nor is `jose_dev` or `group_7/cenouras`. Do not edit files through GitLab, use `git`
  properly.

> If you need any assistance, don't hesitate to reach out to one of the architects.

## Architects

These documents have been written by João Leite and Tomás Duarte, the two architects.
