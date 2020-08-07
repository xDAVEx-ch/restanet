/*Simple function to convert tsv files to JSON. It was used to generate the AFINN JSON file*/

function tsvJSON(tsv) {
    const lines = tsv.split('\n');

    const result = lines.map(line => {
        const data = line.split('\t');
        return data.reduce((obj) => {
            obj[data[0]] = data[1];

            return obj;
        }, {});
    });

    return JSON.stringify(result);
}

function getData() {

    fetch('./AFINN-111.txt').then((response) => {
        response.text().then(value =>{
            console.log(tsvJSON(value));
        })
    });
}

getData();