var button = document.getElementById("button");
var text = document.getElementById("demo");
var canvas = document.getElementById("canvas");

var ctx = canvas.getContext("2d");

button.addEventListener('click', function() {
  text.style.color = "red";
});
//Planck.js stuff
var pl = planck, Vec2 = pl.Vec2;

function update() {
  world.step(1/30);
}

var world = pl.World(Vec2(0, 1));

var boxes = [];
var scale = 1;

var createRect = function(x, y, w, h, isDynamic) {
  isDynamic = (isDynamic === undefined) ? true : isDynamic;
  var box = world.createBody()
  if(isDynamic) {box.setDynamic();} else {
    box.setStatic();
  }
  box.createFixture(pl.Box(w, h));
  box.setPosition(Vec2(x, y));
  box.setAngle(Math.random()*Math.PI);
  //console.log(box.m_fixtureList.m_shape.m_vertices);
  boxes.push({
    p: box,
    w: w,
    h: h
  });
}
createRect(20, 100, 200, 20, false);
for (var i = 0; i < 5; i++) {
  var x = Math.random() * 80;
  var y = Math.random() * 60;
  var w = 50 + Math.random() * 10;
  var h = 50 + Math.random() * 10;
  createRect(x, y, w, h, true);
}

function draw() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
  for (var i = 0; i < boxes.length; i++) {
    var box = boxes[i].p;
    var pos = box.getPosition();
    var ang = box.getAngle();
    var width = boxes[i].w;
    var height = boxes[i].h;

    ctx.fillStyle = "#FF0000";
    ctx.save();
    ctx.translate(pos.x/scale, pos.y/scale);
    ctx.rotate(ang);
    //console.log(ang);
    
    ctx.fillRect(-width/2, height/2, width/2, height/2);
    ctx.restore();
    //requestAnimationFrame(draw);
  }
}

function animate() {
  update();
  draw();
  requestAnimationFrame(animate);
}

//var intervalId = setInterval(animate, 160)

animate();

