ig.module(
    'game.levels.manager'
)
.requires(
    'impact.impact'
)
.defines(function(){ "use strict";

ig.LevelsManager = ig.Class.extend({
    
    levels: {},
    
    current: null,
    
    append: function( name, level ) {
        // Add level to the level list
        this.levels[name] = new level;
    },
    
    clean_scene: function () {
        // Clean the Scene and start over
        ig.game.screen = {x: 0, y: 0};

        // Clean entities
        for (var i=0; i<ig.game.entities.length; i++){
            // If at the moment we start cleaning up, we were
            // hovering over an entity (heart beating), then
            // make it stop
            if (ig.game.entities[i].heart !== undefined){
                ig.game.entities[i].heart.stop();
            }
        }
        ig.game.entities = [];
        ig.game.namedEntities = {};
        
        // Map Layer
        ig.game.collisionMap = ig.CollisionMap.staticNoCollision;
        ig.game.backgroundMaps = [];    
        ig.$("#canvas").style.cursor = "auto";
    },
    
    load: function( name ){
        this.clean_scene();
        this.current = this.levels[name];
        this.current.ready();
    },
    
    
});


});