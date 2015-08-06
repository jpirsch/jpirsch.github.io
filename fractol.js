function zoomIn(event) {
	zoom *= 0.85;
	decalx = (event.clientX / imageData.width) * (3.5 * zoom) - (2.5 * zoom);
	decalx = (2.5 * zoom) - decalx;
	decaly = (event.clientY / imageData.height) * (2 * zoom) - zoom;
	decaly = zoom - decaly;
	alert(decalx);
	loop(imageData, zoom, decalx, decaly);
	c.putImageData(imageData, 0, 0);
}

function zoomOut(event) {
	zoom *= 1.33;
	decalx = (event.clientX / imageData.width) * (3.5 * zoom) - (2.5 * zoom);
	decalx = (2.5 * zoom) - decalx;
	decaly = (event.clientY / imageData.height) * (2 * zoom) - zoom;
	decaly = zoom - decaly;
	loop(imageData, zoom, decalx, decaly);
	c.putImageData(imageData, 0, 0);
}

function setPixel(imageData, x, y, r, g, b, a){
	index = (x + y * imageData.width) * 4;
	imageData.data[index] = r;
	imageData.data[index+1] = g;
	imageData.data[index+2] = b;
	imageData.data[index+3] = a;

}

function mandelbrot(imageData, x1, y1, zoom, decalx){
	i = 0;
	xtemp = 0;
	x0 = ((x1 / imageData.width) * 3.5) * zoom - decalx; //1 = zoom, 2 = decalage sur x
	y0 = ((y1 / imageData.height) * 2) * zoom - decaly;
	x = 0;
	y = 0;
	while (i < 150 && x * x + y * y < 4){
		xtemp = x * x - y * y + x0;
		y = 2 * x * y + y0;
		x = xtemp;
		i++;
	}
	red = 4 * (250 / i);
	green = 1 * (250 / i);
	setPixel(imageData, x1, y1, red, green, 0, 255);
}

function julia(imageData, x1, y1, zoom, decalx){
	i = 0;
	xtemp = 0;
	x = ((x1 / imageData.width) * 3.5) * zoom - decalx; //1 = zoom, 2 = decalage sur x
	y = ((y1 / imageData.height) * 2) * zoom - decaly;
	x0 = 0;
	y0 = 0;
	while (i < 150 && x * x + y * y < 4){
		xtemp = x * x - y * y + x0;
		y = 2 * x * y + y0;
		x = xtemp;
		i++;
	}
	red = 4 * (250 / i);
	green = 1 * (250 / i);
	setPixel(imageData, x1, y1, red, green, 0, 255);
}

function loop1(imageData, zoom, decalx, decaly){
	for (x1 = 0; x1 < imageData.width; x1++){
		for (y1 = 0; y1 < imageData.height; y1++){
			mandelbrot(imageData, x1, y1, zoom, decalx, decaly);
		}
	}
}

function loop2(imageData, zoom, decalx, decaly){
	for (x1 = 0; x1 < imageData.width; x1++){
		for (y1 = 0; y1 < imageData.height; y1++){
			julia(imageData, x1, y1, zoom, decalx, decaly);
		}
	}
}

function drawLine(x1, y1, x2, y2, brightness){
        c.moveTo(x1, y1);
        c.lineTo(x2, y2);
}

function drawTree(x1, y1, angle, depth){
        if (depth != 0){
                var x2 = x1 + (Math.cos(angle * deg_to_rad) * depth * 10.0);
                var y2 = y1 + (Math.sin(angle * deg_to_rad) * depth * 10.0);
                drawLine(x1, y1, x2, y2, depth);
                drawTree(x2, y2, angle - 20, depth - 1);
                drawTree(x2, y2, angle + 20, depth - 1);
        }
}

function tree(c) {
	c.fillStyle   = '#000';
	c.lineWidth   = 1;

	var deg_to_rad = Math.PI / 180.0;
	var depth = 9;

	c.beginPath();
	drawTree(300, 500, -90, depth);
	c.closePath();
	c.stroke();
}

element = document.getElementById("Fractal");
c = element.getContext("2d");

width = element.width;
height = element.height;
zoom = 1;
decalx = 2.5;
decaly = 1;

function choose(choice){
	imageData = c.createImageData(width, height);
	if (choice == '1')
		loop1(imageData, zoom, decalx, decaly);
	else if (choice == '2')
		loop2(imageData, zoom, decalx, decaly);
	c.putImageData(imageData, 0, 0);
	if (choice == '3')
		tree(c);
}

element.addEventListener("click", zoomIn, false);
element.addEventListener("contextmenu", zoomOut, false);
