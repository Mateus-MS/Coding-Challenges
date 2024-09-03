import { Grid } from "./scripts/Grid.js";

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export const c = canvas.getContext("2d");
export const GRIDSIZE = 20;
let grid = new Grid(30, 30);

var mouseX;
var mouseY;

var clicked = false;

document.addEventListener("mousemove", (e)=>{
    var res = grid.getGridMousePosition(e.clientX, e.clientY);
    
    mouseX = res.x * GRIDSIZE;
    mouseY = res.y * GRIDSIZE;

    if(clicked){
        var res = grid.getGridMousePosition(e.clientX, e.clientY);
       grid.changeBlock(res.x, res.y);
    }
})

document.addEventListener("mousedown", (e)=>{
    clicked = true;
})
document.addEventListener("mouseup", (e)=>{
    clicked = false;
})

function render(){
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    grid.render();
    grid.update();

    c.beginPath();
    c.fillStyle = "rgba(255, 255, 255, .2)";
    c.fillRect(mouseX, mouseY, GRIDSIZE, GRIDSIZE);
    c.closePath();

}

setInterval(render, 50);