var c = $("#c")[0];
var ctx = c.getContext("2d");
var arr = [];
var arrTemp = [];
var w = document.body.clientWidth - 4;
var h = document.body.clientHeight - 4;
var fps = 60,
    step = 1 / fps,
    dt = 0,
    now, last = timestamp();
var mouse = {
    x: 0,
    y: 0
};
var pressed = false;

c.width = w;
c.height = h;
var options = {
    size: 3,
    strength: 2,
    expand: 1,
    speed: 8,
    squaresize: 5
};
function bound(x, min, max) {
    return Math.max(min, Math.min(max, x));
}


function timestamp() {
    if (window.performance && window.performance.now)
        return window.performance.now();
    else
        return new Date().getTime();
}
for (var r = 0; r < w - 1; r++) {
    arr[r] = [];
    for (var c = 0; c < h - 1; c++) {
        arr[r][c] = [];
    }
}
var nodes = [];
var colors = ["hsla(20,100%,50%,0.5)", "hsla(0,100%,50%,0.2)"];

function node(x, y) {
    this.x = x;
    this.y = y;
    this.color = "hsla(20,100%,50%,0.5)";
    return this;
}

function tick() {
    if (pressed) {
        for (var i = 0; i < options.strength; i++) {
            for (var y = -1; y <= options.size * options.expand; y += options.expand) {
                for (var x = -1; x <= options.size * options.expand; x += options.expand) {
                    nodes.push(new node(Math.max(Math.min(w - 1, Math.floor(mouse.x + x - options.size * options.expand / 2)), 0), Math.max(Math.min(h - 1, Math.floor(mouse.y + y - options.size * options.expand / 2)), 0)));
                }
            }
        }
    }
    arrTemp = [];

    for (var i = 0; i < nodes.length; i++) {
        var nod = nodes[i];
        var r = nod.y;
        var c = nod.x;
        if (Math.floor(Math.random() * 200) == 5) {
            if (nodes[i].color == "hsla(20,100%,50%,0.5)") {
                nodes[i].color = "hsla(0,100%,50%,0.2)";
            }
        }
        if (Math.floor(Math.random() * 400) == 5) {
            if (nodes[i].color == "hsla(0,100%,50%,0.2)") {
                nodes[i].color = "hsla(20,100%,50%,0.1)";
            }
        }

        if (Math.floor(Math.random() * 300) == 5) {
            if (nodes[i].color == "hsla(0,100%,50%,0.2)") {
                nodes[i].color = "hsla(20,100%,50%,0.5)";
            }
        }
        var choice = Math.floor(Math.random() * 5);
        if (Math.floor(Math.random() * 40) != 10) {
            if (choice === 0 && r > 0) {
                nod.y -= options.speed;
            } else if (choice == 1 && c < w - 1) {
                nod.x += options.speed;
            } else if (choice == 2 && r > 0) {
                nod.y -= options.speed;
            } else if (choice == 3 && c > 0) {
                nod.x -= options.speed;
            }
        } else {
            nodes.splice(i, 1);
            i--;
        }
    }
}

function draw() {
    if (w != document.body.clientWidth - 4 || h != document.body.clientHeight - 4) {
        w = document.body.clientWidth - 4;
        h = document.body.clientHeight - 4;

        c.width = w;
        c.height = h;
    }
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "screen";
    for (var c = 0; c < nodes.length; c++) {
        ctx.beginPath();
        ctx.fillStyle = nodes[c].color;
        ctx.arc(nodes[c].x, nodes[c].y, options.squaresize, 0,Math.PI*2,false);
        ctx.fill();
    }
    
    /*ctx.globalCompositeOperation = "difference";
    ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,w,h);
        ctx.fill();*/
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
document.body.ontouchstart = function(event) {
    event.clientX=event.changedTouches[0].pageX;
    event.clientY=event.changedTouches[0].pageY;
    mouse = {
        x: event.clientX,
        y: event.clientY
    };
    pressed = true;
};
document.body.ontouchend = function(event) {
    event.clientX=event.changedTouches[0].pageX;
    event.clientY=event.changedTouches[0].pageY;
    mouse = {
        x: event.clientX,
        y: event.clientY
    };
    pressed = false;
};
document.body.ontouchmove = function(event) {
    event.preventDefault();
    event.clientX=event.changedTouches[0].pageX;
    event.clientY=event.changedTouches[0].pageY;
    mouse = {
        x: event.clientX,
        y: event.clientY
    };
};
//window.setInterval(tick, 1);
//window.setInterval(draw, 10);
function frame() {
    now = timestamp();
    dt = dt + Math.min(1, (now - last) / 1000);
    while (dt > step) {
        dt = dt - step;
        tick();
    }
    draw();
    last = now;
    requestAnimationFrame(frame, c);
}

frame(); // start the first frame
