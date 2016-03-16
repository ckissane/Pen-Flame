var c = $("#c")[0];
var ctx = c.getContext("2d");
var arr = [];
var arrTemp = [];
var w = 500;
var h = 300;
var mouse = {
    x: 0,
    y: 0
};
var pressed = false;

c.width = w;
c.height = h;

for (var r = 0; r < w - 1; r++) {
    arr[r] = [];
    for (var c = 0; c < h - 1; c++) {
        arr[r][c] = [];
    }
}
/*for(var i=0;i<100000;i++){
    arr[250][250].push("red");
}*/
var nodes = [];
var colors = ["orange", "red"];

function tick() {

    for (var i = 0; i < 50; i += 1) {
        arr[298][i % 25 + 225].push(colors[Math.floor(Math.random() * colors.length)]);
    }
    if (pressed) {
        for (var y = -5; y <= 5; y++) {
            for (var x = -5; x <= 5; x++) {
                arr[Math.max(Math.min(w - 1, Math.floor(mouse.y + y)), 0)][Math.max(Math.min(h - 1, Math.floor(mouse.x + x)), 0)].push(colors[Math.floor(Math.random() * colors.length)]);
            }
        }
    }
    arrTemp = [];
    for (var r = 0; r < w; r++) {
        arrTemp[r] = [];
        for (var c = 0; c < h; c++) {
            arrTemp[r][c] = [];
        }
    }
    for (var r = 0; r < w - 1; r++) {
        for (var c = 0; c < h - 1; c++) {
            nodes = arr[r][c];

            for (var i = 0; i < nodes.length; i++) {
                var choice = Math.floor(Math.random() * 5);
                if (Math.floor(Math.random() * 100) != 10) {


                    if (choice + "" == "0") {
                        if (r > 0) {
                            arrTemp[r - 1][c].push(nodes[i]);
                        }
                    } else if (choice + "" == "1") {
                        if (c < h - 1) {
                            arrTemp[r][c + 1].push(nodes[i]);
                        }
                    } else if (choice == 2) {
                        /*if (r < w - 1) {
                        arrTemp[r + 1][c].push(nodes[i]);
                    }*/
                        if (r > 0) {
                            arrTemp[r - 1][c].push(nodes[i]);
                        }
                    } else if (choice == 3) {
                        if (c > 0) {
                            arrTemp[r][c - 1].push(nodes[i]);
                        }
                    } else {

                        arrTemp[r][c].push(nodes[i]);

                    }
                }
            }
        }
    }
    for (var r = 0; r < w; r++) {
        arr[r] = arrTemp[r];
    }
}

function draw() {
    ctx.clearRect(0, 0, w, h);
    for (var r = 0; r < w - 1; r++) {
        for (var c = 0; c < h - 1; c++) {
            nodes = arr[r][c];
            if (nodes.length > 0) {
                ctx.beginPath();
                ctx.fillStyle = "hsl(0,90%," + Math.min(100, nodes.length * 10 - 10) + "%)";
                ctx.fillRect(c, r, 1, 1);
                ctx.fill();

            }

        }
    }
}
document.body.onmousedown = function(event) {
    mouse = {
        x: event.clientX,
        y: event.clientY
    };
    pressed = true;
};
document.body.onmouseup = function(event) {
    mouse = {
        x: event.clientX,
        y: event.clientY
    };
    pressed = false;
};
document.body.onmousemove = function(event) {
    mouse = {
        x: event.clientX,
        y: event.clientY
    };
};
window.setInterval(tick, 1);
window.setInterval(draw, 100);