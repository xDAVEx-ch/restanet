import img from '../../assets/hamburger-menu.png'

class Header extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.render()

    this.hamburgerBtn = this.shadowRoot.querySelector('img')
    this.btnAction = true
  }

  connectedCallback () {
    this.hamburgerBtn.addEventListener('click', this.createCustomEvent.bind(this))
  }

  createCustomEvent () {
    const headerEvent = new window.CustomEvent('controls-visibility', {
      bubbles: true, // bubble event to containing elements
      composed: true, // let the event pass through the shadowDOM boundary
      detail: this.btnAction ? 'visible' : 'hidden'
    })

    this.dispatchEvent(headerEvent)

    this.btnAction = !this.btnAction
  }

  render () {
    this.shadowRoot.innerHTML = `
            <style>
                header{
                    display: flex;
                    background-color: var(--color-brand);
                    color: var(--color-text);
                    justify-content: space-between;
                    padding: 0 10px;
                    align-items: center;
                    position: fixed;
                    width: 100%;
                    box-sizing: border-box;
                    height: 70px;
                }

                img{
                    display: block;
                    width: 55px;
                    height: 55px;
                }

                img:hover{
                    cursor: pointer;
                }

                @media screen and (min-width: 1099px){
                    header{
                        display: none;
                    }
                }

            </style>

            <header>
                <h2>Restanet</h2>
                <img src="${img}" alt="Hamburger menu">
            </header>
        `
  }
}

window.customElements.define('rtn-header', Header)
