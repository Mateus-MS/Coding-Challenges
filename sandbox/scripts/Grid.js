import { c } from "../main.js";

export class Grid{
    
    constructor(cols, rows){
        this.cols = cols;
        this.rows = rows;

        this.size = 50;

        this.matrix = this.createGrid();
    }

    createGrid(){
        let grid = [];
        for(let i = 0; i < this.cols; i++){
            grid.push(new Array(this.cols));
        }
        return grid;
    }

    changeBlock(x, y){
        this.matrix[x][y] = "a";
    }

    render(){

        for(let i = 0; i < this.matrix.length; i++){
            for(let j = 0; j < this.matrix[i].length; j++){
                if(this.matrix[i][j] === "a"){
                    c.beginPath();
                    c.fillStyle = "red";
                    c.fillRect(i * this.size, j * this.size, this.size, this.size);
                    c.closePath();
                }
            }
        }

        for(let i = 0; i < this.cols + 1; i++){
            c.beginPath();
            c.strokeStyle = "white";
            c.moveTo(i * this.size, 0);
            c.lineTo(i * this.size, this.rows * 50);
            c.stroke();
            c.closePath();
        }

        for(let i = 0; i < this.rows + 1; i++){
            c.beginPath();
            c.strokeStyle = "white";
            c.moveTo(0, i * this.size);
            c.lineTo(this.rows * 50, i * this.size);
            c.stroke();
            c.closePath();
        }

    }

    getGridMousePosition(x, y){
        let colIndex = Math.floor(x / this.size);
        let rowIndex = Math.floor(y / this.size);  
        
        if(colIndex >= this.cols){
            colIndex = this.cols - 1
        }
        if(rowIndex >= this.rows){
            rowIndex = this.rows - 1
        }
        return {x: colIndex, y: rowIndex}
    }

    update(){
        for(let i = this.matrix.length - 1; i >= 0; i--){
            for(let j = this.matrix[i].length - 1; j >= 0; j--){
                //Garante que não vai tentar acessar fora do array
                if(j + 1 >= this.matrix[i].length){
                    continue
                }
                //Se a peça for uma que cai
                if(this.matrix[i][j] !== "a"){
                    continue
                }
                //Garante que não ira sobrepor peças
                if(this.matrix[i][j + 1] !== undefined){
                    continue
                }

                //Move a peça pra baixo
                this.matrix[i][j] = undefined
                this.matrix[i][j + 1] = "a"
            }
        }
    }

}