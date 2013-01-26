ig.module(
    'game.levels.level'
)
.requires(
    'impact.impact',
    'game.entities.fullimg',
    'game.entities.shooteable'
)
.defines(function(){ "use strict";

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

		var correct = Math.floor(Math.random() * zones.length);
        console.log("Correct: " + correct);
        
        ig.game.spawnEntity( EntityShooteable, zones[correct].left, zones[correct].top, { 
                png: 0,
                correct: true
            });
        var added = [correct];
        
        while (added.length < this.difficulty && added.length < zones.length){
            var rand = Math.floor((Math.random()*zones.length));
            
            if(added.indexOf(rand) == -1){
                ig.game.spawnEntity( EntityShooteable, zones[rand].left, zones[rand].top, { 
                        png: 0,
                        correct: false
                    });
                console.log("Rand: " + rand);
                added.push(rand);
            }
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