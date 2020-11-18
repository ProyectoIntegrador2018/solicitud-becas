# Solicitud-Becas

Brindar una herramienta que permita a la Coordinación y Evaluación de la
Formación de Capital Humano para optimizar el proceso de asignación de becas por
parte del I2T2, desde la recepción de solicitudes, hasta la emisión de reportes.

Aplicación para la gestión de las solicitudes de becas de cada convocatoria por
parte del I2T2

## Table of contents

- [Client Details](#client-details)
- [Environment URLS](#environment-urls)
- [Equipo> Dumplings](#team)
- [Technology Stack](#technology-stack)
- [Management resources](#management-resources)
- [Setup the project](#setup-the-project)
- [Running the stack for development](#running-the-stack-for-development)

### Client Details

| Name                   | Email                        | Role |
| ---------------------- | ---------------------------- | ---- |
| José Antonio Hernández | antonio.hernandez@mtycic.org | CEO  |

### Environment URLS

- **Production** - [App hosted in heroku](https://solicitud-becas.herokuapp.com/)
- **Development** - Development **is** Prod here

### Equipo: Dumplings

| Name                 | Email              | Role                                   |
| -------------------- | ------------------ | -------------------------------------- |
| Jorge Amione         | a01193321@itesm.mx | Development, Admin de Proyecto         |
| Andrea Fabiola Tamez | a01176494@itesm.mx | Project Owner, Scrum Master            |
| Eduardo Hidalgo      | a01193575@itesm.mx | Development, Admin de la configuración |

### Technology Stack

| Technology    | Version |
| ------------- | ------- |
| React         | 16.13.1 |
| apollo client | 2.6.8   |
| Typescript    | 3.8.2   |
| Node.js       | 12.18.4 |
| PostgreSQL    | 12.4    |

### Management tools

You should ask for access to this tools if you don't have it already:

- [Github repo](https://github.com/ProyectoIntegrador2018/solicitud-becas)
- [Backlog](https://trello.com/b/qSQWAmli/project-management)
- [Heroku](https://dashboard.heroku.com/)
  The web server and app is hosted in heroku, using the personal account of:
  Eduardo Hidalgo, but hosting it in any other heroku account shouldn't be hard,
  if you need assistance hosting it in a different heroku account contact him.
- [Documentation](https://teams.microsoft.com/_#/files/Equipo%201.06%20-%20Dumplings)

## Development

### Setup the project

You should only need git and npm (node package manager)

1. Clone the repository

```bash
$ git clone git@github.com:ProyectoIntegrador2018/solicitud-becas.git
```

2. Install the dependencies

```bash
$ cd solicitud-becas/client/ && npm install
$ cd ../server && npm install
```

### Running the stack for Development

#### A. For the front end:

In the `client/` project directory, you can run:

##### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

##### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

##### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

##### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

#### B. for the back end:

in the `server/` project directory, run:

##### `npm start`

to run the server locally

### Database management

to be determined

### Debugging

to be determined

## Git Protocol

A guide for programming within version control.

1.  Create a local feature branch based off develop.

        $ git checkout develop
        $ git pull
        $ checkout -b <branch-name>

2.  Rebase frequently to incorporate upstream changes.

        $ git fetch origin
        $ git rebase origin/develop

3.  Resolve conflicts. When feature is complete and tests pass, stage the changes.

        $ git add .
        $ git rebase --continue

    1.  When you've staged the changes, commit them.

            $ git status
            $ git commit -m "The message goes here"

4.  If you've created more than one commit, use `git rebase` interactively to squash them into cohesive commits with good messages.

    [About Git rebase](https://help.github.com/articles/about-git-rebase/)

        $ git rebase -i origin/develop

5.  Share your branch.

        	$ git push origin <branch-name>

    If you changed the commit hashes run the following command inside your branch.

    [git push --force-with-lease vs. --force](https://stackoverflow.com/a/52823955)

        $ git push --force-with-lease origin <branch-name>

6.  Submit a GitHub Pull Request
7.  Get someone else to Code Review

    [Code Review Developer Guide](https://google.github.io/eng-practices/review/)

    [How to do a code review](https://google.github.io/eng-practices/review/reviewer/)

8.  After approved and all Circle CI checks have passed you can now merge the branch. Make sure you only have the commits you want to go into master (if not do an interactive rebase before merging).

        $ git checkout develop
        $ git pull
        $ git merge <branch-name> --ff-only
        $ git push

    If all checks pass the push will be allowed, if not GitHub will block the push and you will have to fix the errors.

9.  Delete your remote feature branch (can also be done from GitHub's PR UI).

        $ git push origin --delete <branch-name>

10. Delete your local feature branch.

        $ git branch --delete <branch-name>
