ig.module(
    'game.levels.level1'
)
.requires(
    'game.levels.level',
    'game.entities.shooteable'
)
.defines(function(){ "use strict";

ig.Level1 = ig.BaseLevel.extend({

    difficulty: 5,
    
    background_img: 'media/level1bg.png',
    
    img_on_top: 'media/level1over.png',
    
    zones_coord: {       
        // coordenada izquierda de la zona disparable
        left: 72,
        // coordenada superior de la zona disparable
        top: 1,
        // coordenada inferior de la zona disparable
        bottom: 382,
        // coordenada derecha de la zona disparable
        right: 792
    },
    
    zone_size: {
        x: 143, 
        y: 78
    },
    
    zone_margin: {       
        // Margen izquierdo
        left: 1,
        // Margen superior
        top: 9,
        // Margen inferior
        bottom: 9,
        // Margen derecho
        right: 0
    },

	ready: function(){
        this.parent();
	},

    update: function() {
    	//console.log('update');
    },

    draw: function() {
    	//console.log('draw');
    },

});


});