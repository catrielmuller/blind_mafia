ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    
    'game.entities.shooteable'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
		// Initialize your game here; bind keys etc.
        var png = "";
        for( var y = 0; y < 4; y++ ) { 
            if (y%2 == 0){
                png = "red_square.png";
            }
            else{
                png = "blue_square.png";
            }
            ig.game.spawnEntity( EntityShooteable, 100*y, 100*y, {png:png} );
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
ig.main( '#canvas', MyGame, 60, 853, 480, 1 );

});
