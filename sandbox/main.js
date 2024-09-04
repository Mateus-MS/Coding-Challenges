import { Draw } from "./scripts/draw/Draw.js";
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

//TODO this should be refactor
let selector_particles = [
    "yellow", //sand
    "brown"   //dirt
];

function render(){
    //Clear the whole screen
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    grid.render();
    grid.update();

    //Draw the "Cursor"
    Draw.fillRect(mouse.position, new Vector2(GRIDSIZE, GRIDSIZE), "rgba(255, 255, 255, .2)");

    //Draw right panel
    //TODO this should be constants calculated on load time
    let panel_padding = 20;
    let panel_startX = grid.cols * GRIDSIZE + panel_padding;
    let panel_startY = 0;

    let panel_width = 200;
    let panel_height = grid.rows * GRIDSIZE;
    Draw.strokeRect(new Vector2(panel_startX, panel_startY), new Vector2(panel_width, panel_height), "white");

    //particles variables
    let partciles_per_row = 3;
    let particle_padding = 10;
    
    //Draw particles selector
    //TODO this should be constants calculated on load time
    let selector_padding = 20;
    let selector_startX = panel_startX + selector_padding;
    let selector_startY = panel_startY + selector_padding;
    let selector_width  = panel_width - (selector_padding * 2);
    //particle variable
    let particle_total_size = selector_width - (particle_padding * 2) - (particle_padding * (partciles_per_row - 1));
    let particle_size = particle_total_size / partciles_per_row;
    
    let selector_height = particle_size * (Math.ceil(selector_particles.length / partciles_per_row)) + particle_padding * (Math.ceil(selector_particles.length / partciles_per_row)) + particle_padding;
    console.log(selector_height)
    Draw.strokeRect(new Vector2(selector_startX, selector_startY), new Vector2(selector_width, selector_height), "white");

    
    let particle_startX = selector_startX + particle_padding;
    let particle_increment = particle_startX;
    let particle_startY = selector_startY + particle_padding;
    for(let i = 0; i < selector_particles.length; i++){
        if(i % partciles_per_row == 0 && i > 0){
            particle_increment = particle_startX;
            particle_startY += particle_size + particle_padding
        }
        Draw.fillRect(new Vector2(particle_increment, particle_startY), new Vector2(particle_size, particle_size), selector_particles[i]);
        particle_increment += particle_size + particle_padding
    }

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