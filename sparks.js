class Circle
{
    constructor(x, y, radius, color, dx, dy, decayRate)
    {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.dx = dx
        this.dy = dy
        this.decayRate = decayRate
    }
    
    draw()
    {
        ctx.fillStyle = this.color
        
        ctx.beginPath()
        ctx.arc
        (
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        )
        ctx.fill()
    }
    
    update()
    {
        this.x += this.dx
        this.y += this.dy
        this.dx *= 1 - this.decayRate
        this.dy *= 1 - this.decayRate
        this.radius *= 1 - this.decayRate
    }

    randomizeVelocity(maxSpeed)
    {
        var speed = Math.random() * maxSpeed
        if(Math.random() < 0.5)
        {
            this.dx = speed * (2*Math.random() - 1)
            this.dy = (Math.round(Math.random()) * 2 - 1) * Math.sqrt(speed**2 - this.dx**2)
        }
        else
        {
            this.dy = speed * (2*Math.random() - 1)
            this.dx = (Math.round(Math.random()) * 2 - 1) * Math.sqrt(speed**2 - this.dy**2)
        }
    }
}

var canvas = document.querySelector("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var ctx = canvas.getContext("2d")

var circles = []
var numSpawned = 10
var spawnDelay = 500
var circleSize = 25
var circleDecayRate = 0.05
var mouseCircle = new Circle(
    canvas.width/2,
    canvas.height/2,
    circleSize,
    "white",
    0, 0, 0
)

function getRandomColor()
{
    var r = Math.floor(Math.random() * 256)
    var g = Math.floor(Math.random() * 256)
    var b = Math.floor(Math.random() * 256)
    return "rgb(" + r + "," + g + "," + b + ")"
}

addEventListener("mousemove", function(event)
{
    mouseCircle.x = event.x
    mouseCircle.y = event.y
})

addEventListener("keydown", function(event)
{
    if(event.key == " ")
    {
        alert(circles.length)
    }
})

function animate()
{
    requestAnimationFrame(animate)

    ctx.fillStyle = "#242424"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for(var i = 0; i < circles.length; i++)
    {
        circles[i].draw()
        circles[i].update()
        if(circles[i].radius <= 0.3)
        {
            circles.splice(i, 1)
            i--
        }
    }

    mouseCircle.draw()
}

function spawnCircles()
{
    for(var i = 0; i < numSpawned; i++)
    {
        var circ = new Circle(
            mouseCircle.x,
            mouseCircle.y,
            circleSize,
            getRandomColor(),
            0, 0,
            circleDecayRate
        )
        circ.randomizeVelocity(30)
        circles.push(circ)
    }
    setTimeout(spawnCircles, spawnDelay)
}

spawnCircles()
animate()
