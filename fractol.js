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
	while (i < 1000 && x * x + y * y < 4){
		xtemp = x * x - y * y + x0;
		y = 2 * x * y + y0;
		x = xtemp;
		i++;
	}
	red = 4 * (250 / i);
	green = 1 * (250 / i);
	setPixel(imageData, x1, y1, red, green, 0, 255);
}

function loop(imageData, zoom, decalx, decaly){
	for (x1 = 0; x1 < imageData.width; x1++){
		for (y1 = 0; y1 < imageData.height; y1++){
			mandelbrot(imageData, x1, y1, zoom, decalx, decaly);
		}
	}
}

element = document.getElementById("Fractal");
c = element.getContext("2d");

width = element.width;
height = element.height;
zoom = 1;
decalx = 2.5;
decaly = 1;

imageData = c.createImageData(width, height);
loop(imageData, zoom, decalx, decaly);
c.putImageData(imageData, 0, 0);

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

element.addEventListener("click", zoomIn, false);
element.addEventListener("contextmenu", zoomOut, false);
