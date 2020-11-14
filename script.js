window.onload = function(){
	
	const cvs =document.getElementById('canvas');
	const ctx = cvs.getContext("2d");
	
	const cvsH = cvs.height;
	const cvsW = cvs.width;
	
	const snakeW = 15;
	const snakeH = 10;
	
	let score = 4; 
	let direction = 'right'
	document.addEventListener('keydown', getDirection);
	
	function getDirection(e){
		if (e.keyCode == 37 && direction != 'right'){
			direction = 'left'
		} else if (e.keyCode == 38 && direction != 'down'){
			direction = 'up'
		} else if (e.keyCode == 39 && direction != 'left'){
			direction = 'right'
		} else if (e.keyCode == 40 && direction != 'up'){
			direction = 'down'
		}
	}
	
	
	function drawSnake(x, y){
	ctx.fillStyle = '#fff';
	ctx.fillRect(x*snakeW, y*snakeH, snakeW, snakeH);
	
	ctx.fillStyle = '#000';
	ctx.strokeRect(x*snakeW, y*snakeH, snakeW, snakeH);
	}
	
	let len = 4;
	const snake = [];
	
	for (let i = len-1; i >= 0; i--) {
		snake.push({
			x:i,
			y:0
		})
	}
	
	food = {
		x: Math.round(Math.random()*(cvsW/snakeW-1)+ 1),
		y: Math.round(Math.random()*(cvsH/snakeH-1)+ 1)
	}
	
	function drawFood(x, y){
	ctx.fillStyle = 'yellow';
	ctx.fillRect(x*snakeW, y*snakeH, snakeW, snakeH);
	
	ctx.fillStyle = '#000';
	ctx.strokeRect(x*snakeW, y*snakeH, snakeW, snakeH);
	}
	
	function checkCollision(x, y, array){
		for (let i = 0; i < array.length; i++){
			if (x == array[i].x && y ==array[i].y){
				return true;
			}
		}
		return false;
	}
	
	function drawScore(x){
		ctx.fillStyle = "yellow"
		ctx.font= '15px Verdana'
		ctx.fillText('score: '+x, 5, cvsH - 5);
	}
	
	function draw() {
		ctx.clearRect(0, 0, cvsW, cvsH )
		
		for(let i = 0; i < snake.length; i++){
			let x = snake[i].x;
			let y = snake[i].y;
			drawSnake(x, y)
		}
		
		drawFood(food.x, food.y);
		
		let snakeX = snake[0].x;
		let snakeY = snake[0].y;
		
		if (direction =='left') snakeX--;
		else if (direction == 'up') snakeY--;
		else if(direction == 'right') snakeX++;
		else if (direction == 'down') snakeY++;
		
		if(snakeX < 0 || snakeY < 0 || snakeX >=cvsW/snakeW || snakeY >= cvsH/snakeH || checkCollision(snakeX, snakeY, snake)) {
			location.reload()
		}
			 
		let newHead;
		
		if (snakeX == food.x && snakeY == food.y){
			food = {
				x: Math.round(Math.random()*(cvsW/snakeW-1)+ 1),
				y: Math.round(Math.random()*(cvsH/snakeH-1 )+ 1)
			}
			
				newHead = {
				x: snakeX,
				y: snakeY
			}
			score++
		} else {
			snake.pop();
				newHead = {
				x: snakeX,
				y: snakeY
			}
		}
		
		
		snake.unshift(newHead)
		drawScore(score)
	}
	
	setInterval(draw,100)
	
	
}