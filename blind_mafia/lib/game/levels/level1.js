ig.module(
    'game.levels.level1'
)
.requires(
    'game.levels.level',
    'game.entities.shooteable',
    'game.entities.crosshair'
)
.defines(function(){ "use strict";

ig.Level1 = ig.BaseLevel.extend({

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
        x: 144, 
        y: 96
    },
    
    zone_margin: {       
        // Margen izquierdo
        left: 0,
        // Margen superior
        top: 0,
        // Margen inferior
        bottom: 0,
        // Margen derecho
        right: 0
    },

	ready: function(){
        this.parent();
        ig.game.spawnEntity( EntityCrosshair, 0, 0, {});
	},

    update: function() {
    	//console.log('update');
    },

    draw: function() {
    	//console.log('draw');
    },

});


});