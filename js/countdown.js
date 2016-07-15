
var WINDOW_WIDTH,
    WINDOW_HEIGHT,
    RADIUS,
    X = 0,
    Y = 0,
    DIS = 15,
    curTime = 0,
    ball = [];
const color = ["#F205AD", "#2EE8FC", "#FCFA2E", "#CAFF67", "#67BECF", "#EF3D61", "#43FC2E", "#C42EFC", "#08981A", "#ED83A2"]
const endTime = new Date( 2016, 6, 15, 18, 40, 0);
window.onload = function(){
    WINDOW_WIDTH = document.documentElement.clientWidth;
    WINDOW_HEIGHT = document.documentElement.clientHeight-20;
    RADIUS = Math.round( WINDOW_WIDTH*4/5/DIS/7.2) - 1;
    X = Math.round(WINDOW_WIDTH/10);
    Y = Math.round(WINDOW_HEIGHT/5) ;
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d");
        canvas.width = WINDOW_WIDTH
        canvas.height = WINDOW_HEIGHT;
    curTime = getCurTime();
    setInterval( function(){
        draw(context);
        update();
    },50);
    console.log(RADIUS);
}

function update(){
    var nextTime = getCurTime(),
        nextHour = parseInt( nextTime/3600 ),
        nextMinutes = parseInt( (nextTime-nextHour*3600)/60 ),
        nextSeconds = nextTime%60;
    var hours = parseInt( curTime/3600 ),
        minutes = parseInt( (curTime-hours*3600)/60 ),
        seconds = curTime%60;

    if( nextSeconds != seconds){
        if( parseInt(nextHour/10) != parseInt(hours/10)){
            addBall( X, Y, parseInt(hours/10));
        }
        if( parseInt(nextHour%10) != parseInt(hours%10)){
            addBall( X+DIS*( RADIUS+1 ), Y, parseInt(hours%10));
        }
        if( parseInt(nextMinutes/10) != parseInt(minutes/10)){
            addBall( X+2.6*DIS*( RADIUS+1 ), Y, parseInt(minutes/10));
        }
        if( parseInt(nextMinutes%10) != parseInt(minutes%10)){
            addBall( X+3.6*DIS*( RADIUS+1 ), Y, parseInt(minutes%10));
        }
        if( parseInt(nextSeconds/10) != parseInt(seconds/10)){
            addBall( X+5.2*DIS*( RADIUS+1 ), Y, parseInt(seconds/10));
        }
        if( parseInt(nextSeconds%10) != parseInt(seconds%10)){
            addBall( X+6.2*DIS*( RADIUS+1 ), Y, parseInt(seconds%10));
        }
        curTime = nextTime;
    }
    updateBalls();
}

function addBall( x, y, num){

    for( var i = 0; i < digit[num].length; i++){
        for( var j = 0; j < digit[num][i].length; j++){
            if( digit[num][i][j] == 1){
                var aBall = {
                    x: x+2*j*(RADIUS+1)+(RADIUS+1),
                    y: y+2*i*(RADIUS+1)+(RADIUS+1),
                    vx: Math.pow( -1, Math.ceil( Math.random()*1000)) * 4,
                    vy: -5,
                    g: 1.5+Math.random(),
                    color: color[ Math.floor( Math.random() * color.length ) ]
                }
                ball.push(aBall);
            }
        }
    }
}

function updateBalls(){
    for ( var i = 0; i < ball.length; i++){
        ball[i].x += ball[i].vx;
        ball[i].y += ball[i].vy;
        ball[i].vy += ball[i].g;
        if( ball[i].y > WINDOW_HEIGHT-RADIUS ){
            ball[i].y = WINDOW_HEIGHT-RADIUS;
            ball[i].vy = -ball[i].vy*0.75;
        }
    }
    var count = 0;
    for(var i = 0; i < ball.length; i++){
        if( ball[i].x+RADIUS > 0 && ball[i].x-RADIUS < WINDOW_WIDTH){
            ball[count++] = ball[i];
        }
    }
    while(ball.length > Math.min(300,count)){
        ball.pop();
    }
}

