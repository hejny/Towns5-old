/**
 * @author Towns.cz
 * @fileOverview  Right click on map - create path destination of selected building
 */
//======================================================================================================================

$(function(){

    var mouseRightClick = function(e) {
        e.preventDefault();


        var map_click_x=(e.clientX-(window_width/2));
        var map_click_y=(e.clientY-(window_height/2));
        var mapPos=Map.mouseCenterPos2MapPos(map_click_x,map_click_y);

        r('right click on map',mapPos);


        map_selected_ids.forEach(function(id){

            var i=ArrayFunctions.id2i(objects_external,id);

            if(Path.is(objects_external[i].path)){
                var position=objects_external[i].path.recount();
            }else{
                var position=new Position(objects_external[i].x,objects_external[i].y);
            }


            objects_external[i].x=position.x;
            objects_external[i].y=position.y;


            try {

                objects_external[i].path=new Path(position,mapPos,6,map_collision_data,new Position(Math.round(map_x-(map_size/2)), Math.round(map_y-(map_size/2))));

            }catch(error) {

                message(error,'error');

            }




        });


        orderMoveAndNormal();



    };





    $('#map_drag').bind("contextmenu",mouseRightClick);
    $('#selecting-distance').bind("contextmenu",mouseRightClick);

});