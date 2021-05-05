var canvas;
var gl;
var program;
var vertices;

var redValue=1.0;
var greenValue;
var blueValue;

var xCircleCenter = 0.0;
var yCircleCenter = 0.0;
var circleCenter;
var verticesData = [];

var numOfTri;
var theta=10;
var xrValue = 0.2;
var yrValue = 0.1;


window.onload = function init()
{
	canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

	//TODO: create geometry
		drawCircle();
	//vertex buffer
		var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesData), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

		colorLoc = gl.getUniformLocation(program,"color");



		function drawCircle(){
		numOfTri=360/theta;
		verticesData = [];
		for (let i = 0; i <= numOfTri; i++) {
				var angle= 2 * Math.PI * i / numOfTri;
				var x = xCircleCenter + xrValue * Math.cos(angle);
				var y = yCircleCenter + yrValue * Math.sin(angle);
				verticesData.push(x, y);
				}
	}


	document.getElementById("posX").oninput = function(event) {
        //TODO: fill here to adjust translation according to slider value
				xCircleCenter=parseFloat(event.target.value);
				init();
		};
    document.getElementById("posY").oninput = function(event) {
        //TODO: fill here to adjust translation according to slider value
				yCircleCenter=parseFloat(event.target.value);
				init();
    };
    document.getElementById("scaleX").oninput = function(event) {
        //TODO: fill here to adjust scale according to slider value
				xrValue=(parseFloat(event.target.value)/3.5);
				init();
		};
    document.getElementById("scaleY").oninput = function(event) {
        //TODO: fill here to adjust scale according to slider value
				yrValue=(parseFloat(event.target.value)/3.5);
				init();
    };
    document.getElementById("redSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
				redValue=event.target.value;
    };
    document.getElementById("greenSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
				 greenValue=event.target.value;
    };
    document.getElementById("blueSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
				blueValue=event.target.value;
    };
	document.getElementById("theta1").onclick = function(event) {
        //TODO: fill here to adjust resolutio
				theta=parseFloat(event.target.value);
				init();
		};
	document.getElementById("theta2").onclick = function(event) {
        //TODO: fill here to adjust resolution of the ellipse

				theta=parseFloat(event.target.value);
				init();
    };
	document.getElementById("theta3").onclick = function(event) {
        //TODO: fill here to adjust resolution of the ellipse
				theta=parseFloat(event.target.value);
				init();
		};
	document.getElementById("theta4").onclick = function(event) {
        //TODO: fill here to adjust resolution of the ellipse

				theta=parseFloat(event.target.value);
				init();
		};
	document.getElementById("theta5").onclick = function(event) {
        //TODO: fill here to adjust resolution of the ellipse
				theta=parseFloat(event.target.value);
				init();
		};
	document.getElementById("xrSlider").onchange = function(event) {
        //TODO: fill here to adjust x radius of the
				xrValue=parseFloat(event.target.value);
				init();
		};
	document.getElementById("yrSlider").onchange = function(event) {
        //TODO: fill here to adjust y radius of the ellipse
				yrValue=parseFloat(event.target.value);
				init();
		};

    render();
};

function render() {

	//TODO: send necessary variables to shader, draw call, swap buffers

				color = vec4(window.redValue,window.greenValue,window.blueValue,1.0);
				gl.uniform4fv(colorLoc,color);
				gl.clear( gl.COLOR_BUFFER_BIT );
				gl.drawArrays(gl.TRIANGLE_FAN, 0, verticesData.length);
		window.requestAnimFrame(render);

}
