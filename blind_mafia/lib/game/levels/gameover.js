ig.module(
    'game.levels.gameover'
)
.requires(
    'impact.impact',
    'game.entities.button'    
)
.defines(function(){ "use strict";

ig.LevelGameOver = ig.Class.extend({

    font: new ig.Font( 'media/comic_sans_30_red.png' ),

	ready: function(){
		
		var start = {
			img: 'media/button.png',
            width: 64,
            height: 64,
            custom_click: function(){
                ig.music.stop();
            	ig.game.levels_manager.load('menu');
            }            
		}

		ig.game.spawnEntity( EntityButton, 100, 100, start);
        //ig.music.play("main_menu");

	},

    update: function() {
    	//console.log('update');
    },

    draw: function() {
    	//console.log('draw');
        this.font.draw("THE BOSS KILLS YOU!!!!", 200, 10, ig.Font.ALIGN.CENTER );
    },
    
});


});