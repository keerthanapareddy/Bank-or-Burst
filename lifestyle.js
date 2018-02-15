
let foodChoices = ["Cook at home every day", "Subscribe to a meal delivery plan", "Eat out for every meal"];
let transChoices = ["Ride a bike", "Public transport", "Uber pool"];
let housingChoices = ["Live with parents", "Live with roommates", "Live alone"];
let luxChoices = ["Netflix", "Cable", "In home washer and dryer"];
let percentages = [50, 60, 70];
let expenses;
let submitBtn;
let decisions = 0;

function screen_2() {
  direction.html('Make some lifestyle choices').style("padding", "10% 8% 0% ");;
  let food = createDiv("").class("categories");
  createElement('h2','Food: ').parent(food);
  for (i = 0; i < foodChoices.length; i++) {
    createButton(foodChoices[i], percentages[i]).class("button").parent(food).mousePressed(selected);
  }
  let transportation = createDiv("").class("categories");
  createElement('h2','Transportation: ').parent(transportation);
  for (i = 0; i < transChoices.length; i++) {
    createButton(transChoices[i], percentages[i]).class("button").parent(transportation).mousePressed(selected);
  }
  let housing = createDiv("").class("categories");
  createElement('h2','Housing: ').parent(housing);
  for (i = 0; i < housingChoices.length; i++) {
    createButton(housingChoices[i], percentages[i]).class("button").parent(housing).mousePressed(selected);
  }
  let luxuries = createDiv("").class("categories");
  createElement('h2','Luxuries: ').parent(luxuries);
  for (i = 0; i < luxChoices.length; i++) {
    createButton(luxChoices[i], percentages[i]).class("button").parent(luxuries).mousePressed(selected);
  }
  submitBtn = createButton("Submit").class("subbutton").style("margin", "5% 0%").mousePressed(submit);
}

function selected() {
  let category = selectAll(".button", this.parent());
  for (i = 0; i < category.length; i++) {
    category[i].removeClass("pressed");
  }
  this.addClass("pressed");
}

function submit() {
  let selections = selectAll(".pressed");
  let amount = 0;
  for (i = 0; i < selections.length; i++) {
    amount += parseInt(selections[i].value());
  }
  let categories = selectAll(".categories");
  for (i = 0; i < categories.length; i++) {
    categories[i].remove();
  }
  submitBtn.remove();
  expenses = Math.floor(amount/4);
  screen_3();
}
