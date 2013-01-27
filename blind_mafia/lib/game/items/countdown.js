ig.module(
    'game.items.countdown'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityCountdownItem = ig.Entity.extend({
    size: {x: 64, y: 64},
    
    animSheet: new ig.AnimationSheet( 'media/items/countdown.png', 64, 64),
    
    zIndex: 140,
    
    update: function() {
        this.parent();
    },
    
    init: function( x, y, settings ) {

        this.parent( x, y, settings );

        this.addAnim( 'idle', 1, [0] );
        this.currentAnim = this.anims.idle;
    }
    
    use: function() {
        // Add more time to the countdown timer.
    },
    
});

});