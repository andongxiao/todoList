function createMap(width, height){
    d3.select('#map')
        .attr('width', width)
        .attr('height', height)
    .append("text")
        .attr("x", width/2)
        .attr("y", "1em")
        .attr("font-size", "1.5em")
        .style("text-anchor", "middle")
        .classed("map-title", true);
}

function drawMap(geoData, data, year, dataType) {
    var map = d3.select('#map');
    var projection = d3.geoMercator()
                        .scale(110)
                        .translate([
                            +map.attr("width") / 2,
                            +map.attr("height") / 1.4
                        ]);
    var path = d3.geoPath()
                        .projection(projection);
    d3.select('#year-val').text(year);
    geoData.forEach(d =>{
        var countries = data.filter(row => row.countryCode === d.id);
        var name = '';
        if (countries.length > 0) name = countries[0].country;
        d.properties = countries.find(c => c.year === year) || {country : name}
    });
    var domains = {
        "GDP in current prices (millions of US dollars)" : [1e6, 5e6, 10e7, 14e9],
        "GDP per capita (US dollars)" : [1e3, 1e4, 10e5, 13e6]
    }
    var colors = ["#f1c40f","#e67e22","#e74c3c","#c0392b"];

    var mapColorScale = d3.scaleLinear().domain(domains[dataType])
                            .range(colors);
    var update = map.selectAll(".country")
                        .data(geoData);
    // debugger
    update
        .enter()
        .append("path")
            .classed("country", true)
            .attr("d",path)
        .merge(update)
            .transition()
            .duration(750)
            .attr("fill", d => {
                var val = d.properties.value;
                return val? mapColorScale(val) : "#ccc";
            })
        // debugger
    
    // d3.select('.map-title')
                // .text(graphTitle(dataType) + "," + year);

    function graphTitle(str) {
        return str.replace(/[A-Z]/g, c => " " + c.toLowerCase());
    }
    
}