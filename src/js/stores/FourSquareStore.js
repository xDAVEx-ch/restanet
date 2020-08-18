import { FourSquareAPIService } from "../services/FourSquareAPIService";

export const FourSquareStore = (() =>{
    // Private methods and variables can be defined isolated in the scope of the Service/Store

    let data = {
        venues: []
    };

    // All public methods and variables are available in the controller
    const controller = {

        get venues() {
            return data.venues;
        },

        set venues(venues) {
            data.venues = venues;
        },

        retrive(URLParameter){
            return new Promise((resolve, rejec) =>{
                FourSquareAPIService.call(URLParameter).then(data =>{
                    resolve(data);
                });
            })

        }
    }

    return controller;
})()