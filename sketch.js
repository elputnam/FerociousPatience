//Lists of Months
let lightList = []; //lightly active minutes
let moderateList = []; //moderately active minutes
let veryList = []; //very active minutes
let sedentaryList = []; //sedentary minutes
let stepList = []; //steps
let back = 175;

// Daily Cycle - variables for selceting and cycling throguh days
let lightActive = [];
let  moderateActive = [];
let veryActive = []; 
let notActive = [];
let stepCount = [];
let light_data, very_data, moderate_data, sedentary_data;
let num_days; // number of days of data
let day_num = 0;
let num_steps; //number of step intervals
let step_num = 0;

let light, very, moderate, sedentary, steps;

//Image arrays
let sedImages = [];
let lowImages = [];
let midImages = [];
let highImages = []

function preload(){
  //Load list of json file names
  lightList = loadStrings('lightlyActive-dataList.txt');
  moderateList = loadStrings('moderatelyActive-dataList.txt');
  veryList = loadStrings('veryActive-dataList.txt');
  sedentaryList = loadStrings('sedentary-dataList.txt');
  stepList = loadStrings('steps-dataList.txt');
  for (let i = 1; i < 16; i++){
    sedImages[i] = loadImage("data/images/sedentary-" + i + ".png");
  } 
  for (let j = 1; j < 7; j++){
    lowImages[j] = loadImage("data/images/low-" + j + ".png");
  }  
  for (let k = 1; k < 8; k++){
    midImages[k] = loadImage("data/images/mid-" + k + ".png");
  }
  for (let l = 1; l < 19; l++){
    highImages[l] = loadImage("data/images/high-" + l + ".png");
  }    
}

function setup() {
  //createCanvas(windowWidth, windowHeight);
  createCanvas(1000, 1000);
  colorMode(HSB, 360, 100, 100, 100);
  background(0);
  frameRate(10);

  //select month
  let month = int(random(18));
    print(month);
    lightActive = loadJSON(lightList[month]);
    moderateActive = loadJSON(moderateList[month]);
    veryActive = loadJSON(veryList[month]);
    notActive = loadJSON(sedentaryList[month]);
    stepCount = loadJSON(stepList[month]);
}

function draw() {
  
  background(back, 100, 100, random(1));
  // print(frameCount);
  if (frameCount < 150){
    noStroke();
    fill(random(175,200), random(100), random(100), random(100));
    for (let l = 0; l < 500; l++){
      circle(random(width), random(height), random(100));
    }
  }

  if (frameCount==100){
    num_days = Object.keys(lightActive).length;
    // print(num_days);
    num_steps = Object.keys(stepCount).length;
  }

  if (frameCount > 150){
    
    light = lightActive[day_num]['value'];
    very = veryActive[day_num]['value'];
    moderate = moderateActive[day_num]['value'];
    sedentary = notActive[day_num]['value'];
    steps = stepCount[step_num]['value'];
    back = map(very, 0, 50, 175, 0);
    // print("light:", light, "very:", very, "moderate:", moderate, "sedentary:", sedentary, "steps:", steps);
    day_num += 1;
    step_num += 1;

    activityMapping();

    // mouse circle
    // noFill();
    // stroke(random(20,50), 25, 100);
    // beginShape();
    // curveVertex(width/2, height/2);
    // curveVertex(mouseX+random(100), mouseY+random(100));
    // curveVertex(mouseX+random(-100,100), mouseY+random(200));
    // curveVertex(mouseX+random(-100,100), mouseY+random(-100,100));
    // endShape(CLOSE);
    // for (let i = 0; i < height*0.1; i++){
    // circle(mouseX, mouseY, random(10)*i);
    // }
    if (day_num >= num_days){
      day_num = 0;
      }
    
    if (step_num >= num_steps){
      step_num = 0;
    }
    }
  }

function activityMapping(){
  noStroke();
  //let s = random(100);
  //let l = random(100);
  let s = 100;
  let l = 100;
  // let wig = random(width*.003, width*.007);
  let wig = random(100);
   //let wig = map(mouseX, 0, width, 5, 25);
    // lightly active
    let a = map(light, 0, 1200, 175, 360);
    let w1 = map(light, 0, 1500, 0, width);
    let numA = int(random(1, 6));
    // fill(a, s, l, wig);
    // rect(0+w1, 0, width/2, height/2);
    tint(a, s, l, wig);
    image(lowImages[numA], 0+w1, 0, width/2, height/2)

    // very active
    let b = map(very, 0, 1200, 175, 360);
    let w2 = map(very, 0, 1500, 0, width);
    let numB = int(random(1, 18));
    // fill(b, s, l, wig);
    tint(b, s, l, w2)
    // rect(width/2-w2, 0, width/2, height/2);
    image(highImages[numB], width/2-w2, 0, width/2, height/2)
    
    // moderately active
    let c = map(moderate, 0, 1200, 175, 360);
    let w3 = map(moderate, 0, 1500, 0, width);
    let numC = int(random(1, 7));
    // fill(c, s, l, w3);
    tint(c, s, l, w3);
    // rect(0+w3, height*.5, width/2, height/2);
    image(midImages[numC], 0+w3, height*.5, width/2, height/2);
    
    // sedentary
    let d = map(sedentary, 0, 1200, 175, 360);
    let w4 = map(sedentary, 0, 1500, 0, width);
    let numD = int(random(1, 15))
    // fill(d, s, l, w4);
    tint(d, s, l, w4);
    // rect(width/2-w4, height*.5, width/2, height/2);
    image(sedImages[numD], width/2-w4, height*.5, width/2, height/2);


  // // stepdust
  // push();
  // translate(width*.75, height*.4);
  // // let a = atan2(mouseY - height/2, mouseX - width/2);
  // // rotate(a);
  // let num1 = 200;
  // let cir = (360 / num1) * (frameCount % num1);
  // rotate((radians(cir)));
  // let inside = map(steps, 0, 100, 100, 0)
  // noStroke();
  // fill(inside);
  // let stretch = map(steps, 0, 100, width, 200)
  // for (let i = 0; i < steps; i++){
  //   rect(0 + random(-stretch), 0 + random(stretch/2), random(inside), random(inside));
  // }
  // pop();
}
