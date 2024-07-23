let Game = {

  width: 600,
  height: 600,
  scale: 2,
  loopTime: 500,
  squareHeight: 40,
  borderShrinkFactor: .09,
  borderShrink: 0,
  numBlocks: 50,

  lastRendered: 0,

  background: '#282828',
  aliveColor: '#f51439',

  init() {
    this.squareHeight = this.width / this.numBlocks;
    this.borderShrink = this.squareHeight * this.borderShrinkFactor;
    this.initCanvas();
    let render = timestamp => {
      cancelAnimationFrame(this.lastRendered);
      requestAnimationFrame(render);
      if (!this.lastRendered || timestamp - this.lastRendered >= this.loopTime) {
        this.lastRendered = timestamp;
        this.loop();
      }
    };
    requestAnimationFrame(render);
  },
  initCanvas() {
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.canvas.style.width = this.width / this.scale;
    this.canvas.style.height = this.height / this.scale;

    this.clearCanvas();
  },
  clearCanvas() {
    this.ctx.fillStyle = this.background;
    this.ctx.fillRect(0, 0, this.width, this.height);
  },
  drawSquare(row, column, color=this.aliveColor) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(this.squareHeight * column + this.borderShrink,
                      this.squareHeight * row + this.borderShrink,
                      this.squareHeight - (this.borderShrink * 2),
                      this.squareHeight - (this.borderShrink * 2));
  },
  createInitialState() {
    const createState = (shape) => {
      this.gameState = [];

      for (let row = 0; row < this.numBlocks; row++) {
        this.gameState.push([]);
        for (let column = 0; column < this.numBlocks; column++) {
          this.gameState[row].push(false);
        }
      }

      shape.forEach(({ row, column }) => {
        this.gameState[row][column] = true;
      });
    };

    // https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns
    const block = [
      { row: 1, column: 1 },
      { row: 1, column: 2 },
      { row: 2, column: 1 },
      { row: 2, column: 2 },
    ];

    const beeHive = [
      { row: 1, column: 2 },
      { row: 1, column: 3 },
      { row: 2, column: 1 },
      { row: 2, column: 4 },
      { row: 3, column: 2 },
      { row: 3, column: 3 },
    ];

    const blinker = [
      { row: 1, column: 2 },
      { row: 2, column: 2 },
      { row: 3, column: 2 },
    ];

    const toad = [
      { row: 2, column: 2 },
      { row: 2, column: 3 },
      { row: 2, column: 4 },
      { row: 3, column: 1 },
      { row: 3, column: 2 },
      { row: 3, column: 3 },
    ];

    createState(toad);
  },

  getNeighbors(i, j) {
    const neighbors = []

    // top left
    if (i - 1 >=  0 && j - 1 >= 0) {
      neighbors.push(this.gameState[i - 1][j - 1])
    }
    // top center
    if (i - 1 >= 0) {
      neighbors.push(this.gameState[i - 1][j])
    }
    // top right
    if (i - 1 >= 0 && j + 1 < this.numBlocks) {
      neighbors.push(this.gameState[i - 1][j + 1])
    }
    // left
    if (j - 1 >= 0) {
      neighbors.push(this.gameState[i][j - 1])
    }
    // right
    if (j + 1 < this.numBlocks) {
      neighbors.push(this.gameState[i][j + 1])
    }

    // bottom left
    if (i + 1 < this.numBlocks && j - 1 >= 0) {
        neighbors.push(this.gameState[i + 1][j - 1])
    }
    // bottom center
    if (i + 1 < this.numBlocks) {
      neighbors.push(this.gameState[i + 1][j])
    }
    // bottom right
    if (i + 1 < this.numBlocks && j + 1 < this.numBlocks) {
      neighbors.push(this.gameState[i + 1][j + 1])
    }

    return neighbors;
  },
  loop() {
    if (!this.gameState) {
      this.createInitialState();
    }

    let currentState = this.gameState.map(arr => arr.slice())
    for (let i = 0; i < this.gameState.length; i++) {
      for (let j = 0; j < this.gameState.length; j++) {
        
        const neighbors = this.getNeighbors(i, j)
        const numAlive = neighbors.filter(x => x === true).length

        if (this.gameState[i][j] && numAlive <= 3 && numAlive >= 2) {
          currentState[i][j] = true
        } else if (!this.gameState[i][j] && numAlive === 3) {
          currentState[i][j] = true
        } else {
          currentState[i][j] = false
        }
      }
    }
    this.gameState = currentState

    this.draw();
  },
  draw() {
    this.clearCanvas();

    for (let row = 0; row < this.gameState.length; row++) {
      for (let column = 0; column < this.gameState[0].length; column++) {
        if (this.gameState[row][column]) {
          this.drawSquare(row, column, this.aliveColor);
        }
      }
    }
  },
};

export {Game};
