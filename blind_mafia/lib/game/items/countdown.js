ig.module(
    'game.items.countdown'
)
.requires(
    'impact.entity',
    'plugins.entityMouseSensitive',
    'plugins.events'
)
.defines(function(){

EntityCountdownItem = ig.Entity.extend({
    size: {x: 64, y: 64},
    
    animSheet: new ig.AnimationSheet( 'media/items/countdown.png', 64, 64),
    
    zIndex: 140,
    isMouseSensitive: true,
    
    update: function() {
        this.parent();
    },
    
    init: function( x, y, settings ) {

        this.parent( x, y, settings );

        this.addAnim( 'idle', 1, [0] );
        this.currentAnim = this.anims.idle;
        this.mode = settings.mode;
        this.addListener( "onClick", this.onClick, this );
    },

    onClick: function($this){
        if ($this.mode == 'use'){
            $this.use();
            ig.game.itemviewer.remove_current();
        }
    },
    
    use: function() {
        // Add more time to the countdown timer.
        var remaining = Math.floor(ig.game.timer.delta())*(-1);
        remaining += 15;
        ig.game.timer.set( remaining );
    },
    
});

});