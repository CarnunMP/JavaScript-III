/* The four principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. Window Binding: 'this' in global scope (or top-level function) refers to the window object.
* 2. Implicit Binding: 'this' in an object refers to the object.
* 3. New Binding: 'this' in an object constructor refers to the prototype. (?)
* 4. Explicit Binding: 'this' is explicitly assigned by call(), apply() [both invocations], or bind().
*
* write out a code example of each explanation above
*/

// Principle 1

// code example for Window Binding
const w = this; // Or:
let f = function() {
    console.log(this);
}
console.log(w);
f();

// Principle 2

// code example for Implicit Binding
let obj = {
    print: function() {
        console.log(this);
    }
}
obj.print();

// Principle 3

// code example for New Binding
// ---> See 'tasks' in prototype.js

// Principle 4

// code example for Explicit Binding
let g = function() {
    console.log(`'This' refers to ${this}.`);
}
g(); // 'This' refers to [object Window].
g.call("dog"); // 'This' refers to dog.

console.log("———");