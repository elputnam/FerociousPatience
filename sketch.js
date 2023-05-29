//Lists of Months
let lightList = []; //lightly active minutes
let moderateList = []; //moderately active minutes
let veryList = []; //very active minutes
let sedentaryList = []; //sedentary minutes
// let stepList = []; //steps
let back = 175;

// Daily Cycle - variables for selceting and cycling throguh days
let lightActive = [];
let  moderateActive = [];
let veryActive = []; 
let notActive = [];
// let stepCount = [];
let light_data, very_data, moderate_data, sedentary_data;
let num_days; // number of days of data
let day_num = 0;
// let num_steps; //number of step intervals
// let step_num = 0;

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
  // stepList = loadStrings('steps-dataList.txt');
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
  // createCanvas(600, 600);
  if (windowWidth > windowHeight){
    createCanvas(windowHeight, windowHeight);
  } else {
    createCanvas(windowWidth, windowWidth);
  }

  colorMode(HSB, 360, 100, 100, 100);
  background(0, 100, 10);
  frameRate(15);

  //select month
  let month = int(random(18));
    print(month);
    lightActive = loadJSON(lightList[month]);
    moderateActive = loadJSON(moderateList[month]);
    veryActive = loadJSON(veryList[month]);
    notActive = loadJSON(sedentaryList[month]);
    // stepCount = loadJSON(stepList[month]);
}

function draw() {
  // background(255);
  // background(back, 100, 100, random(1));
  // print(frameCount);
  if (frameCount < 100){
    background(0, 100, 10, 10)
    noStroke();
      viralTime();
    }
    

  if (frameCount==100){
    num_days = Object.keys(lightActive).length;
    background(0);
    textSize(50);
    fill(255);
    text('lightly active', width*.05, height*.2);
    text('very active', width*.55, height*.3);
    text('moderately active', width*.05, height*.6, 0, height*.8);
    text('sedentary', width*.55, height*.8);
    // print(num_days);
    // num_steps = Object.keys(stepCount).length;
  }

  if (frameCount==150){
    background(0);
  } 

  if (frameCount > 150){
    let dateTime = lightActive[day_num]["dateTime"];
    light = lightActive[day_num]['value'];
    very = veryActive[day_num]['value'];
    moderate = moderateActive[day_num]['value'];
    sedentary = notActive[day_num]['value'];
    // steps = stepCount[step_num]['value'];
    back = map(very, 0, 50, 175, 0);
    // print("light:", light, "very:", very, "moderate:", moderate, "sedentary:", sedentary, "steps:", steps);
    day_num += 1;
    // step_num += 1;

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

     //Display day
     fill(255);
     textSize(30);
     noStroke();
     textAlign(RIGHT);
     text(dateTime, width+120, height-40);

    if (day_num >= num_days){
      day_num = 0;
      }
    
    // if (step_num >= num_steps){
    //   step_num = 0;
    // }
    }
  }

function activityMapping(){
  noStroke();
  //let s = random(100);
  //let l = random(100);
  let s = 100;
  let l = 100;
    // lightly active
    let a = map(light, 0, 1200, 175, 360);
    let alp1 = map(light, 0, 1500, 0, 100);
    let w1 = map(light, 0, 400, 0, width);
    let numA = int(random(1, 6));
    let lightImage = int(map(light, 0, 1500, 1, 6)); 
    // fill(a, s, l, w1);
    // rect(0 + w1, 0, width/2, height/2);
    tint(a, alp1, l, alp1);
    image(lowImages[lightImage], 0, 0, width/2, height/2)

    // very active
    let b = map(very, 0, 1200, 175, 360);
    let w2 = map(very, 0, 1500, 0, width);
    let numB = int(random(1, 18));
    let alp2 = map(very, 0, 1500, 0, 100);
    let veryImage = int(map(very, 0, 200, 1, 18)) 
    // fill(b, s, l, w2);
    tint(b, alp2, l, alp2)
    // rect(width/2-w2, 0, width/2, height/2);
    image(highImages[veryImage], width/2, 0, width/2, height/2)
    
   
    // sedentary
    let d = map(sedentary, 0, 1200, 175, 360);
    let w4 = map(sedentary, 0, 1500, 0, width);
    let alp4 = map(sedentary, 0, 1500, 0, 100);
    let numD = int(random(1, 15))
    let sedenImage = int(map(sedentary, 0, 1500, 1, 15)) 
    // fill(d, s, l, w4);
    tint(d, alp4, l, alp4);
    // rect(width/2-w4, height*.5, width/2, height/2);
    image(sedImages[sedenImage], width/2, height*.5, width/2, height/2);

     // moderately active
    let c = map(moderate, 0, 1200, 175, 360);
    let w3 = map(moderate, 0, 1500, 0, width);
    let alp3 = map(moderate, 0, 1500, 0, 100);
    let numC = int(random(1, 7));
    let modImage = int(map(moderate, 0, 200, 1, 7)) 
    // fill(c, s, l, w3);
    tint(c, alp3, l, alp3);
    // rect(0+w3, height*.5, width/2, height/2);
    image(midImages[modImage], 0, height*.5, width/2, height/2);
    

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

let viralTime = function(){
  if (frameCount%2==0){
    let num = 20;
    push();
    translate(width / 2, height / 2);
    let cir = (360 / num) * (frameCount % num);
    rotate(radians(random(cir)));
    noStroke();
    fill(175, random(100), 100);
    circle(width*.1, 0, width*.07);
    pop();
    }
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }