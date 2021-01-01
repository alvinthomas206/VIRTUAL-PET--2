var dog,happyDog,dogS;
var dogImg,database,foodS,foodStock;

var feedTime,food;
var Food;
var lastFed=0
var feed,addFood;

function preload(){
    dogImg = loadImage("IMAGE/Dog.png")
 
    happyDog= loadImage("IMAGE/happydog.png")
}

function setup() {
   createCanvas(900, 400);
    database=firebase.database();
    food = new Foods(200,100);
    foodStock=database.ref('Food');
    foodStock.on("value",readStock);

    dog = createSprite(700,250,10,10);
    dog.addImage(dogImg)
    dog.scale = 0.3

    feed=createButton("Feed the dog")
    feed.position(700,95)
    feed.mousePressed(feedDog)

    addFood=createButton("Add Food")
    addFood.position(800,95)
    addFood.mousePressed(addFoods)

 
  
}


function draw() {  
  background("green")
  food.display();
  stroke("Blue")
  textSize(20)


  feedTime=database.ref('feedTime')
    feedTime.on("value",function(data){
        lastFed=data.val();
    })

 
  
  fill(255,255,255);
      
        if(lastFed>=12){
          text("Last Feed : "+ lastFed%12 + " PM", 350,30);
         }else if(lastFed==0){
           text("Last Feed : 12 AM",350,30);
         }else{
           text("Last Feed : "+ lastFed + " AM", 350,30);
         }

        drawSprites();
}

function feedDog(){
  dog.addImage(happyDog);
  dog.x=600

  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
  
    Food:food.getFoodStock(),
    feedTime:hour()
  });
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data){
  foodS=data.val();
  food.updateFoodStock(foodS)
}
 

function showError(){
  console.log("Error in writing to the database");
}
 
 