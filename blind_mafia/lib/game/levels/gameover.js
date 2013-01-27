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

        ig.game.spawnEntity( EntityFullImg, 0, 0, { 
            zindex: 0,
            img: 'media/dead.png'
        });
		
		var start = {
			img: 'media/buttonrestart.png',
            width: 207,
            height: 47,
            over: false,
            custom_click: function(){
                ig.music.stop();
            	ig.game.levels_manager.load('menu');
            }            
		}

        ig.game.player.level = 1;
        ig.game.player.level = 1;
        ig.game.player.difficult = 3;
        ig.game.player.sounds_avaible = '';
        ig.game.player.sounds_selected = [];
        ig.game.player.money = 2000;
        ig.game.player.bullets = 10;
        ig.game.player.level_fails = 0;
        ig.game.player.level_win = 0;
        ig.game.player.target_left = 0;
        ig.game.player.items = [];

        ig.game.spawnEntity( EntityButton, 646, 403, start);
        //ig.music.play("main_menu");

	},

    update: function() {
    	//console.log('update');
    },

    draw: function() {
    	//console.log('draw');
        //this.font.draw("THE BOSS KILLS YOU!!!!", 200, 10, ig.Font.ALIGN.CENTER );
    },
    
});


});