# Curso básico de Web Components

## Introducción

### Introducción a los Web Components

Son componentes web.

### ¿Qué problemas resuelven los Web Components?

Hacen que puedas reutilizar código en distintas partes del programa y llevar tu proyecto de un framework o librería a otro ya que cada una es distinta y los ecosistemas no se llevan bien entre sí.

### ¿Qué son los web components?

Son como piezas de lego reutilizables para poder armar cosas. Encapsulamos código para utilizarlo
en diferentes partes. Los frameworks y librerías NO son así.

Los Web Components son primitivos de bajo nivel que permiten definir tus propios elementos HTML.

Los Web Components están contruidos con APIs que existen en el navegador (conocidas como Web APIs),
estas son:

- HTML Templates
- Custom Elements
- Shadow DOM (la magia)
- ES6 Modules

### API de Web Components

Custom Elements -> Podemos crear nuestra etiqueta HTML y el navegador lo entenderá.

**Regla de programadores:** No hagas código para ti, haz código para los demás.

Etiquetas HTML5 personalizadas, por ejemplo:

```html
<!--regla, tener un mínimo de 2 palabras separadas por un guión -->
<mi-mapa></mi-mapa>
<reproductor-de-musica></reproductor-de-musica>
```

Shadow DOM -> No es algo nuevo. La etiqueta video tiene shadow dom. Al abrir esta etiqueta en las DEV Tools veremos una sección que dice "#show-root".

