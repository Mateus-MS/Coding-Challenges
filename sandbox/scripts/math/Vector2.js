export class Vector2{

    constructor(x, y){
        this.x = x;
        this.y = y;
        this.isVector = true;
    }

    static zero(){
        return new Vector2(0, 0);
    }

}