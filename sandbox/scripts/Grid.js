function random(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  }
  

import { c, GRIDSIZE } from "../main.js";

export class Grid{
    
    constructor(cols, rows){
        this.cols = cols;
        this.rows = rows;

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
                    c.fillRect(i * GRIDSIZE, j * GRIDSIZE, GRIDSIZE, GRIDSIZE);
                    c.closePath();
                }
            }
        }

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

    getGridMousePosition(x, y){
        let colIndex = Math.floor(x / GRIDSIZE);
        let rowIndex = Math.floor(y / GRIDSIZE);  
        
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
                    //Randomiza o lado que a peça cai
                    if(random(1, 2) == 1){
                        console.log(random(1, 2))
                        //se não estiver em um canto
                        if(i - 1 >= 0){
                            //se a peça em baixo a esquerda estiver vazia
                            if(this.matrix[i - 1][j + 1] === undefined){
                                this.matrix[i][j] = undefined
                                this.matrix[i - 1][j + 1] = "a"
                                continue
                            }
                        }
                    }
                    if(i + 1 < this.matrix.length){
                        if(this.matrix[i + 1][j + 1] === undefined){
                            this.matrix[i][j] = undefined
                            this.matrix[i + 1][j + 1] = "a"
                        }   
                    }
                    continue
                }

                //Move a peça pra baixo
                this.matrix[i][j] = undefined
                this.matrix[i][j + 1] = "a"
            }
        }
    }

}