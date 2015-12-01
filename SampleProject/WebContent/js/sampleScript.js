/**
 * Javascript to drag and drop data element into the canvas
 */

var canvas, ctx, canvasLeft, canvasTop;

function init() {
	canvas = document.getElementById("graphCanvas");
	img = document.getElementById("img1");
	ctx = canvas.getContext("2d");
	canvasLeft = canvas.offsetLeft;
	canvasTop = canvas.offsetTop;
}


// this is the mouse position within the drag element
var startOffsetX, startOffsetY;

function allowDrop(ev) {
	ev.preventDefault();
}

function mousedown(ev) {
    startOffsetX = ev.offsetX;
    startOffsetY = ev.offsetY;
}

function dragstart(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();

    var dropX = ev.clientX - canvasLeft - startOffsetX;
    var dropY = ev.clientY - canvasTop - startOffsetY;
    var id = ev.dataTransfer.getData("Text");
    var dropElement = document.getElementById(id);

    // draw the drag image at the drop coordinates
    ctx.drawImage(dropElement, dropX, dropY);
}

window.onload = init;

//Function to send the pic to server
$(document).ready(
		function() {
			$('#submitBtn').click(
					function() {
						// Generate the image data
						var Pic = document.getElementById("graphCanvas")
								.toDataURL("image/png");
						Pic = Pic.replace(/^data:image\/(png|jpg);base64,/, "")

						// Sending the image data to Server
						$.ajax({
							type : 'POST',
							url : 'SampleServlet',
							data : '{ "imageData" : "' + Pic + '" }',
							//data:'Hello',
							contentType : 'application/json; charset=utf-8',
							dataType : 'json',
							success : function(msg) {
								alert("Done, Picture Uploaded.");
							}
						});
					});
		});
