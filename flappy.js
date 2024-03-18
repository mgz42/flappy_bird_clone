const ctx = document.querySelector("canvas").getContext("2d");

let started = false;

const init = () => {
    window.requestAnimationFrame(draw);
}
let y = 445;
let dirY = 3;
let indiceDir = 3;
const img = document.getElementById("source");
const img_two = document.getElementById("source_two");
const bird1 = document.getElementById("bird1");
const bird2 = document.getElementById("bird2");
const pipe_width = 131;
const pipe_between = 250;
let last_current_pipe;

let points = 0;
let score = document.getElementById("score");

class Pipe {
    constructor(x) {
        this.current = true;
        this.height_down = Math.floor(Math.random()*500) + 300;
        this.separator_from_next = Math.floor(Math.random()*130) + 250;
        this.x = 1300;
        this.y = Math.floor(Math.random()* 450) + 350;
        this.point = true;
    }
}

const resetAll = () => {
    y = 445;
    dirY = 3;
    indiceDir = 3;

    pipes_array = [];
    let pipe = new Pipe();
    pipes_array.push(pipe);

    started = false;

    document.querySelector(".titreetcommande").innerHTML = "Score: " + points;
    document.querySelector(".titreetcommande").style.display = "flex";
    points = 0; score.innerHTML = points

}

const draw = () => {
    ctx.clearRect(0, 0, 1200, 900);
    let gradient = ctx.createLinearGradient(600, 0, 600, 900);
    gradient.addColorStop(0, "lightblue");
    gradient.addColorStop(1, "#f5f4f0");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 900);


    // bird

    y += (dirY + ( indiceDir *= 1.06));

    if (y > 900) { resetAll(); }
    ctx.beginPath();
    ctx.arc(300, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "#fcba03"
    ctx.fill();

    
    // pipes
    let to_destroy= "";
    for (const [index, pipe] of pipes_array.entries()){
        pipe.x -= 3;
        ctx.drawImage(img, pipe.x, pipe.y, 131, 688);
        ctx.drawImage(img_two, pipe.x, (pipe.y - 255 - 688), 131, 688);

        // collision bird box A et B
        if ( 300 >= pipe.x && 300 <= pipe.x + 131 && y >= pipe.y) {
            resetAll();
        } else if (300 >= pipe.x && 300 <= pipe.x + 131 && y <= pipe.y - 255) {
            resetAll();
        }

        if ( 300 > pipe.x + 131 && pipe.point === true ) { pipe.point = false; points += 1; score.innerHTML = points }

        if(pipe.x < (1300 - pipe.separator_from_next) && pipe.current === true){
            pipe.current = false;
            let new_pipe = new Pipe();
            pipes_array.push(new_pipe);
        } else if (pipe.x < -135) {
            to_destroy = index;
        }
    }
    if (to_destroy !== ""){pipes_array.splice(to_destroy, 1); to_destroy ="";}

    if (started === true) {
    window.requestAnimationFrame(draw);
    }
  }

let pipes_array = [];
let pipe = new Pipe();
pipes_array.push(pipe);


init();

const action = (e) => {
    if (started === false) {
        init();
        started = true
    }
    if(e.key === " ") {
        y -= 5;
        dirY = -15;
        indiceDir = 4;
    }
    document.querySelector(".titreetcommande").style.display = "none";
}

window.addEventListener("keydown", (e) => { action(e) })