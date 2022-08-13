// Game Constants and Variables
let inputDir = {x: 0, y: 0};
const eatingSound = new Audio('Eating.mp3');
const gameMusic = new Audio('GameMusic.mp3');
const gameOverSound = new Audio('GameOver.mp3');
const gameStartSound = new Audio('GameStart.mp3');
const moveSound = new Audio('move.mp3');
const snakeSound = new Audio ('SnakeHissing.mp3');

let score = 0;
let speed = 5;
let flag=0;
let lastPaintTime = 0;
let snakeArray = [
    {x:13 ,y: 15}
]
let food = {x:6 ,y:7}
let spfood
// Game Functions
function main(ctime)
{
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed)
    {
        return ;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snakeArray)
{
    for (let i = 1; i < snakeArray.length; i++) {
        if(snakeArray[i].x === snakeArray[0].x && snakeArray[i].y === snakeArray[0].y)
        {
            ScoreBox.innerHTML = "Score : "+0;
            return true;
        }
    }
    if(snakeArray[0].x<=0 || snakeArray[0].x>=18 || snakeArray[0].y>=18 || snakeArray[0].y<=0)
    {
        ScoreBox.innerHTML = "Score : "+0;
        return true;
    }
    return false;
}
function gameEngine()
{
    // Part 1 - Updating the Snake and the Food
    if(isCollide(snakeArray))
    {
        gameOverSound.play();
        gameMusic.pause();
        speed=5;
        inputDir = {x:0, y:0};
        score=0;
        alert("Game Over! Press any key to play again.");
        snakeArray = [{x:13,y:15}];
        spfood =[];
        // gameMusic.play();
    }

    // If you have eaten the food, update the score and regenerate the food
    if(score!=0 && score%5==0 && flag==0)
    {
        let a = 2;
        let b = 16;
        spfood={x: Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
        flag=1;
    }
    if(flag==1 && snakeArray[0].x === spfood.x && snakeArray[0].y === spfood.y )
    {
        eatingSound.play();
        speed+=0.2*speed;
        score+=3;
        if(score>highscore)
        {
            highscore = score;
            localStorage.setItem("hiscore",JSON.stringify(highscore));
            hiScoreBox.innerHTML = "High Score : "+highscore;
        }
        ScoreBox.innerHTML = "Score : "+score;
        flag=0;
    }
    if(snakeArray[0].x === food.x && snakeArray[0].y === food.y)
    {
        eatingSound.play();
        speed+=0.05*speed;
        score+=1;
        if(score>highscore)
        {
            highscore = score;
            localStorage.setItem("hiscore",JSON.stringify(highscore));
            hiScoreBox.innerHTML = "High Score : "+highscore;
        }
        ScoreBox.innerHTML = "Score : "+score;
        snakeArray.unshift({x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food={x: Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }

    //Moving the Snake
    for (let i = snakeArray.length -2; i >=0; i--){
        const element = snakeArray[i];
        snakeArray[i+1]={...snakeArray[i]};
       
    }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;
    // Part 2 - Displaying the Snake and the Food
    // Display the Snake
    box.innerHTML = "";
    snakeArray.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0)
        {
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        
        box.appendChild(snakeElement);

    });

    foodElement1 = document.createElement('div');
    
    // Display the Food
    if(flag==1)
    {
    foodElement1.style.gridRowStart = spfood.y;
    foodElement1.style.gridColumnStart = spfood.x;
    foodElement1.classList.add('spfood');
    box.appendChild(foodElement1);
    }
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    box.appendChild(foodElement);

}





// Main Logic Starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null)
{
    highscore = 0;
    localStorage.setItem("hiscore",JSON.stringify(highscore));
}
else
{
    highscore=JSON.parse(hiscore);
    hiScoreBox.innerHTML = "High Score : "+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x:0, y:1}  //Start the Game
    gameMusic.play();
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
            break;
        default:
            break;
    }
});