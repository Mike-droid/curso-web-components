class myElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      <section>
        <h1>
          <slot name="title"></slot>
        </h1>
        <p>
          <slot name="parrafo"></slot>
        </p>
      </section>

      ${this.getStyles()}
    `;

    return template;
  }

  getStyles() {
    return `
      <style>
        ::slotted(*){ /*Aquí decimos; TODO lo que esté fuera del componente que se va a inyectar adentro en los slots adentro del componente*/

        }

        ::slotted(span){ /*A todo el contenido que venga por fuera y que esté dentro de una etiqueta span*/
          font-size: 30px;
          color: red;
        }

        ::slotted(.text){
          color: blue;
        }
      </style>
    `;
  }

  render(){
    this.shadowRoot.append(this.getTemplate().content.cloneNode(true));
  }

  connectedCallback(){
    this.render();
  }
}

customElements.define('my-element' , myElement);