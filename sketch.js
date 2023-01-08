// Game Project #5

// VARIABLES ================================================================================================================================================
// These variables are declared here to later capture the different elements, states, and properties of the environment and character.

var cameraPosX;
var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft = false;
var isRight = false;
var isJumping = false;
var isFalling = false;
var isPlummeting = false;

var coins;
var t_collectable;
var collectables;
var t_canyon;
var canyons;
var clouds;
var mountains;

var trees_x;
var treePos_y;

// SETUP CODE ===============================================================================================================================================
// This code creates the canvas and initializes the variables in the form of calculated numbers, booleans, arrays, and objects.

function setup() {
  createCanvas(950, 576);

  cameraPosX = 0;
  floorPos_y = (height * 3) / 4;

  gameChar_x = 50;
  gameChar_y = floorPos_y;

  treePos_y = floorPos_y - 132;
  trees_x = [150, 1300, 2200, 2350];

  canyons = [
    {
      x_pos: 400,
      width: 120,
    },
    {
      x_pos: 750,
      width: 150,
    },
    {
      x_pos: 1560,
      width: 200,
    },
    {
      x_pos: 2120,
      width: 75,
    },
  ];

  collectables = [
    {
      x_pos: 450,
      y_pos: floorPos_y - 80,
      size: 30,
      isFound: false,
    },
    {
      x_pos: 925,
      y_pos: floorPos_y - 20,
      size: 30,
      isFound: false,
    },
    {
      x_pos: 1250,
      y_pos: floorPos_y - 20,
      size: 30,
      isFound: false,
    },
    {
      x_pos: 1780,
      y_pos: floorPos_y - 20,
      size: 30,
      isFound: false,
    },
    {
      x_pos: 2225,
      y_pos: floorPos_y - 20,
      size: 30,
      isFound: false,
    },
  ];

  clouds = [
    {
      x_pos: 450,
      y_pos: floorPos_y - 250,
      size: 150,
    },

    {
      x_pos: 1200,
      y_pos: floorPos_y - 300,
      size: 200,
    },

    {
      x_pos: 2000,
      y_pos: floorPos_y - 180,
      size: 100,
    },
  ];

  mountains = [
    {
      x_pos: 600,
      y_pos: floorPos_y,
      size: 1.0,
    },
    {
      x_pos: 1500,
      y_pos: floorPos_y,
      size: 1.7,
    },
    {
      x_pos: 900,
      y_pos: floorPos_y,
      size: 0.5,
    },
  ];

  coins = 0;
}

// DRAWING CODE =============================================================================================================================================
/* This code is repeatedly called with the canvas refreshing with every new frames. There is alot of heavy lifting in this code, so here is a brief synopsis:
        - Elements are drawn to canvas by for-loops executing custom functions that iterating setup arrays.
        - Conditional if else statements analyze the character state to determine the sprite that displays.
        - The camera is anchored to the game character and the drawing code is translated accordingly so the background appears to scroll across the canvas behind the character.
        - Push and pop control the translation so that the sky and background elements remain constant and elements of the background scroll on and off the canvas as the character moves across the window.
*/

