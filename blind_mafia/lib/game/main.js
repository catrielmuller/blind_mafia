ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    
    'impact.debug.debug',
    
    'game.levels.manager',
    
    'game.items.countdown',
    'game.items.heartsensor',
    
    'game.levels.menu',
    'game.levels.story',
    'game.levels.briefing',
    'game.levels.level1',
    'game.levels.endlevel',
    'game.levels.gameover'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),

    levels_manager: new ig.LevelsManager(),

    player: {
    	level: 2,
    	difficult: 3,
    	sounds_avaible: '',
    	sounds_selected: [],
    	money: 2000,
    	bullets: 10,
    	level_fails: 0,
    	level_win: 0,
    	target_left: 0,
    	items: [],
    	buy: function(item){

    		if(item == 'bullets'){
	            var price = 500;
	            var cant = 10;

	            if(ig.game.player.money >= price){
	                ig.game.player.bullets += cant;
	                ig.game.player.money -= price;
	            }
	        }

	        if(item == 'extra_time'){
	            var price = 500;

	            if(ig.game.player.money >= price){
	            	ig.game.player.items.push(EntityCountdownItem);
	                ig.game.player.money -= price;
	            }
	        }

	        if(item == 'heartsensor'){
	            var price = 500;

	            if(ig.game.player.money >= price){
	            	ig.game.player.items.push(EntityHeartsensorItem);
	                ig.game.player.money -= price;
	            }
	        }

    	}
    },
	
	init: function() {
		// Initialize your game here; bind keys etc.
        ig.music.loop = true;
        ig.music.add( 'media/music/Main Titles (Fade).ogg', "main_menu" );
        ig.music.add( 'media/music/Briefing.ogg', "briefing" );


		this.levels_manager.append('menu', ig.LevelMenu);
		this.levels_manager.append('story', ig.LevelStory);
		this.levels_manager.append('briefing', ig.LevelBriefing);
        this.levels_manager.append('level1', ig.Level1); 
        this.levels_manager.append('endlevel', ig.LevelEnding);       
        this.levels_manager.append('gameover', ig.LevelGameOver);
        
        this.levels_manager.load('menu');
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
        this.levels_manager.current.update();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		this.levels_manager.current.draw();
		
		// Add your own drawing code here
// 		var x = ig.system.width/2,
// 			y = ig.system.height/2;
// 		
// 		this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
	}
});


// Start the Game with 60fps, a resolution of 853x480, scaled
// up by a factor of 1
ig.main( '#canvas', MyGame, 60, 853, 480, 1);

});
