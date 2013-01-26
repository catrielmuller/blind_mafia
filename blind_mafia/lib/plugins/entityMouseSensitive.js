
// #################################################################################################
// MODULE: plugin.entityMouseSensitive
// =====================================
// 
// REQUIREMENTS:
// =============
// ENGINE: Impact.js
// PLUGIN: http://www.pointofimpactjs.com/plugins/view/7/impact-events
// This plugin allready exists in this package, but was written by omatase and contributed on
// http://www.pointofimpactjs.com ...
// The event plugin is needed to fire the specific events. If you don't need this feature search
// the file for 'fire' and delete all those lines. Also delete 'plugins.events' in the module
// requires container.
//
//
// NEW ENTITY SETTINGS:
// ====================
// this.isMouseSensitive	- makes the entity sensitive to all mouse actions
//
//
// EVENTS:
// =======
// onMouseOver		- event if the mouse hits a none transparent part of the entity image
// onMouseOut		- event if the entity was touched and the mouse reached a transparent part
//					  of the entity image or leaves the entity sprite
//
// onClick			- event if the entity was touched and the left mouse butten was clicked;
//					  note that the click event is triggered after the waiting time to detect
//					  a doubleclick (ig.game.pluginMouseSensitive.dblClickTime) is expired
// onRelease		- event if a normal left click on the entity is released
//
// onRightClick		- event if the entity was touched and the right mouse butten was clicked
// onRightRelease	- event if a right click on the entity is released
//
// onDoubleClick	- event if the entity was touched and a doubleclick was performed; 
//					  the time the script is waiting for the secound click could be set to
//					  ig.game.pluginMouseSensitive.dblClickTime in millisecounds
// onClickPerformed	- event if a real click was performed; without waiting to decide wether
//					  it is a normal or doubleclick
//
// onDrag			- event if the user starts to drag the entity (hold click + moving the mouse);
//					  event also allways being triggered if the mouse position changes while dragging
// onDrop			- event if the user stop dragging and drop the entity
//
// #################################################################################################

