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

        console.log('Finalizaste el Level ' + ig.game.player.level);

        var start = {
            img: 'media/button.png',
            width: 64,
            height: 64,
            custom_click: function(){
//              ig.game.player.heart.stop();
                ig.music.stop();
                ig.game.levels_manager.load('briefing');
            }            
        }

        ig.game.spawnEntity( EntityButton, 100, 100, start);

        var buy_bullets = {
            img: 'media/button.png',
            width: 64,
            height: 64,
            custom_click: function(){
                ig.game.player.buy('bullets');
            }            
        }        
        ig.game.spawnEntity( EntityButton, 100, 400, buy_bullets);

        var buy_extra_time = {
            img: 'media/button.png',
            width: 64,
            height: 64,
            custom_click: function(){
                ig.game.player.buy('extra_time');
            }            
        }        
        ig.game.spawnEntity( EntityButton, 150, 400, buy_extra_time);

        var buy_heartsensor = {
            img: 'media/button.png',
            width: 64,
            height: 64,
            custom_click: function(){
                ig.game.player.buy('heartsensor');
            }            
        }        
        ig.game.spawnEntity( EntityButton, 200, 400, buy_heartsensor);

        this.endlevel();
    },

    update: function() {
        //console.log('update');
    },

    draw: function() {
        //console.log('draw');
        this.font.draw("Market", 200, 10, ig.Font.ALIGN.CENTER );
        if(this.without_kill > 0){
            this.font.draw("Te falto matar a " + this.without_kill, 200, 50, ig.Font.ALIGN.LEFT );
        }
        if(this.pay > 0){
            this.font.draw("Cumpliste los Objetivos, Ganaste $" + this.pay , 200, 50, ig.Font.ALIGN.LEFT );
            this.font.draw('Ahora Tienes $' + ig.game.player.money, 200, 100, ig.Font.ALIGN.LEFT );
        } else if (this.pay < 0){
            var pay = this.pay * -1;
            this.font.draw("FAIL!. Debes pagarle al jefe $" + pay, 300, 50, ig.Font.ALIGN.LEFT );
            this.font.draw('Ahora Tienes $' + ig.game.player.money, 200, 100, ig.Font.ALIGN.LEFT );
        } else {
            this.font.draw('Tienes $' + ig.game.player.money, 200, 50, ig.Font.ALIGN.LEFT );
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