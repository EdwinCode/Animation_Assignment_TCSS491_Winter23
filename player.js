class Player {
	constructor(game) {
		this.game = game;
		this.animator = new Animator(ASSET_MANAGER.getAsset("./player.png"),
			100, 204, 100, 88, 6, 0.2);

		this.x = 10;
		this.y = 10;
		this.speed = 128;
	};

	update() {
		this.x += this.speed * this.game.clockTick;
		if(this.x > 1024) this.x = 0;
	};

	draw(ctx) {
		this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y)
	};
}