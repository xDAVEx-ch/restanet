export class Cards extends HTMLElement {

    constructor(){
        super();

        this.attachShadow({ mode : 'open' });
        this.venue = null;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>

                .card{
                    display: flex;
                    width: 50%;
                    background-color: var(--color-light-shades);
                    color: var(--color-text);
                    box-shadow: 0px 0px 12px -3px rgba(52,63,62,1);
                }

                blockquote{
                    font-style: italic;
                    margin: 0;
                }

                img{
                    display: block
                }

                .group{
                    padding: 15px;
                    width: 70%;
                }

                .location{
                    font-size: 14px;
                }
            </style>

            <div class="card">
                <img src="https://picsum.photos/id/1060/300/200" alt="Example image from Foursquare Venue">
                <div class="group">
                    <h3>${this.venue.name}</h3>
                    <blockquote>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, 
                        porro quisquam est qui dolorem ipsum quia dolor sit ametadipisci velit..."
                    </blockquote>
                    <p class="location"><b>Ubicación:</b> ${this.analyseInfo()}</p>
                </div>
            </div>
        `;
    }

    set recommendations(value){
        this.venue = value;
        this.render();
    }

    analyseInfo(){

        let location = '';

        if(this.venue.location.city === undefined && this.venue.location.address === undefined) {
            location = 'No disponible';
        }else if (this.venue.location.city === undefined){
            location = this.venue.location.address;
        }else{
            location = `${this.venue.location.city}, ${this.venue.location.address}`;
        }

        return location;
    }
}

customElements.define('rtn-card', Cards);