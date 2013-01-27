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
    
    isMouseSensitive: true,
    size: {x:144, y: 96},
    zIndex: 50,
    correct: false,
    sound: '',
    state: "alive",
    guys: [{
        url: 'media/guy_01.png',
        end_walking: 30,
        end_dying: 38
    },{
        url: 'media/guy_02.png',
        end_walking: 12,
        end_dying: 30
    }],
    
    /* isMouseSensitive: true, */

    update: function() {
        this.parent();
        // XXX: Something happens with the onMouseOut event...
        if (!this.mouseover){
            this.heart.stop();
        }
    },
    
    init: function( x, y, settings ) {

        var select_guy = this.guys[Math.floor(Math.random()*this.guys.length)];

        this.animSheet = new ig.AnimationSheet( select_guy.url , 144, 96 );

        this.parent( x, y, settings );
        
        var walking = [];
        for (var i=0;i<select_guy.end_walking;i++){
            walking.push(i);
        }
        
        // Let's randomly rearrange the array so every entity starts in a
        // different position.
        var rand = Math.floor(Math.random()*walking.length);
        var walking_spliced = walking.splice(rand);
        var walking_action = walking_spliced.concat(walking);
        
        var dying = [];
        for (var i=select_guy.end_walking;i<select_guy.end_dying;i++){
            dying.push(i);
        }

        this.addAnim( 'walking', 0.08, walking_action );
        this.addAnim( 'dying', 0.05, dying, true );
//         this.addAnim( 'dead', 0.1, [37] );

        this.correct = settings.correct;
        this.sound = settings.audio;

        this.currentAnim = this.anims['walking'];

        this.addListener( "onMouseOver", this.onMouseOver, this );
        this.addListener( "onMouseOut", this.onMouseOut, this );
        this.addListener( "onClick", this.onClick, this );
        
        this.heart = new ig.Sound( 'media/sounds/latido_'+settings.audio+'.ogg', true );
        this.shoot = new ig.Sound( 'media/sounds/shoot.ogg', false );
        this.shoot_empty = new ig.Sound( 'media/sounds/shoot_empty.ogg', false );
    },

    onMouseOut: function($this){
//         $this.currentAnim = $this.anims[$this.png];
        $this.heart.stop();
        // XXX: Be *REALLY* sure that we are stopping the sound
        $this.mouseover = false;
    },
    onMouseOver: function($this){

        //console.log('Estas escuchando el sonido: ' + $this.sound);
        
//         $this.currentAnim = $this.anims[$this.png_alt];
        if($this.state == "alive"){
            $this.heart.play();
            $this.mouseover = true;
        }
    },
    onClick: function($this){
        $this.heart.stop();
        
        if(ig.game.player.bullets > 0){
            ig.game.player.bullets -= 1;
            $this.shoot.play();
        }
        else {
            $this.shoot_empty.play();         
        }

        //console.log(ig.game.player.bullets);
        
        if($this.state == "alive" && ig.game.player.bullets > 0){

            $this.currentAnim = $this.anims.dying.rewind();
            
            $this.state = "dead";
            if($this.correct){
                
                ig.game.player.level_win += 1;
                console.log('BOOM!');

            }
            else {

                ig.game.player.level_fails += 1;
                console.log('FAIL!');
            }
        }
        else{
            if (ig.game.player.bullets == 0){
                console.log("NO MORE BULLETS!!");
            }
            if($this.state == "dead"){
                console.log("Already dead :(");
            }
        }
    },
    
    kill: function(){
        $this.heart.stop();
        this.parent();
    }
    
});

});