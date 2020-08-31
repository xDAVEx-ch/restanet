import img from '../../assets/hamburger-menu.png';

class Header extends HTMLElement{

    constructor() {
        super();

        this.attachShadow({ mode : 'open'});
        this.render();

        this.hamburgerBtn = this.shadowRoot.querySelector('img');
        this.btnAction = true;
    }

    connectedCallback(){
        this.hamburgerBtn.addEventListener('click', this.createCustomEvent.bind(this));
    }

    createCustomEvent(){

        let margin = this.establishMargin();

        const headerEvent = new CustomEvent('controls-visibility', {
            bubbles: true,  // bubble event to containing elements
            composed: true, // let the event pass through the shadowDOM boundary
            detail: [this.btnAction ? 'visible' : 'hidden', margin]
        });

        this.dispatchEvent(headerEvent);

        this.btnAction = !this.btnAction;
    }

    establishMargin(){
        let margin = null;

        if(this.offsetWidth > 420) {
            margin = '-70%';
        } else {
            margin = '-90%';
        }

        return margin;
    }

    render(){
        this.shadowRoot.innerHTML = `
            <style>
                header{
                    display: flex;
                    background-color: var(--color-brand);
                    color: var(--color-text);
                    justify-content: space-between;
                    padding: 2px 20px;
                    align-items: center;
                }

                img{
                    display: block;
                    width: 55px;
                    height: 55px;
                }

                img:hover{
                    cursor: pointer;
                }

            </style>

            <header>
                <h2>Restanet</h2>
                <img src="${img}" alt="Hamburger menu">
            </header>
        `;
    }
}

customElements.define('rtn-header', Header);