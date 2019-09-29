d3.select("#new-note")
    .on('submit', function() {
      d3.event.preventDefault();
      var input = d3.select('input');
      d3.select("#notes")
        .append('p')
          .classed('note', true)
          .text(input.property('value'));
      input.property('value', '');
    });

d3.select('.remove')
    .on('click', function(){
      d3.selectAll('.note')
        .remove();
    });

d3.select('.lucky')
    .on('click', function(){
      var notes = d3.selectAll('.note');
      notes.style('background-color', random_bg_color);
    })

var input = d3.select('input');
var preview = d3.select('.preview');

input.on('input',function(){
  var note = d3.event.target.value;
  preview.text(note)
    .classed("hide", note === "");
})

function random_bg_color() {
  var x = Math.floor(Math.random() * 256);
  var y = Math.floor(Math.random() * 256);
  var z = Math.floor(Math.random() * 256);
  var bgColor = "rgb(" + x + "," + y + "," + z + ")";
  return bgColor
  }