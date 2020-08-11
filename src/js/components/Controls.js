import { FourSquareAPIService } from "../services/FourSquareAPIService";
class Controls extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.userLocation = null;
        this.shadowRoot.innerHTML = `
            <style>
                form{

                    display: flex;
                    flex-direction: column;
                    padding: 20px;
                    width: 60%;
                }

                label, input, button /*Mover a config css*/{

                    display: block;
                }

                label{

                    font-weight: bold;
                    font-size: 14px;
                }

                input{

                    width: 100%;
                    padding: 10px 10px;
                    margin-top: 10px;
                    border: 2px solid var(--color-bg);
                }

                .group{

                    margin: 15px 0;
                }

                button{

                    border: none;
                    background-color: var(--color-brand);
                    color: var(--color-light-shades);
                    padding: 10px 15px;
                    margin-top: 10px;
                }

                button:hover{

                    cursor: pointer;
                }

                button:active{

                    transform: scale(0.9);
                }

                .find{

                    margin: 30px auto;
                    padding: 10px 25px;
                    background-color: var(--color-accent);
                    font-size: 16px;
                }
            </style>
            <form>
                <div class="group">
                    <label>¿Qué quieres comer?
                        <input type="text">
                    </label>
                </div>
                <div class="group">
                    <label>Buscar cerca de esta ubicación
                        <input type="text">
                    </label>
                </div>

                <div class="group">
                    <label>Buscar cerca de mi ubicación
                        <button id="locate-me" type="button">Mi ubicación</button>
                    </label>
                </div>

                <button id="find" class="find" type="button">Buscar</button>
            </form>
        `;
        const findButton = this.shadowRoot.getElementById('find');
        const locatedUserBtn = this.shadowRoot.getElementById('locate-me');
        locatedUserBtn.addEventListener('click', this.locateUser.bind(this));
        findButton.addEventListener('click', this.findPlacesHandler.bind(this));
    }

    locateUser() {

        navigator.geolocation.getCurrentPosition(position =>{
            const coords = {
                xLong: position.coords.longitude,
                yLat: position.coords.latitude
            }

            this.userLocation = coords;

        }, error => alert('No es posible usar su ubicación, por favor, inserte su una manualmente'));
    }

    inputValidation(inputs) {

        if (inputs[0].value.trim() === '') {
            throw new Error('Necesita insertar un tipo de comida en el primer campo');
        }

        if (inputs[1].value.trim() === '' && this.userLocation === null) {
            throw new Error('Necesita usar una ubicación, puede ser manual o usando el botton: "Mi ubicación"');
        }
    }

    findPlacesHandler() {

        const inputs = this.shadowRoot.querySelectorAll('input');
        
        try {
            this.inputValidation(inputs);
            this.getInformation(inputs);
        } catch (error) {
            alert(error.message);
        }
    }

    async getInformation(inputs) {

        let recommendations = null;

        if(this.userLocation){
            recommendations = await FourSquareAPIService.call(['ll'+this.userLocation, inputs[0].value]);
        } else {
            //Concat parameter near to the FourSquareAPI
            recommendations = await FourSquareAPIService.call(['near='+inputs[1].value, inputs[0].value]);
        }

        console.log(recommendations);
    }
}

customElements.define('rtn-controls', Controls);