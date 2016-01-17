/**
 * @author ©Towns.cz
 * @fileOverview Load objects prototypes
 * todo load from API
 */
//======================================================================================================================




var loadObjectPrototypes=function(callback=false){


    townsAPI.get('objects/prototypes',{},function(response){

        //r('LOADED prototypes');

        object_prototypes=[];

        response.forEach(function(object){

            var object_prototype=deepCopyObject(object);
            object_prototype.prototypeId=object_prototype._id;
            object_prototype.id=object_prototype._id;


            object_prototypes.push(object_prototype);//todo refactor init object or new object

        });


        if(callback!=false){
            callback();
        }

    });



};



loadObjectPrototypes();