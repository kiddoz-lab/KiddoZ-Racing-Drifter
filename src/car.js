/**
 * Car class using Vector physics for KRD.
 */
class Car {
    constructor(canvasWidth, canvasHeight) {
        this.pos = new Vector(canvasWidth / 2, canvasHeight / 2);
        this.vel = new Vector(0, 0);
        this.acc = new Vector(0, 0);
        this.angle = 0;
        this.maxSpeed = 5;
        this.friction = 0.98;
        
        this.width = 40;
        this.height = 20;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.vel.mult(this.friction);
        this.acc.mult(0); // Reset acceleration each frame
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        
        // Calculate heading from velocity
        if (this.vel.mag() > 0.1) {
            this.angle = Math.atan2(this.vel.y, this.vel.x);
        }
        
        ctx.rotate(this.angle);

        // Draw Car Body
        ctx.fillStyle = "#ff3e00";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(255, 62, 0, 0.5)";
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        
        // Draw Cockpit/Windshield
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fillRect(0, -this.height / 3, this.width / 3, (this.height * 2) / 3);
        
        ctx.restore();

        // Vector Visualization
        this.drawVector(ctx, this.vel, "#00aaff", "Velocity");
    }

    drawVector(ctx, vector, color, label) {
        const scale = 20;
        if (vector.mag() < 0.1) return;

        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(this.pos.x + vector.x * scale, this.pos.y + vector.y * scale);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Arrow head
        const angle = Math.atan2(vector.y, vector.x);
        ctx.save();
        ctx.translate(this.pos.x + vector.x * scale, this.pos.y + vector.y * scale);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-10, -5);
        ctx.lineTo(-10, 5);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }
}

window.Car = Car;
