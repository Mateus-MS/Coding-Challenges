import { Grid } from "./scripts/Grid.js";

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export const c = canvas.getContext("2d");

let grid = new Grid(10, 10);

var mouseX;
var mouseY;

document.addEventListener("mousemove", (e)=>{
    var res = grid.getGridMousePosition(e.clientX, e.clientY);
    
    mouseX = res.x * 50;
    mouseY = res.y * 50;
})

document.addEventListener("mousedown", (e)=>{
    var res = grid.getGridMousePosition(e.clientX, e.clientY);

    grid.changeBlock(res.x, res.y);

    console.log(`Você clicou na celula: X:${res.x}, Y:${res.y}`)
})

function render(){
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    grid.render();
    grid.update();

    c.beginPath();
    c.fillStyle = "rgba(255, 255, 255, .2)";
    c.fillRect(mouseX, mouseY, 50, 50);
    c.closePath();

}

setInterval(render, 200);