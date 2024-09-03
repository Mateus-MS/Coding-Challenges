export class Validate{

    static vector(vector){
        if(!vector.isVector){
            throw new TypeError("Type must be a vector.");
        }
        return true;
    }

}