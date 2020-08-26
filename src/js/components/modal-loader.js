class ModalLoader extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({ mode: 'open'});
        this.render();
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
                    text-align: center;
                }

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
                    margin: 8px;
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

            </style>

            <div class="backdrop"></div>
            <div class="modal-loader">
                    <h3>Cargando su ubicación</h3>
                    <div class="lds-dual-ring"></div>
            </div>
        `;
    }
}

customElements.define('rtn-modal-loader', ModalLoader);