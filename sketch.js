
let c = 20; //scaling factor 
let numPoints = 0;
let angle = 137.3;
let radius = 200;

let squish = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); 
  colorMode(HSB, 255, 100, 70);
  noStroke();
}

function draw() {
  //orbitControl();
  background(0);

  rotateY(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  
  squish = (sin(frameCount * 0.01) + 1);

  let fov = map(squish, 0, 1, PI / 4, PI / 6);
  let aspect = width / height;
  let near = 0.1;
  let far = 1000;
  perspective(fov, aspect, near, far);

  for (let i = 0; i < numPoints; i++) {
    let a = i * angle;
    let r = c * sqrt(i);

    //convert polar to spherical 
    let phi = r / radius; //longitude
    let theta = a; //latitude

    //sphere coordinates
    let sx = radius * sin(phi) * cos(theta);
    let sy = radius * sin(phi) * sin(theta);
    let sz = radius * cos(phi);

    // donut coordinates 
    let donutRadius = radius * 0.5;
    let dx = (donutRadius + radius * 0.2 * cos(phi)) * cos(theta);
    let dy = (donutRadius + radius * 0.2 * cos(phi)) * sin(theta);
    let dz = radius * 0.2 * sin(phi);

    //interpolate between sphere and donut 
    let x1 = lerp(sx, dx, squish);
    let y1 = lerp(sy, dy, squish);
    let z1 = lerp(sz, dz, squish);

    push();
    translate(x1, y1, z1);
    let hueVal = map(i, 0, numPoints, 150, 255);
    fill(hueVal, 100, 100);
    sphere(5);
    pop();

    //do same for other side 
    let sx2 = radius * sin(phi) * cos(theta + 180);
    let sy2 = radius * sin(phi) * sin(theta + 180);
    let sz2 = -radius * cos(phi);

    let dx2 = (donutRadius + radius * 0.2 * cos(phi)) * cos(theta + 180);
    let dy2 = (donutRadius + radius * 0.2 * cos(phi)) * sin(theta + 180);
    let dz2 = radius * 0.2 * sin(phi);

    let x2 = lerp(sx2, dx2, squish);
    let y2 = lerp(sy2, dy2, squish);
    let z2 = lerp(sz2, dz2, squish);

    push();
    translate(x2, y2, z2);
    hueVal = map(i, 0, numPoints, 100, 200);
    fill(hueVal, 100, 250);    
    sphere(5);
    pop();

  }

  numPoints += 3;
  if (numPoints > 1000) {
    numPoints = 1000;
  }
}



