/**
 * @author Towns.cz
 * @fileOverview  Key controls - eg. arrows, wasd,...
 */
//======================================================================================================================



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

//------------------------------------------------------------


$(function(){



    window.addEventListener('keydown', function(e) {
        // space and arrow keys
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {

            if(focusOnMap()){
                e.preventDefault();
            }


        }
    }, false);

    //------------------------------------------------------------


    $(document).keydown(function (e) {

        if(focusOnMap()) {
            r('DOWN', e.which);

            if ($.inArray(e.which, keys) == -1) {
                keys.push(e.which);

            }
        }

    });

    $(document).keyup(function (e) {

        if(focusOnMap()) {
            r('UP', e.which);

            var i = $.inArray(e.which, keys);


            if (i != -1) {
                keys.splice(i, 1);

            }
        }

    });


    setInterval(
        function () {

            if(window_opened)return;

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


            //r(keys_);

            if ($.inArray('up', keys_) != -1) {
                Map.mapMove(0,30);
                moving=true;
            }


            if ($.inArray('down', keys_) != -1) {
                Map.mapMove(0,-30);
                moving=true;
            }

            if ($.inArray('left', keys_) != -1) {
                Map.mapMove(30,0);
                moving=true;
            }


            if ($.inArray('right', keys_) != -1) {
                Map.mapMove(-30,0);
                moving=true;
            }


            if(moving===true)
                if ($.inArray('up', keys_) == -1)
                    if ($.inArray('down', keys_) == -1)
                        if ($.inArray('left', keys_) == -1)
                            if ($.inArray('right', keys_) == -1){
                                moving=false;
                                //alert('stop moving by keys');
                                Map.updateMap();
                            }






        },
        100
    );

});