function draw() {
  cameraPosX = gameChar_x - width / 3; // ANCHOR CAMERA TO GAME CHARACTER --------

  background(100, 155, 255); // CONSTANT SKY ----------------------
  fill(0, 120, 60); // CONSTANT GROUND ----------------------------
  rect(0, floorPos_y, width, height - floorPos_y);

  push(); // TRANSLATE THESE STATES AND STYLES -------------
  translate(-cameraPosX, 0); // DISPLACE THESE DRAWINGS RELATIVE TO CAMERA ---------

  // CLOUD ======================================================================
  drawClouds();

  // MOUNTAIN =======================================================================
  drawMountains();

  // TREE ===========================================================================
  drawTrees();

  // CANYON =========================================================================
  for (i = 0; i < canyons.length; i++) {
    drawCanyon(canyons[i]);
    checkCanyon(canyons[i]);
  }

  // COLLECTABLES ====================================================================
  for (i = 0; i < collectables.length; i++) {
    if (collectables[i].isFound == false) {
      drawCollectable(collectables[i]);
      checkCollectable(collectables[i]);
    }
  }

  // GAME CHARACTER ===========================================================================================================================================
  if (isLeft && (isJumping || isFalling)) {
    // JUMPING LEFT --------------------------------------------------

    stroke(0);

    // NECK --------------
    fill(0, 100, 150); // ---- BLUE
    rect(gameChar_x - 10, gameChar_y - 50, 4, 10);
    fill(200, 200, 0); // ---- YELLOW
    rect(gameChar_x - 14, gameChar_y - 50, 4, 10);

    // BELLY --------------
    fill(200, 200, 0); // ---- YELLOW
    ellipse(gameChar_x - 10, gameChar_y - 32, 22, 28); // ---- BELLY
    triangle(
      gameChar_x,
      gameChar_y - 12,
      gameChar_x + 20,
      gameChar_y - 4,
      gameChar_x + 2,
      gameChar_y - 30
    ); // ---- TAIL

    fill(0, 100, 150);
    triangle(
      gameChar_x,
      gameChar_y - 18,
      gameChar_x + 23,
      gameChar_y - 2,
      gameChar_x + 2,
      gameChar_y - 30
    ); // ----- TAIL

    ellipse(gameChar_x - 5, gameChar_y - 32, 25, 30); // ---- BELLY

    fill(0, 100, 150);
    ellipse(gameChar_x - 2, gameChar_y - 25, 20, 20); // ---- THIGH
    rect(gameChar_x - 12, gameChar_y - 18, 15, 8, 5, 5, 5, 2); // ---- LEFT FOOT

    // HAND ---------------
    fill(0, 100, 150);
    rect(gameChar_x - 22, gameChar_y - 47, 15, 8, 5, 5, 5, 2);

    // HEAD ---------------
    fill(200, 200, 0); // ---- HORNS
    triangle(
      gameChar_x - 17,
      gameChar_y - 55,
      gameChar_x - 7,
      gameChar_y - 75,
      gameChar_x - 7,
      gameChar_y - 65
    ); // ---- LEFT
    triangle(
      gameChar_x - 2,
      gameChar_y - 55,
      gameChar_x,
      gameChar_y - 75,
      gameChar_x - 8,
      gameChar_y - 65
    ); // ---- RIGHT

    fill(0, 100, 150); // ---- FACE
    rect(gameChar_x - 20, gameChar_y - 65, 20, 15, 10);

    fill(255); // ---- EYES
    arc(gameChar_x - 10, gameChar_y - 60, 8, 10, 0, PI, CHORD);

    fill(0, 100, 150); // ---- NOSE
    rect(gameChar_x - 24, gameChar_y - 60, 10, 10, 5);
  } else if (isRight && (isJumping || isFalling)) {
    // JUMPING RIGHT ------------------------------------------------------------

    stroke(0);

    // NECK ---------------
    fill(0, 100, 150); // ---- BLUE
    rect(gameChar_x + 6, gameChar_y - 50, 4, 10);
    fill(200, 200, 0); // ---- YELLOW
    rect(gameChar_x + 10, gameChar_y - 50, 4, 10);

    // BELLY ---------------
    fill(200, 200, 0); // ---- YELLOW
    ellipse(gameChar_x + 10, gameChar_y - 32, 22, 28); // ---- BELLY
    triangle(
      gameChar_x,
      gameChar_y - 12,
      gameChar_x - 20,
      gameChar_y - 4,
      gameChar_x - 2,
      gameChar_y - 30
    ); // ---- TAIL

    fill(0, 100, 150); // ---- BLUE
    triangle(
      gameChar_x,
      gameChar_y - 18,
      gameChar_x - 23,
      gameChar_y - 2,
      gameChar_x - 2,
      gameChar_y - 30
    ); // ---- TAIL

    ellipse(gameChar_x + 5, gameChar_y - 32, 25, 30); // ---- BELLY

    fill(0, 100, 150);
    ellipse(gameChar_x + 2, gameChar_y - 25, 20, 20); // ---- THIGH
    rect(gameChar_x - 3, gameChar_y - 18, 15, 8, 5, 5, 5, 2); // ---- LEFT FOOT

    // HAND ----------------
    fill(0, 100, 150);
    rect(gameChar_x + 7, gameChar_y - 47, 15, 8, 5, 5, 5, 2);

    // HEAD -----------------
    fill(200, 200, 0); // ---- HORNS
    triangle(
      gameChar_x + 17,
      gameChar_y - 55,
      gameChar_x + 7,
      gameChar_y - 75,
      gameChar_x + 7,
      gameChar_y - 65
    ); // ---- LEFT
    triangle(
      gameChar_x + 2,
      gameChar_y - 55,
      gameChar_x,
      gameChar_y - 75,
      gameChar_x + 8,
      gameChar_y - 65
    ); // ---- RIGHT

    fill(0, 100, 150); // ---- FACE
    rect(gameChar_x, gameChar_y - 65, 20, 15, 10);

    fill(255); // ---- EYES
    arc(gameChar_x + 10, gameChar_y - 60, 8, 10, 0, PI, CHORD);

    fill(0, 100, 150); // ---- NOSE
    rect(gameChar_x + 14, gameChar_y - 60, 10, 10, 5);
  } else if (isLeft) {
    // WALKING LEFT ---------------------------------------------------------------------------------------------

    stroke(0);

    // NECK ----------------
    fill(0, 100, 150); // ---- BLUE
    rect(gameChar_x, gameChar_y - 50, 4, 20);
    fill(200, 200, 0); // ---- YELLOW
    rect(gameChar_x - 4, gameChar_y - 50, 4, 20);

    // BELLY ---------------
    fill(0, 100, 150);
    rect(gameChar_x - 22, gameChar_y - 15, 15, 8, 5, 5, 5, 2); // ---- RIGHT FOOT

    fill(200, 200, 0); // ---- YELLOW
    ellipse(gameChar_x - 3, gameChar_y - 18, 22, 28); // ---- BELLY
    triangle(
      gameChar_x,
      gameChar_y - 2,
      gameChar_x + 20,
      gameChar_y - 2,
      gameChar_x + 2,
      gameChar_y - 10
    ); // ---- TAIL

    fill(0, 100, 150); // ---- BLUE
    triangle(
      gameChar_x,
      gameChar_y - 8,
      gameChar_x + 23,
      gameChar_y - 2,
      gameChar_x + 2,
      gameChar_y - 30
    ); // ---- TAIL

    ellipse(gameChar_x + 2, gameChar_y - 18, 20, 30); // ---- BELLY
    rect(gameChar_x - 10, gameChar_y - 8, 15, 8, 5, 5, 5, 2); // ---- LEFT FOOT

    // HANDS ----------------
    fill(0, 100, 150);
    rect(gameChar_x - 12, gameChar_y - 28, 15, 8, 5, 5, 5, 2);
    ellipse(gameChar_x + 2, gameChar_y - 30, 12, 10); // ---- LEFT

    // HEAD -----------------
    fill(200, 200, 0); // ---- HORNS
    triangle(
      gameChar_x - 7,
      gameChar_y - 55,
      gameChar_x + 3,
      gameChar_y - 75,
      gameChar_x + 3,
      gameChar_y - 65
    ); // ---- LEFT
    triangle(
      gameChar_x + 8,
      gameChar_y - 55,
      gameChar_x + 10,
      gameChar_y - 75,
      gameChar_x + 2,
      gameChar_y - 65
    ); // ---- RIGHT

    fill(0, 100, 150); // ---- FACE
    rect(gameChar_x - 10, gameChar_y - 65, 20, 15, 10);

    fill(255); // ---- EYES
    arc(gameChar_x, gameChar_y - 60, 8, 10, 0, PI, CHORD);

    fill(0, 100, 150); // ---- NOSE
    rect(gameChar_x - 15, gameChar_y - 60, 10, 10, 5);
  } else if (isRight) {
    // WALKING RIGHT -----------------------------------------------------------------------------------------------

    stroke(0);

    // NECK ---------------
    fill(0, 100, 150); // ---- BLUE
    rect(gameChar_x - 4, gameChar_y - 50, 4, 20);
    fill(200, 200, 0); // ---- YELLOW
    rect(gameChar_x, gameChar_y - 50, 4, 20);

    // BELLY ---------------
    fill(0, 100, 150);
    rect(gameChar_x + 7, gameChar_y - 15, 15, 8, 5, 5, 5, 2); // ---- RIGHT FOOT

    fill(200, 200, 0); // ---- YELLOW
    ellipse(gameChar_x + 3, gameChar_y - 18, 22, 28); // ---- BELLY

    triangle(
      gameChar_x,
      gameChar_y - 2,
      gameChar_x - 20,
      gameChar_y - 2,
      gameChar_x - 2,
      gameChar_y - 10
    ); // ---- TAIL

    fill(0, 100, 150); // ---- BLUE
    triangle(
      gameChar_x,
      gameChar_y - 8,
      gameChar_x - 23,
      gameChar_y - 2,
      gameChar_x - 2,
      gameChar_y - 30
    ); // ---- TAIL

    ellipse(gameChar_x - 2, gameChar_y - 18, 20, 30); // ---- BELLY

    fill(0, 100, 150);
    rect(gameChar_x - 5, gameChar_y - 8, 15, 8, 5, 5, 5, 2); // ---- LEFT FOOT

    // HANDS --------------
    fill(0, 100, 150);
    rect(gameChar_x - 3, gameChar_y - 28, 15, 8, 5, 5, 5, 2); // ---- HAND
    ellipse(gameChar_x - 2, gameChar_y - 30, 12, 10); // ---- ARM

    // HEAD ---------------
    fill(200, 200, 0); // ---- HORNS
    triangle(
      gameChar_x + 7,
      gameChar_y - 55,
      gameChar_x - 3,
      gameChar_y - 75,
      gameChar_x - 3,
      gameChar_y - 65
    ); // ---- LEFT
    triangle(
      gameChar_x - 8,
      gameChar_y - 55,
      gameChar_x - 10,
      gameChar_y - 75,
      gameChar_x - 2,
      gameChar_y - 65
    ); // ---- RIGHT

    fill(0, 100, 150); // ---- FACE
    rect(gameChar_x - 10, gameChar_y - 65, 20, 15, 10);

    fill(255); // ---- EYES
    arc(gameChar_x, gameChar_y - 60, 8, 10, 0, PI, CHORD);

    fill(0, 100, 150); // ---- NOSE
    rect(gameChar_x + 5, gameChar_y - 60, 10, 10, 5);
  } else if (isJumping || isFalling) {
    // JUMPING FORWARD ------------------------------------------------------------------------------

    stroke(0);

    // NECK -----------------
    fill(0, 100, 150); // ---- BLUE
    quad(
      gameChar_x - 10,
      gameChar_y - 40,
      gameChar_x - 3,
      gameChar_y - 50,
      gameChar_x + 3,
      gameChar_y - 50,
      gameChar_x + 10,
      gameChar_y - 40
    );
    fill(200, 200, 0); // ---- YELLOW
    rect(gameChar_x - 4, gameChar_y - 50, 8, 10);

    // TAIL ------------------
    fill(0, 100, 150); // ---- BLUE
    triangle(
      gameChar_x - 10,
      gameChar_y - 20,
      gameChar_x,
      gameChar_y,
      gameChar_x + 10,
      gameChar_y - 20
    );
    fill(200, 200, 0); // ---- YELLOW
    triangle(
      gameChar_x - 5,
      gameChar_y - 20,
      gameChar_x,
      gameChar_y,
      gameChar_x + 5,
      gameChar_y - 20
    );

    // BELLY ---------------
    fill(0, 100, 150); // ---- BLUE
    ellipse(gameChar_x, gameChar_y - 30, 30, 25);
    fill(200, 200, 0); // ---- YELLOW
    ellipse(gameChar_x, gameChar_y - 30, 22, 28);

    // HANDS ---------------
    fill(0, 100, 150);
    ellipse(gameChar_x - 10, gameChar_y - 40, 10, 12); // ---- LEFT
    ellipse(gameChar_x + 10, gameChar_y - 40, 10, 12); // ---- RIGHT

    // FEET ----------------
    fill(0, 100, 150);
    rect(gameChar_x - 17, gameChar_y - 22, 15, 8, 5, 5, 5, 2); // ---- LEFT
    rect(gameChar_x + 2, gameChar_y - 22, 15, 8, 5, 5, 2, 5); // ---- RIGHT

    // HEAD ----------------
    fill(200, 200, 0); // ---- HORNS
    triangle(
      gameChar_x - 8,
      gameChar_y - 55,
      gameChar_x - 10,
      gameChar_y - 75,
      gameChar_x - 2,
      gameChar_y - 65
    ); // ---- LEFT
    triangle(
      gameChar_x + 8,
      gameChar_y - 55,
      gameChar_x + 10,
      gameChar_y - 75,
      gameChar_x + 2,
      gameChar_y - 65
    ); // ---- RIGHT

    fill(0, 100, 150); // ---- FACE
    rect(gameChar_x - 10, gameChar_y - 65, 20, 15, 10);

    fill(255); // ---- EYES
    arc(gameChar_x - 5, gameChar_y - 60, 8, 10, 0, PI, CHORD);
    arc(gameChar_x + 5, gameChar_y - 60, 8, 10, 0, PI, CHORD);

    fill(0, 100, 150); // ---- NOSE
    rect(gameChar_x - 5, gameChar_y - 58, 10, 10, 5);
  } else {
    // STANDING FORWARD -----------------------------------------------------------------------------

    stroke(0);

    // NECK ------------------
    fill(0, 100, 150); // ---- BLUE
    quad(
      gameChar_x - 10,
      gameChar_y - 30,
      gameChar_x - 3,
      gameChar_y - 50,
      gameChar_x + 3,
      gameChar_y - 50,
      gameChar_x + 10,
      gameChar_y - 30
    );
    fill(200, 200, 0); // ---- YELLOW
    rect(gameChar_x - 4, gameChar_y - 50, 8, 20);

    // BELLY -----------------
    fill(0, 100, 150); // ---- BLUE
    ellipse(gameChar_x, gameChar_y - 15, 30, 25);
    fill(200, 200, 0); // ---- YELLOW
    ellipse(gameChar_x, gameChar_y - 18, 22, 28);

    // HANDS -----------------
    fill(0, 100, 150);
    ellipse(gameChar_x - 10, gameChar_y - 27, 10, 12); // ---- LEFT
    ellipse(gameChar_x + 10, gameChar_y - 27, 10, 12); // ---- RIGHT

    // FEET -------------------
    fill(0, 100, 150);
    rect(gameChar_x - 17, gameChar_y - 8, 15, 8, 5, 5, 5, 2); // ---- LEFT
    rect(gameChar_x + 2, gameChar_y - 8, 15, 8, 5, 5, 2, 5); // ---- RIGHT

    // HEAD ------------------
    fill(200, 200, 0); // ---- HORNS
    triangle(
      gameChar_x - 8,
      gameChar_y - 55,
      gameChar_x - 10,
      gameChar_y - 75,
      gameChar_x - 2,
      gameChar_y - 65
    ); // ---- LEFT
    triangle(
      gameChar_x + 8,
      gameChar_y - 55,
      gameChar_x + 10,
      gameChar_y - 75,
      gameChar_x + 2,
      gameChar_y - 65
    ); // ---- RIGHT

    fill(0, 100, 150); // ---- FACE
    rect(gameChar_x - 10, gameChar_y - 65, 20, 15, 10);

    fill(255); // ---- EYES
    arc(gameChar_x - 5, gameChar_y - 60, 8, 10, 0, PI, CHORD); // ---- LEFT
    arc(gameChar_x + 5, gameChar_y - 60, 8, 10, 0, PI, CHORD); // ---- RIGHT

    fill(0, 100, 150); // ---- NOSE
    rect(gameChar_x - 5, gameChar_y - 58, 10, 10, 5);
  }

  pop(); // END TRANSLATION -----------------

  fill(0);
  textSize(24);
  text(`Gold: ${coins}`, 20, 50);

  // INTERACTION CODE// ============================================================================================================================================
  // This code analyzes the game character's position and state and controls how it animates.

  // WALKING LEFT ---------------------------------------------------------------------------
  if (isLeft == true && isPlummeting == false) {
    gameChar_x -= 4;
  }

  // WALKING RIGHT --------------------------------------------------------------------------
  if (isRight == true && isPlummeting == false) {
    gameChar_x += 4;
  }

  // LANDING --------------------------------------------------------------------------------
  if (gameChar_y == floorPos_y) {
    isFalling = false;
  }

  // JUMPING -------------------------------------------------------------------------------
  if (isJumping == true && isFalling == false) {
    gameChar_y = constrain(gameChar_y - 4, floorPos_y - 100, floorPos_y);
    if (gameChar_y == floorPos_y - 100) {
      isJumping = false;
      isFalling = true;
    }
  }

  if (isFalling == true && gameChar_y != floorPos_y) {
    gameChar_y = constrain(gameChar_y + 3, floorPos_y - 100, floorPos_y);
  }
};

