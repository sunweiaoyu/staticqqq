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
	
	//1生成初始化页面，点击页面，进入游戏
	this.init =function(){
		this.ctx.drawImage(startImg,0,0,this.width,this.height)
	}
	//2游戏开始。绘制背景。食物
	this.start = function(){
		this.ctx.drawImage(bgImg,0,0,this.width,this.height);
		
	}
	
	//3蛇动
	this.move = function(){
		
	}
	
	//4蛇死
	this.dead=function(){
		
	}
	
}
