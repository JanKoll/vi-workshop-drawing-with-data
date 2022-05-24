var temperature = [];
var month = [];

//Width and height
var w = 500;
var h = 200;
var barPadding = 1;


(async () => {

    await d3.csv('./temperature-2050.csv', function (data) {
        temperature.push(parseInt(data.temperature));
        month.push(data.month);
    });

    // Crate Scales
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(temperature)])
        .range([0, h]); 
        
    var InvertedyScale = d3.scaleLinear()
        .domain([0, d3.max(temperature)])
        .range([h, 0]);

    //Create SVG element
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.selectAll("rect")
        .data(temperature)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return i * (w / temperature.length);
        })
        .attr("y", function (d) {
            return h - yScale(d); // Add yScale
        })
        .attr("width", w / temperature.length - barPadding)
        .attr("height", function (d) {
            return yScale(d); // Add yScale
        })
        .attr("fill", function (d) {
            if (d >= 15) return "red";
            else return "blue"
        });

    svg.selectAll("text")
        .data(month)
        .enter()
        .append("text")
        .text(function (d) {
            return d;
        })
        .attr("text-anchor", "middle")
        .attr("x", function (d, i) {
            return i * (w / month.length) + (w / month.length - barPadding) / 2;
        })
        .attr("y", function (d) {
            return h - 3;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "8px")
        .attr("fill", "white");

    // Creatate Axis
    var yAxis = d3.axisLeft()
        .scale(InvertedyScale);

    svg.append("g")
        .attr("transform", "translate(20,0)")
        .call(yAxis);
})();