const template = document.createElement('div');
template.innerHTML = `
<style>
  .texto{
    color: red;
  }
  p{
    color: blue;
  }
</style>
  <p class="texto">Hola mundo 2 ;)</p>
  <p>Texto ejemplo para la clase</p>
`;

class myElement extends HTMLElement {
  constructor(){
    super(); //* Obtenemos acceso a todos los elementos y métodos de la clase que extendemos (heredamos)

    //*Aquí solo estamos creando la etiqueta p, pero aún no la veremos en el DOM
    this.p = document.createElement('p'); //*Está lista y cargada en memoria
  }

  //*Esto es lo que agregará cosas al DOM
  connectedCallback(){
    this.p.textContent = "Hola mundo con vanilla JS";
    this.append(this.p); //* Aquí lo agregamos :D
    this.append(template); //*Agregamos al DOM el template que creamos al inicio y tendrá los estilos que definimos
  }
}

customElements.define('my-element' , myElement); //* Definimos que la clase se va a convertir en una etiqueta