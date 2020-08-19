export const FourSquareAPIService = (() => {
    // Private methods and variables can be defined isolated in the scope of the Service/Store
    const clientId = '5H4ROYHBHG5PRQRQTPCIPALPXMLQZRLIILV5WFXHINNXGYOY';
    const clientSecret = 'TXCWF4POGHTIWAHPBZJ5YH0GPXORMBUS4AEXYL3W4T13V3OD';
    const venuesEndpoint = `https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clientSecret}&v=20190425&limit=5&offset=5`;
  
    // All public methods and variables are available in the controller
    const controller = {
      call (parameters) {
        const [userLocation, userFood] = parameters;
        return new Promise((resolve, reject) => {
          fetch(`${venuesEndpoint}&${userLocation}${userFood}`, {
            method: 'GET',
          }).then((response) => {
            return response.json();
          }).then((json) => {
            resolve(json);
          })
        })
      }
    }
  
    return controller;
  })()