var astro, astroImg;
var gamestate = "play";
var plan,planImg;
var meteor,meteorImg,meteorG;
var score = 0;

function preload() {
    astroImg = loadImage("astronaut.png");
    planImg = loadImage("space.png");
    meteorImg = loadImage("meteor.png");

    meteorG = new Group();
}

function setup(){
    createCanvas(800,700);
    astro = createSprite(400,625);
    astro.addImage(astroImg);
    astro.scale = 0.075;

    plan = createSprite(400,350);
    plan.addImage(planImg);

    astro.depth = plan.depth;
    astro.depth = astro.depth + 1;

}

function draw(){
    drawSprites();

    textSize(20);
    fill(250);
    text("Distance: " + score,500,50);

    if(gamestate === "play"){
        score = score + Math.round(getFrameRate()/60);
        
        plan.velocityY = 1;


        if(plan.y > 400){
            plan.y = 350;
        }

        if(keyDown("space")){
            astro.velocityY = -5;
        }
        astro.velocityY = astro.velocityY + 0.3;

        if(keyDown("right")){
            astro.x = astro.x + 3;
        }

        if(keyDown("left")){
            astro.x = astro.x - 3;
        }

        if(astro.y >= 800 || meteorG.isTouching(astro)){
            gamestate = "end";
        }

        spawnMeteors();
    }
    if(gamestate === "end"){
        stroke("pink");
        fill("blue");
        textSize(30);
        text("GAME OVER",300,350);
        textSize(10);
        text("press up arrow to restart",330,390);
        if(keyDown("up")){
            restart();
        }
        plan.velocityY = 0;
        meteorG.setVelocityYEach(0);
        astro.velocityY = 0;
    }

}

function restart(){
    gamestate = "play";
    astro.x = 400;
    astro.y = 625;
    meteorG.destroyEach();
    score = 0;

}

function spawnMeteors(){
    if(frameCount % 150 === 0){
        meteor = createSprite(200,-50);
        meteor.addImage(meteorImg);
        meteor.x = Math.round(random(100,700));
        meteor.scale = 0.1;
        meteor.velocityY = 1;
        meteor.lifetime = 800;
        meteorG.add(meteor);
    
        meteor.depth = astro.depth;
        astro.depth = astro.depth + 1;

    }
}