let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
const girdLength = 200;

$(function(){
    //0-可走,1-障礙,2-終點,3-敵人
    mapArray = [
        [0,0,0,0,3],
        [0,1,1,0,1],
        [0,3,1,0,4],
        [0,0,0,1,1],
        [3,1,0,0,2]
    ];
    ctx = $("#myCanvas")[0].getContext("2d");

    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    currentImgMain = {
        "x":0,
        "y":0
    };
    imgMain.onload = function(){
        ctx.drawImage(imgMain,0,0,80,130,currentImgMain.x,currentImgMain.y,girdLength,girdLength);
    }

    imgMountain=new Image();
    imgMountain.src = "images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "images/Enemy.png";
    imgcoin=new Image();
    imgcoin.src="images/coin2.png";
    imgMountain.onload = function(){
        imgEnemy.onload = function(){
            imgcoin.onload=function(){
                for(var x in mapArray){
                    for(var y in mapArray[x]){
                        if(mapArray[x][y]==1){
                            ctx.drawImage(imgMountain,32,65,32,32,y*girdLength,x*girdLength,girdLength,girdLength);
                        }else if(mapArray[x][y]==3){
                            ctx.drawImage(imgEnemy,7,40,104,135,y*girdLength,x*girdLength,girdLength,girdLength);
                        }else if(mapArray[x][y]==4){
                            ctx.drawImage(imgcoin,y*girdLength,x*girdLength,girdLength,girdLength);
                        }
                    }
                }
            }
        }
    }
});

$(document).on("keydown",function(event){
    let targetImg, targetBlock, cutImagePositionX;
    //cutImagePositionX-決定主角臉朝哪個方向
    targetImg = {
        "x":-1,
        "y":-1
    };
    targetBlock = {
        "x":-1,
        "y":-1
    }

    event.preventDefault();

    switch(event.code){
        case "ArrowLeft":
            targetImg.x = currentImgMain.x-girdLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - girdLength;
            cutImagePositionX = 355;
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + girdLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + girdLength;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }

    if(targetImg.x<=800 && targetImg.x>=0 && targetImg.y<=800 && targetImg.y>=0){
        targetBlock.x = targetImg.y / girdLength;
        targetBlock.y = targetImg.x / girdLength;
    }else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    ctx.clearRect(currentImgMain.x,currentImgMain.y,girdLength,girdLength);

    if(targetBlock.x!=-1 && targetBlock.y!=-1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0:
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1:
                $("#talkBox").text("有山");
                break;
            case 2:
                $("#talkBox").text("抵達終點");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3:
                $("#talkBox").text("哈囉");
                break;
            case 4:
                $("#talkBox").text("獲得寶藏!");
        }
    }else{
        $("#talkBox").text("邊界");
    }
    ctx.drawImage(imgMain, cutImagePositionX,0,80,130,currentImgMain.x,currentImgMain.y,girdLength,girdLength);
});