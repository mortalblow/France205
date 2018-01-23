
var w=600;
var h=600;
var x;
var y;
var dataset=[];

// var svg=d3.select("body")
//   .append("svg")
//   .attr("width",w)
//   .attr("height",h);
//alert("Hello, France!!");
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

var text = d3.select("svg")
             .append("text")
             .attr("width", 20)
             .attr("height", 20);

var tooltip = d3.select("body")
          .append("div")
          .style("position", "absolute")
          //.style("z-index", "10")
          .style("visibility", "hidden")



d3.tsv("data/france.tsv")
  .row(function (d,i){// we define this function
    return{
      codePostal: +d["Postal Code"],
      inseeCode: +d.inseeCode,
      place: d.place,
      longitude: +d.x,
      latitude: +d.y,
      population: +d.population,
      densite: +d.density
    };
  })
    .get(function(error,rows){
      console.log("Loaded "+rows.length+" rows");
      if(rows.length>0){
        console.log("First row: ", rows[0])
        console.log("Last row: ", rows[rows.length-1])
      }
      x=d3.scale.linear()
                        .domain(d3.extent(rows,function(row) {return row.longitude;}))
                        .range([0,w]);
      y=d3.scale.linear()
                        .domain(d3.extent(rows,function(row) {return row.latitude;}))
                        .range([0,h]);

      dataset = rows;
      draw();
    });
//dataset=rows;

function draw(){

  svg.selectAll("rect")
     .data(dataset)
     .enter()
     .append("rect")
     .attr("width",1)
     .attr("height",1)
     .attr("x",function(d){return x(d.longitude)})
     .attr("y",function(d){return h-y(d.latitude)})// to inverse
     .attr("fill",function(d){
       if(d.densite>30){return"red"};
       if(d.densite>10) {return"orange"};//left name!!!! syntax bizzare
     })
     .on("mouseover", function(d){return tooltip.style("visibility", "visible").text(d.place);})
     .on("mousemove", function(){return tooltip.style("top",
            (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
     .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    //  svg.selectAll("circle")
    //     .data(dataset)
    //     .enter()
    //     .append("circle")
    //     .attr("r",function(d){d.density/2;})
    //     .attr("cx",function(d){return x(d.longitude)})
    //     .attr("cy",function(d){return h-y(d.latitude)})// to inverse
    //     .attr("fill","blue");


   }

  //  function mouseOver(d) {
  //             d3.select("body").append("text")
  //               .attr("x", function() {
  //                 return y(d.y);
  //               })
  //               .attr("dx", "6") // margin
  //               .attr("dy", ".35em") // vertical-align
  //               //.attr("class", "mylabel")//adding a label class
  //               .text(function() {
  //                 return d.place;
  //               });
  //           }
    //  .append("svg:title")
    //  .text(function(d) { return d.place;});// too small label, but ok
  //    .on("mouseover", function(d){
  //      var g = d3.select(this);
  //     var info = g.append("text")
  //        .classed("info", true)
  //        .attr("x",200)
  //        .attr("y",200)
  //        .text('more');
  // })
  // .on("mouseout", function() {
  //     // Remove the info text on mouse out.
  //     d3.select(this).select("text").remove();
  // });
