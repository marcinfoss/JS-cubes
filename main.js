const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

/*const CANVAS_WIDTH = canvas.width = 1200;
const CANVAS_HEIGHT = canvas.height = 750;

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;*/

const CANVAS_WIDTH = canvas.width = visualViewport.width;
const CANVAS_HEIGHT = canvas.height = visualViewport.height;

const IS_VERTICAL = (CANVAS_HEIGHT > CANVAS_WIDTH);

const COLUMNS = 4;
const ROWS = 4;

const TILE_WIDTH = CANVAS_WIDTH / COLUMNS;
const TILE_HEIGHT = CANVAS_HEIGHT / ROWS;


let canvasPosition = canvas.getBoundingClientRect();

addEventListener('click', this.handleClick, false);

addEventListener('touchend',this.touchHandler, false);

function handleClick(e){
    const click = {x : e.clientX - canvasPosition.x,
                   y : e.clientY - canvasPosition.y};
    let nr = Math.floor(click.x / TILE_WIDTH) + Math.floor(click.y / TILE_HEIGHT) * ROWS;
    if(click.x > 0 && click.x < CANVAS_WIDTH &&
        click.y > 0 && click.y < CANVAS_HEIGHT){
            TILES[nr].addFrame();
        }
    console.log(click, " ",nr);
}

function touchHandler(e) {
    // Cache the client X/Y coordinates
    const click = {
        x: e.touches[0].clientX - canvasPosition.x,
        y: e.touches[0].clientY - canvasPosition.y
    };
    let nr = Math.floor(click.x / TILE_WIDTH) + Math.floor(click.y / TILE_HEIGHT) * ROWS;
    if (click.x > 0 && click.x < CANVAS_WIDTH &&
        click.y > 0 && click.y < CANVAS_HEIGHT) {
        TILES[nr].addFrame();
    }
    console.log(click, " ",nr);
}


let images = [];

let vert= '';
if(IS_VERTICAL) vert = 'vertical/';

for(j = 1; j<7; j++){
    let temp = new Image();
    temp.src = 'img/' + vert + j + '.jpg';
    images.push(temp)
}


class Tile {
    constructor(number){
        this.number = number;
        this.frame = Math.floor(Math.random() * FRAMES);
        this.direction = Math.random();
    }

    draw(){
        //ctx.drawImage(IMAGES[this.frame], TILE_WIDTH * (number % 3), TILE_HEIGHT * ( Math.floor(number/3) ), TILE_WIDTH, TILE_HEIGHT);
        let TILE_IMG_WIDTH = Math.floor(images[this.frame].width / COLUMNS);
        let TILE_IMG_HEIGTH = Math.floor(images[this.frame].height / ROWS);
        ctx.drawImage(images[this.frame],
            TILE_IMG_WIDTH * (this.number % COLUMNS), TILE_IMG_HEIGTH * ( Math.floor(this.number/ROWS) ), TILE_IMG_WIDTH, TILE_IMG_HEIGTH,
            TILE_WIDTH * (this.number % COLUMNS), TILE_HEIGHT * ( Math.floor(this.number/ROWS) ), TILE_WIDTH, TILE_HEIGHT);
        ctx.beginPath();
        ctx.rect(TILE_WIDTH * (this.number % COLUMNS), TILE_HEIGHT * ( Math.floor(this.number/ROWS) ), TILE_WIDTH, TILE_HEIGHT);
        ctx.stroke();
        //ctx.fillRect(0,0,100,100);
        }
    addFrame(){
        if(this.direction>0.5) this.frame++;
        else this.frame--;
        if(this.frame < 0) this.frame = FRAMES-1;
        this.frame %= FRAMES;
        console.log('updated ',this.number);
    }
}

//const IMAGES = [cat1Img, cat2Img, cat3Img, cat4Img];
const FRAMES = images.length;

const TILES = [];

for(let i=0; i<COLUMNS*ROWS;i++){TILES.push(new Tile(i))}


function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    TILES.forEach(tile => tile.draw());
    //TILES[0].draw();


    requestAnimationFrame(animate);
}

animate();