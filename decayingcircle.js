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
        this.radius -= this.decayRate
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
var circleSize = 100
var circleDecayRate = 0.25

function getRandomColor()
{
    var r = Math.floor(Math.random() * 256)
    var g = Math.floor(Math.random() * 256)
    var b = Math.floor(Math.random() * 256)
    return "rgb(" + r + "," + g + "," + b + ")"
}

addEventListener("click", function(event)
{
    var circ = new Circle(
        event.x,
        event.y,
        circleSize,
        getRandomColor(),
        0, 0,
        circleDecayRate
    )
    circles.push(circ)
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
        if(circles[i].radius <= 0)
        {
            circles.splice(i, 1)
            i--
        }
    }
}

animate()
