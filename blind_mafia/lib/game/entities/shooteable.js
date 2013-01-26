ig.module(
    'game.entities.shooteable'
)
.requires(
    'impact.entity',
    'impact.sound',
    'plugins.entityMouseSensitive',
    'plugins.events'
)
.defines(function(){

EntityShooteable = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/shooteable.png', 143, 78 ),
    isMouseSensitive: true,
    size: {x:143, y: 78},
    zIndex: 50,
    png: '',
    png_alt: '',
    correct: false,
    sound: '',
    
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
        this.sound = settings.audio;

        this.currentAnim = this.anims[this.png];

        this.addListener("onMouseOver", this.altImg, this);
        this.addListener("onMouseOut", this.orgImg, this);
        this.addListener("onClick", this.shoot, this);
        
        this.heart = new ig.Sound( 'media/sounds/latido_'+settings.audio+'.ogg', true );
    },

    orgImg: function($this){
        $this.currentAnim = $this.anims[$this.png];
        $this.heart.stop();
    },
    altImg: function($this){

        //console.log('Estas escuchando el sonido: ' + $this.sound);
        
        $this.currentAnim = $this.anims[$this.png_alt];
        $this.heart.play();
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