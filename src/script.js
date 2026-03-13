/**
 * KiddoZ Racing Drifter - Vector Laboratory Entry Point
 */

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.lastTime = 0;
        this.isRunning = false;
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        this.keys = {};
        window.addEventListener('keydown', (e) => this.keys[e.key] = true);
        window.addEventListener('keyup', (e) => this.keys[e.key] = false);

        this.car = new Car(this.canvas.width, this.canvas.height);
        
        console.log("KRD: Vector Engine Initialized.");
        this.init();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.isRunning = true;
        
        // Update UI Loading state
        const statusText = document.querySelector('.status-text');
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) progressFill.style.width = '100%';
        if (statusText) statusText.innerText = "Laboratory Ready";

        this.loop(0);
    }

    handleInput() {
        const forceMag = 0.2;
        const turnSpeed = 0.05;

        if (this.keys['ArrowUp'] || this.keys['w']) {
            // Forward force based on car's current angle
            const engineForce = Vector.fromAngle(this.car.angle).mult(forceMag);
            this.car.applyForce(engineForce);
        }
        if (this.keys['ArrowDown'] || this.keys['s']) {
            const brakeForce = Vector.fromAngle(this.car.angle).mult(-forceMag / 2);
            this.car.applyForce(brakeForce);
        }
        if (this.keys['ArrowLeft'] || this.keys['a']) {
            this.car.angle -= turnSpeed;
        }
        if (this.keys['ArrowRight'] || this.keys['d']) {
            this.car.angle += turnSpeed;
        }
    }

    loop(timeStamp) {
        if (!this.isRunning) return;

        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.handleInput();
        this.car.update();
        this.car.draw(this.ctx);

        requestAnimationFrame((t) => this.loop(t));
    }
}

// Start game when everything is loaded
window.addEventListener('load', () => {
    // Hidden until fully loaded style
    document.getElementById('gameCanvas').style.opacity = "1";
    window.krdGame = new Game();
});
