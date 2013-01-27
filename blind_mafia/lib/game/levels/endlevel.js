ig.module(
    'game.levels.endlevel'
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

ig.LevelEnding = ig.Class.extend({

    font: new ig.Font( 'media/comic_sans_30_red.png' ),

    ready: function(){

        var start = {
            img: 'media/buttonletsgo.png',
            width: 207,
            height: 47,
            over: false,
            custom_click: function(){
//              ig.game.player.heart.stop();
                ig.music.stop();
                ig.game.levels_manager.load('briefing');
            }            
        }

        ig.game.spawnEntity( EntityButton, 646, 403, start);

        var buy_bullets = {
            img: 'media/buttonbuybullets.png',
            width: 100,
            height: 50,
            over: false,
            custom_click: function(){
                ig.game.player.buy('bullets');
            }            
        }        
        ig.game.spawnEntity( EntityButton, 100, 400, buy_bullets);

        var buy_extra_time = {
            img: 'media/buttonbuytime.png',
            width: 100,
            height: 50,
            over: false,
            custom_click: function(){
                ig.game.player.buy('extra_time');
            }            
        }        
        ig.game.spawnEntity( EntityButton, 210, 400, buy_extra_time);

        var buy_heartsensor = {
            img: 'media/buttonbuysensor.png',
            width: 100,
            height: 50,
            over: false,
            custom_click: function(){
                ig.game.player.buy('heartsensor');
            }            
        }        
        ig.game.spawnEntity( EntityButton, 320, 400, buy_heartsensor);

        this.endlevel();
    },

    update: function() {
        //console.log('update');
    },

    draw: function() {
        //console.log('draw');
        this.font.draw("Market", 50, 10, ig.Font.ALIGN.LEFT );
        if(this.without_kill > 0){
            this.font.draw("You had " + this.without_kill + " victim left.", 50, 50, ig.Font.ALIGN.LEFT );
        }
        if(this.pay > 0){
            this.font.draw("Objectives Accomplished. You won $" + this.pay , 50, 100, ig.Font.ALIGN.LEFT );
            this.font.draw('Now you have $' + ig.game.player.money, 50, 150, ig.Font.ALIGN.LEFT );
        } else if (this.pay < 0){
            var pay = this.pay * -1;
            this.font.draw("You owe the BOSS $" + pay, 50, 100, ig.Font.ALIGN.LEFT );
            this.font.draw('Now you have $' + ig.game.player.money, 50, 150, ig.Font.ALIGN.LEFT );
        } else {
            this.font.draw('Now you have $' + ig.game.player.money, 50, 50, ig.Font.ALIGN.LEFT );
        }
        
    },

    endlevel: function(){

        //ig.game.player.level += 1;
        this.level = ig.game.player.level;
        this.fail = ig.game.player.level_fails;
        this.win = ig.game.player.level_win;
        this.without_kill = this.level - this.win;

        console.log('Dejaste sin matar a: ' +  this.without_kill);
        console.log('Fallaste a: ' +  this.fail);
        console.log('Exitos: ' +  this.win);

        this.pay = (this.win * 1000) - (this.fail * 400) - (this.without_kill * 700);

        ig.game.player.money = ig.game.player.money + this.pay;
        
        if(ig.game.player.money < 0){
            ig.game.levels_manager.load('gameover');
        }
        else {
            ig.game.player.level += 1;
            ig.music.play("briefing");

            console.log('Tienes $' + ig.game.player.money);
        }
        
    }
    
});


});