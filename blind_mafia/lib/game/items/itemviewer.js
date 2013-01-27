ig.module(
    'game.items.itemviewer'
)
.requires(
    'impact.entity',
    'plugins.entityMouseSensitive',
    'plugins.events'
)
.defines(function(){

EntityIVLeftButton = ig.Entity.extend({
    size: {x: 20, y: 20},
    
    animSheet: new ig.AnimationSheet( 'media/items/item-arrow-left.png', 20, 20),
    
    zIndex: 146,
    isMouseSensitive: true,
    
    update: function() {
        this.parent();
    },
    
    init: function( x, y, settings ) {
        this.parent( x, y, settings );
        this.itemviewer = settings.itemviewer;
        this.addAnim( 'idle', 1, [0] );
        this.currentAnim = this.anims.idle;
        this.addListener( "onClick", this.onClick );
    },

    onClick: function(){
        ig.game.itemviewer.prev_item();
    },
    
});


EntityIVRightButton = ig.Entity.extend({
    size: {x: 20, y: 20},
    
    animSheet: new ig.AnimationSheet( 'media/items/item-arrow-right.png', 20, 20),
    
    zIndex: 146,
    isMouseSensitive: true,
    
    update: function() {
        this.parent();
    },
    
    init: function( x, y, settings ) {
        this.parent( x, y, settings );
        this.addAnim( 'idle', 1, [0] );
        this.currentAnim = this.anims.idle;
        this.addListener( "onClick", this.onClick );
    },

    onClick: function(){
        ig.game.itemviewer.next_item();
    },
    
});


EntityItemViewer = ig.Entity.extend({
    size: {x: 76, y: 97},
    
    animSheet: new ig.AnimationSheet( 'media/items/item-viewer.png', 76, 97),
    
    zIndex: 145,
    
    update: function() {
        this.parent();
    },
    
    update_elems: function(){
        this.left_button.pos.x = this.pos.x + this.left_button.size.x/2;
        this.left_button.pos.y = this.pos.y + this.size.y - this.left_button.size.y*1.2;
        
        this.right_button.pos.x = this.pos.x + this.size.x - this.right_button.size.x*1.4;
        this.right_button.pos.y = this.left_button.pos.y;
        
        if (this.player_items.length > 0){
            var item = this.player_items[this.current_item_index];
            item.pos.x = this.pos.x + 6;
            item.pos.y = this.pos.y + 4;
        }
    },
    
    init: function( x, y, settings ) {
        this.parent( x, y, settings );
        this.addAnim( 'idle', 1, [0] );
        this.currentAnim = this.anims.idle;
            
        this.left_button = ig.game.spawnEntity( EntityIVLeftButton, 0, 0, {});

        this.right_button = ig.game.spawnEntity( EntityIVRightButton, 0, 0, {});

        // Iterar sobre todos los items que tenga el player
        this.current_item_index = 0;
        this.player_items = []
        for (var index = 0; index < ig.game.player.items.length; index++){
            this.player_items.push(ig.game.spawnEntity( ig.game.player.items[index], ig.system.width, ig.system.height, {mode:'use'}));
        }
        
        this.update_elems();
        
    },
    
    next_item: function () {
        if (this.current_item_index < this.player_items.length-1){
            var item = this.player_items[this.current_item_index];
            item.pos.x = ig.system.width;
            item.pos.y = ig.system.height;
            this.current_item_index += 1;
            this.update_elems();
        }
        
    },
    
    prev_item: function () {
        if (this.current_item_index > 0){
            var item = this.player_items[this.current_item_index];
            item.pos.x = ig.system.width;
            item.pos.y = ig.system.height;
            this.current_item_index -= 1;
            this.update_elems();
        }
        
    },
    
    remove_current: function () {
        var item = this.player_items[this.current_item_index];
        ig.game.removeEntity(item);
        this.player_items.splice(this.current_item_index,1);
        
        if (this.current_item_index > this.player_items.length-1){
            this.current_item_index -= 1;
        }
        
        this.update_elems();
    }
    
});

});