class Circle//made by gurpreet
{
    constructor(x, y, radius, color, dx, dy, decayRate)
    {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.alpha = 0.01
        this.dx = dx
        this.dy = dy
        this.decayRate = decayRate
    }
    
    draw()
    {
        ctx.fillStyle = this.color//made by gurpreet
        var oldAlpha = ctx.globalAlpha
        ctx.globalAlpha = this.alpha
        
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
        ctx.globalAlpha = oldAlpha
    }
    
    update()
    {
        this.x += this.dx
        this.y += this.dy
        this.alpha = Math.min(1,this.alpha)
        if(this.alpha==1){
            this.decayRate = this.decayRate*-1//made by gurpreet
            this.alpha = Math.max(0, this.alpha + this.decayRate)
        }if(this.alpha<1){
            this.alpha = Math.max(0, this.alpha + this.decayRate)
        }
    }

    randomizeVelocity(maxSpeed)
    {
        var speed = Math.random() * maxSpeed
        if(Math.random() < 0.5)
        {//made by gurpreet
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
//made by gurpreet
var circles = []
var circleSize = 5
var circleDecayRate = 0.04
var mouseCircle = new Circle(
    canvas.width/2,
    canvas.height/2,
    circleSize,
    "white",
    0, 0, 0
)

function getRandomColor()//made by gurpreet
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
//made by gurpreet
addEventListener("keydown", function(event)
{
    if(event.key == " ")
    {
        alert(circles.length)//made by gurpreet
    }
})

function animate()
{
    requestAnimationFrame(animate)

    ctx.fillStyle = "#242424"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    var circ = new Circle(
        mouseCircle.x,
        mouseCircle.y,
        circleSize,//made by gurpreet
        getRandomColor(),
        0, 0,
        circleDecayRate
    )
    circ.randomizeVelocity(5)
    circles.push(circ)

    for(var i = 0; i < circles.length; i++)
    {
        circles[i].draw()//made by gurpreet
        circles[i].update()
        if(circles[i].alpha <= 0)
        {
            circles.splice(i, 1)
            i--
        }
    }//made by gurpreet

    mouseCircle.draw()
}

animate()
