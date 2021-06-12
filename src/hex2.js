var grid = document.getElementById("grid");

var PI   = Math.PI,
    sin  = Math.sin,
    cos  = Math.cos;
var a = 2*PI / 6; // 60°
var r = 50;       // radiu

function drawHexagon(x, y){
    var hex  = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    // hex.id = "1,1";
    grid.appendChild(hex);
    hex.addEventListener("mouseover", function(event){
        event.target.style.fill="#AADDCC";
    }, false);
    hex.addEventListener("mouseout", function(event){
        event.target.style.fill="#225544";
    }, false);
    var arr = [];
    for (var i=0; i<6; i++){
        arr.push([x + r*cos(a*i), y + r*sin(a*i)]);
    }
    console.log(arr);
    for (value of arr) {
        var point = grid.createSVGPoint();
        point.x = value[0];
        point.y = value[1];
        hex.points.appendItem(point);
        hex.style.fill='#225544';
        hex.style.stroke='#DDDDDD';
    }
}

//draws a grid of u * v hexgons (row * col)
// x, y is the center of the top-left hexagon
function drawGrid(u, v, x=r+5, y=r+5){
    for (var i=0; i<v; i++){
        for (var j=0; j<u; j++){
            drawHexagon(i*(r+r*cos(a)) + x, (((-1)**(i+1)+1)/2 + 2*j)*r*sin(a) + y);
        }
    }
}

drawGrid(5,7);