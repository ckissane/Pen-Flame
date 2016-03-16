Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
var c = $("#c")[0];
var ctx = c.getContext("2d");
var arr = [];
var arrTemp = [];
var w = document.body.clientWidth - 4;
var h = document.body.clientHeight - 4;
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

function node(x, y) {
    this.x = x;
    this.y = y;
    this.color = "orange"; //colors[Math.floor(Math.random() * colors.length)];
    return this;
}

function tick() {


    /* for(var i=0;i<50;i+=1){
    nodes.push(new node(i%25+225+mouse.x,298+Math.sqrt(12.5*12.5-Math.pow(i%25-12,2)), 0));
    //arr[298][i%25+225].push(colors[Math.floor(Math.random()*colors.length)]);
}*/
   /* for (var i = 0; i < 360; i += 6) {
        nodes.push(new node(Math.sin(i / 180 * Math.PI) * 50 + w / 2, Math.cos(i / 180 * Math.PI) * 50 + h / 2, 0));
    }*/
    /*for (var y = -4; y <= 4; y++) {
            for (var x = -4; x <= 4; x++) {
                nodes.push(new node(x+w/2,y+h/2, 0));
            }
        }*/
    if (pressed) {
        for (var i = 0; i < 2; i++) {
            for (var y = -1; y <= 1; y++) {
                for (var x = -1; x <= 1; x++) {
                    nodes.push(new node(Math.max(Math.min(w - 1, Math.floor(mouse.x + x)), 0), Math.max(Math.min(h - 1, Math.floor(mouse.y + y)), 0)));
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
            if (nodes[i].color == "orange") {
                nodes[i].color = "red";
            }
        }

        if (Math.floor(Math.random() * 100) == 5) {
            if (nodes[i].color == "blue") {
                nodes[i].color = "orange";
            }
        }
        var choice = Math.floor(Math.random() * 5);
        if (Math.floor(Math.random() * 80) != 10) {
            if (choice + "" == "0") {
                if (r > 0) {
                    nod.y--;
                }
            } else if (choice + "" == "1") {
                if (c < w - 1) {
                    nod.x++;
                }
            } else if (choice == 2) {
                /*if (r < w - 1) {
                        arrTemp[r + 1][c].push(nodes[i]);
                    }*/
                if (r > 0) {
                    nod.y--;
                }
            } else if (choice == 3) {
                if (c > 0) {
                    nod.x--;
                }
            } else {



            }

        } else {
            nodes.remove(i);
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
        ctx.fillStyle = nodes[c].color; //"hsl(0,90%," + Math.min(100, nodes.length * 10 - 10) + "%)";
        ctx.fillRect(nodes[c].x, nodes[c].y, 1, 1);
        ctx.fill();

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
