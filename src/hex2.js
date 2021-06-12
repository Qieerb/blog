var grid = document.getElementById("grid");

var PI = Math.PI,
    sin = Math.sin,
    cos = Math.cos;
var a = 2 * PI / 6; // 60°
var r = 20; // radius

// color palatte
var back_c = "#333333",
    wall_c = "#CCCCCC",
    hover_c = "#888888",
    start_c = "#0000AA",
    goal_c = "#00AA00",
    error_c = "#FFAAAA",
    outline_c = "#FFFFFF";

function color(hex) {
    switch (hex.s) {
        case "back":
            hex.style.fill = back_c;
            break;
        case "wall":
            hex.style.fill = wall_c;
            break;
        case "start":
            hex.style.fill = start_c;
            break;
        case "goal":
            hex.style.fill = goal_c;
            break;
        default:
            hex.style.fill = error_c;
            console.log("ERROR: bad hex colour")
    }
}

function cycleTypes(hex) {
    if (hex.s === "back") {
        hex.s = "wall";
    } else if (hex.s === "wall") {
        hex.s = "start";
    } else if (hex.s === "start") {
        hex.s = "goal";
    } else if (hex.s === "goal") {
        hex.s = "back";
    } else {
        hex.s = "back";
        console.log("ERROR: bad hex type")
    }
    color(hex);
}

function drawHexagon(x, y) {
    var hex = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

    var arr = [];
    for (var i = 0; i < 6; i++) {
        arr.push([x + r * cos(a * i), y + r * sin(a * i)]);
    }

    for (value of arr) {
        var point = grid.createSVGPoint();
        point.x = value[0];
        point.y = value[1];
        hex.points.appendItem(point);
        hex.style.stroke = outline_c;
        hex.s = "back";
    }
    color(hex);

    hex.addEventListener("mouseover", function (e) {
        if (e.buttons === 1 || e.buttons === 3) {
            cycleTypes(e.target);
        } else {
            e.target.style.fill = hover_c;
        }
    }, false);

    hex.addEventListener("mouseout", function (e) {
        color(e.target);
    }, false);

    hex.addEventListener("mousedown", function (e) {
        cycleTypes(e.target);
    }, false);

    grid.appendChild(hex);
}

//draws a grid of u * v hexgons (row * col)
// x, y is the center of the top-left hexagon
function drawGrid(u, v, x = r + 5, y = r + 5) {
    for (var i = 0; i < v; i++) {
        for (var j = 0; j < u; j++) {
            drawHexagon(i * (r + r * cos(a)) + x, (((-1) ** (i + 1) + 1) / 2 + 2 * j) * r * sin(a) + y);
        }
    }
}

drawGrid(15, 18);