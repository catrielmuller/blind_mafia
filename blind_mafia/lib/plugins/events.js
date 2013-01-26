ig.module
(
    'plugins.events'
)
.requires
(
    'impact.game'
)
.defines(function () {
    
    // if you want your callback to execute in a specific context
    // make sure to pass callback with bind()
    // ex. addListener(this, "onclick" (function () { [...] }).bind(this));
    ig.Game.inject({
        
        _events: [],
        
        addListener: function ( event, callback ) {
            if( !this._events[event] ) this._events[event] = [];
            this._events[event].push(callback);
            return event;
        },
        
        removeListener: function ( event, callback ) {
            if( !this._events[event] ) return;
            for( var e = 0; e < this._events[event].length; e++ ) {
                if( this._events[event][e] == callback ) {
                    this._events[event].splice(e,1);
                }
            }
            delete this._events[event];
        },
        
        removeEvent: function ( event ) {
            if( !this._events[event] ) return;
            delete this._events[event];
        },
        
        fire: function ( event ) {
            if( !this._events[event] ) return;
            for( var e = 0; e < this._events[event].length; e++ ) {
                this._events[event][e]( this );
            }
        }         
    });
    
    
    // direct entity API
    // if you want your callback to execute in a specific context
    // make sure to pass callback with bind()
    // ex. addListener("onclick" (function () { [...] }).bind(this));
    ig.Entity.inject({
        
        _events: [],
        
        addListener: function ( event, callback ) {
            if( !this._events[event] ) this._events[event] = [];
            this._events[event].push(callback);
            return event;
        },
        
        removeListener: function ( event, callback ) {
            if( !this._events[event] ) return;
            for( var e = 0; e < this._events[event].length; e++ ) {
                if( this._events[event][e] == callback ) {
                    this._events[event].splice(e,1);
                }
            }
            delete this._events[event];
        },
        
        removeEvent: function ( event ) {
            if( !this._events[event] ) return;
            delete this._events[event];
        },
        
        fire: function ( event ) {
            if( !this._events[event] ) return;
            for( var e = 0; e < this._events[event].length; e++ ) {
                this._events[event][e]( this );
            }
        }         
    });
    
    // animation API
    /*
    ig.Animation.inject({
        
        update: function () {
            this.parent();
            if (this._completeData && this._completeData.length > 0) {
                for (var i = 0; i < this._completeData.length; i++) {
                    if (this.loopCount > this._completeData[i].loopCount) {
                        try {
                            ig.game.fire(this, "complete");
                        }
                        finally {
                            // stop notifying automatically.
                            // extend or change to notify perpetually
                            ig.game.removeListener(this, "complete", this._completeData[i].uniqueId);
                        }
                    }
                }
            }
            
            if (this._keyframeData && this._keyframeData.length > 0) {
                for (var i = 0; i < this._keyframeData.length; i++) {
                    if (this.frame >= this._keyframeData[i].keyframe) {
                        try{
                            ig.game.fire(this, "onKeyframe" + this._keyframeData[i].keyframe);
                        }
                        finally{
                            // remove this from the notifications
                            ig.game.removeListener(this, "onKeyframe" + this._keyframeData[i].keyframe, this._keyframeData[i].uniqueId);
                        }
                    }
                }
            }
            
        },
        
        onComplete: function (callback) {
            var uniqueId = ig.game.addListener(this, "complete", callback);
            var completeData = {loopCount: this.loopCount, uniqueId: uniqueId};
            
            if (this._completeData === undefined || typeof(this._completeData) !== "array"){
                this._completeData = [];
            }
            
            this._completeData.push(completeData);
            
            return uniqueId;
        },
        
        onKeyframe: function (keyframe, callback) {
            var uniqueId = ig.game.addListener(this, "onKeyframe" + keyframe, callback);
            var onKeyframe = { loopCount: this.loopCount, keyframe: keyframe, uniqueId: uniqueId };
            
            if (this._keyframeData === undefined || typeof(this._keyframeData) !== "array"){
                this._keyframeData = [];
            }
            
            this._keyframeData.push(onKeyframe);
            
            return uniqueId;
        }
    });
    */
});