function getCurTime(){
    var nowTime = new Date(),
        ret = Math.round( ( endTime.getTime() - nowTime.getTime() )/1000 );
    return ret > 0 ? ret : 0;
}

function draw( cxt ){
    cxt.clearRect( 0, 0, cxt.canvas.width, cxt.canvas.height);
    var hours = parseInt( curTime/3600 ),
        minutes = parseInt( (curTime-hours*3600)/60 ),
        seconds = curTime%60;
    drawDigit( X, Y, parseInt(hours/10), cxt);
    drawDigit( X+DIS*( RADIUS+1 ), Y, parseInt(hours%10), cxt);
    drawDigit( X+2*DIS*( RADIUS+1 ), Y, 10, cxt);
    drawDigit( X+2.6*DIS*( RADIUS+1 ), Y, parseInt(minutes/10), cxt);
    drawDigit( X+3.6*DIS*( RADIUS+1 ), Y, parseInt(minutes%10), cxt);
    drawDigit( X+4.6*DIS*( RADIUS+1 ), Y, 10, cxt);
    drawDigit( X+5.2*DIS*( RADIUS+1 ), Y, parseInt(seconds/10), cxt);
    drawDigit( X+6.2*DIS*( RADIUS+1 ), Y, parseInt(seconds%10), cxt);

    for( var i = 0; i < ball.length; i++){
        cxt.fillStyle = ball[i].color;
        cxt.beginPath();
        cxt.arc( ball[i].x, ball[i].y, RADIUS, 0, 2*Math.PI);
        cxt.closePath();
        cxt.fill();
    }
}

function drawDigit( x, y, num, cxt){
    cxt.fillStyle = "#2763AA";

    for( var i = 0; i < digit[num].length; i++){
        for( var j = 0; j < digit[num][i].length; j++){
            if( digit[num][i][j] == 1){

                cxt.beginPath();
                cxt.arc( x+2*j*(RADIUS+1)+(RADIUS+1), y+2*i*(RADIUS+1)+(RADIUS+1), RADIUS, 0, 2*Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}
//七巧板
// //定义变量数组
// var tangram = [
//     {p:[{x:0,y:0},{x:600,y:0},{x:300,y:300}],color:"#CAFF67"},
//     {p:[{x:0,y:0},{x:0,y:600},{x:300,y:300}],color:"#67BECF"},
//     {p:[{x:600,y:0},{x:600,y:300},{x:450,y:450},{x:450,y:150}],color:"#EF3D61"},
//     {p:[{x:450,y:150},{x:450,y:450},{x:300,y:300}],color:"#F9F51A"},
//     {p:[{x:300,y:300},{x:450,y:450},{x:300,y:600},{x:150,y:450}],color:"#A594C0"},
//     {p:[{x:150,y:450},{x:300,y:600},{x:0,y:600}],color:"#FA8CCC"},
//     {p:[{x:600,y:600},{x:300,y:600},{x:600,y:300}],color:"#F6CA29"}
// ]

// //绘制
// window.onload = function(){

//     var canvas = document.getElementById("canvas");

//     canvas.width = 600;
//     canvas.height = 600;

//     var context = canvas.getContext("2d");

//     for(var i = 0 ;i < tangram.length;i ++)
//         draw(tangram[i],context);
//         // console.log(context);
// }

// //绘制函数
// function draw(piece,cxt){
     
//     cxt.beginPath();

//     cxt.moveTo(piece.p[0].x,piece.p[0].y);

//     for(var i = 1;i < piece.p.length;i ++)
//         cxt.lineTo(piece.p[i].x,piece.p[i].y);
     
//     cxt.closePath();   

//     cxt.fillStyle = piece.color;
//     cxt.fill();
// }