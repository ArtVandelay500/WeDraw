const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const eraseBtn = document.getElementById("eraser-btn");
const destoryBtn = document.getElementById("destory-btn");
const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");


ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;
 
function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX,event.offsetY);
}

function startPainting(){
    isPainting = true;
}
function cancelPainting(){
    isPainting = false;
    ctx.beginPath();
}

function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}


function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
    console.log(ctx.lineWidth);
    console.log(event.target.value);
}

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
};

function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    }else{
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}

function onDestroyClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

function onEraserClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

function onFileChange(event){
    event.preventDefault();
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image,0,0,CANVAS_WIDTH,200); 
        fileInput.value = null;
    }
}
function onDoubleClick(event){
    const text = textInput.value;
    if(text !== ""){
        ctx.save(); 
        ctx.lineWidth = 1;
        ctx.font = "68px serif";
        ctx.fillText(text,event.offsetX,event.offsetY);
        ctx.restore();
    }else{
        alert("Input the text!");
    }
}

function onSaveClick(){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

canvas.addEventListener("dblclick",onDoubleClick);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave",cancelPainting);

saveBtn.addEventListener("click",onSaveClick);
fileInput.addEventListener("change", onFileChange);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change",onColorChange);
modeBtn.addEventListener("click",onModeClick)
destoryBtn.addEventListener("click", onDestroyClick);
eraseBtn.addEventListener("click", onEraserClick);
colorOptions.forEach(color => color.addEventListener("click",onColorClick));