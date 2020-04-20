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

function capitalizeWords(s) {
    return s.toLowerCase().split(" ").map(capitalizeFirst).join(" ");
}

function sum(seq) {
    return seq.map(s => parseInt(s)).reduce((a, b) => a + b, 0);
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

function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// === Plots ===

Plotly.d3.text(file('ply_income_sales.csv'), text => {
    const rows = Plotly.d3.csv.parseRows(text);
    const array = rows.map(row => row.slice(1).map(v => parseFloat(v))).slice(1);

    const data = [{
        x: rows.slice(1).map(r => r[0]),
        y: ['Mean Product Price', 'Total Food Budget'],
        z: array[0].map((col, i) => array.map(row => row[i])),
        type: 'heatmap'
    }];

    const layout = {
        width: 500,
        height: 240,
        title: {
            text: 'Correlation between income and spendings'
        },
        xaxis: {
            title: {
                text: 'Income'
            }
        },
        yaxis: {
            autorange: 'reversed'
        },
        zaxis: {
            tickformat: ',.1%'
        }
    };

    Plotly.newPlot('income-sales', data, fixed(layout), plyConfig);
});

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
                name: capitalizeWords(row.product),
                type: 'bar'
            };
            data.push(trace);
        });

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
                    text: 'Purchases per household'
                },
                tickformat: ',.2%'
            }
        };

        Plotly.newPlot(divId, data, fixed(layout), plyConfig);
    });
}

stackedPurchases('ply_purchases_income.csv', 'purchases-income', 'Amount of purchases of most common foods in terms of income', 'Household income');

stackedPurchases('ply_purchases_age.csv', 'purchases-age', 'Amount of purchases of most common foods in terms of age', 'Household age');

//stackedPurchases('ply_purchases_marital.csv', 'purchases-marital', 'Amount of purchases of most common foods in terms of marital status', 'Household marital status');

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
        height: 500,
        hovermode: 'closest'
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

    function getQuery() {
        return $('#query-text').val().toLowerCase();
    }
    const initialQuery = getQuery();

    const points = {
        x: rows.map(r => parseFloat(r.x)),
        y: rows.map(r => parseFloat(r.y)),
        text: rows.map(r => r.name),
        marker: { color: rows.map(r => r.name.toLowerCase().includes(initialQuery) ? colorHighlighted : colorHidden), size: 5 },
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
            const query = getQuery();
            Plotly.restyle(gd, { 'marker.color': [rows.map(r => r.name.toLowerCase().includes(query) ? colorHighlighted : colorHidden)] });
            e.preventDefault(); // Cancel event
        });
    });

});


Plotly.d3.csv(file('ply_nutrition_grade.csv'), (err, rows) => {

    const nutritionGradeGradient = ['#53783b', '#7b964a', '#b3c656', '#fcdb7e', '#fce198'];

    const quantifiers = ['with', 'without'];
    const variables = ['additives', 'allergens', 'palm_oil'];
    const suffixes = [
        'dangerous additives',
        'allergens',
        'palm oil'
    ];
    const scope = ['world', 'us'];
    const scopeTitles = ['World', 'United States'];

    const quantifierSelect = $('#grade-quantifier-select'), categorySelect = $('#grade-category-select');
    for(let i = 0; i < quantifiers.length; i++) {
        quantifierSelect.append(new Option(capitalizeFirst(quantifiers[i]), i))
    }
    for(let i = 0; i < suffixes.length; i++) {
        categorySelect.append(new Option(capitalizeWords(suffixes[i]), i)); // Add option to select
    }

    const allData = [];
    const titles = [];

    for (let i = 0; i < variables.length; i++) {
        const variable = variables[i], suffix = suffixes[i];
        const data = [];
        const tTitles = [];
        for(let k = 0; k < quantifiers.length; k++) {
            const quantifier = quantifiers[k];
            const title = 'Grade distribution for products ' + quantifier + ' ' + suffix;
            tTitles.push(title);
            const tData = [];

            for (let j = 0; j < scope.length; j++) {
                const column = quantifier + '_' + variable + '_' + scope[j];
                const total = rows.map(r => parseInt(r[column])).reduce((a, b) => a + b, 0);
                const z = 1.96;
                const entry = {
                    x: rows.map(r => capitalizeFirst(r.grade)),
                    y: rows.map(r => parseInt(r[column]) / total),
                    name: scopeTitles[j],
                    type: 'bar',
                    marker: {
                        color: nutritionGradeGradient,
                        line: {
                            color: 'rgb(244, 55, 56)',
                            width: j > 0 ? 3 : 0
                        }
                    },
                    error_y: {
                        type: 'data',
                        array: rows.map(r => {
                            const p = parseInt(r[column]) / total;
                            return z * Math.sqrt(p * (1 - p) / total)
                        }),
                        visible: true
                    }
                };
                tData.push(entry);
            }
            data.push(tData);
        }
        titles.push(tTitles);
        allData.push(data);
    }

    const layout = {
        title: {
            text: titles[0]
        },
        xaxis: {
            title: {
                text: 'Nutrition Grade'
            }
        },
        yaxis: {
            title: {
                text: 'Products'
            },
            tickformat: ',.0%'
        }
    };

    Plotly.newPlot('nutrition-grade', deepCopy(allData[0][0]), fixed(layout), plyConfig).then(gd => {
        function update() {
            const selectionQuantifier = parseInt(quantifierSelect.val()), selectionCategory = parseInt(categorySelect.val());
            Plotly.restyle(gd, {
                'y': deepCopy(allData[selectionCategory][selectionQuantifier].map(r => r.y))
            }, [0, 1]);
            Plotly.relayout(gd, {
                'title.text': titles[selectionCategory][selectionQuantifier]
            })
        }
        quantifierSelect.change(update);
        categorySelect.change(update);
    });
});


