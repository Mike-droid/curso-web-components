class myElement extends HTMLElement {
  constructor(){
    super(); //* Obtenemos acceso a todos los elementos y métodos de la clase que extendemos (heredamos)
    this.attachShadow({mode: 'open'}); //*Casi siempre todos los componentes tiene que venir en modo abierto.

    this.title = this.getAttribute('title');
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

  getStyles(){ //*Esto será puro CSS
    return `
    <style>
      h2{
        color: red;
        font-size: 40px;
      }
    </style>
    `;
  }

  render(){
    this.shadowRoot.append(this.getTemplate().content.cloneNode(true));
    //* Aquí tenemos que especificar `shadowRoot` para que se agregue al DOM y se vea reflejado en el navegador
    //*Es importante que `cloneNode(true)` tenga el valor de true porque así podrá copiar todos los elementos anidados del HTML
  }

  //*Esto es lo que agregará cosas al DOM
  connectedCallback(){
    this.render();
  }
}

customElements.define('my-element' , myElement); //* Definimos que la clase se va a convertir en una etiqueta