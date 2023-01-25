class Player {
	constructor(game) {
		this.game = game;

		this.spritesheet = ASSET_MANAGER.getAsset("./player.png");

		this.x = 10;
		this.y = 10;

		this.direction = 0; // 0 = right, 1 = down, 2 = left, 3 = up
		this.state = 0; // 0 = idle, 1 = walking, 2 = running, 3 = sitting

		// player's animations
		this.animations = [];
		this.loadAnimations();
	};

	loadAnimations() {
		for (var i = 0; i < 5; i++) { // four states
			this.animations.push([]);
			for (var j = 0; j < 5; j++) { // four directions
				this.animations[i].push([]);
			}
		}

		// state = 0 is the idle animation
		// 0, 1, 2, 3 are right, down, left, up
		this.animations[0][0] = new Animator(this.spritesheet, 0, 204, 31, 88, 1, 0.42);
		this.animations[0][1] = new Animator(this.spritesheet, 0, 0, 33, 84, 1, 0.42);
		this.animations[0][2] = new Animator(this.spritesheet, 0, 304, 31, 88, 1, 0.42);
		this.animations[0][3] = new Animator(this.spritesheet, 0, 103, 33, 84, 1, 0.42);

		// state = 1 is the walking animation
		// 0, 1, 2, 3 are right, down, left, up
		this.animations[1][0] = new Animator(this.spritesheet, 100, 204, 100, 88, 6, 0.2);
		this.animations[1][1] = new Animator(this.spritesheet, 100, 0, 100, 90, 6, 0.2);
		this.animations[1][2] = new Animator(this.spritesheet, 100, 304, 100, 88, 6, 0.2);
		this.animations[1][3] = new Animator(this.spritesheet, 100, 104, 100, 88, 6, 0.2);

		// state = 2 is the running animation
		// 0, 1, 2, 3 are right, down, left, up
		this.animations[2][0] = new Animator(this.spritesheet, 100, 204, 100, 88, 6, 0.2);
		this.animations[2][1] = new Animator(this.spritesheet, 100, 0, 100, 90, 6, 0.2);
		this.animations[2][2] = new Animator(this.spritesheet, 100, 304, 100, 88, 6, 0.2);
		this.animations[2][3] = new Animator(this.spritesheet, 100, 104, 100, 88, 6, 0.2);

		// state = 3 is the sitting animation
		// 0, 1, 2, 3 are right, down, left, up
		this.animations[3][0] = new Animator(this.spritesheet, 700, 212, 46, 72, 1, 0.42);
		this.animations[3][1] = new Animator(this.spritesheet, 700, 12, 40, 80, 1, 0.42);
		this.animations[3][2] = new Animator(this.spritesheet, 700, 312, 46, 70, 1, 0.42);
		this.animations[3][3] = new Animator(this.spritesheet, 700, 112, 36, 70, 1, 0.42);
	};

	update() {
		if (!this.game.keys['w'] && !this.game.keys['W'] && !this.game.keys['s'] && !this.game.keys['S']
		&& !this.game.keys['a'] && !this.game.keys['A'] && !this.game.keys['d'] && !this.game.keys['D']) {
			this.state = 3;
		} else {
			if (this.game.keys['W'] && !this.game.keys['s'] && !this.game.keys['S']) {
				this.direction = 3; // up
				this.state = 2; // running
				this.y -= 8;
			} else if (this.game.keys['w'] && !this.game.keys['s'] && !this.game.keys['S']) {
				this.direction = 3; // up
				this.state = 1; // walking
				this.y -= 4;
			}  else if ((this.game.keys['W'] || this.game.keys['w']) && (this.game.keys['s'] || this.game.keys['S'])) {
				this.direction = 3; // up
				this.state = 0; // idle standing
			} else if (this.game.keys['S'] && !this.game.keys['w'] && !this.game.keys['W']) {
				this.direction = 1; // down
				this.state = 2; // running
				this.y += 8;
			} else if (this.game.keys['s'] && !this.game.keys['w'] && !this.game.keys['W']) {
				this.direction = 1; // down
				this.state = 1; // walking
				this.y += 4;
			}

			if (this.game.keys['D'] && !this.game.keys['a'] && !this.game.keys['A']) {
				this.direction = 0; // right
				this.state = 2; // running
				this.x += 8;
			} else if (this.game.keys['d'] && !this.game.keys['a'] && !this.game.keys['A']) {
				this.direction = 0; // right
				this.state = 1; // walking
				this.x += 4;
			}  else if ((this.game.keys['D'] || this.game.keys['d']) && (this.game.keys['a'] || this.game.keys['A'])) {
				this.direction = 0; // right
				this.state = 0; // idle standing
			} else if (this.game.keys['A'] && !this.game.keys['d'] && !this.game.keys['D']) {
				this.direction = 2; // left
				this.state = 2; // running
				this.x -= 8;
			} else if (this.game.keys['a'] && !this.game.keys['d'] && !this.game.keys['D']) {
				this.direction = 2; // left
				this.state = 1; // walking
				this.x -= 4;
			}
		}

		if(this.x > 1024) this.x = 0;
		if(this.x < 0) this.x = 1024;
		if(this.y > 768) this.y = 0;
		if(this.y < 0) this.y = 768;
	};

	draw(ctx) {
		this.animations[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x, this.y);
	};
}