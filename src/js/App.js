import '../scss/main.scss'
import './components/Controls'
import './components/Cards'
import './components/Header'
import './components/Modal-loader'
import './components/Modal-notification'
import { FourSquareStore } from './stores/FourSquareStore'

class App {
  constructor () {
    this.controls = document.querySelector('rtn-controls')
    this.cardSection = document.getElementById('card-section')
    this.controlsSection = document.querySelector('.controls-section')

    window.addEventListener('ready-data', this.displayCard.bind(this))
    window.addEventListener('controls-visibility', this.manageControlsVisibility.bind(this))
    window.addEventListener('resize', this.resetState.bind(this))
    document.addEventListener('DOMContentLoaded', this.activateAnimations)
  }

  activateAnimations () {
    const node = document.querySelector('.preload-transitions')
    node.classList.remove('preload-transitions')
  }

  resetState () {
    if (window.offsetWidth < 1099) {
      return null
    } else {
      this.controlsSection.classList.remove('is-controls-active')
      this.controlsSection.style.top = '70px'
    }
  }

  async displayCard (event) {

    const { items: recommendations } = event.detail
    this.cardSection.innerHTML = ''

    for (const obj of recommendations) {
      const card = document.createElement('rtn-card')

      card.details = await this.gatherCardDetails(obj)
      card.recommendations = obj.venue
      this.cardSection.append(card)
    }
  }

  async gatherCardDetails (obj) {
    const photosData = await FourSquareStore.retrive(['group=venue', 'offset=5'], 'photos', obj.venue.id)
    const tipsData = await FourSquareStore.retrive(['sort=popular', 'offset=5'], 'tips', obj.venue.id)
    return {
      photosData: photosData.response.photos,
      tipsData: tipsData.response.tips
    }
  }

  manageControlsVisibility (event) {
    if (event.detail === 'visible') {
      this.controlsSection.classList.add('is-controls-active')
    } else {
      this.controlsSection.classList.remove('is-controls-active')
      this.controlsSection.style.top = '70px'
    }
  }
}

new App()