ig.module( 
	'plugins.entityMouseSensitive' 
)
.requires(
	'impact.entity',
	'impact.game',
	'impact.input',
	'impact.system',
	'plugins.events'
)
.defines(function(){

	// #############################################################################################
	// inject ig.Game
	// inject the ig.Game.Update function to recieve mouse clicks (because injecting ig.Game.init doesn't work)
	ig.Game.inject({
		pluginMouseSensitive: {
			enabledInWeltmeister: false,
			dblClickTime: 200,	// is the maximum time in milliseconds between two clicks to be a doubleclick
			bindMouse: false	// indicates if the bindings for trigger the mouse clicks are set already
		},
		update: function() {
			this.parent();
			
			// bind mouse for recieve clicks
			if( !this.pluginMouseSensitive.bindMouse ) {
				ig.input.initMouse();
				ig.input.bind( ig.KEY.MOUSE1, 'checkLeftClick' );
				ig.input.bind( ig.KEY.MOUSE2, 'checkRightClick' );
				this.pluginMouseSensitive.bindMouse = true;
			}
		}
	});
	
	// #############################################################################################
	// inject ig.Entity
	ig.Entity.inject({
		
		// settings which could be done in the entity definition now ###############################
		isMouseSensitive: false,			// entity reacts on mouse actions
		// #########################################################################################
		
		// indicators
		isMouseOver: false,			// indicates if the mouse is over the entity 
		isClicked: false,			// indicates if the entity is clicked with left mouse button
		isRightClicked: false,		// indicates if the entity is clicked with right mouse button
		isClickPerformed: false,	// indicates if a click was performed and wait for doubleclick
		isDoubleClicked: false,		// indicates if the entity is clicked with a doubleclick
		isDragged: false,			// indicates if the entity is dragged
		
		// plugin saves
		_oldMousePos: { x:0, y:0 },	// mouse position from previous frame to indicate dragging
		_lastClick: 0,				// date time in milliseconds of a click to indicate doubleclicks
		
		// #########################################################################################
		// inject ig.Entity.init( x, y, settings)
		// on init an entity save the data of orginal animation 
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			
		},
		
		// #########################################################################################
		// inject ig.Entity.draw()
		// check if the entity is focused and trigger events 
		update: function() {
			this.parent();
			
			// check current mouse position if the entity is selected
			if( typeof wm == "undefined" || ig.Game.pluginMouseSensitive.enabledInWeltmeister ) this.fireMouseEvents();
		},
		
		// #########################################################################################
		// isOnScreen()
		// checks if an entity is visible (has animation sheet | is on Screen)
		isOnScreen: function() {
			if( this.animSheet instanceof ig.AnimationSheet ) {
				if( ig.game.screen.x < (this.pos.x + this.size.x)
				&&	ig.game.screen.y < (this.pos.y + this.size.y)
				&&	(ig.game.screen.x + ig.system.realWidth) > this.pos.x
				&&	(ig.game.screen.y + ig.system.realHeight) > this.pos.y) {
					return true;
				}
			}
			return false;
		},
		
		// #########################################################################################
		// isTouched()
		// checks if the mouse is over the visible or transparent part of the entity 
		isTouched: function() {

			// mouse over the entity sprite
			var mouseX = ig.input.mouse.x + ig.game.screen.x;
			var mouseY = ig.input.mouse.y + ig.game.screen.y;

			if ( 	mouseX > (this.pos.x)
			&&		mouseY > (this.pos.y)
			&&		mouseX < (this.pos.x + this.size.x)
			&&		mouseY < (this.pos.y + this.size.y) ) {
		
				return true;

			}
			return false;
		},
		
		// #########################################################################################
		// fireMouseEvents()
		// analyse the alpha of the pixels in the animation image, trigger if the mouse
		// is over the visible part of the entity and fire the events
		fireMouseEvents: function() {
			var mouseX = ig.input.mouse.x + ig.game.screen.x;
			var mouseY = ig.input.mouse.y + ig.game.screen.y;

			var entityIsTouched = false;
			var timeNow = new Date().getTime();
			
			// check if needed flags are true and if the entity is on screen
			if( this.isMouseSensitive && this.isOnScreen() )
				entityIsTouched = this.isTouched();
			
			// onMouseOver
			if( entityIsTouched && !this.isMouseOver ) {
				this.isMouseOver = true;
				this.fire("onMouseOver");
			}
			
			// onDoubleClick
			if( entityIsTouched && this.isClickPerformed && ig.input.pressed('checkLeftClick') && (this._lastClick + ig.game.pluginMouseSensitive.dblClickTime > timeNow) ) {
				this.isDoubleClicked = true;
				this.isClickPerformed = false;
				this.fire("onDoubleClick");
				this.fire("onClickPerformed");
			} else {
				this.isDoubleClicked = false;
			}
			
			// onClick
			if( entityIsTouched && this.isClickPerformed && (this._lastClick + ig.game.pluginMouseSensitive.dblClickTime <= timeNow) ) {
				this.isClicked = true;
				this.isClickPerformed = false;
				this.fire("onClick");
			}
			
			// onClickPerformed
			if( entityIsTouched && !this.isClickPerformed && !this.isDoubleClicked && ig.input.pressed('checkLeftClick') ) {
				this.isClickPerformed = true;
				this.fire("onClickPerformed");
				this._lastClick = timeNow;
				
				// save current mouse position to indicate dragging 
				this._oldMousePos.x = mouseX;
				this._oldMousePos.y = mouseY;
			}
			
			// onRightClick
			if( entityIsTouched && !this.isRightClicked && ig.input.pressed('checkRightClick') ) {
				this.isRightClicked = true;
				this.fire("onRightClick");
			}
			
			// onDrag
			if( (this.isClickPerformed || this.isClicked || this.isDragged) && ig.input.state('checkLeftClick') && (mouseX != this._oldMousePos.x || mouseY != this._oldMousePos.y) ) {
				this.isDragged = true;
				this._oldMousePos.x = mouseX;
				this._oldMousePos.y = mouseY;
				this.fire("onDrag");
			}
			
			// onDrop
			if( this.isDragged && ig.input.released('checkLeftClick') ) {
				this.isDragged = false;
				this._oldMousePos.x = 0;
				this._oldMousePos.y = 0;
				this.fire("onDrop");
			}
			
			// onMouseOut
			if( !entityIsTouched && this.isMouseOver ) {
				this.isMouseOver = false;
				this.fire("onMouseOut");
			}
			
			// onRelease
			if( this.isClicked && !ig.input.state('checkLeftClick') ) {
				this.isClicked = false;
				this.fire("onRelease");
			}
			
			// onRightRelease
			if( this.isRightClicked && ig.input.released('checkRightClick') ) {
				this.isRightClicked = false;
				this.fire("onRightRelease");
			}
		}
		
	// end of injecting the entity
	});
	
// end of module definition
});
