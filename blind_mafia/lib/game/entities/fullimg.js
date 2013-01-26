ig.module(
    'game.entities.fullimg'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityFullImg = ig.Entity.extend({
        /* animSheet: new ig.AnimationSheet( 'media/tiles.png', 32, 32 ),*/
        size: {x: 853, y: 480},

        update: function() {
            this.parent();
        },
        
        init: function( x, y, settings ) {

            var img = settings.img;
            var zindex = settings.zindex;

            this.zIndex = zindex;
            
            this.animSheet = new ig.AnimationSheet(img, 853, 480);

            this.parent( x, y, settings );

            this.addAnim( 'idle', 1, [0] );
            this.currentAnim = this.anims.idle;
        }
    });

});