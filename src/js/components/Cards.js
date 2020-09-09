import { ModalService } from '../services/ModalService'

export class Cards extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.venue = null
    this.venuePhotos = null
    this.venueTips = null
  }

  render () {
    this.shadowRoot.innerHTML = `
            <style>

                .card{
                    display: flex;
                    width: 100%;
                    background-color: var(--color-light-shades);
                    color: var(--color-text);
                    box-shadow: 0px 0px 12px -3px rgba(52,63,62,1);
                    min-height: 190px;
                }

                blockquote{
                    font-style: italic;
                    margin: 0;
                    font-size: 16px;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;  
                    overflow: hidden;
                }

                img{
                    display: block;
                }

                .group{
                    padding: 15px;
                    width: 100%;
                }

                .location{
                    font-size: 14px;
                }
            </style>

            <div class="card">
                <img src="${this.venuePhotos}" alt="Example image from Foursquare Venue">
                <div class="group">
                    <h3>${this.venue.name}</h3>
                    <blockquote>${this.venueTips}</blockquote>
                    <p class="location"><b>Ubicación:</b> ${this.analyseInfo()}</p>
                </div>
            </div>
        `
  }

  set recommendations (value) {
    this.venue = value
    this.render()
  }

  set details (value) {
    if (value.photosData) {
      const { items: venuePhotos } = value.photosData
      const { items: venueTips } = value.tipsData

      this.venuePhotos = venuePhotos[0].prefix + '300x200' + venuePhotos[0].suffix
      this.venueTips = venueTips[0].text
    } else {
      this.venuePhotos = 'https://picsum.photos/id/1060/300/200'
      this.venueTips = 'Me llevaron para celebrar mi cumpleaños. Un buen lugar para comer en familia. Que rico todo el menú.'

      ModalService.add('rtn-modal-notification')
    }
  }

  analyseInfo () {
    let location = ''

    if (this.venue.location.city === undefined && this.venue.location.address === undefined) {
      location = 'No disponible'
    } else if (this.venue.location.city === undefined) {
      location = this.venue.location.address
    } else {
      location = `${this.venue.location.city}, ${this.venue.location.address}`
    }

    return location
  }
}

window.customElements.define('rtn-card', Cards)
