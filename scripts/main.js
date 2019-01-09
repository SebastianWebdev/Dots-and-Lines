const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// fajne ustawienia, ndots = 100
// range = 200
// class dot 
class Dot {
    constructor(radius, color, canvas, ctx, maxSpeed) {
        this.radius = radius
        this.posY = 0
        this.posX = 0
        this.speedY = 0
        this.speedX = 0
        this.color = color
        this.canvas = canvas
        this.ctx = ctx
        this.maxSpeed = maxSpeed;
        this.randomStart(this.canvas, this.maxSpeed);
        this.drow()
    }
    randomStart(canvas, maxSpeed) {
        const posX = Math.floor(Math.random() * canvas.width)
        const posY = Math.floor(Math.random() * canvas.height)
        const speedY = (Math.random() + 1) * maxSpeed + (Math.random() + 1) * maxSpeed * -1
        const speedX = (Math.random() + 1) * maxSpeed + (Math.random() + 1) * maxSpeed * -1
        this.posY = posY;
        this.posX = posX;
        this.speedX = speedX;
        this.speedY = speedY;
    }
    drow() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, true, )
        this.ctx.fill()
    }
}
// end of class dot//
// class line//


class Line {
    constructor(startX, startY, endX, endY, color, thickness) {
        this.startX = startX
        this.startY = startY
        this.endX = endX
        this.endY = endY
        this.color = color
        this.thickness = thickness
        this.drowLine()
    }
    drowLine() {

    }
}
// end of class line//

class Render {
    constructor(canvas, ctx, fps, nDots) {
        this.canvas = canvas
        this.ctx = ctx
        this.fps = fps
        this.nDots = nDots
        this.dots = []
        this.createDots(0.3, 2, "white")
        this.render(200);
        document.addEventListener("click", (e) => {
            const dot = new Dot(2, "white", this.canvas, this.ctx, 0.3);
            dot.posX = e.clientX;
            dot.posY = e.clientY;
            this.dots.push(dot);
        })


    }
    createDots(maxSpeed, radius, color, canvas = this.canvas, ctx = this.ctx, ammount = this.nDots) {
        for (let i = 0; i < ammount; i++) {
            const dot = new Dot(radius, color, canvas, ctx, maxSpeed);
            this.dots.push(dot);
        }
    }
    render(range, dots = this.dots, fps = this.fps, canvas = this.canvas, ctx = this.ctx) {
        setInterval(() => {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            let i2 = 0;
            for (let i = 0; i < dots.length; i++) {
                i2++;
                const posX = dots[i].posX;
                const posY = dots[i].posY;
                for (let i = i2; i < dots.length; i++) {
                    const posX2 = dots[i].posX;
                    const posY2 = dots[i].posY;
                    if (posX2 < posX + range && posX2 > posX - range && posY2 < posY + range && posY2 > posY - range) {
                        ctx.beginPath();
                        ctx.strokeStyle = "gray";
                        ctx.lineWidth = 1;
                        ctx.moveTo(posX, posY);
                        ctx.lineTo(posX2, posY2);
                        ctx.stroke()
                    }

                }




            }
            dots.forEach(dot => {
                dot.posX += dot.speedX;
                dot.posY += dot.speedY;
                dot.drow();
                if (dot.posX > canvas.width || dot.posX < 0) {
                    dot.speedX *= -1;

                }
                if (dot.posY > canvas.height || dot.posY < 0) {
                    dot.speedY *= -1;
                }
            });

        }, 1000 / fps)


    }
}
const render = new Render(canvas, ctx, 60, 30);