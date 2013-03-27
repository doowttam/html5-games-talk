var EXAMPLES = (function(win, doc){ return {
    init: function() {
        this.initRawKeyExample();
        this.initAsyncKeyExample();
    },

    // To handle rAF boilerplate, because it's distracting in examples
    rAF: function(animateFunc, delay) {
        var lastRun = Date.now();

        var animate = function() {
            var now = Date.now();
            var dt  = (now - lastRun);
            
            if ( dt > delay ) {
                animateFunc();
                lastRun = now;
            }
            
            requestAnimationFrame(animate);
        };
        animate();
    },

    initRawKeyExample: function() {
        var canvas  = document.getElementById('raw_key_canvas');
        var context = canvas.getContext('2d');
        var count   = 0;

        doc.getElementById('raw_key_example').addEventListener('keydown', function() {
            count++;
            EXAMPLES.drawCircle(canvas, context, count);
        }, false);
        doc.getElementById('raw_key_example').addEventListener('keyup', function() {
            count = 0;
            context.clearRect(0, 0, canvas.width, canvas.height);
        }, false);
    },
    
    initAsyncKeyExample: function() {
        var keyPressed = false;

        var canvas  = document.getElementById('async_key_canvas');
        var context = canvas.getContext('2d');
        var count   = 0;

        doc.getElementById('async_key_example').addEventListener('keydown', function() {
            keyPressed = true;
        }, false);
        doc.getElementById('async_key_example').addEventListener('keyup', function() {
            keyPressed = false;
            count = 0;
            context.clearRect(0, 0, canvas.width, canvas.height);
        }, false);
        
        EXAMPLES.rAF(function() {
            if ( keyPressed ) {
                count++;
                EXAMPLES.drawCircle(canvas, context, count);
            }
        }, 50);
    },

    drawLines: function() {
        var canvas  = doc.getElementById('basic_canvas');
        var context = canvas.getContext('2d');

        // Draw the line
        context.strokeStyle = "red";
        context.lineWidth = 5;

        context.beginPath();
        context.moveTo(20, 20);
        context.lineTo(175, 260);
        context.lineTo(240, 60);
        context.closePath();

        context.stroke();

        // Draw the rectangle
        context.fillStyle = "blue";
        context.fillRect( 30, 160, 60, 20 );

        // Draw the circle
        context.fillStyle   = "orange";
        context.strokeStyle = "purple";

        context.beginPath();
        context.arc(170, 60, 45, 0, Math.PI * 2, false);
        
        context.stroke();
        context.fill();
    },

    drawImages: function() {
        var canvas  = doc.getElementById('image_canvas');
        var context = canvas.getContext('2d');

        var img = new Image();

        img.addEventListener('load', function() {
            // Slice from the image
            context.drawImage( img, 0, 0, 50, 90, 20, 100, 50, 90);

            // Slice and scale, generally helpful
            context.drawImage( img, 0, 0, 50, 90, 135, 75, 100, 180);
        }, false);

        img.src = 'detective.png';
    },

    animate: function() {
        var canvas  = doc.getElementById('animate_canvas');
        var context = canvas.getContext('2d');

        var img = new Image();

        img.addEventListener('load', function() {
            var width       = 50;
            var totalFrames = 8;
            var frame       = 0;

            EXAMPLES.rAF(function() {
                var offset = width * (frame % totalFrames);
                context.drawImage( img, offset, 0, 50, 90, 25, 30, 50, 90);

                frame++;
            }, 150 );
        }, false);

        img.src = 'detective.png';
    },

    animateWithReset: function() {
        var canvas  = doc.getElementById('animate2_canvas');
        var context = canvas.getContext('2d');

        var img = new Image();

        img.addEventListener('load', function() {
            var width       = 50;
            var totalFrames = 8;
            var frame       = 0;

            EXAMPLES.rAF(function() {
                // Reset canvas
                context.clearRect(0, 0, canvas.width, canvas.height);

                var offset = width * (frame % totalFrames);
                context.drawImage( img, offset, 0, 50, 90, 25, 30, 50, 90);
                
                frame++;
            }, 150 );
        }, false);

        img.src = 'detective.png';
    },

    drawCircle: function(canvas, context, count) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.fillStyle   = "red";
        context.strokeStyle = "red";

        var x = canvas.width / 2;
        var y = canvas.height / 2;

        context.beginPath();
        context.moveTo(x, y);
        context.arc(x, y, canvas.width / 2, 0, (Math.PI/180) * count * 15, false);
        context.lineTo(x, y);
        context.closePath();
        
        context.stroke();
        context.fill();
    }
}})(window, document);