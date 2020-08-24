import '../scss/main.scss';
import './components/Controls';
import './components/Cards';
import { FourSquareStore } from './stores/FourSquareStore';

class App {

    constructor() {
        this.controls = document.querySelector('rtn-controls');
        this.cardSection = document.getElementById('card-section');
        window.addEventListener('ready-data', this.displayCard.bind(this));
    }

    async displayCard(event) {
        console.log(event.detail);

        const {items: recommendations} = event.detail;

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
}

new App();