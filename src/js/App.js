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

    displayCard(event) {
        console.log(event.detail);

        const {items: recommendations} = event.detail;

        for (const obj of recommendations) {
            const card = document.createElement('rtn-card');
            card.recommendations = obj.venue;
            this.cardSection.append(card);
        }
    }
}

new App();