ig.module(
    'game.levels.level'
)
.requires(
    'impact.impact',
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

	ready: function(){

		ig.game.spawnEntity( EntityFullImg, 0, 0, { 
			zindex: 0,
			img: this.background_img
		});

		ig.game.spawnEntity( EntityFullImg, 0, 0, { 
			zindex: 99,
			img: this.img_on_top
		});

		var zones = this.loadzones();
        var zones_amount = zones.length;
        
        // Mezclamos la lista de zonas
        shuffle(zones);
        
        // nos quedamos con el ultimo para la zona objetivo
        var zone = zones.pop();

//         console.log("Correct: " + zone);
            
        // Y creamos la entidad con esa data
        ig.game.spawnEntity( EntityShooteable, zone.left, zone.top, { 
                png: 0,
                correct: true,
                audio: 1
            });
        
        var added = 1;
        
        // Ahora vamos a agregar las restantes
        
        while (added < this.difficulty && added < zones_amount){
            zone = zones.pop();
            ig.game.spawnEntity( EntityShooteable, zone.left, zone.top, { 
                png: 0,
                correct: false,
                audio: added+1
            });
//             console.log("Rand: " + zone);
            added += 1;
            
        }

    },

    update: function() {
    	//console.log('update');
    },

    draw: function() {
    	//console.log('draw');
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