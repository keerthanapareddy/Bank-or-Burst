
let buttons;
let goals = [['', "A recliner for your living room    $400", 400], ['', "Your best friend wedding in Amsterdam   $500", 500], ['', "Downpayment for student loan $600", 600], ['', "A present for your mom's birthday   $700", 700]];
let userIncome;
let direction;
let insructions;

function screen_1() {
  direction = createElement('h1',"").class('direction').style("padding", "2% 0%");
  instructions = createElement('h1', "You are a recent graduate living in the city earning a salary of $45,000. Save toward one of the goals below while navigating the financial challenges of living in the city to win!").style("padding", "5% 18% 3%");
  createDiv('').id("goals");

  for(i = 0; i < goals.length; i++) {
    createDiv(goals[i][0]).id("goal_" + (i + 1)).class("goals").parent("#goals");
  }

  for (i = 0; i < goals.length; i++) {
    let button = createButton(goals[i][1], goals[i][2]).addClass('button').parent("#goal_" + (i + 1)).mousePressed(incomeAmount);;
  }
}

function incomeAmount() {
  userIncome = 45000;
  goal = parseInt(this.value());
  // console.log("goal: " + goal);
  instructions.remove();
  select("#goals").remove();
	screen_2();
}
