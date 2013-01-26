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
    animSheet: new ig.AnimationSheet( 'media/guy_01.png', 144, 96 ),
    isMouseSensitive: true,
    size: {x:144, y: 96},
    zIndex: 50,
    correct: false,
    sound: '',
    
    /* isMouseSensitive: true, */

    update: function() {
        this.parent();
    },
    
    init: function( x, y, settings ) {
        this.parent( x, y, settings );

        var walking = [];
        for (var i=0;i<30;i++){
            walking.push(i);
        }
        var dying = [];
        for (var i=30;i<38;i++){
            dying.push(i);
        }
        this.addAnim( 'walking', 0.08, walking );
        this.addAnim( 'dying', 0.05, dying, true );
//         this.addAnim( 'dead', 0.1, [37] );

        this.correct = settings.correct;
        this.sound = settings.audio;

        this.currentAnim = this.anims['walking'];

        
        this.addListener( "onMouseOver", this.onMouseOver, this );
        this.addListener( "onMouseOut", this.onMouseOut, this );
        this.addListener( "onClick", this.onClick, this );
        
        this.heart = new ig.Sound( 'media/sounds/latido_'+settings.audio+'.ogg', true );
    },

    onMouseOut: function($this){
//         $this.currentAnim = $this.anims[$this.png];
        $this.heart.stop();
    },
    onMouseOver: function($this){

        //console.log('Estas escuchando el sonido: ' + $this.sound);
        
//         $this.currentAnim = $this.anims[$this.png_alt];
        $this.heart.play();
    },
    onClick: function($this){
        $this.currentAnim = $this.anims.dying.rewind();
        if($this.correct){
            console.log('BOOM!');
        }
        else {
            console.log('FAIL!');
        }
        
    },
    
});

});