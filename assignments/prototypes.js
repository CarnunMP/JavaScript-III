/*

  In order to do these exercises you'll need your newly acquired knowledge on
  constructor functions, methods, prototypes and the `this` keyword.
  Here's an example of an exercise:

  TASK 0:

  - Build an Airplane constructor that takes a name.
  - Give airplanes the ability to take off and land.
  - If a plane takes off, its "isFlying" property is true.
  - If a plane lands, its "isFlying" property is false.

  SOLUTION CODE:

  function Airplane(name) {
    this.name = name;
    this.isFlying = false;
  }
  Airplane.prototype.takeOff = function () {
    this.isFlying = true;
  }
  Airplane.prototype.land = function () {
    this.isFlying = false;
  }

  HOW TO TEST OUR SOLUTION:

  const jumbo = new Airplane('Jumbo');
  console.log(jumbo.name)              // 'Jumbo'
  console.log(jumbo.isFlying)          // false
  jumbo.takeOff();
  console.log(jumbo.isFlying)          // true
  jumbo.land();
  console.log(jumbo.isFlying)          // false
*/

/*
  TASK 1

  - Build a Person Constructor that takes name and age.
  - Give persons the ability to greet by returning a string stating name and age.
  - Give persons the ability to eat edibles.
  - When eating an edible, it should be pushed into a "stomach" property which is an array.
  - Give persons the ability to poop.
  - When pooping, the stomach should empty.
*/
function Person(name, age) {
  this.name = name;
  this.age = age;

  this.stomach = [];
}
Person.prototype.greet = function() {
  return `Hello! My name is ${this.name} and I am ${this.age} years old.`;
}
Person.prototype.eat = function(edible) {
  this.stomach.push(edible);
}
Person.prototype.poop = function() {
  this.stomach = [];
}

// I did my testing in the console! :)

/*
  TASK 2

  - Build a Car constructor that takes model name and make.
  - Give cars the ability to drive a distance.
  - By driving a car, the distance driven should be added to an "odometer" property.
  - Give cars the ability to crash.
  - A crashed car can't be driven any more. Attempts return a string "I crashed at x miles!", x being the miles in the odometer.
  - Give cars the ability to be repaired.
  - A repaired car can be driven again.
*/
function Car(model, name, make) {
  this.model = model;
  this.name = name;
  this.make = make;

  this.odometer = 0;
  this.functional = true;
}
Car.prototype.drive = function(distance){
  if (!this.functional) { return `I crashed at ${this.odometer} miles!` }
  this.odometer += distance;
}
Car.prototype.crash = function() {
  this.functional = false;
}
Car.prototype.repair = function() {
  this.functional = true;
}

/*
  TASK 3

  - Build a Baby constructor that subclasses the Person built earlier.
  - Babies of course inherit the ability to greet, which can be strange.
  - Babies should have the ability to play, which persons don't.
  - By playing, a string is returned with some text of your choosing.
*/
function Baby(name, age) {
  Person.call(this, name, age);
}
Baby.prototype = Object.create(Person.prototype);
Baby.prototype.play = function() {
  return `I'm better than you at this game, and I'm only ${this.age}...`
}

/*
  TASK 4

  Use your imagination and come up with constructors that allow to build objects
  With amazing and original capabilities. Build 3 small ones, or a very
  complicated one with lots of state. Surprise us!
*/
function Enemy(id, positionXY, hitboxXY, hp, speed, strength) {
  this.id = id;
  this.positionXY = positionXY;
  this.hitboxXY = hitboxXY;
  this.hp = hp;
  this.speed = speed;
  this.strength = strength;

  this.type;
}
Enemy.prototype.takeDamage = function(amount) {
  this.hp -= amount;
  this.isDead(); // This evaluation is just getting thrown away, at present... but you can see where it might come in handy!
}
Enemy.prototype.isDead = function() {
  if (this.hp <= 0) {
    console.log(`Enemy #${this.id} is dead`);
    return true;
  } else {
    return false;
  }
}

function Slime(id, positionXY, hitboxXY = [10, 10], hp = 5, speed = 1, strength = 1, type = "basic") {
  Enemy.call(this, id, positionXY, hitboxXY, hp, speed, strength);

  this.type = type;
}
Slime.prototype = Object.create(Enemy.prototype);
Slime.prototype.jump = function(unitDirectionXY) {
  this.positionXY[0] += (unitDirectionXY[0] * this.speed);
  this.positionXY[1] += (unitDirectionXY[1] * this.speed);

  if (this.type === "leaky") { 
    this.hp -= 1;
  }
}

function BombBeetle(id, positionXY, hitboxXY, hp = 7, speed = 1, strength = 2, type = "basic", range = 25) {
  Enemy.call(this, id, positionXY, hitboxXY, hp, speed, strength);
  
  this.type = type;
  this.range = range;
}
BombBeetle.prototype = Object.create(Enemy.prototype);
BombBeetle.prototype.spit = function(unitDirectionXY) {
  if (playerIsInRange(this.positionXY, playerPosition, this.range)) {
    console.log(`Enemy ${this.id} has spit a projectile in the direction of [${unitDirectionXY}]!`);
  } else {
    console.log(`Enemy ${this.id} is too far away from the player to spit!`);
  }
}
let playerPosition = [100, 100]; // Hardcoding for now.
let playerIsInRange = function(mobPositionXY, playerPositionXY, range) {
  let xDiff = Math.abs(mobPositionXY[0] - playerPositionXY[0]);
  let yDiff = Math.abs(mobPositionXY[1] - playerPositionXY[1]);
  
  console.log(Math.sqrt( (xDiff * xDiff) + (yDiff * yDiff)));
  return Math.sqrt( (xDiff * xDiff) + (yDiff * yDiff) ) <= range;
}


// Some tests for Task 4 (also used console):
var slime1 = new Slime(1, [100, 100]); // Q: Any way around ordering these args like the parent orders them?
console.log(slime1);

var slime2 = new Slime(2, [120, 150], undefined, undefined, undefined, undefined, "leaky");
console.log(slime2);

var bombBeetle1 = new BombBeetle(3, [110, 110], [15, 10]);
console.log(bombBeetle1);

console.log("———")

/*

  STRETCH TASK

  Object oriented design is commonly used in video games. You will be implementing several constructor functions with their correct inheritance hierarchy.
  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.
  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.

  Each constructor function has unique properties and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/
function GameObject(createdAt, name, dimensions) {
  this.createdAt = createdAt;
  this.name = name;
  this.dimensions = dimensions;
}
GameObject.prototype.destroy = function() {
  return `${this.name} was removed from the game.`;
}

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/
function CharacterStats(createdAt, name, dimensions, healthPoints) {
  GameObject.call(this, createdAt, name, dimensions);
  this.healthPoints = healthPoints;
}
CharacterStats.prototype = Object.create(GameObject.prototype);
CharacterStats.prototype.takeDamage = function() {
  return `${this.name} took damage.`;
}

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
function Humanoid(createdAt, name, dimensions, healthPoints, team, weapons, language) {
  CharacterStats.call(this, createdAt, name, dimensions, healthPoints);
  this.team = team;
  this.weapons = weapons;
  this.language = language;
}
Humanoid.prototype = Object.create(CharacterStats.prototype);
Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}.`;
}

/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:

  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    healthPoints: 5,
    name: 'Bruce',
    team: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Tongue',
  });
  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 15,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Tongue',
  });
  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 10,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });
  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.healthPoints); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.team); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.
