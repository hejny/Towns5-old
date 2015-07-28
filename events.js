


//======================================================================================================================


var keys=[];





var controls={
    'up':  [38,87],
    'down':  [40,83],
    'left':  [37,65],
    'right':  [39,68]
    /*'slopeup':  [88],
    'slopedown':  [67],
    'perspectiveup':  [86],
    'perspectivedown':  [66],
    'sizeup':  [78],
    'sizedown':  [77]*/


};



$( document ).ready(function() {


    $(document).keydown(function (e) {
        //e.preDefault();
        //console.log(e.which);

        if ($.inArray(e.which, keys) == -1) {
            keys.push(e.which);

        }

    });


    $(document).keyup(function (e) {
        //e.preDefault();

        var i = $.inArray(e.which, keys);


        if (i != -1) {
            keys.splice(i, 1);

        }

    });


    setInterval(
        function () {
            //console.log(keys);

            var keys_ = [];

            for (var i = 0; i < keys.length; i++) {

                $.each(controls, function (keyname, val) {
                    //console.log(keyname);

                    if ($.inArray(keys[i], val) != -1) {
                        keys_.push(keyname);

                    }


                });

            }



            if ($.inArray('up', keys_) != -1) {

                //map_x -= Math.sin(map_rotation / 180 * pi) * 30 / 180;
                //map_y -= Math.cos(map_rotation / 180 * pi) * 30 / 180;

                mapMove(0,30);

                //updateMap();

            }


            if ($.inArray('down', keys_) != -1) {

                map_x_delta = Math.sin(map_rotation / 180 * pi) * 50;
                map_y_delta = Math.cos(map_rotation / 180 * pi) * 50;


            }


            if ($.inArray('left', keys_) != -1) {
                map_rotation_delta = 90;
            }


            if ($.inArray('right', keys_) != -1) {
                map_rotation_delta = -90;
            }


            /*if ($.inArray('slopeup', keys_) != -1) {
                map_slope_delta = 90;
            }


            if ($.inArray('slopedown', keys_) != -1) {
                map_slope_delta = -90;
            }

            if ($.inArray('perspectiveup', keys_) != -1) {
                map_perspective_delta = 0.01;
            }


            if ($.inArray('perspectivedown', keys_) != -1) {
                map_perspective_delta = -0.01;
            }

            if ($.inArray('sizeup', keys_) != -1) {
                map_size_delta = 2;
            }


            if ($.inArray('sizedown', keys_) != -1) {
                map_size_delta = -2;
            }*/


        }
        , 100
    );


//======================================================================================================================

    $('#map_drag').mousewheel(function (e) {

        //e.preDefault();


        map_zoom_delta = e.deltaY *2;


    });


//======================================================================================================================

    var first_offset = false;
    var last_offset = false;
    var current_offset = false;


    $('#map_drag').draggable({

        'scroll': false,
        'start': function () {
            first_offset = $(this).offset();
            last_offset = first_offset;


        },
        'stop': function () {

            $(this).css('left', first_offset.left);
            $(this).css('top', first_offset.top);

            updateMap();


        },
        'drag': function () {

            current_offset = $(this).offset();

            deltaX = current_offset.left - last_offset.left;
            deltaY = current_offset.top - last_offset.top;


            last_offset = current_offset;


            mapMove(deltaX,deltaY);


        }


    });


//======================================================================================================================


    $("#map_drag").mousemove(function (e) {

        //var pos   = $(this).offset();

        canvas_mouse_x = e.clientX;//-pos.left;
        canvas_mouse_y = e.clientY;//-pos.top;


    });


//======================================================================================================================


    /*


     var map_clicked_x=0;
     var map_clicked_y=0;


     $('#map_drag').click(function()*/

});