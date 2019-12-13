const plyConfig = { modeBarButtonsToRemove: ['sendDataToCloud', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'lasso2d', 'select2d', 'zoom2d', 'toImage', 'pan2d', 'zoomIn2d', 'zoomOut2d', 'resetScale2d', 'toggleSpikelines'], displaylogo: false, showTips: true };

function file(name) {
    return '../data/' + name;
}

function capitalizeFirst(s) {
    if(s.length > 0)
        return s[0].toUpperCase() + s.slice(1);
    else
        return s;
}

// === Plots ===

// Map of products by ingredients
Plotly.d3.csv(file('ply_ingredients_tsne.csv'), (err, rows) => {

    rows = rows.slice(0, 3000); // There are about 10k rows; change this number to increase the number of points displayed

    const points = {
        x: rows.map(r => parseFloat(r.x)),
        y: rows.map(r => parseFloat(r.y)),
        text: rows.map(r => r.name),
        marker: { color: 'rgba(37, 38, 88, 0.7)', size: 5 },
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

    Plotly.newPlot('products_ingredients', data, layout, plyConfig);
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
            tickformat: ',.0%'
        }
    };

    Plotly.newPlot('top_ingredients', data, layout, plyConfig);
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

    Plotly.newPlot('correlation_ingredients', data, layout, plyConfig);
});
