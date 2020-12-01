# Table of Contents

1.  [Deployments](#orga728108)
    1.  [Heroku details](#org489c326)
        1.  [Building](#org8be48fc)
        2.  [Running](#orga37a59f)

<a id="orga728108"></a>

# Deployments

Los deployments suceden de manera automática, ya que está sincronizado el repo
de github con heroku. Cada push a master, creará una nueva versión en heroku y
provocará un nuevo build en heroku (para más detalles de cómo se buildea la app,
checa los detalles en [1.1](#org489c326)).

la aplicación se puede acceder aquí: <https://solicitud-becas.herokuapp.com/> (Si
es la primera vez que se abre recientemente, tardará un poco en &ldquo;despertar&rdquo;)

**IMPORTANTE**: Sí la aplicación ya tiene datos de producción, es importante que
los modelos de sequelize no intenten sincronizarse por que eso requiere borrar
las tablas de la base de datos, para hacerse correctamente, hay que usar las
migraciones de sequelize
<https://sequelize.org/master/manual/migrations.html>

En caso de que no sé tenga acceso al repositorio de github (y por lo tanto no sé
pueda hacer deploy de manera automática por la conexión con este) se puede hacer
deploy &ldquo;manualmente&rdquo; corriendo \`git push heroku master\`, esto tiggeará un build
y deployment en heroku.

<a id="org489c326"></a>

## Heroku details

<a id="org8be48fc"></a>

### Building

App is built in heroku by searching for a `build` script in `package.json`

<https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process>

La app consiste de 2 partes. el cliente y el servidor, coincidentemente, tenemos
2 npm proyects, el primero esta en `/client`, y el segundo en `/server`.
Ademas, hay un `package.json` &ldquo;general&rdquo; que esta en `/package.json`, y tiene un
script central que se llama `build` que primero invoca el build script de
`/client`, copia el build resultante a `/server/client_build` (limpiandolo antes
si ya existe) y luego invoca el build script del servidor. en este punto, ya se
creó un directorio: `node server/server_build` dónde se encuentra todo lo
necesario para correr.

<a id="orga37a59f"></a>

### Running

Process starts with the command defined in the `Procfile`

Para correr el servidor, heroku invoca: `node /server/server_build/app.js` que
es simultaneamente el api, y un servidor web que entrega los archivos estáticos
del cliente (&ldquo;la página web&rdquo;).

<https://devcenter.heroku.com/articles/preparing-a-codebase-for-heroku-deployment#3-add-a-procfile>
