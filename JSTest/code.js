function Start() {
        var text = document.getElementById("demo");
        var pos = text.getBoundingClientRect();
        
        text.innerHTML = "My First JavaScript";
        text.style.position = 'absolute';
        text.style.top = '100px';
        text.style.left = '200px';

        var world = planck.World();
        var position = planck.Vec2(0,0);
        var width = 2;
        var height = 2;
        var boxBody = world.createBody(position);
        var boxShape = planck.Box(width / 2, height / 2);
        boxBody.createFixture(boxShape);

        var gravity = planck.Vec2(0, -10); // Define the gravity vector
        var world = planck.World({ gravity: gravity }); // Pass the gravity vector to the world constructor

        // Run the simulation
        var timeStep = 1 / 60; // Time step for each iteration
        var velocityIterations = 6; // Number of iterations for velocity calculation
        var positionIterations = 2; // Number of iterations for position calculation
        
        function update() {
          world.step(timeStep, velocityIterations, positionIterations);
        
          // Access the position and angle of the box body
          var bodyPosition = boxBody.getPosition();
          var bodyAngle = boxBody.getAngle();
        
          // Log the position and angle in the console
          console.log('Position:', bodyPosition.x, bodyPosition.y);
          console.log('Angle:', bodyAngle);
        
          // Call the update function recursively for continuous simulation
          requestAnimationFrame(update);
        }
        
        // Start the simulation
        update();
}

document.addEventListener("DOMContentLoaded", Start);