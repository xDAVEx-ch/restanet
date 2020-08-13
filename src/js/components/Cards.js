class Cards extends HTMLElement {

    constructor(){
        super();

        this.attachShadow({ mode : 'open' });
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
                    <h3>Dummy Place</h3>
                    <blockquote>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, 
                        porro quisquam est qui dolorem ipsum quia dolor sit ametadipisci velit..."
                    </blockquote>
                    <p class="location"><b>Ubicación:</b> En tu corazón <3</p>
                </div>
            </div>
        `;
    }
}

customElements.define('rtn-card', Cards);