[Página donde podemos ver los componentes hechos por la comunidad](https://www.webcomponents.org/)

[Documentación de Mozilla sobre Web Components](https://developer.mozilla.org/es/docs/Web/Web_Components#conceptos_y_uso)

HTML Template -> Es una etiqueta de HTML, pero no la puedes usar en HTML, tienes que hacer un match con JS.

ES Modules -> Es la forma de usar código de JS en otro documento JS.

### Beneficios de Web Components

- Reutilización -> DRY (Don't Repeat Yourself)
- Legibilidad -> Es mucho más fácil leerlos y entenderlos a comparación de HTML puro.
- Mantenibilidad -> Cada unos de los componentes pueden ser escritos y probados de forma individual
- Interoperabilidad -> Los frameworks y librerías no están hechos para coexistir entrellos. Los WC sí.
- Consistencia -> Gracias a la naturaleza reutilizable e interoperable de los WC ya no tendrás que crear los mismos componetes en diferentes frameworks o librerías.

## Ciclo de vida de los Web Components

### Ciclo de vida de un componente

El ciclo de vida de los Web Components está 100% ligado al DOM. Son parte fundamental del Critical Rendering Path.

Las clases tienen un **constructor()**, este es el paso #1 del ciclo del vida. El CRP con el Engine de JS guarda en memoria lo que tiene el constructor. Todos los componentes tienen que tener un constructor.

Luego en **connectedCallBack()** el componente ya existe en el DOM. Ya podemos hacer cosas como renderización.

***MALA PRÁCTICA:*** hacer que en el constructor se pinte el template. En el constructor sólo tenemos que asegurarnos de que todo lo que esté en memoria exista en ese momento para usarlo en el connectedCallback().

Tenemos **disconnectedCallback()** cuando justamenete quitamos este elemento del DOM.

Tenemos atributos en las etiquetas HTML. Si presentamos cambios usamos **atributeChangedCallback()**.

Un ciclo de vida que casi nunca vamos a utilizar es **adoptedCallback()** porque solamente se utiliza cuando usamos un componente dentro de iframe (y usarlo es una MUY MALA PRÁCTICA).

## Web Components

### Custom Elements

[Agregar componentes web a cualquier app](https://academind.com/tutorials/adding-web-components-to-any-app/)

### Template

Esto es opcional. Pero si adentro de tu componente van a venir muchos elementos que se conviertan en nodos, lo idal sería ocupar templates.

**Recuerda:** todo lo que esté dentro de la etiqueta `<Template></Template>` NO se va a renderizar de inicio.

Es importante que `cloneNode(true)` tenga el valor de true porque así podrá copiar todos los elementos anidados del HTML.

Podemos meter estilos con JS pero entrarán en conclicto con otros estilos, pero para esto usaremos ShadowDOM.

### Shadow DOM

Esto nos ayudará evitar problemas de estilos reescribiendose. Esto se logrará por el encapsulado.

Pensemos en ShadowDOM como **un DOM independiente** adentro del DOM global, es por esto que los estilos estilos serán independientes en cada uno.

```javascript
this.attachShadow({mode: 'open'}); //*Casi siempre todos los componentes tiene que venir en modo abierto.
```

## Manejo de datos

### Content Slot

Es una etiqueta de HTML 5 que nos va a ayudar a poder generar el placeholder en donde irá el texto o cierto contenido que necesitos para que, afuera de le etiqueta, nosotros podamos pasarle contenido que el componente pueda renderizar.

Básicamente modificamos la etiqueta en HTML y JS hará el trabajo sucio por nosotros.

### Multi Content Slot

Si queremos agregar más información necesitamos hacer modificaciones en las diferentes etiquetas que usaremos de slot. Le agregamos el atributo `<slot name="algo"></slot>`. En la etiqueta HTML haremos `<span slot="algo"></span>` . Así vinculamos ambas etiquetas.

### Atributos

Crearemos nuestros propios atributos en JS para colocarlos en la etiqueta HTML. Así mandamos información de manera sencilla.

```html
<my-element title="Soy un título :D" parrafo="Soy el texto del párrafo" img="https://avatars3.githubusercontent.com/u/1905708?s=280&v=4">
  </my-element>
```

```javascript
class myElement extends HTMLElement {
  constructor(){
    super(); //* Obtenemos acceso a todos los elementos y métodos de la clase que extendemos (heredamos)
    this.attachShadow({mode: 'open'}); //*Casi siempre todos los componentes tiene que venir en modo abierto.

    this.title = this.getAttribute('title'); //*Estos son los atributos que incluiremos en la etiqueta HTML
    this.parrafo = this.getAttribute('parrafo');
    this.img = this.getAttribute('img');
  }

  getTemplate(){ //*Esto será puro HTML
    const template = document.createElement('template');
    template.innerHTML = `
      <section>
        <h2>${this.title}</h2>
        <div>
          <p>${this.parrafo}</p>
          <img src="${this.img}}"/>
        </div>
      </section>
      ${this.getStyles()} <!---Aplicamos los estilos--->
    `;
    return template;
  }
```

### attributeChangedCallback

Necesitamos un observer precisamente para estar observando los atributos.

Con esto el componente ya se hace reutilizable.

[Documentación para static](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes/static)

### disconnectedCallback

La ventaja de usar este método, es que si por ejemplo usamos `remove()` tendríamos problemas con los nodos hijos conectados al elemento a remover. Pero disconnectedCallback nos ayuda a deslindar esta conexión.

[Documentación de los callbacks de ciclo de vida](https://developer.mozilla.org/es/docs/Web/Web_Components/Using_custom_elements#usando_callbacks_de_ciclo_de_vida)

## Estilos en Componentes

### :host

Es una pseudo-clase que nos ayudará a darle estilos a nuestro componente web.

:HOST
Pseudoclase que utilizaremos para darle estilos a nuestro componente web (no se trata necesariamente de los estilos visuales).
.
Se trata de los estilos que vienen definidos por default con una etiqueta, como pueden ser display, padding y margin.
.
:host da estilos al componente
.
La pseudoclase :host se utiliza dentro del método donde escribíamos nuestro css del componente getStyles(){}
.
**:host** {estilos para el componente}
.
Teniendo varias instancias de un componente, si a una le agregamos una clase por ejemplo ‘blue’
:host(.blue) {estilos para el componente con la clase blue}
Va a buscar el elemento que tenga de atributo una clase con el valor blue y le va a agregar los estilos que definimos.
.
También podemos darle estilos por atributo. Por ejemplo si a una instancia le agregamos el atributo ‘yellow’
:host([yellow]) {estilos para el elemento que tenga el atributo yellow}
.
También podemos agregar cierto contexto.
Por ejemplo, si tenemos una instancia del componente dentro de un article con una clase ‘card’
:host-context(article.card) {estilos}
.
Hacer cambios al contenido del componente
:host([yellow]) h1 {estilos}

**NOTA IMPORTANTE:** a día de hoy (25 de marzo de 2021), esto NO funciona en Firefox

### ::slotted

Este pseudo-elemento nos ayudará para dar estilos específicos a todo el contenido dinámico de fuera del componente y se vaya colocando en las etiquetas `<slot></slot>` que estén adentro de nuestro componente.

[Documentación oficial de ::sloted()](https://developer.mozilla.org/en-US/docs/Web/CSS/::slotted)

### CSS custom properties

[Documentación oficial de CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

Recuerda, la promesa de los Web Components es ser 100% reutilizables.

## WEb Components de terceros

### Utilizando componentes de terceros

Podemos usar componentes que ya existen en nuestros proyectos.
