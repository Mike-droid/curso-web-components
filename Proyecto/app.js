class NikeElement extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode: 'open'});

    this.img = this.getAttribute('img');
  }

  getTemplate(){
    const nike_card = document.createElement('template');
    nike_card.innerHTML = `
      <section class="main-body">
        <header class="main-header">
          <h1>
            <slot name="brand-name"></slot>
          </h1>
          <img src="${this.img}"/>
        </header>
        <article>
          <h2>
            <slot name="shoe-model"></slot>
          </h2>
          <h3>
            <slot name="collection"></slot>
          </h3>
          <p>
            <slot name="shoe-details"></slot>
          </p>
          <section class="price-and-button">
            <strong>
              <slot name="shoe-price"></slot>
            </strong>
            <slot name="buy-button" class="buy-button"></slot>
          </section>
        </article>
      </section>

      ${this.getStyles()}
    `;
    return nike_card;
  }

  getStyles(){
    return `
    <style>
      ::slotted(*){
        margin: 0;
        padding: 0;
        font-size: 62.5%;
      }

      .main-header{
        background-color: var(--primary-blue);
        display: flex;
        flex-direction: column;
      }

      .main-header h1{
        color: var(--header-blue);
        font-size:10rem;
        margin: 0;
        padding: 0;
      }

      .main-body{
        width:100%;
        background-color: white;
      }

      section header img{
        width:70%;
        margin-left: 20%;
        margin-bottom: -12%;
      }

      section article h2{
        font-size: 3rem;
        margin-left: 10px;
      }

      section article h3{
        color: var(--gray);
        font-size: 1.3rem;
        margin-left: 10px;
      }

      section article p{
        width: 80%;
        margin: 25px auto;
        text-align: justify;
        font-size: 1.3rem;
      }

      .price-and-button{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding-bottom: 50px;
        align-items: center;
      }

      .price-and-button strong{
        color: var(--gray);
        font-size: 3rem;
      }

/*********************BIG SCREENS*************************************************/

      @media screen and (min-width:1000px){
        .main-body{
          display: flex;
          flex-direction: row;
          height: 100%;
        }

        section header img{
          transform: rotate(-30deg);
          width:150%;
          margin-left: -30%;
        }

        section article h2,
        section article h3{
          text-align: left;
          margin-left: 50px;
        }

        section article h2{
          font-size: 3.5rem;
        }

        section article h3{
          font-size: 1.8rem;
        }

        section article p{
          width: 70%;
          font-size: 1.5rem;
        }
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

customElements.define('nike-card' , NikeElement);