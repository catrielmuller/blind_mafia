ig.module(
    'game.entities.crosshair'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityCrosshair = ig.Entity.extend({
    size: {x: 1706, y: 960},
    
    animSheet: new ig.AnimationSheet( 'media/crosshair.png', 1706, 960 ),
    
    zIndex: 150,
    
    update: function() {
        this.parent();
        var mouseX = ig.input.mouse.x + ig.game.screen.x;
        var mouseY = ig.input.mouse.y + ig.game.screen.y;
        this.pos.x = mouseX - this.size.x/2;
        this.pos.y = mouseY - this.size.y/2;
    },
    
    init: function( x, y, settings ) {

        this.parent( x, y, settings );

        this.addAnim( 'idle', 1, [0] );
        this.currentAnim = this.anims.idle;
    }
});

});