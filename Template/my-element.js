class myElement extends HTMLElement {
  constructor(){
    super(); //* Obtenemos acceso a todos los elementos y métodos de la clase que extendemos (heredamos)
  }

  getTemplate(){ //*Esto será puro HTML
    const template = document.createElement('template');
    template.innerHTML = `
      <section>
        <h2>Hola gente desde getTemplate()</h2>
        <div>
          <p>Soy un párrafo</p>
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
        color:red;
      }
    </style>
    `;
  }

  render(){
    this.append(this.getTemplate().content.cloneNode(true));
    //*Es importante que `cloneNode(true)` tenga el valor de true porque así podrá copiar todos los elementos anidados del HTML
  }

  //*Esto es lo que agregará cosas al DOM
  connectedCallback(){
    this.render();
  }
}

customElements.define('my-element' , myElement); //* Definimos que la clase se va a convertir en una etiqueta