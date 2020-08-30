export const FourSquareAPIService = (() => {
    // Private methods and variables can be defined isolated in the scope of the Service/Store
    const clientId = '5H4ROYHBHG5PRQRQTPCIPALPXMLQZRLIILV5WFXHINNXGYOY';
    const clientSecret = 'TXCWF4POGHTIWAHPBZJ5YH0GPXORMBUS4AEXYL3W4T13V3OD';
  
    // All public methods and variables are available in the controller
    const controller = {
      call (parameters, newEndpoint, idParameter) {

        let url = this.buildUrl(newEndpoint, idParameter);

        return new Promise((resolve, reject) => {
          fetch(`${url}&${parameters[0]}&${parameters[1]}`, {
            method: 'GET',
          }).then((response) => {
            return response.json();
          }).then((json) => {
            resolve(json);
          })
        })
      },

      buildUrl(newEndpoint, idParameter){

        let endpoint = newEndpoint;
        let venueIdParameter = idParameter;

        let url = `https://api.foursquare.com/v2/venues${'/'+venueIdParameter}/${endpoint}?client_id=${clientId}&client_secret=${clientSecret}&v=20190425&limit=3`;

        return url;
      }
    }
  
    return controller;
  })()