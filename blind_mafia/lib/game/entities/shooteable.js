ig.module(
    'game.entities.shooteable'
)
.requires(
    'impact.entity'
    /*'plugins.entityMouseSensitive',
    'plugins.events'*/
)
.defines(function(){

EntityShooteable = ig.Entity.extend({
    
    animSheet: new ig.AnimationSheet( 'media/tiles.png', 32, 32 ),
    size: {x:32, y:32},
    collides: ig.Entity.COLLIDES.FIXED,
    png: '',
    png_alt: '',
    correct: false,
    
    /* isMouseSensitive: true, */

    update: function() {
        this.parent();
    },
    
    init: function( x, y, settings ) {
        this.parent( x, y, settings );

        if (settings.png == 0){
            this.png = 'red';
            this.png_alt = 'blue';
        }
        else{
            this.png_alt = 'red';
            this.png = 'blue';
        }
        
        this.addAnim( 'red', 1, [0] );
        this.addAnim( 'blue', 1, [1] );

        this.correct = settings.correct;

        this.currentAnim = this.anims[this.png];

        /* 
        this.addListener("onMouseOver", this.altImg, this);
        this.addListener("onMouseOut", this.orgImg, this);
        this.addListener("onClick", this.shoot, this); */
    },

    orgImg: function($this){
        $this.currentAnim = $this.anims[$this.png];
    },
    altImg: function($this){
        $this.currentAnim = $this.anims[$this.png_alt];
    },
    shoot: function($this){

        if($this.correct){
            console.log('BOOM!');
        }
        else {
            console.log('FAIL!');
        }
        
    },
    
});

});