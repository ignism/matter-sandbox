import Matter from 'matter-js'

let world = {
  width: window.innerWidth / 2,
  height: window.innerHeight
}

// module aliases
const Engine = Matter.Engine
const Render = Matter.Render
const World = Matter.World
const Bodies = Matter.Bodies
const Body = Matter.Body

let debug = document.getElementById('debug');

// create an engine
let engine = Engine.create();

var render = Render.create({
    element: debug,
    engine: engine,
    options: {
      width: world.width,
      height: world.height
    }
});

// create two boxes and a ground
let boxA = Bodies.rectangle(world.width / 2, world.height / 2, 40, 80);

let wallTop    = Bodies.rectangle(world.width / 2, 4, world.width, 8, { isStatic: true });
let wallBottom = Bodies.rectangle(world.width / 2, world.height - 4, world.width, 8, { isStatic: true });
let wallLeft   = Bodies.rectangle(4, world.height/2, 8, world.height, { isStatic: true });
let wallRight  = Bodies.rectangle(world.width - 4, world.height/2, 8, world.height, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [boxA, wallTop, wallBottom, wallLeft, wallRight]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);


const update = () => {
  window.requestAnimationFrame(update)
}

const renderElementFromBody = (element, body) => {
  element.style.left = body.position.x + 'px'
  element.style.top = body.position.y + 'px'
  element.style.transform = 'rotate(' + body.angle + 'rad)'
}

window.requestAnimationFrame(update)
window.onresize = (event) => {
  world = {
    width: window.innerWidth / 2,
    height: window.innerHeight
  }

  render.canvas.width = world.width
  render.canvas.height = world.height

  resetWall(wallTop, world.width, 8, 0)
  resetWall(wallBottom, world.width, 8, world.height - 8)
  resetWall(wallLeft, 8, world.height, 0)
  resetWall(wallRight, 8, world.height, world.width - 8)
}

let resetWall = (body, width, height, offset) => {
  let position = { x: width / 2, y: height / 2 }
  let vertices = [
    {x: 0, y: 0},
    {x: width, y: 0},
    {x: width, y: height},
    {x: 0, y: height}
  ]

  if (width > height) {
    vertices[0].y += offset
    vertices[1].y += offset
    vertices[2].y += offset
    vertices[3].y += offset
    position.y += offset
  } else {
    vertices[0].x += offset
    vertices[1].x += offset
    vertices[2].x += offset
    vertices[3].x += offset
    position.x += offset
  }

  Body.setPosition(body, position)
  Body.setVertices(body, vertices)
}