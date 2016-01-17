/**
 * @author ©Towns.cz
 * @fileOverview Block editor
 */
//======================================================================================================================


Pages.block_editor={};

Pages.block_editor.header='Stavební bloky';

Pages.block_editor.content= `

<form onsubmit="return false;" id="block-editing-form">



<div class="page-column-2">


    <canvas id="block-editing" width="300" height="300"></canvas>


    <button onclick="Pages.block_editor.deleteBlock();">{{block delete}}</button>
    <button onclick="Pages.block_editor.duplicateBlock();">{{block duplicate}}</button>

</div>




<table  class="page-column-2">


  <tr><th colspan="2"><input id="block-editing-name" type="text" placeholder="{{block name placeholder}}" /></th></tr>


  <tr><th colspan="2">{{block shape}}</th></tr>
  <tr>
    <td>{{block shape n}}:</td>
    <td><input id="block-editing-shape-n" type="range" min="3" max="20" step="1" /></td>
  </tr>
  <tr>
    <td>{{block shape top}}:</td>
    <td><input id="block-editing-shape-top" type="range" min="0" max="2" step="0.05" /></td>
  </tr>
  <tr>
    <td>{{block shape bottom}}:</td>
    <td><input id="block-editing-shape-bottom" type="range" min="0" max="2" step="0.05" /></td>
  </tr>




  <tr><th colspan="2">{{block skew}}</th></tr>
  <tr>
    <td>{{block skew z x}}:</td>
    <td><input id="block-editing-skew-z-x" type="range" min="-5" max="5" step="0.05" /></td>
  </tr>
  <tr>
    <td>{{block skew z y}}:</td>
    <td><input id="block-editing-skew-z-y" type="range" min="-5" max="5" step="0.05" /></td>
  </tr>




  <tr><th colspan="2">{{block size}}</th></tr>
  <tr>
    <td>{{block size x}}:</td>
    <td><input id="block-editing-size-x" type="range" min="1" max="100" step="1" /></td>
  </tr>
  <tr>
    <td>{{block size y}}:</td>
    <td><input id="block-editing-size-y" type="range" min="1" max="100" step="1" /></td>
  </tr>
  <tr>
    <td>{{block size z}}:</td>
    <td><input id="block-editing-size-z" type="range" min="1" max="100" step="1" /></td>
  </tr>




  <tr><th colspan="2">{{block rotation}}</th></tr>
  <tr>
    <td>{{block rotation xy}}:</td>
    <td><input id="block-editing-rotation-xy" type="range" min="0" max="360" step="10" /></td>
  </tr>
    <tr>
    <td>{{block rotation xz}}:</td>
    <td><input id="block-editing-rotation-xz" type="range" min="0" max="90" step="10" /></td>
  </tr>





</table>



</form>


`;

//======================================================================================================================


