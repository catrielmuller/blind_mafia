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
        levels.name = level;
    },
    
    load: function( name ){
        // Clean the Scene and start over
        this.screen = {x: 0, y: 0};

        // Clean entities
        this.entities = [];
        this.namedEntities = {};
        
        // Map Layer
        this.collisionMap = ig.CollisionMap.staticNoCollision;
        this.backgroundMaps = [];
        
        this.current = levels[name];
        this.current.init();
    },
    
    
});


});