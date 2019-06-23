const d3 = require("../../../assets/scripts/d3.min.js");
const cloud = require("../../../assets/scripts/d3.layout.cloud.js");

export class D3WordcloucWordcloud {

  constructor() {
  }

  make_wordcloud(word_count){

    var fill_colors = ["#29e8c4", "#29e8d8", "#29e4e8", "#29cbe8"];

    drawWordCloud(word_count, ".chart_wordcloud");

    function drawWordCloud(word_count, div_id){

      var width = window.innerWidth - 200;// $(document).width();
      var height = width * 0.5;//$(document).height();
      var word_entries = d3.entries(word_count);

      var xScale = d3.scale.linear()
       .domain([0, d3.max(word_entries, function(d) {
          return d.value;
        })
       ])
       .range([10,70]);

      cloud().size([width, height])
        .timeInterval(200)
        .words(word_entries)
        .fontSize(function(d) { return xScale(+d.value); })
        .text(function(d) { return d.key; })
        .rotate(function() {
          // return ~~(Math.random() * 2) * 90;
          return 0; // comment this and un-comment above to have 90 degree rotations
        })
        .font("'helvetica neue', helvetica, arial, sans-serif")
        .on("end", draw)
        .start();

      function draw(words) {
        // d3.select(div_id).append("svg")
        //     .attr("width", width)
        //     .attr("height", height)
        //   .append("g")
        //     .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
        //   .selectAll("text")
        //     .data(words)
        //   .enter().append("text")
        //     .style("font-size", function(d) { return xScale(d.value) + "px"; })
        //     .style("font-family", "'helvetica neue', helvetica, arial, sans-serif")
        //     .style("font-weight", 100)
        //     .style("fill", function(d, i) { return fill_colors[i%4]; })
        //     .attr("text-anchor", "middle")
        //     .attr("transform", function(d) {
        //       return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        //     })
        //     .text(function(d) { return d.key; })
        //     ;

        d3.select(div_id).html("");

        var svg = d3.select(div_id).append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
          ;

        var words = svg.selectAll("text")
          .data(words)
          .enter().append("text")
          .style("font-size", function(d) { return xScale(d.value) + "px"; })
          .style("font-family", "'helvetica neue', helvetica, arial, sans-serif")
          .style("font-weight", 100)
          .style("fill", function(d, i) { return fill_colors[i%4]; })
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d) { return d.key; })
          ;

      }

      cloud().stop();
    }
  }


}
