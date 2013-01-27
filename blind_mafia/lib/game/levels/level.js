ig.module(
    'game.levels.level'
)
.requires(
    'impact.impact',
    'impact.font',
    'game.items.itemviewer',
    'game.entities.fullimg',
    'game.entities.shooteable'
)
.defines(function(){ "use strict";

//shuffles list in-place
function shuffle(list) {
  var i, j, t;
  for (i = 1; i < list.length; i++) {
    j = Math.floor(Math.random()*(1+i));  // choose j in [0..i]
    if (j != i) {
      t = list[i];                        // swap list[i] and list[j]
      list[i] = list[j];
      list[j] = t;
    }
  }
}

ig.BaseLevel = ig.Class.extend({
    
    font: new ig.Font( 'media/comic_sans_30_red.png' ),
                               
	ready: function(){

		ig.game.spawnEntity( EntityFullImg, 0, 0, { 
			zindex: 0,
			img: this.background_img
		});

		ig.game.spawnEntity( EntityFullImg, 0, 0, { 
			zindex: 99,
			img: this.img_on_top
		});

        ig.game.itemviewer = ig.game.spawnEntity( EntityItemViewer, ig.system.width/2, ig.system.height-97, {});

        //Difficulty
        this.difficulty = ig.game.player.level * ig.game.player.difficult;

		var zones = this.loadzones();
        var zones_amount = zones.length;
        
        // Mezclamos la lista de zonas
        shuffle(zones);
        shuffle(ig.game.player.sounds_avaible);

        // nos quedamos con el ultimo para la zona objetivo

        for (var i = ig.game.player.sounds_selected.length - 1; i >= 0; i--) {
            var zone = zones.pop();
            zone.sound = ig.game.player.sounds_selected[i];

            console.log("DEBUG: Correct: " + zone.left + " " + zone.top);
                
            // Y creamos la entidad con esa data
            ig.game.spawnEntity( EntityShooteable, zone.left, zone.top, { 
                    png: 0,
                    correct: true,
                    audio:  zone.sound,
            });

            
            var added = 1;
        };


        // Ahora vamos a agregar las restantes
        
        while (added < this.difficulty && added < zones_amount){
            zone = zones.pop();
            zone.sound = ig.game.player.sounds_avaible[Math.floor(Math.random()*ig.game.player.sounds_avaible.length)];
            ig.game.spawnEntity( EntityShooteable, zone.left, zone.top, { 
                png: 0,
                correct: false,
                audio: zone.sound,
            });
            //console.log("Rand: " + zone);
            added += 1;
        }

        var end_buttom = {
            img: 'media/button.png',
            width: 64,
            height: 64,
            click: function(){
                ig.game.levels_manager.load('level1');

            }            
        }

        ig.game.spawnEntity( EntityButton, 750, 400, end_buttom);
        
        ig.game.timer = new ig.Timer();
        ig.game.timer.set( this.timeout );
        
        ig.game.sortEntitiesDeferred();
    },

    update: function() {
    	//console.log('update');
    },

    draw: function() {
    	//console.log('draw');
        var remaining = Math.floor(ig.game.timer.delta())*(-1);
        if (remaining <= 0){
            // La pantalla deberia terminar, por ahora recargamos el nivel;
            ig.game.levels_manager.load('level1');
        }
        this.font.draw(remaining, 30, 0, ig.Font.ALIGN.CENTER );
    },

    loadzones: function(){
        var current_top = this.zones_coord.top + this.zone_margin.top;
        var current_left = this.zones_coord.left + this.zone_margin.left;
        
    	var zones = [];
        var current_zone = 1;
        
        var done = false;
        
        while (!done){
            zones.push({top: current_top, left: current_left});
            
            current_left += this.zone_margin.right;
            current_left += this.zone_margin.left;
            current_left += this.zone_size.x;
            
            if (current_left >= this.zones_coord.right){
                // Llegamos al final de la fila, bajamos a la fila de abajo
                current_top += this.zone_size.y;
                current_top += this.zone_margin.bottom;
                current_top += this.zone_margin.top;
                
                current_left = this.zones_coord.left + this.zone_margin.left;
                
                if (current_top >= this.zones_coord.bottom){
                    // Ya cubrimos toda la zona disparable
                    done = true;
                }
            }
            
            current_zone += 1;
        }

		return zones;
    }
    
});


});