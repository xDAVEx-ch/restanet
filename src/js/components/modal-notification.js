class ModalNotification extends HTMLElement{

    constructor(){
        super();

        this.attachShadow({mode: 'open'});
        this.render();

        this.modalNotification = this.shadowRoot.querySelector('.modal-notification');
        this.backdrop = this.shadowRoot.querySelector('.backdrop');
    }

    connectedCallback(){
        this.modalNotification.addEventListener('click', this.hide());
    }

    hide(){
        this.backdrop.classList.remove('display');
        this.modalNotification.classList.remove('display');
    }

    show(){
        this.backdrop.classList.add('display');
        this.modalLoader.classList.add('display');
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

                .modal-notification{
                    background-color: var(--color-accent);
                    width: 30%;
                    padding: 35px 35px;
                    z-index: 100;
                    position: fixed;
                    left: 35%;
                    top: 25vh;
                    visibility: hidden;
                    text-align: center;
                    line-height: 1.4;
                }

                .modal-notification:after{
                    content: "";
                    width: 25px;
                    height: 4px;
                    position: absolute;
                    top: 20px;
                    right: 10px;
                    background-color: black;
                    transform: rotate(40deg);
                }

                .modal-notification:before{
                    content: "";
                    width: 25px;
                    height: 4px;
                    position: absolute;
                    top: 20px;
                    right: 10px;
                    background-color: black;
                    transform: rotate(-40deg);
                }

                .modal-notification:hover:before{
                    cursor: pointer;
                }

                .modal-notification:hover:after{
                    cursor: pointer;
                }

                .display{
                    visibility: visible;
                }
            </style>

            <div class="backdrop"></div>
            <div class="modal-notification">
                    <h3>Ups! Encontramos un problema</h3>
                    <p>
                        Al parecer ha alcanzado el límite de 50 llamadas a la API.
                        Por lo que se han generado "Dummy examples", es decir, las
                        fotografías y reseñas son autogeneradas, pero los nombres y
                        ubicaciones son reales.
                    <p>
            </div>
        `;
    }
}

customElements.define('rtn-modal-notification', ModalNotification);