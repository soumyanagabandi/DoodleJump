document.addEventListener('DOMContentLoaded',()=>{
	const grid=document.querySelector('.grid')
	const doodler=document.createElement('div')
	let doodlerLeftSpace=50
	let startPoint=150
	let doodlerBottomSpace=startPoint
	let isGameOver=false
	let platformCount=5
	let platforms = []
	let upTimerId
	let downTimerId
	let isJumping=true
	let isGoingLeft=false
	let isGoingRight=false
	let leftTimerId
	let rightTimerId
	let score=0
	class Platform{
		constructor(newPlatformBottom)
		{
			this.bottom= newPlatformBottom
            this.left=Math.random()*315// width of grid and platform are 400 and 85 400-85=315
			// math.random*315 generates a random number between 0 and 315
			this.visual=document.createElement('div')
			const visual= this.visual
			visual.classList.add('platform')
			visual.style.left=this.left+'px'
			visual.style.bottom=this.bottom+'px'
			grid.appendChild(visual)
		}
	}
	function createDoodler()
	{
		grid.appendChild(doodler)
		doodler.classList.add('doodler')// to add the 'doodler' css selector properties to the doodler div tag
		doodlerLeftSpace= platforms[0].left
		doodler.style.left=doodlerLeftSpace+'px'
		doodler.style.bottom=doodlerBottomSpace+'px'
	}
	function createPlatforms()
	{
		for( let i=0; i<platformCount;i++)// to have 5 same platforms
		{
			let platformGap= 600/platformCount // 600px is width of grid to divid e equally we have divided it by 600
			let newPlatformBottom = 100+ i*platformGap
			let newPlatform= new Platform(newPlatformBottom)
			platforms.push(newPlatform)// the newPlatform is pushed into an array
			console.log(platforms)
			
		}
	}
	
function movePlatforms()
{
	if(doodlerBottomSpace>200)
	{
		platforms.forEach(platform=>{
			platform.bottom -=4
			let visual= platform.visual
			 visual.style.bottom=platform.bottom+'px'
			 
			 if (platform.bottom<10)
			 {
				 let firstPlatform = platforms[0].visual
				 firstPlatform.classList.remove('platform')
			     platforms.shift()
				 score++
				 console.log(platforms)
				 let newPlatform = new Platform(600)
				 platforms.push(newPlatform)
			 }
			 
		})
	}
	
}
function jump()
{
	clearInterval(downTimerId)
	isJumping=true
	upTimerId = setInterval(function(){
		doodlerBottomSpace +=20
	doodler.style.bottom= doodlerBottomSpace+'px'
	if(doodlerBottomSpace>startPoint+200)
	{
		fall()
	}
	},30)
	
}
function fall()
{
	clearInterval(upTimerId)
	isJumping=false
	downTimerId=setInterval(function(){
		doodlerBottomSpace -=5 
		doodler.style.bottom= doodlerBottomSpace+'px'
		if(doodlerBottomSpace<=0)
		{
			gameOver()
		}
		platforms.forEach(platform =>{
			if(
			  (doodlerBottomSpace >= platform.bottom) &&
			  (doodlerBottomSpace <= platform.bottom+15)&&
			  ((doodlerLeftSpace+60) >= platform.left)&&
			  (doodlerLeftSpace <= (platform.left+85))&&
			  !isJumping )
			  // four things must be true inorder to collide
			  {
				  console.log('landed')
				  startPoint= doodlerBottomSpace
				  jump()
				  
			  }
		})
		
	},30)
}



function gameOver(){
	console.log('gameover')
	isGameOver=true
	while(grid.firstChild)
	{
		grid.removeChild(grid.firstChild)
	}

	grid.innerHTML = score
	clearInterval(upTimerId)
	clearInterval(downTimerId)
	clearInterval(leftTimerId)
	clearInterval(rightTimerId)
}
	function control(e)
	{
		if(e.key==="ArrowLeft")
		{
		moveleft()
	}
		else if( e.key==="ArrowRight")
		{
			moveRight()
		}
		else if(e.key==="ArrowUp")
		{
			moveStraight()
		}
	}
function moveleft()
{
	if(isGoingRight)
	{
		clearInterval(rightTimerId)
		isGoingRight= false
	}
	isGoingLeft=true
	leftTimerId = setInterval(function(){
		if(doodlerLeftSpace>=0)
		{
		doodlerLeftSpace -=5
		doodler.style.left = doodlerLeftSpace+'px' }
		else 
			moveRight()
		},30)
	
}
function moveRight()
{
	if(isGoingLeft)
	{
		clearInterval(leftTimerId)
		isGoingLeft= false
	}
   isGoingRight=true
   rightTimerId = setInterval(function(){
	   if(doodlerLeftSpace<= 340)//400-60(doodlers width)
	   {
		   doodlerLeftSpace +=5
		   doodler.style.left = doodlerLeftSpace+'px'
	   }
	   else moveleft()
   })

}
function  moveStraight()
{
	isGoingRight = false
	isGoingLeft = false
	clearInterval(rightTimerId)
	clearInterval(leftTimerId)
}

  function start()
  { // doodler appears if this function is invoked
    if(isGameOver==false) //if(!isGameOver)
	{
		
		createPlatforms()
		createDoodler()
		setInterval(movePlatforms,30)
		jump()
		document.addEventListener('keyup' , control)
	}
  }	
  start()
})
