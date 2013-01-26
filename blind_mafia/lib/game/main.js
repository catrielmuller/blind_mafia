ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    
    //'impact.debug.debug',
    
    'game.levels.manager',
    
    'game.levels.menu',
    'game.levels.level1'
    //'game.levels.level2'
    //'game.levels.gameover'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),

    levels_manager: new ig.LevelsManager(),
	
	init: function() {
		// Initialize your game here; bind keys etc.

		this.levels_manager.append('menu', ig.LevelMenu);
        this.levels_manager.append('level1', ig.Level1);
//         this.levels_manager.append('level2', Level2);
//         this.levels_manager.append('gameover', GameOver);
        
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
ig.main( '#canvas', MyGame, 60, 1706, 960, 0.5);

});
