import '../scss/main.scss';
import './components/Controls';
import './components/Cards';
import './components/Header';
import './components/modal-loader';
import './components/modal-notification';
import { FourSquareStore } from './stores/FourSquareStore';

class App {

    constructor() {
        this.controls = document.querySelector('rtn-controls');
        this.cardSection = document.getElementById('card-section');
        this.controlsSection = document.querySelector('.controls-section');

        window.addEventListener('ready-data', this.displayCard.bind(this));
        window.addEventListener('controls-visibility', this.manageControlsVisibility.bind(this));
    }

    async displayCard(event) {
        console.log(event.detail);

        const {items: recommendations} = event.detail;
        this.cardSection.innerHTML = '';

        for (const obj of recommendations) {
            const card = document.createElement('rtn-card');
            
            card.details = await this.gatherCardDetails(obj);
            card.recommendations = obj.venue;
            this.cardSection.append(card);
        }
    }

    async gatherCardDetails(obj){
        let photosData = await FourSquareStore.retrive(['group=venue', 'offset=5'], 'photos', obj.venue.id);
        let tipsData = await FourSquareStore.retrive(['sort=popular','offset=5'],'tips', obj.venue.id);

        return {
            photosData: photosData.response.photos,
            tipsData: tipsData.response.tips
        };
    }

    manageControlsVisibility(event){

        if(event.detail[0] === 'visible'){
            this.controlsSection.style.marginLeft = '0%';
            console.log('visible');
        } else {
            this.controlsSection.style.marginLeft = event.detail[1];   
            console.log('hidden');
        }
    }
}

new App();