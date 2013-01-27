ig.module(
    'game.entities.button'
)
.requires(
    'impact.entity',
    'plugins.entityMouseSensitive',
    'plugins.events'
)
.defines(function(){

EntityButton = ig.Entity.extend({
        /* animSheet: new ig.AnimationSheet( 'media/tiles.png', 32, 32 ),*/
        isMouseSensitive: true,
        size: {x:64, y:64},
        zIndex: 200,
        collides: ig.Entity.COLLIDES.FIXED,
        click_event: function(){},

        update: function() {
            this.parent();
        },
        
        init: function( x, y, settings ) {

            //this.animSheet = new ig.AnimationSheet( img, width, height );

            var img = settings.img;
            var width = settings.width;
            var height = settings.height;
            this.animSheet = new ig.AnimationSheet( img, width, height );

            this.parent( x, y, settings );

            this.click_event = settings.click;
            this.addAnim( 'idle', 1, [0] );
            this.addAnim( 'over', 1, [1] );
            this.addAnim( 'disable', 1, [2] );
            this.currentAnim = this.anims.idle;

            this.addListener("onMouseOver", this.over, this);
            this.addListener("onMouseOut", this.idle, this);
            this.addListener("onClick", this.click, this);
        },

        over: function($this){
            $this.currentAnim = $this.anims.over;
        },
        idle: function($this){
            $this.currentAnim = $this.anims.idle;
        },
        click: function($this){
            $this.click_event;
        },
        
    });

});