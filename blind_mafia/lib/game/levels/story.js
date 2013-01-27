ig.module(
    'game.levels.story'
)
.requires(
    'impact.impact',
    'game.entities.button'    
)
.defines(function(){ "use strict";

ig.LevelStory = ig.Class.extend({

    font: new ig.Font( 'media/comic_sans_30_red.png' ),

	ready: function(){

        ig.music.play("briefing");

        this.hist = new ig.Timer();
        this.hist.set(0);

        this.hist1 = {
            img: 'media/hist1.png',
            width: 475,
            height: 211,
            set: false,
            click: function(){
            }            
        }
        this.hist2 = {
            img: 'media/hist2.png',
            width: 288,
            height: 211,
            set: false,
            click: function(){
            }            
        } 
        this.hist3 = {
            img: 'media/hist3.png',
            width: 288,
            height: 211,
            set: false,
            click: function(){
            }            
        } 
        this.hist4 = {
            img: 'media/hist4.png',
            width: 475,
            height: 211,
            set: false,
            click: function(){
            }            
        } 


		this.start = false;

	},

    update: function() {


        if(this.hist.delta() >= 2 && this.hist1.set == false){
            ig.game.spawnEntity( EntityButton, 32, 19, this.hist1);
            this.hist1.set = true;
        }

        if(this.hist.delta() >= 4 && this.hist2.set == false){
            ig.game.spawnEntity( EntityButton, 531, 19, this.hist2);
            this.hist2.set = true;
        }

        if(this.hist.delta() >= 6 && this.hist3.set == false){
            ig.game.spawnEntity( EntityButton, 32, 252, this.hist3);
            this.hist3.set = true;
        }

        if(this.hist.delta() >= 8 && this.hist4.set == false){
            ig.game.spawnEntity( EntityButton, 344, 252, this.hist4);
            this.hist4.set = true;
        }

        if(this.hist.delta() >= 12 && this.start == false){
//             ig.music.stop();
            ig.game.levels_manager.load('briefing');
            this.start == true;
        }

        //ig.game.spawnEntity( EntityButton, 100, 100, start);

    },

    draw: function() {
    	//console.log('draw');
    },
    
});


});