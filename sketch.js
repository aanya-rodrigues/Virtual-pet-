var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed;
var lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  
  if(lastFed>=12){
    textSize(30);
    fill("black");
    text("Last fed: "+lastFed+"PM",100,50);
  }
  else if(lastFed===0){
    textSize(30);
    fill("black");
    text("Last fed: 12AM",100,50);
  }
  else{
    textSize(30);
    fill("black");
    text("Last fed: "+lastFed+" AM",100,50);
  }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var foodStockVal= foodObj.getFoodStock();
  if(foodStockVal<=0){
    foodObj.updateFoodStock(foodStockVal*0);
  }
  else{
    foodObj.updateFoodStock(foodStockVal-1);
    lastFed=hour();
  }

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
