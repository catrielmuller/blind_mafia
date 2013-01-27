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


    
    ready: function(){

        console.log('Estas en el Level ' + ig.game.player.level);

        this.newlevel();


        
        var start = {
            img: 'media/button.png',
            width: 64,
            height: 64,
            click: function(){
//                 ig.game.player.heart.stop();
                ig.music.stop();
                ig.game.levels_manager.load('level1');                

            }            
        }

        ig.game.spawnEntity( EntityButton, 100, 100, start);


    },

    update: function() {
        //console.log('update');
    },

    draw: function() {
        //console.log('draw');
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

        ig.game.player.heart = new ig.Sound( 'media/sounds/latido_'+selected+'.ogg', true );
//         ig.game.player.heart.play();

        ig.game.player.sounds_avaible = sounds;
        ig.game.player.sounds_selected = sounds_selected;

        ig.music.play("briefing");
    }
    
});


});