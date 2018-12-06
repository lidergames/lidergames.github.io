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
			if(this.cells[i] != null) {
				game.debug.geom(this.cells[i].shape,'#cfffff');
			}
			
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
		//cell.kill();
	},
	my_timer : function() {
		console.info('tick');
		for (var i = this.cells.length - 1; i >= 0; i--) {
			if(this.cells[i] == null) {
				continue
			}
			const cell = this.cells[i];
			console.info(cell.x);
			var sosedi = 0;
			var small_grid=[9];
			for (let i = 0; i < 9; i++) {
				small_grid[i]=0;
				
			}

			for (let x = 0; x < 2; x++) {
				for (let y = 0; y < 2; y++) {
					let xn = -1+x;
					let yn = -1+y;
					if(cell.x+xn<0 || cell.x+xn>=this.widthGrid) {
						continue
					}
					if(cell.y+yn<0 || cell.y+yn>=this.heightGrid) {
						continue
					}
					if(this.getCell(cell.x+xn,cell.y+yn) != null ) {
						sosedi++;
						small_grid[3*yn+xn] = 1;
					}

				}
				
			}
		if(sosedi>1 || sosedi<1) {
			this.deletCellToGrid(this.grid,cell);
			delete this.cells[i];
		}
		else if(sosedi==1) {
			for(let i = 0;i<small_grid.length;i++) {
				if(small_grid[i]!=1) {
					let y = i / 3;
					let x = i-(3*y) ;
					this.addCellToGrid(this.grid,this.createCell(cell.x+(-1+x),cell.y+(-1+y)));
				}
			}
		}
		}

	},
	getCell(x,y) {
		return this.grid[this.widthGrid*y+x]
	}
}