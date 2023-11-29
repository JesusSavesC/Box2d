var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//document.addEventListener('mousemove', onMouseMove);
addEventListener('mousedown', mouseDownHandler);  
addEventListener('mouseup', mouseUpHandler);

var button = document.getElementById("button");

var text = document.getElementById("demo");
var bbp = text.getBoundingClientRect();
var words = text.textContent.split(' ');
// get the length of a space {
  // Create a span with just a space
  const spaceSpan = document.createElement("span");
  spaceSpan.textContent = " ";

  // Append to body so it's visible 
  document.body.appendChild(spaceSpan);

  // Measure width
  const spaceWidth = spaceSpan.getBoundingClientRect().width;

  // Remove span after use
  spaceSpan.remove();
//}

//ctx.strokeRect(8, 389, 100, 100); // for testing




// Create a new Planck.js world with gravity
var gravity = planck.Vec2(0, 981); // Define the gravity vector
var world = planck.World(gravity);

// Enable contact limits

// Also try enabling deactivation 
world.setWarmStarting(true);
world.setContinuousPhysics(true);

var boxes = [];

function makeBox(x, y, w, h, prop, isStatic) {
  if(isStatic) {
    var temp = world.createBody(planck.Vec2(x+w/2, y+h/2))
  } else {
    var temp = world.createDynamicBody(planck.Vec2(x+w/2, y+h/2));
  }
  temp.createFixture(planck.Box(w, h, prop));
  temp.angularVelocity = 1;
  boxes.push(temp);
}

// Create a dynamic box body
makeBox(canvas.width/2, canvas.height, canvas.width, 30, {density: 1.0, friction: 0.5}, true);
ctx.strokeStyle = 'red';
ctx.lineWidth = 2;

var testSizes = [];

button.onclick = function() {
  
  text.innerHTML = ''; // byebye paragraph
  var shiftL = 0;
  words.forEach((word, i) => {
    const span = document.createElement("span");
    span.id = i;
    
    span.textContent = word + ' '; // put the word in our new span
    text.appendChild(span);
    const bbox = span.getBoundingClientRect(); // create our bounding box
    const x = bbox.x, y = bbox.y, w = bbox.width, h = bbox.height;
    ctx.strokeRect(x, y, w, h);
    span.style.left = x + "px";
    span.style.top = y + "px";
    makeBox(x, y, w, h, {density: 1.0, friction: 0.5, rustitution: 0.1}, false);
    testSizes.push([w, h, x, y]);
  });
  const spans = text.querySelectorAll('span');
  spans.forEach((span) => {
    span.style.position = "absolute";
  });
  function update () {
    world.step(1/30, 10, 3);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    testSizes.forEach((info, i) => {
      var word = document.getElementById(i);
      var pos = boxes[i].getPosition();
      var ang = boxes[i].getAngle();
      var x = pos.x, y = pos.y;
      
      ctx.strokeRect(x, y, info[0], info[1]);
      word.style.left = x + "px";
      word.style.top = y + "px";
      
      word.style.transform = 'rotate(' + -ang + 'rad)';
      console.log(ang);
    });
    requestAnimationFrame(update);
  }
  update();
}

//////////////////////////

document.addEventListener('mousemove', mouseMoveHandler);

let selectedBody; 

function mouseMoveHandler(event) {

  // Check for body under cursor
  let body = getBodyAtWorldPoint(mousePosition);

  if(body && !selectedBody) {
    selectedBody = body;
  }

}
document.addEventListener('mousedown', mouseDownHandler);

function mouseDownHandler() {

  if(selectedBody) {

    let joint = world.createMouseJoint(selectedBody, {
      target: mousePosition
    });

  }

} 
document.addEventListener('mouseup', mouseUpHandler);

function mouseUpHandler() {
  world.destroy(joint);
  selectedBody = null;  
}
function getBodyAtWorldPoint(event) {

}
function mousePosition() {}