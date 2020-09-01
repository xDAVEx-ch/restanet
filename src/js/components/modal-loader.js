class ModalLoader extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({ mode: 'open'});
        this.render();
        
        this.modalLoader = this.shadowRoot.querySelector('.modal-loader');
        this.backdrop = this.shadowRoot.querySelector('.backdrop');
    }

    render(){
        this.shadowRoot.innerHTML = `
            <style>
                .backdrop{
                    background-color: #000;
                    width: 100%;
                    height: 100vh;
                    position: fixed;
                    top: 0;
                    left: 0;
                    opacity: 0.5;
                    visibility: hidden;
                    z-index: 10;
                }

                .modal-loader{
                    background-color: var(--color-bg);
                    width: 40%;
                    padding: 35px 0;
                    z-index: 100;
                    position: fixed;
                    left: 30%;
                    top: 25vh;
                    visibility: hidden;
                    text-align: center;
                }

                * ----------------------------------------
                * Modal animations
                * ----------------------------------------

                .lds-dual-ring {
                    display: inline-block;
                    width: 80px;
                    height: 80px;
                }
                
                .lds-dual-ring:after {
                    content: " ";
                    display: block;
                    width: 64px;
                    height: 64px;
                    margin: 0 auto;
                    border-radius: 50%;
                    border: 6px solid var(--color-accent);
                    border-color: var(--color-accent) transparent var(--color-accent) transparent;
                    animation: lds-dual-ring 1.2s linear infinite;
                }
            
                @keyframes lds-dual-ring {
                    0% {
                        transform: rotate(0deg);
                    }
            
                    100% {
                        transform: rotate(360deg);
                    }
                }

                .display{
                    visibility: visible;
                }

                @media screen and (max-width: 900px){
                    .modal-loader{
                        width: 70%;
                        left: 15%;
                    }
                }

                @media screen and (max-width: 500px){
                    .modal-loader{
                        width: 90%
                        left: 5%;
                    }
                }
            </style>

            <div class="backdrop"></div>
            <div class="modal-loader">
                    <h3>Cargando su ubicación</h3>
                    <div class="lds-dual-ring"></div>
            </div>
        `;
    }

    show(){
        this.backdrop.classList.add('display');
        this.modalLoader.classList.add('scale-up-from-center');
        this.modalLoader.classList.add('display');
    }

    hide(){
        this.backdrop.classList.remove('display');
        this.modalLoader.classList.remove('scale-up-from-center');
        this.modalLoader.classList.remove('display');
    }
}

customElements.define('rtn-modal-loader', ModalLoader);