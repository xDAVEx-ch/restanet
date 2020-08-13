import { FourSquareAPIService } from "../services/FourSquareAPIService";

const FourSquareStore = (() =>{

    // All public methods and variables are available in the controller
    const controller = {

        data: [],

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