// EVENT LISTENERS =============================================================================================================================================
// These functions monitor the user inputs and edit the variables capturing the state accordingly.

function keyPressed() {
  if (keyCode == 37 && key == "ArrowLeft") {
    // LEFT ARROW PRESS ------
    isLeft = true;
  }

  if (keyCode == 39 && key == "ArrowRight") {
    // RIGHT ARROW PRESS ----
    isRight = true;
  }

  if (gameChar_y == floorPos_y) {
    // UP ARROW JUMP -------
    if (keyCode == 38 && key == "ArrowUp") {
      isJumping = true;
    }
  }
}

function keyReleased() {
  if (keyCode == 37 && key == "ArrowLeft") {
    // LEFT ARROW PRESS ------
    isLeft = false;
  }

  if (keyCode == 39 && key == "ArrowRight") {
    // RIGHT ARROW PRESS ----
    isRight = false;
  }
}

// GENERATION FUNCTION ===========================================================================================================================================

function drawClouds() {
  // CLOUD ======================================================================
  for (i = 0; i < clouds.length; i++) {
    noStroke();
    fill(255);
    ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].size);
    ellipse(
      clouds[i].x_pos + clouds[i].size / 2,
      clouds[i].y_pos + 10,
      clouds[i].size * 0.6
    );
    ellipse(
      clouds[i].x_pos - clouds[i].size / 2,
      clouds[i].y_pos + 15,
      clouds[i].size * 0.6,
      clouds[i].size * 0.4
    );
    ellipse(
      clouds[i].x_pos + clouds[i].size - 10,
      clouds[i].y_pos + 15,
      clouds[i].size * 0.6,
      clouds[i].size * 0.4
    );
    stroke(1);
  }
}

