//全局变量使用const关键字定义，只读，不需更改；
const northImg= new Image();
northImg.src="img/north.png";

const southImg= new Image();
southImg.src="img/south.png";

const eastImg= new Image();
eastImg.src="img/east.png";

const westImg= new Image();
westImg.src="img/west.png";

const foodImg= new Image();
foodImg.src="img/food.png";

const bgImg= new Image();
bgImg.src="img/background.png";

const bodyImg= new Image();
bodyImg.src="img/body.png";

const startImg= new Image();
startImg.src="img/start.png";



function Snake(){
	this.canvas=$("#gameview")[0];//画布
	this.ctx=this.canvas.getContext("2d");//画笔
	this.width=500;//（游戏屏幕）背景宽度
	this.height=500;//游戏屏幕高度
	this.step=25;//设计步长
	this.stepX=Math.floor(this.width/this.step);//X轴步数
	this.stepY=Math.floor(this.height/this.step);//Y轴步数
	this.snakeBodyList=[];//设置蛇身数组
	this.foodList=[];//食物数组
	this.timer=null;//蛇动的定时器
	this.score=0;
	
	
	
	//1生成初始化页面，点击页面，进入游戏
	this.init =function(){
		this.ctx.drawImage(startImg,0,0,this.width,this.height)
	}
	this.start=function(){
		this.paint();
		this.move();
	}
	//2游戏开始。绘制背景。食物
	this.paint = function(){
		this.ctx.drawImage(bgImg,0,0,this.width,this.height);
		//2.2化蛇
		this.drawSnake();
		//2.3
		this.drawFood();
		
		
		//2.4蛇移动
//		this.move();
	}
	
	//化蛇：算法[{x:横坐标，y：纵坐标，img：，direction：}]
	this.drawSnake=function(){
		//2.2.1循环生成snakeBodyList数组中的对象集合（默认蛇于中间，蛇头向西）
		if(this.snakeBodyList.length<5){
			
			for(let i=0;i<5;i++){
			//蛇的节点设置
			this.snakeBodyList.push({
				x: Math.floor(this.stepX/2+i-2),//x不是px像素坐标点，而是步数
				y: Math.floor(this.stepY/2),//Y轴步数
				img: bodyImg,
				direct:"west"
			})
		}
		
		//2.2.2替换snakeBodyList数组第一个元素的img变为蛇头图片
		this.snakeBodyList[0].img=westImg;
			
		}
		
		
		//2.2.3便利snakeBodyList数组。画出蛇初始状态
		for(var i=0;i<this.snakeBodyList.length;i++){
			var snode=this.snakeBodyList[i];
			this.ctx.drawImage(snode.img,snode.x*this.step,snode.y*this.step,this.step,this.step);
		}
	}
	//画食物
	
	this.drawFood=function(){
		
		//2.3.1当食物已经存在的时候，画面刷新时，食物在原有位置重新绘制
		
		if(this.foodList.length>0){
			var fnode=this.foodList[0];
		this.ctx.drawImage(fnode.img,fnode.x*this.step,fnode.x*this.step,this.step,this.step);
		return;
		}
		//如果食物没有（食物被吃，或游戏初始化），生成XY随机坐标。判断是否与蛇身重复，如果重复，重新绘制，调用this.ctx.drawImage（），否则按照随机生成的点push到数组中，生成图案
		var foodX=Math.floor(Math.random()*this.stepX);
		var foodY=Math.floor(Math.random()*this.stepY);
		var foodFlag=false;//判断食物与蛇身是否重复
		for(var i=0;i<this.snakeBodyList.length;i++){
			var sonde1=this.snakeBodyList[i];
		if(foodX==sonde1.x&&foodY==sonde1.y){
			foodFlag=true;
		}
		}
		if(foodFlag){
			foodFlag=false;
			this.drawFood();
			
		}else{
			this.foodList.push({
			x:foodX,
			y:foodY,
			img:foodImg
		    })
			var fnode=this.foodList[0];
		this.ctx.drawImage(fnode.img,fnode.x*this.step,fnode.y*this.step,this.step,this.step)
			
		}
		
		
//		this.foodList.push({
//			x:Math.floor(Math.random()*this.stepX),
//			y:Math.floor(Math.random()*this.stepY),
//			img:foodImg
//		})
		
		var fnode=this.foodList[0];
		this.ctx.drawImage(fnode.img,fnode.x*this.step,fnode.y*this.step,this.step,this.step)
	}
	//3蛇动
	this.move = function(){
//		setInterval(this.timer);
		var _this=this;
		//事件处理是异步的，无法传递this对象
		document.onkeydown=function(ev){
			var ev=ev||window.event;
//			var code=ev.keyCode;
			switch(ev.keyCode){
				case 38://向上
				  _this.snakeBodyList[0].img=northImg;
				  _this.snakeBodyList[0].direct="north";
				break;
				case 37://向左
				  _this.snakeBodyList[0].img=westImg;
				  _this.snakeBodyList[0].direct="west";
				break;
				case 39://向右
				  _this.snakeBodyList[0].img=eastImg;
				  _this.snakeBodyList[0].direct="east";
				break;
				case 40://向下
				  _this.snakeBodyList[0].img=southImg;
				  _this.snakeBodyList[0].direct="south";
				break;
			}
		}
		
		//运用定时器，每0.2秒动蛇（坐标变化，重绘）
//		this.timer=setInterval(function(){
//			//解决蛇身跟随
//			
////			
////			for(var i=_this.snakeBodyList.length-1;i>0;i--){
////				_this.snakeBodyList[i].x=_this.snakeBodyList[i-1].x;
////				_this.snakeBodyList[i].y=_this.snakeBodyList[i-1].y;
////				//
////				var shead=_this.snakeBodyList[0];
////				switch(shead.direct){
//					case "north":
//					    
//					    shead.y--;
//					break;
//					case "south":
//					    
//					    shead.y++;
//					break;
//					case "west":
//					    
//					    shead.x--;
//					break;
//					case "east":
//					   
//					    shead.x++;
//					break;
//				}
//			}
//			_this.paint();//重绘制游戏画面
//		},1000);




          this.timer=setInterval(function(){
			//蛇头的坐标发生变化， 并且蛇身发生变化，移动
			//s首先解决蛇身跟随的问题
			for(var i=_this.snakeBodyList.length-1;i>0;i--){
				_this.snakeBodyList[i].x=_this.snakeBodyList[i-1].x;
				_this.snakeBodyList[i].y=_this.snakeBodyList[i-1].y;
			}
			var shead=_this.snakeBodyList[0]
			switch(shead.direct){
				case "north":
//				    shead.img =northImg;
				    shead.y-=1;
				break;
				case "south":
//				    shead.img =southImg;
				    shead.y+=1;
				break;
				case "west":
//				    shead.img =westImg;
				    shead.x-=1;
				break;
				case "east":
//				    shead.img =eastImg;
				    shead.x+=1;
				break;
				
			}
			_this.paint()//重绘游戏画面
			
		},200)

      
		
	}
	
	//4蛇死
	this.dead=function(){
		
	}
	//5 吃食物
	
}
