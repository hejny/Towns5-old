/**
 * @author ©Towns.cz
 * @fileOverview Left tool menu shown when user select building.
 */
//======================================================================================================================


function objectMenu(){
    r('objectMenu');


    $('#objectmenu').stop(true,true);

    if(map_selected_ids.length>0){

        //--------------------------------------------------

        var id=map_selected_ids[0];

        var i=ArrayFunctions.id2i(map_data,id);


        var objectmenu='';

        var icon,content;


        objectmenu+=Templates.objectMenu({
            icon: 'media/image/icons/dismantle.svg',
            icon_size: 0.8,
            title: Locale.get('dismantle building'),
            content: Locale.get('dismantle building description'),
            action: 'dismantleUI(\''+id+'\');'
        });

        objectmenu+=Templates.objectMenu({
            icon: 'media/image/icons/define_building_main.svg.svg',
            icon_size: 0.8,
            title: Locale.get('define prototype building main'),
            content: Locale.get('define prototype building main description'),
            action: 'definePrototypeUI(map_data[ArrayFunctions.id2i(map_data,'+id+')]);'
        });

        objectmenu+=Templates.objectMenu({
            icon: 'media/image/icons/define_building_wall.svg',
            icon_size: 0.8,
            title: Locale.get('define prototype building wall'),
            content: Locale.get('define prototype building wall description'),
            action: 'definePrototypeUI(map_data[ArrayFunctions.id2i(map_data,'+id+')],\'wall\');'
        });


        objectmenu+=Templates.objectMenu({
            icon: 'media/image/icons/source.svg',
            icon_size: 0.8,
            title: Locale.get('object json'),
            content: Locale.get('object json description'),
            action: 'window_open(\'object_json\')'
        });





        showLeftMenu(objectmenu);

    }else{

        hideLeftMenu();

    }



}