import { Draw } from "./scripts/draw/Draw.js";
import { Grid } from "./scripts/Grid.js";
import { Vector2 } from "./scripts/math/Vector2.js";
import { RightPanel } from "./scripts/UI/rightPanel.js";

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export const c = canvas.getContext("2d");
export const GRIDSIZE = 5;

let grid = new Grid(100, 100);

export const MOUSE = {
    position: new Vector2(),
    isClicked: false
}

const rightPanel = new RightPanel(new Vector2(grid.cols, grid.rows));

function render(){
    //Clear the whole screen
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    grid.render();
    grid.update();

    rightPanel.render();

    if(grid.isMouseInside() && MOUSE.isClicked){
        var res = grid.getGridMousePosition(MOUSE.position.x, MOUSE.position.y);
        grid.changeBlock(res.x, res.y);
    }
}
setInterval(render, 30);

document.addEventListener("mousemove", (e)=>{
    MOUSE.position.x = e.clientX;
    MOUSE.position.y = e.clientY;
})

document.addEventListener("mousedown", (e)=>{
    MOUSE.isClicked = true;
})
document.addEventListener("mouseup", (e)=>{
    MOUSE.isClicked = false;
})