ig.module(
    'game.levels.level1'
)
.requires(
    'impact.impact',
    'game.entities.shooteable'

)
.defines(function(){ "use strict";

ig.Level1 = ig.Class.extend({
    
	ready: function(){
		
		// var png = "";
		// for( var y = 0; y < 15; y++ ) {
		// 	png = y%2;
		// 	ig.game.spawnEntity( EntityShooteable, 8*y, 8*y, {png:png} );
		// }


		ig.game.spawnEntity( EntityShooteable, 100, 50, { 
			png: 1,
			correct: true
		});

		ig.game.spawnEntity( EntityShooteable, 200, 50, { 
			png: 0,
			correct: false
		});

		ig.game.spawnEntity( EntityShooteable, 300, 50, { 
			png: 0,
			correct: false
		});
		

	},

    update: function() {
    	//console.log('update');
    },

    draw: function() {
    	//console.log('draw');
    },
    
});


});