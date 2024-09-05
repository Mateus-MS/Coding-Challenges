import { Vector2 } from "../math/Vector2.js";
import { GRIDSIZE } from "../../main.js";
import { Validate } from "../utils/Validate.js";
import { Draw } from "../draw/Draw.js";

let particles = [
    "yellow", //sand
    "brown"   //dirt
    
];

export class RightPanel{
    constructor(canvasSize){
        Validate.vector(canvasSize);
        
        this.padding = 20;

        this.position = new Vector2(canvasSize.x * GRIDSIZE + this.padding, 0);
        this.size     = new Vector2(200, canvasSize.y * GRIDSIZE);

        this.selector = new Selector(this); 
    }

    render(){
        Draw.strokeRect(this.position, this.size, "white");
        this.selector.renderBorder();
        this.selector.renderParticles();
    }

}

class Selector{
    constructor(rightPanel){
        //How many particles will be showed by row
        this.particles_per_row = 4;
        //Padding between the particles
        this.inner_particles_padding = 10;
        //Outter padding
        this.padding = 20;
        
        this.position = new Vector2(rightPanel.position.x + this.padding, rightPanel.position.y + this.padding);
        let w           = rightPanel.size.x - (this.padding * 2);
        let total_width = w - (this.inner_particles_padding * 2) - (this.inner_particles_padding * (this.particles_per_row - 1))
        this.particleSize = total_width / this.particles_per_row;
        
        this.size = new Vector2(w, this.getSelectorHeight());
    
    }

    getSelectorHeight(){
        //How many hows
        let aaa = Math.ceil(particles.length / this.particles_per_row);
        //All particles height
        let aab = this.particleSize * aaa;
        //Beggining and ending padding 
        let aba = this.inner_particles_padding * 2;
        //All inner paddings
        let abb = (aaa - 1) * this.inner_particles_padding;

        return aab + aba + abb;
    }

    renderBorder(){
        Draw.strokeRect(this.position, this.size, "white");
    }

    renderParticles(){
        let startX = this.position.x + this.inner_particles_padding;
        let startY = this.position.y + this.inner_particles_padding;
        let increm = startX;

        for(let i = 0; i < particles.length; i++){
            if(i % this.particles_per_row == 0 && i > 0){
                increm = startX;
                startY += this.particleSize + this.inner_particles_padding;
            }
            Draw.fillRect(new Vector2(increm, startY), new Vector2(this.particleSize, this.particleSize), particles[i]);
            increm += this.particleSize + this.inner_particles_padding;
        }
    }
}