import { Validate } from "../utils/Validate.js"

export class Collision{

    static pointInRect(point, position, size){
        Validate.vector(point);
        Validate.vector(position);
        Validate.vector(size);
        
        return point.x > position.x &&
           point.x < position.x + size.x &&
           point.y > position.y &&
           point.y < position.y + size.y
    }

}