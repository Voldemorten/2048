var grid =[];
var size = 4;
var gameOver = false;
var score = 0;
var dc = 0; //debug counter.

//Tiles
function Tile(xPosition, yPosition, value) {
    //this.tileID = tileID;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.value = value;

    this.isMerged = false;
    /*
    this.onclick = function () {
        console.log(
            "id: "+this.tileID
            +" xPosition: "+this.xPosition
            +" yPosition: "+this.yPosition
            +" value: "+this.value
        );

    }*/
}


document.addEventListener("DOMContentLoaded", function () {
    //tests
    /*
    var arr = [1,2,3,4,5,6,7,8];
    arr = arr.filter(function (val) {
        return val >=4;
    });
    console.log(arr);*/
    
    
    //add interaction (keyboard and buttons)
    addInteraction();
    initializeGrid();
    console.log(grid);
    printGrid();
    //addRandomTile();

    drawDemoGrid()

});

function printGrid() {
    var counter = 1;
    for (var i = 0; i < grid.length; i++) {
        var output = "line"+counter+":      ";
        for (var j = 0; j < grid[i].length; j++) {
            if (grid[i][j]!=null) output+=grid[i][j].value+' | ';
            //else output+=grid[j][i]+' | ';
            else output+="0"+' | ';
        }
        console.log(output);
        output='';
        counter++;
    }
    console.log("_______________________________")
    console.log(grid);


    /*
    console.log(grid[0][0].value+"|"+grid[0][1].value+"|"+grid[0][2].value+"|"+grid[0][3].value+"|\n"
                +grid[1][0].value+"|"+grid[1][1].value+"|"+grid[1][2].value+"|"+grid[1][3].value+"|\n"
                +grid[2][0].value+"|"+grid[2][1].value+"|"+grid[2][2].value+"|"+grid[2][3].value+"|\n"
                +grid[3][0].value+"|"+grid[3][1].value+"|"+grid[3][2].value+"|"+grid[3][3].value+"|");
                */
    /*
    console.log(grid[0][0]+"|"+grid[0][1]+"|"+grid[0][2]+"|"+grid[0][3]+"|\n"
        +grid[1][0]+"|"+grid[1][1]+"|"+grid[1][2]+"|"+grid[1][3]+"|\n"
        +grid[2][0]+"|"+grid[2][1]+"|"+grid[2][2]+"|"+grid[2][3]+"|\n"
        +grid[3][0]+"|"+grid[3][1]+"|"+grid[3][2]+"|"+grid[3][3]+"|");*/
    /*
    console.log(grid[0].length);
    console.log(grid.length);
    for (var i=0;i<size;i++) {
        for (var j=0;j<size;j++) {
            console.log(grid[i][j]);
        }
    }
    console.log(grid);*/
}

function initializeGrid() {
    for (var i = 0; i<size; i++) {
        grid[i]=[];
        for (var j = 0; j<size; j++) {
            var id = i*4+j;
            grid[i][j]=null;
            if (i==0 && j==0 || i==0 && j==3) {
                grid[i][j]=new Tile(i,j,2);
            }
            if (j==0&&i==2||i==2&&j==2) grid[i][j]=new Tile(i,j,4);
            //new Tile(id, i,j,0);
        }
    }
    addRandomTile();
    addRandomTile();
}
/*
function drawGrid() {
    var game = $("#game");
    for (var i=0;i<size;i++) {
        for(var j=0;j<size;j++) {
            var tile = grid[j][i];
            var value = tile.value;
            var id = tile.tileID;
            console.log("id: "+id);
            //appending
            game.append("<div id='tile"+id+ "' class='tile color"+value+"'><div class='value'></div>"+value+"</div>");
            $("#tile"+id).on("click",function () {
                console.log(id);
                this.remove();
            })
        }
    }
}*/
function drawGrid() {
    var game = $("#game");
    for (var i=0;i<size;i++) {
        for(var j=0;j<size;j++) {
            var value = 0;
            currentTile = grid[i][j];
            if (currentTile!=null) value = currentTile.value;
            //appending
            game.append("<div class='tile color"+value+"'><div class='value'></div>"+value+"</div>");
        }
    }
}

function drawDemoGrid() {
    var game2 = $("#demoGame");
    for (var i=0;i<size;i++) {
        for(var j=0;j<size;j++) {
            //appending
            var values = "j:"+j+" i:"+i//switch due to first switch
            game2.append("<div id='tile"+ (i*4+j+1) + "' class='tile'><div class='value'></div>"+values+"</div>")
        }
    }
}