Pages.block_editor.openJS = function(){

    //r('Opening block editor');
    //---------------------------------------------

    Pages.block_editor.rotation = 0 ;
    Pages.block_editor.slope = map_slope ;

    //---------------------------------------------

    if(building!==false){

        Pages.block_editor.block_id=building.id;

    }else {

        var tmp_id=generateID();
        object_prototypes.push({

            id: tmp_id,
            name: "",
            type: "building",
            subtype: "block",
            design: {
                type: "model",
                data: new Model({
                    particles: [
                        {
                            shape:{
                                type: 'prism',
                                n:4,
                            },
                            color: "#cccccc",
                            position: {x:0,y:0,z:0},
                            size: {x:40,y:40,z:40},
                            rotation: {"xy":0}

                        }
                    ]
                })

            }
        });


        Pages.block_editor.block_id=tmp_id;
    }

    //---------------------------------------------

    objectPrototypesMenu('building','block');

    //---------------------------------------------

    var i=ArrayFunctions.id2i(object_prototypes,Pages.block_editor.block_id);


    buildingStart(Pages.block_editor.block_id);


    $('#block-editing-name').val(object_prototypes[i].name);

    (function(particle){


        particle=ModelParticles.cParams(particle);

        $('#block-editing-shape-n').val(particle.shape.n);

        $('#block-editing-shape-top').val(particle.shape.top);
        $('#block-editing-shape-bottom').val(particle.shape.bottom);

        $('#block-editing-skew-z-x').val(particle.skew.z.x);
        $('#block-editing-skew-z-y').val(particle.skew.z.y);

        $('#block-editing-size-x').val(particle.size.x);
        $('#block-editing-size-y').val(particle.size.y);
        $('#block-editing-size-z').val(particle.size.z);

        $('#block-editing-rotation-xy').val(particle.rotation.xy);
        $('#block-editing-rotation-xz').val(particle.rotation.xz);
        //('#block-editing-rotation-yz').val(particle.rotation.yz);


    })(object_prototypes[i].design.data.particles[0]);




    Pages.block_editor.block_editing = document.getElementById('block-editing');
    Pages.block_editor.block_editing_ctx = Pages.block_editor.block_editing.getContext('2d');


    $('#block-editing-form').find('input').mousemove(function(){
        Pages.block_editor.update();
    });


    /*$('#block-editing-form').find('input').click(function(){
        setTimeout(function(){
            r('objectMenuBuildingsPrototypes');
            objectMenuBuildingsPrototypes('block');
        },IMMEDIATELY_MS);
    }());*/


    Pages.block_editor.update();


};
//======================================================================================================================


Pages.block_editor.closeJS = function(){

    townsAPI.post('objects/prototypes',ArrayFunctions.id2item(object_prototypes,Pages.block_editor.block_id),function(){

        loadObjectPrototypes(function(){

            objectPrototypesMenu('building','block');

        });

    });


}

//======================================================================================================================



Pages.block_editor.update = function () {

    var i=ArrayFunctions.id2i(object_prototypes,Pages.block_editor.block_id);


    object_prototypes[i].name=$('#block-editing-name').val();

    [object_prototypes[i].design.data.particles[0],building.design.data.particles[0]].forEach(function(particle){


            particle.shape.n = Math.toInt($('#block-editing-shape-n').val());

            particle.shape.top = Math.toFloat($('#block-editing-shape-top').val());
            particle.shape.bottom = Math.toFloat($('#block-editing-shape-bottom').val());

            particle.skew={z:{}};
            particle.skew.z.x = Math.toFloat($('#block-editing-skew-z-x').val());
            particle.skew.z.y = Math.toFloat($('#block-editing-skew-z-y').val());


            particle.size.x = Math.toInt($('#block-editing-size-x').val());
            particle.size.y = Math.toInt($('#block-editing-size-y').val());
            particle.size.z = Math.toInt($('#block-editing-size-z').val());

            particle.rotation.xy = Math.toInt($('#block-editing-rotation-xy').val());
            particle.rotation.xz = Math.toInt($('#block-editing-rotation-xz').val());
            //particle.rotation.yz = Math.toInt($('#block-editing-rotation-yz').val());


        });






    Pages.block_editor.block_editing_ctx.clearRect ( 0 , 0 ,300 , 300 );
    object_prototypes[i].design.data.draw(Pages.block_editor.block_editing_ctx,1,150,150,Pages.block_editor.rotation,Pages.block_editor.slope);


};


//======================================================================================================================


Pages.block_editor.deleteBlock = function () {


    if(confirm(Locale.get('block delete confirm'))){

        var i=ArrayFunctions.id2i(object_prototypes,Pages.block_editor.block_id);//todo maybe create function deleteID

        //ArrayFunctions.removeItems(object_prototypes,i,1); //todo
        object_prototypes.splice(i,1);


        window_close();



    }

};

//===================================================================


Pages.block_editor.duplicateBlock = function () {

    var i=ArrayFunctions.id2i(object_prototypes,Pages.block_editor.block_id);


    var tmp_block = deepCopyObject(object_prototypes[i]);
    tmp_block.id=generateID();

    object_prototypes.push(tmp_block);

    building={id:tmp_block.id};//todo ?? better
    window_open('block_editor');

};