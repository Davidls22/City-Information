const cityInfo = (city) => {
    //arrow function for module
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '292eb524e9msh90dce4fc42f0fc1p11d9c9jsne5cb8b3c70af',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    };

    return new Promise((resolve, reject) => {
        // promise function and fetch of api on city chosen by user
        fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions?namePrefix=${city}`, options)
            .then(response => response.json())
            .then(response => {
                //saving information on latitude and longitude as variables to use for second fetch
                const lat = response.data[0].latitude;
                const long = response.data[0].longitude;
                // getting data on population from api to log at end
                const population = response.data[0].population;
                //task said to include elevation but no elevation information available from API - included how to get the data anyway
                const elevation = response.data[0].elevation;

                const options2 = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '292eb524e9msh90dce4fc42f0fc1p11d9c9jsne5cb8b3c70af',
                        'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
                    }
                };
                //second api using longitude and latitude variables to get accurate weather specific to location
                return fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=${lat}&lon=${long}`, options2)
                    .then(response => response.json())
                    .then(response => {
                        //variable taking the temperature data from API
                        const temperature = response.data[0].temp;
                        //resolving promise 
                        resolve({ population, elevation, temperature });
                    })
                    //catching/rejecting errors
                    .catch(err => reject(err));
            })
            .catch(err => reject(err));
    });
}
/* logging data - using .then to get resolved fromise and then logging data from it. Hardcoded in the city as stated in the task
but used Chelmsford as that is where i am from rather than a city in south africa. Then used JSON.stringify to print the object as a string
as mentioned earlier there is no information in either API that shows elevation so i could not log it in the console - but i wrote the code
to show that i know how to do it if it was available - also emailed hyperiondev about this but no response so uploading it as is*/
console.log(cityInfo("chelmsford").then(data => console.log(`Information for Chelmsford:
${JSON.stringify(data)}`)));

/* Had 1-1 meeting with mentor to help with working out this project, as well as MDN Web Docs to help with using .then and JSON.stringify*/