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
		
		var start = {
			img: 'media/button.png',
            width: 64,
            height: 64,
            click: function(){
            	ig.game.levels_manager.load('briefing');
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