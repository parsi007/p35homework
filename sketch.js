 //Create variables here
var myDatabase,dogImg2,dogImg1,dog,foods,foodStock;
var feed,addFood;
var fedTime,lastFeed,foodObj,lastFeed1;

function preload()
{
  //load images here 
  dogImg1 = loadImage("dogImg.png");
  dogImg2 = loadImage("dogImg1.png"); 
}

function setup() {
  createCanvas(1000,500);
  myDatabase = firebase.database();
  foodStock = myDatabase.ref('food'); 
  foodStock.on("value",readStock);
  console.log(foodStock,"value");
  
  
  dog = createSprite(250,350,50,50);
  dog.addImage("dog",dogImg1);
  dog.scale = 0.2;

  foodObj = new food();
  
  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(getTime);
  
  addFood = createButton("Add food")
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw()
 {  
  background(46,139,87);  

fedTime = myDatabase.ref("fedTime");
fedTime.on("value",function(data)
{
  lastFeed1 = data.val()
})

fill(255);
textSize(20);
if(lastFeed1 >= 12)
{
  text("Last feed: "+ lastFeed1 % 12 + "PM",350,30)
}
else if(lastFeed1 == 0)
{
  text("Last feed : 12 AM",350,30);
}
else
{
  text("Last feed : " + lastFeed1 + "AM",350,30);
}
fill(256);
text("FEED THE DOGGO AND MAKE HIM HAPPY! :)",400,250);
   foodObj.display();  
   //getTime();
   drawSprites();             
}
function readStock(data)
{
   foods = data.val(); 
 // console.log("readStock"); 
   foodObj.updateFoodStock(foods);
 //  console.log(foods,"value");
}

function feedDog()
{
  dog.addImage(dogImg2);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  console.log(lastFeed);
  myDatabase.ref('/').update({
    food : foodObj.getFoodStock(),
    fedTime : lastFeed
  })
  //console.log(foodObj);
}

function addFoods()
{
  foods = foods + 1;
  myDatabase.ref('/').update({
    food:foods
  })
 // console.log(foods,"value")
}


async function getTime()
{
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var dateTime = responseJSON.datetime;
   lastFeed = dateTime.slice(11,13);

  text("last Fed : " + lastFeed,230,130);
  console.log(lastFeed);
  feedDog();
}
