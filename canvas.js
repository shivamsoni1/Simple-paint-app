function begin() {
   canvas = document.getElementById('canvas');
   ctx = canvas.getContext('2d');

   //Add event listner
   canvas.addEventListener('mousedown', MouseDown, false);
   canvas.addEventListener('mouseup', MouseUp, false);
   canvas.addEventListener('mousemove', MouseMove, false);
   canvas.addEventListener('dblclick', MouseDoubleClick, false);
   //color picker code
   color = document.getElementById("colorpicker");
   color.value = '#0000ff';
   color.addEventListener("input", updateFirst, false);
   //
   numofrec = [];


   index=0;
   flag = false;
   drag = false;
   mc = false;
   
   //doubleClick = false;
   canvas.onselectstart = function () { return false; };

  }
  //add double click handler
  function updateFirst(e){
    color.value = e.target.value;
    
  }
  function MouseDoubleClick(e) {
   var coordinate = MouseCoordinate(canvas, e);
   dcX = coordinate.x;
   dcY = coordinate.y;
   //doubleClick = true;
   //deleteTri();
   if (numofrec !== null) {
    for (var j = 0; j < numofrec.length; j++) {
     intializePath(numofrec[j]);
     if (ctx.isPointInPath(dcX, dcY)) {
      numofrec.splice(j, 1);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawMoverec();
     }
    }
   }
  }

//Add Mousedown Handler
  function MouseDown(e) {
   var coordinate = MouseCoordinate(canvas, e);
   MouseX = coordinate.x;
   MouseY = coordinate.y;
   //drawTriangle()
   mc = true;
   if (numofrec !== null) {
    for (var j = 0; j < numofrec.length; j++) {
     intializePath(numofrec[j]);
     if (ctx.isPointInPath(MouseX, MouseY)) {

      index = j;
      drag = true;

     }
    }
   }
  }


//Add Mousemove Handler
  function MouseMove(e) {
   var coordinate = MouseCoordinate(canvas, e);

   if (mc) {
    mmx = coordinate.x;
    mmy = coordinate.y;
    if (drag) {
     var newX = mmx - MouseX;
     var newY = mmy - MouseY;
     MouseX = mmx;
     MouseY = mmy;
     numofrec[index].X += newX;
     numofrec[index].Y += newY;
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     drawMoverec();
    }
    else {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     
     drawRectangle();
     console.log('mouse move')
    }

   }

  }
//Mouseup handler
  function MouseUp() {

   mc = false;
   drag = false;
   // doubleClick = false;
   if (flag) {
    var color1 = color.value;
    ctx.fillStyle = color1;
    ctx.fill();
    numofrec.push({ X: 0, Y: 0, x0: MouseX, y0: MouseY, x1: MouseX + (mmx - MouseX), y1: MouseY, x2: MouseX + (mmx - MouseX), y2: (mmy - MouseY) + MouseY, x3: MouseX, y3: (mmy - MouseY) + MouseY, x4: MouseX, y4: MouseY, color1: color1 });
    flag = false;
    

   }
  }
//Function to draw rectangle on dragging the mouse
  function drawRectangle() {

   if (numofrec !== null) {
    for (var i = 0; i < numofrec.length; i++) {
     redraw(numofrec[i]);
    }

   }

   ctx.beginPath();
   ctx.moveTo(MouseX, MouseY);
   ctx.lineTo(MouseX + (mmx - MouseX), MouseY);
   ctx.lineTo(MouseX + (mmx - MouseX), (mmy - MouseY) + MouseY);
   ctx.lineTo(MouseX, (mmy - MouseY) + MouseY);
   ctx.lineTo(MouseX, MouseY);
   ctx.closePath();
   ctx.stroke();
   flag = true;
  }

  //Redraw all rectangle when a new rectangle is adde to canvas
  function redraw(numofrec) {

   ctx.beginPath();
   ctx.moveTo(numofrec.x0 + numofrec.X, numofrec.y0 + numofrec.Y);
   ctx.lineTo(numofrec.x1 + numofrec.X, numofrec.y1 + numofrec.Y);
   ctx.lineTo(numofrec.x2 + numofrec.X, numofrec.y2 + numofrec.Y);
   ctx.lineTo(numofrec.x3 + numofrec.X, numofrec.y3 + numofrec.Y);
   ctx.lineTo(numofrec.x4 + numofrec.X, numofrec.y4 + numofrec.Y);
   ctx.closePath();
   ctx.fillStyle = numofrec.color1;
   ctx.fill();
  }

  //Initialize context to delete a rectangle
  function intializePath(numofrec) {
   ctx.beginPath();
   ctx.moveTo(numofrec.x0 + numofrec.X, numofrec.y0 + numofrec.Y);
   ctx.lineTo(numofrec.x1 + numofrec.X, numofrec.y1 + numofrec.Y);
   ctx.lineTo(numofrec.x2 + numofrec.X, numofrec.y2 + numofrec.Y);
   ctx.lineTo(numofrec.x3 + numofrec.X, numofrec.y3 + numofrec.Y);
   ctx.lineTo(numofrec.x4 + numofrec.X, numofrec.y4 + numofrec.Y);
   ctx.closePath();

   //document.getElementById("dis2").innerHTML = "("+X0+","+Y0+")";

  }

  //Draw all remaining rectangle after double click on rectangle

  function drawMoverec() {
   for (var k = 0; k < numofrec.length; k++) {

    ctx.beginPath();
    ctx.moveTo(numofrec[k].x0 + numofrec[k].X, numofrec[k].y0 + numofrec[k].Y);
    ctx.lineTo(numofrec[k].x1 + numofrec[k].X, numofrec[k].y1 + numofrec[k].Y);
    ctx.lineTo(numofrec[k].x2 + numofrec[k].X, numofrec[k].y2 + numofrec[k].Y);
    ctx.lineTo(numofrec[k].x3 + numofrec[k].X, numofrec[k].y3 + numofrec[k].Y);
    ctx.lineTo(numofrec[k].x4 + numofrec[k].X, numofrec[k].y4 + numofrec[k].Y);

    ctx.closePath();
    ctx.fillStyle = numofrec[k].color1;
    ctx.fill();

   }
  }
//MouseCoordinate
  function MouseCoordinate(canvas, e) {
   var rect = canvas.getBoundingClientRect(),
    scaleX = canvas.width / rect.width,
    scaleY = canvas.height / rect.height;

   return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY
   }
  }
  //Clear the canvas
  function Clean() {
   numofrec = [];
   flag = false;
   drag = false;
   ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
 