function addRandomTile() {
    var tilePlaced = false;
    while (!tilePlaced && !gameOver) {
        var randRow = Math.floor(Math.random() * size);
        var randColumn = Math.floor(Math.random() * size);
        if (grid[randRow][randColumn]==null) {
            //a value either 2 or 4. 75% of times it's 2.
            var value = Math.random();
            if (value<=0.75) value = 2;
            else {
                value = 4;
            }
            grid[randRow][randColumn] = new Tile(randRow,randColumn,value);
            tilePlaced = true;
            updateGrid();
        }
        //else checkGameOver();
    }

}

function checkGameOver() {
    var zeroFound = false;
    for (var i=0;i<size;i++) {
        for (var j = 0; j < size; j++) {
            if (grid[j][i].value==0) {
                zeroFound = true;
                break;
            }
        }
    }
    if (!zeroFound) {
        gameOver = true;
        alert("game over!");
    }
}

function updateGrid() {
    $("#game").empty();
    drawGrid();
}

function addInteraction() {
    //buttons
    $("#newTileBtn").on("click",function () {
        addRandomTile();
    });

    //keyboard
    $(window).keyup(event, function () {
        switch (event.keyCode) {
            case 37:
                moveLeft(); break;
            case 38:
                moveUp(); break;
            case 39:
                moveRight(); break;
            case 40:
                moveDown(); break;
            case 85: //U key
                //updateScoreDemo();
                break;
        }
    })
}
//even closer. Doesnt work on a 2-2-4 = 8 should be 4-4 or a 4-4-4 = 4-8 should be 8-4
function moveUp2() {
    //var moved = false;
    //must run from top to button for it to work
    for (var i = size-1; i>=0; i--) {
        for (var j = size-1; j>=0; j--) {
            var currentTile = grid[j][i];
            var aboveTile = grid[j][i-1];
            var underTile = grid[j][i+1];
            if (currentTile!=null && underTile!=null && currentTile.value==underTile.value && !currentTile.isMerged) {
                //merge
                //update score
                currentTile.value+=underTile.value;
                currentTile.isMerged=true;
                grid[j].splice(i+1,1);
                grid[j].push(null);
            }
            else if (currentTile!=null && aboveTile!=null && currentTile.value==aboveTile.value && !aboveTile.isMerged) {
                //merge
                //update score
                aboveTile.value+=currentTile.value;
                aboveTile.isMerged=true;
                grid[j].splice(i,1);
                grid[j].push(null);
            }
            else if (grid[j][i]==null) {
                grid[j].splice(i,1);
                grid[j].push(null);
            }

        }
    }
    addRandomTile();
    printGrid();
}

//WORKS!!!!19/3_1740.
function moveLeft() {
    //var moved = false;
    for (var i = 0; i<size; i++) {
        removeElementAddNull(grid[i],null); //pops nulls, then pushes nulls. Like a queue.
        //printGrid();
        for (var j = 0; j<size; j++) {
            var currentTile = grid[i][j];
            var aboveTile = grid[i][j+1];
            if(currentTile!=null && aboveTile!=null && currentTile.value==aboveTile.value) {
                //merge
                //update score
                updateScore(currentTile.value+aboveTile.value);
                currentTile.value+=aboveTile.value;
                grid[i].splice(j+1,1); //splices aboveTile
                grid[i].push(null);
            }
        }
    }
    addRandomTile();
    printGrid();
}

function moveDown() {
    rotateGrid90Clockwise(grid);
    moveLeft();
    rotateGrid90Clockwise(grid);
    rotateGrid90Clockwise(grid);
    rotateGrid90Clockwise(grid);
    updateGrid();
}

function moveRight() {
    rotateGrid90Clockwise(grid);
    rotateGrid90Clockwise(grid);
    moveLeft();
    rotateGrid90Clockwise(grid);
    rotateGrid90Clockwise(grid);
    updateGrid();
}

function moveUp() {
    rotateGrid90Clockwise(grid);
    rotateGrid90Clockwise(grid);
    rotateGrid90Clockwise(grid);
    moveLeft();
    rotateGrid90Clockwise(grid);
    updateGrid();
}

function removeElementAddNull(arr,val)
{
    var i = arr.length;
    while (i--) {
        if (arr[i] === val) {
            arr.splice(i, 1);
            arr.push(null);
        }
    }
    return arr;
}

function updateScore(add) {
    score += add;
    $("#scoreValue").text(score);
}

function rotateGrid90Clockwise(arr) {
    //transposed
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j <i; j++) {
            //swap element[i,j] and element[j,i]
            var temp = arr[i][j];
            arr[i][j] = arr[j][i];
            arr[j][i] = temp;
        }
    }
    for (var i = 0; i < arr.length; i++) {
        arr[i].reverse();
        }
}



