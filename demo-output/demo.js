import canvasSign from '../core/canvas-sign';
var canvas = canvasSign();

document.getElementById('save').onclick = function(){
    var dataURL = canvas.save();
    var img = new Image();
    img.src = dataURL;
    document.body.appendChild(img);
}

document.getElementById('clear').onclick = function(){
    canvas.clear();
}
