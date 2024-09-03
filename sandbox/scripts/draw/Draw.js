import { c, GRIDSIZE } from "../../main.js";
import { Validate } from "../utils/Validate.js";

export class Draw{

    static drawGridRect(x, y, color){
        c.beginPath();
        c.fillStyle = color;
        c.fillRect(x * GRIDSIZE, y * GRIDSIZE, GRIDSIZE, GRIDSIZE);
        c.closePath();
    }

    static strokeRect(position, size, color){
        Validate.vector(position);
        Validate.vector(size);

        c.beginPath();
        c.strokeStyle = color;
        c.strokeRect(position.x, position.y, size.x, size.y);
        c.closePath();
    }

}