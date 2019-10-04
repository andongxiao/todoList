d3.queue()
    .defer(d3.json, "//unpkg.com/world-atlas@1.1.4/world/50m.json")
    .defer(d3.csv,"d3_gdp/data/GDP_data.csv", function(row){
        if(row.Series === "GDP in current prices (millions of US dollars)" || row.Series === "GDP per capita (US dollars)"){
            return{
                countryCode:row.CountryCode,
                region:row.Region,
                year:+row.Year,
                value:+row.Value.split(",").join(''),
                series:row.Series
            };
        }
        return;
    })
    .await(function(error, mapData, data){
        if(error) throw error;
        // debugger
        var extremeYears = d3.extent(data, d => d.year);
        var currentYear = extremeYears[0];
        var currentDataType = d3.select('input[name="data-type"]:checked').attr("value")
        var geoData = topojson.feature(mapData, mapData.objects.countries).features;
        var width = +d3.select("#map-container").node().offsetWidth;
        createMap(width, width * 4 / 5)
        createPie(width, 300);
        drawMap(geoData, data, currentYear, currentDataType);
        drawPie(data, currentYear);


        d3.select('#year')
            .property("min", currentYear)
            .property("max", extremeYears[1])
            .property("value", currentYear)
            .on("input", function(){
                currentYear = +d3.event.target.value;
                drawMap(geoData, data, currentYear, currentDataType);
                drawPie(data, currentYear);
                // d3.select('#year-val').text(currentYear);
            });
        
        d3.selectAll('input[name="data-type"]')
            .on("change",()=>{
                currentDataType = d3.event.target.value;
                drawMap(geoData, data, currentYear, currentDataType);
            })
        d3.selectAll('svg')
            .on("mousemove touchmove", updateTooltip)


        function updateTooltip(){
            var tooltip = d3.select('.tooltip');
            var tgt = d3.select(d3.event.target);
            var isCountry = tgt.classed("country");
            var isBar = tgt.classed("bar");
            var isArc = tgt.classed("arc");
            var dataType = d3.select('input:checked').property("value");
            var units = "dollar";
            var data;
            var percentage ="";
            if(isCountry) data = tgt.data()[0].properties;
            if(isArc){
                percentage = `<p>Percentage of total: ${getPercentage(tgt.data()[0])}</p>`;
                data = tgt.data()[0].data;
            } 
            tooltip
            .style("opacity", +(isCountry || isArc || isBar))
            .style("left", (d3.event.pageX - tooltip.node().offsetWidth / 2) + "px")
            .style("top", (d3.event.pageY - tooltip.node().offsetHeight - 10) + "px");

            if (data) {
                var dataValue = data['value'] ?
                  data['value'].toLocaleString() + " " + units :
                  "Data Not Available";
                tooltip 
                    .html(`
                      <p>Country: ${data.region}</p>
                      <p>${data['series']}: ${dataValue}</p>
                      <p>Year: ${data.year || d3.select("#year").property("value")}</p>
                      ${percentage}
                    `)
              }
        }
        function formatDataType(key) {
            return key[0].toUpperCase() + key.slice(1).replace(/[A-Z]/g, c => " " + c);
          }
        function getPercentage(d) {
        var angle = d.endAngle - d.startAngle;
        var fraction = 100 * angle / (Math.PI * 2);
        return fraction.toFixed(2) + "%";
        }
    })