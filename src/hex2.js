var grid = document.getElementById("grid");

var PI = Math.PI,
    sin = Math.sin,
    cos = Math.cos,
    floor = Math.floor,
    ceil = Math.ceil,
    sign = Math.sign,
    abs = Math.abs,
    max = Math.max;
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

// oh no i'm using global variables to track the state of the board!
var no_start = true;
var no_goal = true;
var start = {
    x: 0,
    y: 0
};
var goal = {
    x: 0,
    y: 0
};

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
        if (no_start) {
            hex.s = "start";
            no_start = false;
            start.x = hex.x;
            start.y = hex.y;
        } else if (no_goal) {
            hex.s = "goal";
            no_goal = false;
            goal.x = hex.x;
            goal.y = hex.y;
        } else {
            hex.s = "back";
        }
    } else if (hex.s === "start") {
        if (no_goal) {
            hex.s = "goal";
            no_start = true;
            no_goal = false;
            goal.x = hex.x;
            goal.y = hex.y;
        } else {
            hex.s = "back";
            no_start = true;
        }
    } else if (hex.s === "goal") {
        hex.s = "back";
        no_goal = true;
    } else {
        hex.s = "back";
        console.log("ERROR: bad hex type")
    }
    color(hex);
}

function drawHexagon(i, j, x, y) {
    var hex = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

    hex.x = i;
    hex.y = j;

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
        // console.log(start.x, start.y, goal.x, goal.y);
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
        for (var j = ceil(-i / 2); j < u - floor(i / 2); j++) {
            drawHexagon(i, j, i * (r + r * cos(a)) + x, (1 / 2 + i + 2 * j) * r * sin(a) + y);
        }
    }
}

function distance(a, b) {
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    var dist;
    if (sign(dx) === sign(dy)) {
        dist = abs(dx + dy);
    } else {
        dist = max(abs(dx), abs(dy));
    }
    return dist;
}

function calculate() {
    if (no_start || no_goal) {
        document.getElementById("dist").innerHTML = "ERROR: no start or no goal";
    } else {
        document.getElementById("dist").innerHTML = distance(start, goal);
    }
}

drawGrid(15, 18);