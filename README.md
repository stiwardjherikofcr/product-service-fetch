![Pizzería](http://www.madarme.co/portada-web.png)

# Proyecto consumiendo un API REST a través de la API Fecth JavaScript

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Descripción Y Contexto

Proyecto consiste en consumir una API REST **[product-service](https://github.com/stiwardjherikofcr/product-service)** usando Fetch API, básicamente es una API de javascript que a través de su interfaz te permite realizar peticiones HTTP para obtener recursos de la red, globalmente expone un objeto del lado del navegador llamado fetch. 

## Contenido del Proyecto

-   [index.html](https://github.com/stiwardjherikofcr/product-service-fetch/blob/master/index.html): Archivo principal de invocación a la lectura de JSON.
-   [js/main.js](https://github.com/stiwardjherikofcr/product-service-fetch/blob/master/assets/js/main.js): Archivo JS con el proceso de lectura del JSON y sus funciones adicionales para la impresión de resultados.

## Tecnologías

-  HTML5
-  CSS3
-  JavaScript
-  Bootstrap
-  jQuery
-  Fetch API
-  JSON

Marco Teorico sobre la API Fetch:

-   [Vídeo Explicativo Lectura con Fetch()](https://www.youtube.com/watch?v=DP7Hkr2ss_I)
-   [Guía de Mozzilla JSON](https://developer.mozilla.org/es/docs/Learn/JavaScript/Objects/JSON)

### Sintaxis Estándar de Solicitud Fetch API

La sintaxis básica para realizar peticiones es la siguiente:
```bash
fetch(url) // 1
.then(response => response.json()) // 2
.then(console.log) // 3
.catch(console.log('Algo salió mal.'));
```
1. Realiza la solicitud a una determinada URL.
1. Resuelve la promesa, al obtener respuesta la pasa a un determinado formato utilizando la función correspondiente, en este caso JSON.
1. Lee el objeto data y lo imprime con un console.log().
1. Si hay un error es atrapado por la función catch.

### REST API
Una API de REST, o API de RESTful, es una interfaz de programación de aplicaciones (API o API web) que se ajusta a los límites de la arquitectura REST y permite la interacción con los servicios web de RESTful.

## Instalación

### Clonar Repositorio

```bash
# clone the repositorio
$ git clone https://github.com/stiwardjherikofcr/product-service-fetch.git
```

## Autor

**Stiward Jherikof Carrillo Ramírez - Desarrollador Backend**

- [GitHub](https://github.com/stiwardjherikofcr "STIWARD JHERIKOF CARRILLO RAMIREZ")
- [GitLab](https://gitlab.com/stiwardjherikofcr "STIWARD JHERIKOF CARRILLO RAMIREZ")
- [Sitio Web](https://stiwardjherikofcr.github.io "PORTAFOLIO")

## Institución Académica

**[Programa de Ingeniería de Sistemas]** de la **[Universidad Francisco de Paula Santander]**

[Programa de Ingeniería de Sistemas]: https://ingsistemas.cloud.ufps.edu.co/
[Universidad Francisco de Paula Santander]: https://ww2.ufps.edu.co/

## Licencia

[MIT](LICENSE "MIT")