ig.module(
    'game.entities.shooteable'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityShooteable = ig.Entity.extend({
    
    size: {x:64, y:64},
    collides: ig.Entity.COLLIDES.FIXED,
    
    update: function() {
        
        if( ig.input.state('up') ) {
            this.vel.y = -100;
        }
        else if( ig.input.state('down') ) {
            this.vel.y = 100;
        }
        else {
            this.vel.y = 0
        }
        
        this.parent();
    },
    
    init: function( x, y, settings ) {
        this.parent( x, y, settings );
        
        this.animSheet = new ig.AnimationSheet( 'media/'+settings.png, 64, 64 ),

        this.addAnim( 'idle', 1, [0] );
        
        this.png = settings.png;
    }
    
});

});