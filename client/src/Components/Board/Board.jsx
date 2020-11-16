import React, { Component } from 'react';
import './styles.css';
import io from 'socket.io-client';

class Board extends Component {

    timeout;
    socket = io.connect("http/localhost:8000");

    constructor(props){
        super(props);
        this.socket.on('data',(data)=>{
            const image = new image();
            const canvas = document.querySelector('#board');
            const ctx = canvas.getContext('2d');
            image.onload = function(){
                ctx.drawImage(image,0,0);
            }
            image.src = data;
        })
    }

componentDidMount() {
    this.drawOnCanvas();
}


    drawOnCanvas(){
 
    const canvas = document.querySelector('#board');
    // console.log(canvas)
    const ctx = canvas.getContext('2d');

    const sketch = document.querySelector('#draw');
    const sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue('width'));
    canvas.height = parseInt(sketch_style.getPropertyValue('height'));

    const  mouse = {x: 0, y: 0};
    const  last_mouse = {x: 0, y: 0};

    /* Mouse Capturing Work */
    canvas.addEventListener('mousemove', function(e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    }, false);


    /* Drawing on Paint App */
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'blue';

    canvas.addEventListener('mousedown', function(e) {
        canvas.addEventListener('mousemove', onPaint, false);
    }, false);

    canvas.addEventListener('mouseup', function() {
        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);

    const root = this;
    var onPaint = function() {
        ctx.beginPath();
        ctx.moveTo(last_mouse.x, last_mouse.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.stroke();

        if(root.timeout != undefined) clearTimeout(root.timeout)

        root.timeout = setTimeout(function(){
            const  base64ImageData = canvas.toDataUrl("image/png");
            root.socket.emit('data',base64ImageData)
        },1000)
    };
    }

    render() { 
        return (
            <div className = "draw" id = "draw">
                <canvas className ="board" id = "board"></canvas>
            </div>
        );
    }
}

export default Board;