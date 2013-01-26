ig.module(
    'game.levels.menu'
)
.requires(
    'impact.impact',
    'game.entities.button'
)
.defines(function(){ "use strict";

ig.LevelMenu = ig.Class.extend({
    
	ready: function(){
		
		// var png = "";
		// for( var y = 0; y < 15; y++ ) {
		// 	png = y%2;
		// 	ig.game.spawnEntity( EntityShooteable, 8*y, 8*y, {png:png} );
		// }

		var start = {
			img: 'media/button.png',
            width: 64,
            height: 64,
            click: function(){
            	ig.game.levels_manager.load('level1');
            }            
		}

		ig.game.spawnEntity( EntityButton, 100, 100, start);


	},

    update: function() {
    	//console.log('update');
    },

    draw: function() {
    	//console.log('draw');
    },
    
});


});