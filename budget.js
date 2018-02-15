let categories;
let consumption;
let budget;
let spendingMoney;
let spendingPercent;
let funds = 0;
let rainyDay = 0;
let rainyPercent;
let oldNum = 10;
let diceNumber = 0;
let newNum;
let drawBoard = false;
let allowance;
let emergency;
let savings;
let owings;
let debt = 0
let debtPercent = 0;
let payment;
let payday = false;

function screen_3() {
  direction.html('Split the remainder of your income into the following').style("padding", "10% 8% 0%");;
  if (!payday) {
    income = createElement("h2","Income: $" + (userIncome/24));
  }

  consumption = createElement("h2","Fixed expenses: $" + Math.floor((userIncome * (expenses/100))/24) + " (" + Math.floor(expenses) + "%)" );
  spendingMoney = Math.floor((userIncome - (userIncome * (expenses/100)))/24);
  spendingPercent = 100 - Math.floor(expenses);

  if (payday) {
    if(debt > 0) {
      spendingMoney = spendingMoney - debt;
      debtPercent = Math.ceil((debt/userIncome) * 100);
      spendingPercent = Math.floor(spendingPercent - debtPercent);
    }
  }

  categories = [["Spending budget", parseInt(spendingMoney), spendingPercent], ["Emergency", rainyDay, 0] ,["Savings", funds, 0]];

  for (i = 0; i < categories.length; i++ ) {
    let category = createDiv("").class("categories");
    createElement("h2",categories[i][0] + ": $" + categories[i][1] + " (" + categories[i][2] + "%)").id("cat_" + i).parent(category);
    createButton("-", i).class("button").addClass("subtract").parent(category);
    createButton("+", i).class("button").addClass("add").parent(category);

    // createElement("h2",categories[i][0]).id("cat_" + i).parent(category);
    // createButton("-", i).class("button").addClass("subtract").parent(category);
    // createElement(": $" + categories[i][1] + " (" + categories[i][2] + "%)").id("cat_" + i).parent(category);
    // createButton("+", i).class("button").addClass("add").parent(category);
  }

  let sButtons = selectAll('.subtract');
  let pButtons = selectAll('.add');

  for (i = 0; i < sButtons.length; i++) {
    sButtons[i].mousePressed(reduce);
  }

  for (i = 0; i < pButtons.length; i++) {
    pButtons[i].mousePressed(compound);
  }

  if (payday) {
    payment = createElement("h2", "Debt: $" + debt + " (" + debtPercent + "%)");
  }

  submitBtn = createButton("Submit").class("subbutton").style("margin", "3.25% 0%").mousePressed(commence);
}

function reduce() {
  index = this.value();
  let category = categories[index];
  if ((category[2]) > 0) {
    category[2] -= 1;
    category[1] -= Math.floor((userIncome * (1/100))/24);
    update(index);
  }
}

function compound() {
  index = this.value();
  let category = categories[index];
  if (categories[0][2] + categories[1][2] + categories[2][2] + expenses + debtPercent != 100) {
    category[2] += 1;
    category[1] += Math.floor((userIncome  *  (1/100))/24);
    update(index);
  }
}

function update(index) {
  let cat = select("#cat_" + index);
  cat.html(categories[index][0] + ": $" + categories[index][1] + " (" + categories[index][2] + "%)");
}

function commence() {
  if (categories[0][2] + categories[1][2] + categories[2][2] + expenses + debtPercent == 100) {
    // console.log("Spending: " + categories[0][1]);
    // console.log("Emergency: " + categories[1][1]);
    // console.log("Savings: " + categories[2][1]);
    if (payday) {
      if (spendingMoney > debt) {
        debt = 0;
      }
    }

    allowance = categories[0][1];
    emergency = categories[1][1];
    savings = categories[2][1];
    budget = createDiv("").class("budget");

    createElement('h2', categories[0][0] + ": $" + allowance ).id("spending").parent(budget);
    createElement('h2', categories[1][0] + ": $" + emergency).id("emergency").parent(budget);
    createElement('h2', categories[2][0] + ": $" + savings).id("savings").parent(budget);
    createElement('h2', "Debt: $" + debt).id("debt").parent(budget);
    createButton("Roll Dice").class("button").id("dice").parent(budget).mousePressed(rollDice);
    createElement('h2', "Moves: " + diceNumber).id("moves").parent(budget);
    createCanvas(600, 600).class("board").id("canvas");
  	di = width/ (1 + (1/4));
  	di_2 = width/2;
    drawBoard = true;

    if (savings > 0) {
      outByte = 100; //savings
      serial.write(outByte);
    }

    if (payday) {
      header.remove();
      instructions.remove();
      payment.remove();
      select("#canvas").show();
    }
    direction.remove();
    income.remove();
    consumption.remove();
    let catz = selectAll(".categories");
    for(i = 0; i < categories.length; i++){
      catz[i].remove();
    }
    submitBtn.remove();
  }
}

function rollDice() {
  diceNumber = Math.floor((Math.random() * 6) + 1);
  newNum = oldNum + diceNumber;
  select("#moves").html("Moves: " + diceNumber);
  modal();
}
