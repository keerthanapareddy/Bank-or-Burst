
var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodemFA131'; // fill in your serial port name here
var inData;                            // for incoming serial data
var outByte = 0;                       // for outgoing data
let di;
let di_2;
let header;

let roundCrossed = 1;

let start = 10;

function setup() {
  serial = new p5.SerialPort();    // make a new instance of the serialport library
  serial.on('data', serialEvent);  // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.open(portName);           // open a serial port
  screen_1();
}

function serialEvent() {
 // read a byte from the serial port:
 var inByte = serial.read();
 // store it in a global variable:
 inData = inByte;
}

function portOpen() {
  print('the serial port opened.')
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}
function serverConnected() {
  print('connected to server.');
}

function draw() {
  if (drawBoard){
    background('#353558');
    board();
  }
}

function board() {
  noStroke();
	fill('#FAF4E7');
	ellipse(width/2, height/2, di);
	if (frameCount%5 == 0) {
    if (oldNum < newNum) {
      oldNum ++;
    }
  }
  if(oldNum - start >= (14 * roundCrossed) ){
    roundCrossed++;
    console.log("round crossed: " + roundCrossed);

    if (roundCrossed > 2) {
      final();
    } else {
      console.log("payday");
      payDay();
    }

    select("#canvas").remove();
    select("#spending").remove();
    select("#emergency").remove();
    select("#savings").remove();
    select("#debt").remove();
    select("#dice").remove();
    select("#moves").remove();
    select(".modal").remove();
  }
	fill('#3EDB83');
	let cXval = (width/2 + (di_2/1.55) * Math.cos(2 * oldNum * (Math.PI / 14) + (Math.PI / 15))); //x coordinate of centre of small circles
	let cYval = (height/2 + (di_2/1.55) * Math.sin(2 * oldNum * (Math.PI / 14) + (Math.PI / 15)));//y coordinate of centre of small circles
	ellipse( cXval, cYval, 50, 50);
	fill('#404040');
	textSize(16);
	noStroke();
	textAlign(CENTER);
	text("PAYDAY", width/2, (((height/2) - (di/2)) + ((height/2) - (di_2/2)))/(1 + (9/10)));
  stroke(153, 153, 255);
	for(i = 0; i < 14; i++) {
    xVal = (width/2 + (di/2) * Math.cos(2 * Math.PI * i / 14));
    yVal = (height/2 + (di/2) * Math.sin(2 * Math.PI * i / 14));
    stroke('#DDD6CA');
		line(width/2, height/2, xVal, yVal);
	}
	fill('#353558');
	noStroke();
	ellipse(width/2, height/2, di_2);
}

function payDay() {
  // console.log("debt: " + debt);
  // console.log("Spending: " + allowance);
  // console.log("Emergency: " + emergency);
  // console.log("Savings: " + savings);

  if (debt == 0){
    // console.log(allowance + "(spending money) is added to " + savings + "(savings).");
    funds += allowance;
  } else if (allowance > debt){
    // console.log(debt + "(debt) is subtracted from " + allowance + "(spending money) and what remains is applied to savings.");
    allowance = allowance - debt;
    funds += allowance;
    debt = 0;
    debtPercent = 0;
    outByte = 0; //decrease debt
    serial.write(outByte);
  } else if (allowance < debt) {
    // console.log(allowance + "(spending money) is added to " + debt + "(debt).");
    debt = debt - allowance;
    allowance = 0;
  }

  rainyDay += emergency;
  funds +=  savings;

  header = createElement('h1', "IT'S PAYDAY!").style("padding", "2% 0%");
  instructions = createElement('h2', "Now is your chance to readjust your lifestyle choices and budget to better meet your savings goal.").style("padding", "0% 10% 3%");
  payday = true;
  screen_2();

}

function final() {
  if (savings >= goal && debt == 0) {
    createElement('h1', "CONGRATULATIONS!").style("padding", "5% 0%");;
    createElement('h2', " You've met your savings goal!").style("padding", "0% 10% 3%");;
  } else {
    createElement('h1', "TRY AGAIN!").style("padding", "5% 0%");;
    createElement('h2', "Sorry! You didn't meet your savings goal.").style("padding", "0% 10% 3%");;
  }
  outByte = 0; //reset
  serial.write(outByte);
}