Plotly.d3.csv(file('ply_average_additives_country.csv'), (err, rows) => {

    const data = [{
        type: 'choropleth',
        locationmode: 'country names',
        locations: rows.map(r => capitalizeWords(r.country)),
        z: rows.map(r => r.average),
        colorscale: 'Hot',
        reversescale: true
    }];

    const layout = {
        title: 'Average number of additives per product by country',
        geo: {
            projection: {
                scope: 'world'
            }
        }
    };

    Plotly.newPlot('top-country-additives', data, fixed(layout), plyConfig);
});

Plotly.d3.csv(file('ply_distribution_average_additives_product.csv'), (err, rows) => {

    const total = sum(rows.map(r => r.count));

    const data = [{
        x: rows.map(r => r.additives),
        y: rows.map(r => r.count / total),
        type: 'scatter',
        fill: 'tozeroy'
    }];

    const layout = {
        title: 'Average number of additives per product',
        xaxis: {
            title: {
                text: 'Number of additives'
            }
        },
        yaxis: {
            type: 'log',
            autorange: true,
            title: {
                text: 'Products',
            },
            tickformat: ',.3%'
        }
    };

    Plotly.newPlot('additives-per-product', data, fixed(layout), plyConfig);
});

Plotly.d3.csv(file('ply_top_additives.csv'), (err, rows) => {

    const total = sum(rows.map(r => r.count));

    const colors = {
        colouring: 'rgb(255,88,84)',
        emulsifier: 'rgb(84,171,218)',
        preservatives: 'rgb(137,189,52)',
        antioxidants: 'rgb(124,103,181)',
        other: 'rgb(111,120,111)'
    };

    const data = [{
        x: rows.map(r => r.additive),
        y: rows.map(r => r.count / total),
        type: 'bar',
        marker: {
            color: rows.map(r => colors[r.color])
        },
        text: rows.map(r => capitalizeFirst(r.color))
    }];

    const layout = {
        title: 'Top additives',
        xaxis: {
            title: {
                text: 'Additive'
            }
        },
        yaxis: {
            title: {
                text: 'Products',
            },
            tickformat: ',.0%'
        }
    };

    Plotly.newPlot('top-additives', data, fixed(layout), plyConfig);
});



Plotly.d3.csv(file('ply_average_palm_oil_country.csv'), (err, rows) => {

    const data = [{
        type: 'choropleth',
        locationmode: 'country names',
        locations: rows.map(r => capitalizeWords(r.country)),
        z: rows.map(r => r.average),
        colorscale: 'Hot',
        reversescale: true
    }];

    const layout = {
        title: 'Average number of products with palm oil by country',
        geo: {
            projection: {
                scope: 'world'
            }
        }
    };

    Plotly.newPlot('top-country-palm-oil', data, fixed(layout), plyConfig);
});

Plotly.d3.csv(file('ply_income_radar.csv'), (err, rows) => {
    const columns = {
        energy_100g: 'Energy',
        fat_100g: 'Fat',
        carbohydrates_100g: 'Carbohydrates',
        proteins_100g: 'Proteins'
    };

    const data = [];

    for(let i = 0; i < rows.length; i += 2) {
        const row = rows[i];
        const labels = [], values = [];

        for(let col in columns) {
            labels.push(columns[col]);
            values.push(row[col]);
        }
        labels.push(labels[0]);
        values.push(values[0]);
        const layer = {
            type: 'scatterpolar',
            r: values,
            theta: labels,
            fill: false,
            name: row.income
        };

        data.push(layer);
    }

    const layout = {
        title: 'Ratio for macro nutrients in terms of income',
        polar: {
            radialaxis: {
                visible: false,
            }
        },
        //grid: {rows: 4, columns: 3, pattern: 'independent'}
    };

    Plotly.newPlot('income-radar', data, fixed(layout), plyConfig);
});

Plotly.d3.csv(file('ply_age_radar.csv'), (err, rows) => {
    const columns = {
        energy_100g: 'Energy',
        fat_100g: 'Fat',
        carbohydrates_100g: 'Carbohydrates',
        proteins_100g: 'Proteins'
    };

    const data = [];

    for(let i = 0; i < rows.length; i ++) {
        const row = rows[i];
        const labels = [], values = [];

        for(let col in columns) {
            labels.push(columns[col]);
            values.push(row[col]);
        }
        labels.push(labels[0]);
        values.push(values[0]);
        const layer = {
            type: 'scatterpolar',
            r: values,
            theta: labels,
            fill: false,
            name: row.age
        };

        data.push(layer);
    }

    const layout = {
        title: 'Ratio for macro nutrients in terms of age',
        polar: {
            radialaxis: {
                visible: false,
            }
        },
        //grid: {rows: 4, columns: 3, pattern: 'independent'}
    };

    Plotly.newPlot('age-radar', data, fixed(layout), plyConfig);
});

Plotly.d3.text(file('ply_correlation_grades.csv'), text => {
    const rows = Plotly.d3.csv.parseRows(text);

    const array = rows.map(row => row.slice(1).map(v => parseFloat(v))).slice(1);
    const header = rows[0].slice(1).map(s => capitalizeWords(s.replace('_', ' ')));

    const data = [{
        x: header,
        y: header,
        z: array,
        type: 'heatmap'
    }];

    const layout = {
        width: 600,
        height: 600,
        title: {
            text: 'Correlation between age, income and healthiness'
        },
        yaxis: {
            autorange: 'reversed'
        },
        zaxis: {
            tickformat: ',.1%'
        }
    };

    Plotly.newPlot('correlation-grades', data, fixed(layout), plyConfig);
});
