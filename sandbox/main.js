import { Grid } from "./scripts/Grid.js";
import { Vector2 } from "./scripts/math/Vector2.js";

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export const c = canvas.getContext("2d");
export const GRIDSIZE = 5;

let grid = new Grid(100, 100);

var mouse = {
    position: new Vector2(),
    isClicked: false
}

function render(){
    //Clear the whole screen
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    grid.render();
    grid.update();

    //Draw the "Cursor"
    c.beginPath();
    c.fillStyle = "rgba(255, 255, 255, .2)";
    c.fillRect(mouse.position.x, mouse.position.y, GRIDSIZE, GRIDSIZE);
    c.closePath();

}
setInterval(render, 30);

document.addEventListener("mousemove", (e)=>{
    var res = grid.getGridMousePosition(e.clientX, e.clientY);
    
    mouse.position.x = res.x * GRIDSIZE;
    mouse.position.y = res.y * GRIDSIZE;

    if(mouse.isClicked){
        var res = grid.getGridMousePosition(e.clientX, e.clientY);
        grid.changeBlock(res.x, res.y);
    }
})

document.addEventListener("mousedown", (e)=>{
    mouse.isClicked = true;
})
document.addEventListener("mouseup", (e)=>{
    mouse.isClicked = false;
})