function drawMountains() {
  // MOUNTAIN =======================================================================
  for (i = 0; i < mountains.length; i++) {
    fill(175, 175, 200);
    triangle(
      mountains[i].x_pos + 75,
      mountains[i].y_pos,
      mountains[i].x_pos + 100 + mountains[i].size * 90,
      mountains[i].y_pos - mountains[i].size * 250,
      mountains[i].x_pos + 100 + mountains[i].size * 250,
      mountains[i].y_pos
    );

    fill(150);
    triangle(
      mountains[i].x_pos,
      mountains[i].y_pos,
      mountains[i].x_pos + mountains[i].size * 40,
      mountains[i].y_pos - mountains[i].size * 60,
      mountains[i].x_pos + mountains[i].size * 130,
      mountains[i].y_pos
    );

    beginShape(LINES);
    vertex(
      mountains[i].x_pos + mountains[i].size * 40,
      mountains[i].y_pos - mountains[i].size * 60
    );
    vertex(
      mountains[i].x_pos + mountains[i].size * 50,
      mountains[i].y_pos - mountains[i].size * 30
    );
    vertex(
      mountains[i].x_pos + mountains[i].size * 50,
      mountains[i].y_pos - mountains[i].size * 30
    );
    vertex(
      mountains[i].x_pos + mountains[i].size * 40,
      mountains[i].y_pos - mountains[i].size * 10
    );
    vertex(
      mountains[i].x_pos + mountains[i].size * 40,
      mountains[i].y_pos - mountains[i].size * 10
    );
    vertex(
      mountains[i].x_pos + mountains[i].size * 100,
      mountains[i].y_pos - mountains[i].size * 0
    );
    endShape();

    fill(150, 140, 200);
    triangle(
      mountains[i].x_pos + 75,
      mountains[i].y_pos,
      mountains[i].x_pos + 100 + mountains[i].size * 90,
      mountains[i].y_pos - mountains[i].size * 250,
      mountains[i].x_pos + 100 + mountains[i].size * 250,
      mountains[i].y_pos
    );

    beginShape(LINES);
    vertex(
      mountains[i].x_pos + 100 + mountains[i].size * 90,
      mountains[i].y_pos - mountains[i].size * 250
    );
    vertex(
      mountains[i].x_pos + 100 + mountains[i].size * 80,
      mountains[i].y_pos - mountains[i].size * 185
    );
    vertex(
      mountains[i].x_pos + 100 + mountains[i].size * 80,
      mountains[i].y_pos - mountains[i].size * 185
    );
    vertex(
      mountains[i].x_pos + 100 + mountains[i].size * 120,
      mountains[i].y_pos - mountains[i].size * 170
    );
    vertex(
      mountains[i].x_pos + 100 + mountains[i].size * 120,
      mountains[i].y_pos - mountains[i].size * 170
    );
    vertex(
      mountains[i].x_pos + 100 + mountains[i].size * 160,
      mountains[i].y_pos - mountains[i].size * 110
    );
    vertex(
      mountains[i].x_pos + 100 + mountains[i].size * 160,
      mountains[i].y_pos - mountains[i].size * 110
    );
    vertex(
      mountains[i].x_pos + 100 + mountains[i].size * 110,
      mountains[i].y_pos - mountains[i].size * 70
    );
    vertex(
      mountains[i].x_pos + 100 + mountains[i].size * 110,
      mountains[i].y_pos - mountains[i].size * 70
    );
    vertex(
      mountains[i].x_pos + 100 + mountains[i].size * 110,
      mountains[i].y_pos - mountains[i].size * 0
    );
    endShape();
  }
}

