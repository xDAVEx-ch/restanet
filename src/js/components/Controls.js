import { FourSquareStore } from '../stores/FourSquareStore'
import { ModalService } from '../services/ModalService'
export class Controls extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.userLocation = null
    this.shadowRoot.innerHTML = `
            <style>
                form{

                    display: flex;
                    flex-direction: column;
                    padding: 20px;
                    margin: 0 auto;
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
                    width: 80%;
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
        `
    this.inputs = this.shadowRoot.querySelectorAll('input')

    const findButton = this.shadowRoot.getElementById('find')
    const locatedUserBtn = this.shadowRoot.getElementById('locate-me')
    locatedUserBtn.addEventListener('click', this.locateUser.bind(this))
    findButton.addEventListener('click', this.findPlacesHandler.bind(this))
  }

  locateUser () {
    ModalService.add('rtn-modal-loader')

    navigator.geolocation.getCurrentPosition(position => {
      const coords = {
        xLong: position.coords.longitude,
        yLat: position.coords.latitude
      }

      this.userLocation = coords
      this.changeAttribute()
    }, () => window.alert('No es posible usar su ubicación, por favor, inserte una manualmente'))
  }

  changeAttribute () {
    if (this.userLocation) {
      this.inputs[1].setAttribute('placeholder', 'Usando mi ubicación')
    } else {
      this.inputs[1].removeAttribute('placeholder')
    }

    ModalService.remove()
  }

  inputValidation () {
    if (this.inputs[0].value.trim() === '') {
      throw new Error('Necesita insertar un tipo de comida en el primer campo')
    }

    if (this.inputs[1].value.trim() === '' && this.userLocation === null) {
      throw new Error('Necesita usar una ubicación, puede ser manual o usando el botton: "Mi ubicación"')
    }
  }

  findPlacesHandler () {
    try {
      this.inputValidation(this.inputs)
      this.getInformation(this.inputs)
    } catch (error) {
      window.alert(error.message)
    }
  }

  async getInformation () {
    let recommendations = null

    if (this.userLocation && this.inputs[1].value === '') {
      recommendations = await FourSquareStore.retrive(this.createParameter(), 'explore')
      this.createCustomEvent(recommendations)
    } else {
      recommendations = await FourSquareStore.retrive(this.createParameter(), 'explore')
      this.createCustomEvent(recommendations)
      this.userLocation = null
      this.changeAttribute()
    }
  }

  createParameter () {
    if (this.userLocation && this.inputs[1].value === '') {
      const { xLong: longitude, yLat: latitude } = this.userLocation
      const coordenates = `${latitude},${longitude}`

      // Concat ll and query parameters to the FourSquareAPI
      return ['ll=' + coordenates, '&query=' + this.inputs[0].value]
    } else {
      // Concat near and query parameters to the FourSquareAPI
      return ['near=' + this.inputs[1].value, '&query=' + this.inputs[0].value]
    }
  }

  createCustomEvent (recommendations) {
    const controlsEvent = new window.CustomEvent('ready-data', {
      bubbles: true, // bubble event to containing elements
      composed: true, // let the event pass through the shadowDOM boundary
      detail: recommendations.response.groups[0] // Holds an object within the resulting items
    })

    this.dispatchEvent(controlsEvent)
  }
}

window.customElements.define('rtn-controls', Controls)
