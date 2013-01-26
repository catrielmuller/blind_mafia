ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    'impact.debug.debug',
    'game.entities.shooteable'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
		// Initialize your game here; bind keys etc.




        var png = "";
        for( var y = 0; y < 15; y++ ) {
        	png = y%2;
            ig.game.spawnEntity( EntityShooteable, 8*y, 8*y, {png:png} );
        }
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
		this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
	}
});


// Start the Game with 60fps, a resolution of 853x480, scaled
// up by a factor of 1
ig.main( '#canvas', MyGame, 60, 1706, 960, 0.5);

});