function drawTrees() {
  // TREE ===========================================================================
  for (i = 0; i < trees_x.length; i++) {
    fill(150, 150, 100);
    rect(trees_x[i], treePos_y, 50, 132);

    fill(100, 100, 50);
    ellipse(trees_x[i] + 15, treePos_y + 50, 15, 25);

    fill(0, 200, 100);

    ellipse(trees_x[i] + 50, treePos_y - 100, 50, 50);
    ellipse(trees_x[i] - 50, treePos_y - 80, 50, 50);
    ellipse(trees_x[i] - 10, treePos_y + 5, 50, 50);
    ellipse(trees_x[i] + 130, treePos_y - 30, 50, 50);
    ellipse(trees_x[i] + 80, treePos_y - 60, 100, 100);
    ellipse(trees_x[i] - 40, treePos_y - 40, 100, 100);
    ellipse(trees_x[i] + 50, treePos_y - 30, 100, 100);
    ellipse(trees_x[i] + 10, treePos_y - 80, 100, 100);
    ellipse(trees_x[i] + 80, treePos_y + 10, 100, 100);
  }
}

function drawCollectable(t_collectable) {
  // COLLECTABLE ====================================================================
    fill(200, 200, 0);
    ellipse(
      t_collectable.x_pos,
      t_collectable.y_pos,
      t_collectable.size * 0.7,
      t_collectable.size
    );

    fill(150, 150, 0);
    ellipse(
      t_collectable.x_pos,
      t_collectable.y_pos,
      t_collectable.size * 0.5,
      t_collectable.size * 0.8
    );

    fill(200, 200, 0);
    ellipse(
      t_collectable.x_pos,
      t_collectable.y_pos,
      t_collectable.size * 0.2,
      t_collectable.size * 0.65
    );

    stroke(255);
    strokeWeight(3);
    point(
      random(
        t_collectable.x_pos - t_collectable.size * 0.5,
        t_collectable.x_pos + t_collectable.size * 0.5
      ),
      random(
        t_collectable.y_pos - t_collectable.size * 0.5,
        t_collectable.y_pos + t_collectable.size * 0.5
      )
    );
    stroke(0);
    strokeWeight(1);
}

