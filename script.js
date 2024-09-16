const txtcolorpicker = document.getElementById('txtcolorpicker');
const bgcolorpicker = document.getElementById('bgcolorpicker');
const canvas = document.getElementById('mycanvas');
const clearbtn = document.getElementById('clearbtn');
const savebtn = document.getElementById('savebtn');
const retrievebtn = document.getElementById('retrivebtn');
const fontpicker = document.getElementById('fontpicker');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

txtcolorpicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
});

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
});
bgcolorpicker.addEventListener('change',(e)=>
{
    ctx.fillStyle=e.target.value;
    ctx.fillRect(0,0,800,500);
})
fontpicker.addEventListener('change',(e)=>{
    ctx.lineWidth=e.target.value;
})
clearbtn.addEventListener('click',()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
})
savebtn.addEventListener('click',()=>
{
    localStorage.setItem('canvasContents',canvas.toDataURL());
    let link=document.createElement('a');
    link.download='my-sign.png';
    link.href=canvas.toDataURL();
    link.click();
})
retrievebtn.addEventListener('click',()=>{
    let savedContents=localStorage.getItem('canvasContents');
    if(savedContents)
        {
            let img = new Image();
            img.src=savedContents;
            img.onload=()=>
                {
                    ctx.drawImage(img,0,0);
                };
           
        }
});