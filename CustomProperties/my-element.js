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
        :host{ /*el host sería el root de nuestro componente*/
          --primary-color: tomato;
          --secondary-color: salmon;
          --heading-primary: 30px;
          --heading-secondary: 25px;
          display: inline-block;
          width: 100%;
          min-width: 300px;
          max-width: 450px;
        }

        section{
          background: var(--primary-color);
        }
        section p{
          background: var(--secondary-color);
        }
        h1{
          font-size: var(--heading-primary);
        }
        p {
          font-size: var(--heading-secondary);
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