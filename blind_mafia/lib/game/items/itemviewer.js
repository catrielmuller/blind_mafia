ig.module(
    'game.items.itemviewer'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityIVLeftButton = ig.Entity.extend({
    size: {x: 20, y: 20},
    
    animSheet: new ig.AnimationSheet( 'media/items/item-arrow-left.png', 20, 20),
    
    zIndex: 146,
    
    update: function() {
        this.parent();
    },
    
    init: function( x, y, settings ) {
        this.parent( x, y, settings );
        this.addAnim( 'idle', 1, [0] );
        this.currentAnim = this.anims.idle;
    }
    
});


EntityIVRightButton = ig.Entity.extend({
    size: {x: 20, y: 20},
    
    animSheet: new ig.AnimationSheet( 'media/items/item-arrow-right.png', 20, 20),
    
    zIndex: 146,
    
    update: function() {
        this.parent();
    },
    
    init: function( x, y, settings ) {
        this.parent( x, y, settings );
        this.addAnim( 'idle', 1, [0] );
        this.currentAnim = this.anims.idle;
    }
    
});


EntityItemViewer = ig.Entity.extend({
    size: {x: 76, y: 97},
    
    animSheet: new ig.AnimationSheet( 'media/items/item-viewer.png', 76, 97),
    
    zIndex: 145,
    
    update: function() {
        this.parent();
        this.left_button.pos.x = this.pos.x + this.left_button.size.x/2;
        this.left_button.pos.y = this.pos.y + this.size.y - this.left_button.size.y*1.2;
        
        this.right_button.pos.x = this.pos.x + this.size.x - this.right_button.size.x*1.4;
        this.right_button.pos.y = this.left_button.pos.y;
    },
    
    init: function( x, y, settings ) {
        this.parent( x, y, settings );
        this.addAnim( 'idle', 1, [0] );
        this.currentAnim = this.anims.idle;
            
        this.left_button = ig.game.spawnEntity( EntityIVLeftButton, 0, 0, {});

        this.right_button = ig.game.spawnEntity( EntityIVRightButton, 0, 0, {});

        // Iterar sobre todos los items que tenga el player
        
    }
});

});