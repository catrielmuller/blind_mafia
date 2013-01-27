ig.module(
    'game.levels.menu'
)
.requires(
    'impact.impact',
    'game.entities.button'    
)
.defines(function(){ "use strict";

ig.LevelMenu = ig.Class.extend({

    font: new ig.Font( 'media/comic_sans_30_red.png' ),

	ready: function(){
		


        ig.game.spawnEntity( EntityFullImg, 0, 0, { 
            zindex: 0,
            img: 'media/menu.png'
        });

		var start = {
			img: 'media/buttonstart.png',
            width: 207,
            height: 47,
            over: false,
            click: function(){
                ig.music.stop();
            	ig.game.levels_manager.load('story');
            }            
		}

		ig.game.spawnEntity( EntityButton, 646, 403, start);
        ig.music.play("main_menu");

	},

    update: function() {
    	//console.log('update');
    },

    draw: function() {
    	//console.log('draw');
    },
    
});


});