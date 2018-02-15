let data;
let scenarioNum = 0;
let option;

function preload() {
  data = loadJSON("scenarios.json")
}

function modal() {
  let modal = createDiv("").class("modal");
  let scenarios = Object.keys(data);
  let scenario = data[scenarios[scenarioNum]];
  let scenarioLength = Object.keys(scenario);
  let ran = Math.floor(Math.random() * scenario.length);
  let prompt = scenario[ran].prompt;
  let buttons = scenario[ran].buttons;
  createElement("h2", prompt).parent(modal).style("padding", "15% 0% 3% 0%");
  for (i = 0; i < buttons.length; i++ ) {
      option = createDiv('').class("option").parent(modal);
      createP(buttons[i].description).parent(option).style("padding", "2% 15%");
      if (scenarioNum == 0)
        createButton("$" + buttons[i].cost, parseInt(buttons[i].cost)).class("button").parent(option).mousePressed(emergencyOK);
      else if (scenarioNum == 1 || scenarioNum == 2) {
        createButton("$" + buttons[i].cost, parseInt(buttons[i].cost)).class("button").parent(option).mousePressed(spendingOK);
      }
  }
  scenarioNum += 1;
  if (scenarioNum == scenarioLength.length) {
    console.log("overflow");
    scenarioNum = 0;
  }
}

function emergencyOK() {
  select(".modal").remove();
  newDebt = parseInt(this.value());
  if (newDebt > emergency && emergency != 0) {
    let remainder = newDebt - emergency;
    select("#emergency").html(("Emergency: $" + 0));
    debt = debt + remainder;
    select("#debt").html(("Debt: $" + debt));
    emergency = 0;
    outByte = 200; //debt
    serial.write(outByte);
  } else if (newDebt < emergency) {
    emergency = emergency - newDebt;
    select("#emergency").html(("Emergency: $" + emergency));
  } else {
    debt = debt + newDebt;
    select("#debt").html(("Debt: $" + debt));
    outByte = 200; //debt
    serial.write(outByte);
  }
}

function spendingOK() {
  select(".modal").remove();
  newDebt = parseInt(this.value());
  if (newDebt > allowance && allowance != 0) {
    let remainder = newDebt - allowance;
    select("#spending").html(("Spending budget: $" + 0));
    debt = debt + remainder;
    select("#debt").html(("Debt: $" + debt));
    allowance = 0;
    outByte = 200; //debt
    serial.write(outByte);
  } else if (newDebt < allowance) {
    allowance = allowance - newDebt;
    select("#spending").html(("Spending budget: $" + allowance));
  } else {
    debt = debt + newDebt;
    select("#debt").html(("Debt: $" + debt));
    outByte = 200; //debt
    serial.write(outByte);
  }
}
