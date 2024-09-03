import { c, GRIDSIZE } from "../main.js";
import { Draw } from "./draw/Draw.js";
import { Mathf } from "./math/Mathf.js";
import { Vector2 } from "./math/Vector2.js";

export class Grid{
    
    constructor(cols, rows){
        //TODO remove, use only this.dimensions
        this.cols = cols;
        this.rows = rows;

        //Initialize grid
        this.matrix = this.createGrid();

        //Consts
        this.dimensions = new Vector2(this.cols, this.rows);
        this.sizePX = new Vector2(this.cols * GRIDSIZE, this.rows * GRIDSIZE);

        //Debug options
        this.render_grid = false;
    }

    createGrid(){
        //create an empty array
        let grid = [];
        //for each col, put a new empty array in it
        for(let i = 0; i < this.cols; i++){
            grid.push(new Array(this.cols));
        }
        //return it :D
        return grid;
    }

    changeBlock(x, y){
        //TODO make the user select the index it will be selected
        this.matrix[x][y] = 0;
    }

    render(){

        //Draw each particle
        for(let i = 0; i < this.matrix.length; i++){
            for(let j = 0; j < this.matrix[i].length; j++){
                switch(this.matrix[i][j]){
                    case 0:
                        Draw.drawGridRect(i, j, "yellow");
                        break;
                    case 1:
                        Draw.drawGridRect(i, j, "brown");
                        break;
                }
            }
        }

        //Draw the lines of the grid
        if(this.render_grid){
            for(let i = 0; i < this.cols + 1; i++){
                c.beginPath();
                c.strokeStyle = "white";
                c.moveTo(i * GRIDSIZE, 0);
                c.lineTo(i * GRIDSIZE, this.rows * GRIDSIZE);
                c.stroke();
                c.closePath();
            }

            for(let i = 0; i < this.rows + 1; i++){
                c.beginPath();
                c.strokeStyle = "white";
                c.moveTo(0, i * GRIDSIZE);
                c.lineTo(this.rows * GRIDSIZE, i * GRIDSIZE);
                c.stroke();
                c.closePath();
            }
        }

        //Draw the line around the grid
        Draw.strokeRect(Vector2.zero(), this.sizePX, 'white');

    }

    getGridMousePosition(x, y){
        //Get row many particles fits to the mouse in each axys
        let colIndex = Math.floor(x / GRIDSIZE);
        let rowIndex = Math.floor(y / GRIDSIZE);  
        
        //Limit by the cols
        if(colIndex >= this.cols){
            colIndex = this.cols - 1
        }
        //Limit by the rows
        if(rowIndex >= this.rows){
            rowIndex = this.rows - 1
        }
        //Return a new vector :D
        return new Vector2(colIndex, rowIndex);
    }

    update(){
        //Iterate over each axys backwards
        //This is temporarily, when try to implement things like explosions and velocity, this will break
        for(let i = this.matrix.length - 1; i >= 0; i--){
            for(let j = this.matrix[i].length - 1; j >= 0; j--){
                //Get out if trying to access outside th array
                if(j + 1 >= this.matrix[i].length){
                    continue
                }
                //Get out if is not a particle
                if(this.matrix[i][j] === undefined){
                    continue
                }
                //If the particle down, is empty
                if(this.matrix[i][j + 1] !== undefined){
                    //Randomiz wich size the particle will fall to
                    if(Mathf.randomInt(1, 2) == 1){
                        //Get out if is at max left or at max right
                        if(i - 1 < 0 || i + 1 >= this.matrix.length){
                            continue
                        }
                        //If the piece to the diagonal down left is empty
                        if(this.matrix[i - 1][j + 1] === undefined){
                            //Move
                            this.matrix[i][j] = undefined
                            this.matrix[i - 1][j + 1] = 0
                            //Get out
                            continue
                        }
                    }
                    //If the piece to the diagonal down right is empty
                    if(this.matrix[i + 1][j + 1] === undefined){
                        //Move
                        this.matrix[i][j] = undefined
                        this.matrix[i + 1][j + 1] = 0
                    }   
                    //Get out
                    continue
                }
                //Move downwards
                this.matrix[i][j] = undefined
                this.matrix[i][j + 1] = 0
            }
        }
    }

}