function drawCanyon(t_canyon) {
  // CANYON =========================================================================
  fill(0, 0, 0, 150);

  beginShape();
  vertex(t_canyon.x_pos, floorPos_y);
  vertex(t_canyon.x_pos + 15, floorPos_y + 80);
  vertex(t_canyon.x_pos - 6, height);
  vertex(t_canyon.x_pos + t_canyon.width, height);
  vertex(t_canyon.x_pos + t_canyon.width - 10, height - 50);
  vertex(t_canyon.x_pos + t_canyon.width - 3, floorPos_y + 30);
  vertex(t_canyon.x_pos + t_canyon.width + 10, floorPos_y);
  endShape();
}

function checkCollectable(t_collectable) {
  // COLLECTING -----------------------------------------------------------------------------
  if (
    dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) <
    30
  ) {
    t_collectable.isFound = true;
    console.log('found');
    coins += 1;
  }
}

function checkCanyon(t_canyon) {
  // DYING -------------------------------------------------------------------------------
  if (gameChar_y >= floorPos_y) {
    if (
      gameChar_x >= t_canyon.x_pos &&
      gameChar_x <= t_canyon.x_pos + t_canyon.width
    ) {
      console.log("woah");
      isFalling = false;
      isPlummeting = true;
      gameChar_y += 5;
    }
  }
}