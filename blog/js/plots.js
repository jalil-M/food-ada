// For static plot use `staticPlot: true`
const plyConfig = {
    displayModeBar: false,
    displaylogo: false,
    showTips: true,
    doubleClick: false,
    scrollZoom: false
};

function file(name) {
    return '../data/' + name;
}

function capitalizeFirst(s) {
    if(s.length > 0)
        return s[0].toUpperCase() + s.slice(1);
    else
        return s;
}

function fixed(layout) {
    if(!layout.xaxis) {
        layout.xaxis = {}
    }
    layout.xaxis.fixedrange = true;
    if(!layout.yaxis) {
        layout.yaxis = {}
    }
    layout.yaxis.fixedrange = true;
    return layout;
}

// === Plots ===

function stackedPurchases(filename, divId, title, xlabel) {
    Plotly.d3.csv(file(filename), (err, rows) => {

        const data = [];
        rows.forEach(row => {
            const keys = [], values = [];
            Object.entries(row).forEach(([key, value]) => {
                if(key !== 'product') {
                    keys.push(key);
                    values.push(value);
                }
            });
            const trace = {
                x: keys,
                y: values,
                name: row.product,
                type: 'bar'
            };
            data.push(trace);
        });

        console.log(data);

        const layout = {
            barmode: 'stack',
            title: {
              text: title
            },
            xaxis: {
                title: {
                    text: xlabel
                }
            },
            yaxis: {
                title: {
                    text: 'Purchases count per household'
                }
            }
        };

        Plotly.newPlot(divId, data, fixed(layout), plyConfig);
    });
}

stackedPurchases('ply_purchases_income.csv', 'purchases-income', 'Amount of purchases of most common foods in terms of income', 'Household income');

stackedPurchases('ply_purchases_age.csv', 'purchases-age', 'Amount of purchases of most common foods in terms of age', 'Household age');

stackedPurchases('ply_purchases_marital.csv', 'purchases-marital', 'Amount of purchases of most common foods in terms of marital status', 'Household marital status');

// ----

Plotly.d3.csv(file('ply_correlation_sugars_fat.csv'), (err, rows) => {

    rows = rows.slice(0, 2000);

    const data = [{
        x: rows.map(r => parseFloat(r.sugars_100g)),
        y: rows.map(r => parseFloat(r.fat_100g)),
        marker: { color: 'rgb(232, 2, 0)', size: 2 },
        mode: 'markers',
        type: 'scatter',
        hoverinfo: ''
    }];

    const layout = {
        title: {
            text: 'Correlation between sugars and fat'
        },
        xaxis: {
            title: {
                text: 'Sugars per 100 grams'
            }
        },
        yaxis: {
            title: {
                text: 'Fat per 100 grams'
            }
        },
        autosize: false,
        width: 500,
        height: 500
    };

    Plotly.newPlot('correlation-sugars-fat', data, fixed(layout), plyConfig);
});

Plotly.d3.csv(file('ply_top_ingredients_lists.csv'), (err, rows) => {

    rows = rows.slice(0, 25);

    const data = [{
        x: rows.map(r => r.ingredient).map(capitalizeFirst),
        y: rows.map(r => parseFloat(r.frequency)),
        type: 'bar'
    }];

    const layout = {
        title: {
            text: 'Top ' + rows.length + ' ingredients in products'
        },
        yaxis: {
            title: {
                text: 'Frequency'
            },
            tickformat: ',.0%'
        }
    };

    Plotly.newPlot('top-ingredients', data, fixed(layout), plyConfig);
});

Plotly.d3.text(file('ply_correlation_ingredients.csv'), text => {
    const rows = Plotly.d3.csv.parseRows(text);
    const n = rows.length - 1;
    const header = rows[0].map(capitalizeFirst);
    const array = rows.slice(1).map(row => row.slice(0, n - 1).map(v => parseFloat(v))).slice(1, n);
    const data = [{
        x: header.slice(0, n - 1),
        y: header.slice(1),
        z: array,
        type: 'heatmap'
    }];

    const layout = {
        title: {
            text: 'Highlighting ingredients combinations'
        },
        width: 600,
        height: 600,
        yaxis: {
            autorange: 'reversed'
        },
        zaxis: {
            tickformat: ',.1%' // TODO tick doesn't seem to display a percentage!
        }
    };

    Plotly.newPlot('correlation-ingredients', data, fixed(layout), plyConfig);
});

// Map of products by ingredients
Plotly.d3.csv(file('ply_ingredients_tsne.csv'), (err, rows) => {

    rows = rows.slice(0, 3000); // There are about 10k rows; change this number to increase the number of points displayed

    const colorHighlighted = 'rgba(255,62,94, 0.7)', colorHidden = 'rgba(179,179,179,0.25)';

    const points = {
        x: rows.map(r => parseFloat(r.x)),
        y: rows.map(r => parseFloat(r.y)),
        text: rows.map(r => r.name),
        marker: { color: colorHighlighted, size: 5 },
        mode: 'markers',
        type: 'scatter',
        hoverinfo: 'text'
    };

    const data = [points];

    const hiddenAxis = {
        autorange: true,
        showgrid: false,
        zeroline: false,
        showline: false,
        autotick: true,
        ticks: '',
        showticklabels: false
    };

    const layout = {
        title: {
            text: 'Map of food products spatialized by their ingredients'
        },
        autosize: false,
        width: 750,
        height: 750,
        hovermode: 'closest',
        xaxis: hiddenAxis,
        yaxis: hiddenAxis
    };

    Plotly.newPlot('products-ingredients', data, fixed(layout), plyConfig).then(gd => {
        $("#query-form").submit(function(e) {
            const query = $('#query-text').val().toLowerCase();
            Plotly.restyle(gd, { 'marker.color': [rows.map(r => r.name.toLowerCase().includes(query) ? colorHighlighted : colorHidden)] });
            e.preventDefault(); // Cancel event
        });

    });
});