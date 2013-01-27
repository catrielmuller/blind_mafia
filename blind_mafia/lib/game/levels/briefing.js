ig.module(
    'game.levels.briefing'
)
.requires(
    'impact.impact',
    'game.entities.button'    
)
.defines(function(){ "use strict";

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

ig.LevelBriefing = ig.Class.extend({

    font: new ig.Font( 'media/comic_sans_30_red.png' ),
    text_font: new ig.Font( 'media/comic_sans_16_red.png' ),

    ready: function(){

        console.log("You're on Level " + ig.game.player.level);

        this.newlevel();

        var start = {
            img: 'media/buttonletsgo.png',
            width: 207,
            height: 47,
            over: false,
            custom_click: function(){
//                 ig.game.player.heart.stop();
                ig.music.stop();
                ig.game.levels_manager.load('level1');                

            }            
        }

        ig.game.spawnEntity( EntityButton, 100, 420, start);

        var victim_sound, selected;
        
        for (var index=0; index < ig.game.player.sounds_selected.length; index++){
            selected = ig.game.player.sounds_selected[index];
            console.log("Cassete: "+selected);
            
            victim_sound = {
            img: 'media/cassette2.png',
            width: 122,
            height: 80,
            over: false,
            sound: new ig.Sound( 'media/sounds/latido_'+selected+'.ogg', false ),
            custom_click: function(){}
            }

            ig.game.spawnEntity( EntityButton, ig.system.width/2 + 250, ((index)*80), victim_sound);

        }
        
        ig.music.fadeOut(10);
        
    },

    update: function() {
        //console.log('update');
    },

    draw: function() {
        //console.log('draw');
        this.font.draw("BRIEFING", 200, 10, ig.Font.ALIGN.CENTER );
        
        this.text_font.draw("Welcome Mr. B*nd, your mission for today is to kill", 10, 70, ig.Font.ALIGN.LEFT );
        this.text_font.draw("all the victims you can see on the right.", 10, 95, ig.Font.ALIGN.LEFT );
        this.text_font.draw("Clicking on each cassette, you will hear a sample", 10, 140, ig.Font.ALIGN.LEFT );
        this.text_font.draw("of their heart, so you need to kill exactly the ones", 10, 165, ig.Font.ALIGN.LEFT );
        this.text_font.draw("with the exact heart sound.", 10, 190, ig.Font.ALIGN.LEFT );
        this.text_font.draw("In case you were wondering, yes, this message indeed", 10, 300, ig.Font.ALIGN.LEFT );
        this.text_font.draw("uses COMIC SANS so your need for killing is bigger", 10, 325, ig.Font.ALIGN.LEFT );
        this.text_font.draw("Good luck, and DON'T KILL ANYBODY ELSE!", 10, 380, ig.Font.ALIGN.LEFT );
        
        for (var index=0; index < ig.game.player.sounds_selected.length; index++){
            this.font.draw("Victim "+ (index+1), ig.system.width/2+150, ((index)*80)+20, ig.Font.ALIGN.CENTER );
        }
    },

    newlevel: function(){

        var sounds = [1,2,3,4,5];

        var selects = ig.game.player.level;
        var sounds_selected = [];

        for (var i = selects - 1; i >= 0; i--) {

            var selected = sounds[Math.floor(Math.random()*sounds.length)];
            var selected_index = sounds.indexOf(selected);
            sounds.remove(selected_index);
            sounds_selected.push(selected);

        };

        ig.game.player.sounds_avaible = sounds;
        ig.game.player.sounds_selected = sounds_selected;
        ig.game.player.level_fails = 0;
        ig.game.player.level_win = 0;

    }
    
});


});