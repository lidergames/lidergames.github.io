var first_state = function () {}
first_state.prototype ={
	preload : function() {
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

	},
	create : function() {
		this.circle = new Phaser.Circle(game.world.centerX, 100,64);
		this.cells = [];
		this.widthGrid = 100;
		this.heightGrid = 100;
		this.grid = [this.widthGrid*this.heightGrid];

		for (var i = 0; i <= 100; i++) {
			var cell = this.createCell(game.rnd.integerInRange(0,100),i,5);
			this.cells.push(cell);
			this.addCellToGrid(this.grid,cell);
		}
		game.time.events.loop(Phaser.Timer.SECOND, this.my_timer,this);

	},
	update: function() {},
	render: function() {
		for (var i = this.cells.length - 1; i >= 0; i--) {
			game.debug.geom(this.cells[i].shape,'#cfffff');
		}
		
	},
	createCell: function(x,y,size) {
		var cell = {};
		cell.x = x;
		cell.y = y;
		cell.size;
		cell.shape = new Phaser.Circle(x*size, y*size,size);
		return cell;
	},
	addCellToGrid : function(grid,cell) {
		grid[this.widthGrid*cell.y+cell.x] = (cell);
	},
	deletCellToGrid: function(grid,cell) {
		delete grid[this.widthGrid*cell.y+cell.x];
		cell.destroy(true);
	},
	my_timer : function() {
		for (var i = this.cells.length - 1; i >= 0; i--) {
			val cell = this.cells[i];
			
			var sosedi = 0;
			var small_grid=[9];

			if(cell.x-1 >= 0 && cell.y-1 >= 0) {
			}

			if(cell.y-1>=0) {
				if (cell.x-1>0) {
					small_grid[3*0+0]this.getCell(cell.x-1,cell.y-1)
				}
				
			}
		}

	},
	getCell(x,y) {
		return this.grid[this.widthGrid*y+x]
	}
}