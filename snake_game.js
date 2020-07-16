function initial(){
    canvas=document.getElementById('mycanvas');
    W=canvas.width=700;
    H=canvas.height=500;
    pen=canvas.getContext('2d');
    cs=50;
    gameover=false;
    score=0;

    fruit_img=new Image();
    fruit_img.src="apple.png";
    fruit=randomFruit();

    trophy=new Image();
    trophy.src="trophy.png";
    snake={
        length:5,
        cells:[],
        color:"blue",
        direction:"right",
        createSnake:function(){
            for(var i=this.length;i>0;i--)
                this.cells.push({x:i,y:0});
        },
        drawSnake:function()
        {
            
             for(var i=0;i<this.cells.length;i++)
               {
                  pen.fillStyle=this.color;
                  pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2)
               }
        },
        updateSnake:function(){
            var headX=this.cells[0].x;
            var headY=this.cells[0].y;
            var X,Y;
            if(headX==fruit.x&&headY==fruit.y)
            {
                fruit=randomFruit();
                score+=5;
            }
            else
            {
              this.cells.pop();
            }
            if(this.direction=="up")
            {
                X=headX;
                Y=headY-1;
            }
            else if(this.direction=="down")
            {
                X=headX;
                Y=headY+1;
            }
            else if(this.direction=="left")
            {
                X=headX-1;
                Y=headY;
            }
            else if(this.direction=="right")
            {
                X=headX+1;
                Y=headY;
            }
            this.cells.unshift({x:X,y:Y});
            //to check whether the snake is inside the canvas;
            if(this.cells[0].x<0||this.cells[0].y<0||this.cells[0].x>Math.round((W-cs)/cs)||this.cells[0].y>Math.round((H-cs)/cs))
            {
               gameover=true;
            }                
        }
    };
    snake.createSnake();
    function controls(e){
        if(e.key=="ArrowUp")
            snake.direction="up";
        else if(e.key=="ArrowDown")
            snake.direction="down";
        else if(e.key=="ArrowRight")
            snake.direction="right";
        else if(e.key=="ArrowLeft")
            snake.direction="left";
    }
    document.addEventListener('keydown',controls);
  
}
function draw()
{
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.fillStyle=fruit.color;
    pen.drawImage(fruit_img,fruit.x*cs,fruit.y*cs,cs,cs);

    //score update
    pen.drawImage(trophy,20,50,80,80);
    pen.fillStyle="blue";
    pen.font="25px Roboto"
    pen.fillText(score,50,50);
}
function update()
{
    snake.updateSnake();
}
  function randomFruit()
    {
        var fruitX=Math.round(Math.random()*(W-cs)/cs);
        var fruitY=Math.round(Math.random()*(H-cs)/cs);
        fruit={
            x:fruitX,
            y:fruitY,
            color:"red",
        }
        return fruit;
    }
function gameloop()
{
    if(gameover==true)
    {
        alert("Game Over, Final Score "+score+"\nClick Ok to restart");
        window.close();
        window.open("index.html");
        clearInterval(f);
    }
    else{
    draw();
    update();
  }
}
initial();
setInterval(gameloop,100);