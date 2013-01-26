ig.module(
    'game.levels.level1'
)
.requires(
    'impact.impact',
    'game.entities.fullimg',
    'game.entities.shooteable'
)
.defines(function(){ "use strict";

ig.Level1 = ig.Class.extend({
    
	ready: function(){
		
		// var png = "";
		// for( var y = 0; y < 15; y++ ) {
		// 	png = y%2;
		// 	ig.game.spawnEntity( EntityShooteable, 8*y, 8*y, {png:png} );
		// }

		ig.game.spawnEntity( EntityFullImg, 0, 0, { 
			zindex: 0,
			img: 'media/level1bg.png'
		});

		ig.game.spawnEntity( EntityFullImg, 0, 0, { 
			zindex: 99,
			img: 'media/level1over.png'
		});

		var zones = this.loadzones();
		
		var dificult = zones.length - 1;
		dificult = 5;

		var correct = Math.floor((Math.random()*dificult));
		console.log(correct);

		var eclude = [];

		for (var i = correct - 1; i >= 0; i--) {

			if(i == correct){
				var iscorrect = true;
			}
			else {
				var iscorrect = false;
			}

			while(true){
				var rand = Math.floor((Math.random()*zones.length));

				if(!eclude[rand]){

					ig.game.spawnEntity( EntityShooteable, zones[rand].left, zones[i].top, { 
						png: 0,
						correct: iscorrect
					});

					eclude.push(rand);

					break;
				}				
			}

			
			
			

		};

	},

    update: function() {
    	//console.log('update');
    },

    draw: function() {
    	//console.log('draw');
    },

    loadzones: function(){

    	var zones = [];

		zones[0] = {
			top: 10,
			left: 73
		};
		zones[1] = {
			top: 10,
			left: 217
		};
		zones[2] = {
			top: 10,
			left: 361
		};
		zones[3] = {
			top: 10,
			left: 505
		};
		zones[4] = {
			top: 10,
			left: 649
		};
		zones[5] = {
			top: 106,
			left: 73
		};
		zones[6] = {
			top: 106,
			left: 217
		};
		zones[7] = {
			top: 106,
			left: 361
		};
		zones[8] = {
			top: 106,
			left: 505
		};
		zones[9] = {
			top: 106,
			left: 649
		};
		zones[10] = {
			top: 202,
			left: 73
		};
		zones[11] = {
			top: 202,
			left: 217
		};
		zones[12] = {
			top: 202,
			left: 361
		};
		zones[13] = {
			top: 202,
			left: 505
		};
		zones[14] = {
			top: 202,
			left: 649
		};
		zones[15] = {
			top: 298,
			left: 73
		};
		zones[16] = {
			top: 298,
			left: 217
		};
		zones[17] = {
			top: 298,
			left: 361
		};
		zones[18] = {
			top: 298,
			left: 505
		};
		zones[19] = {
			top: 298,
			left: 649
		};

		return zones;

    }
    
});


});