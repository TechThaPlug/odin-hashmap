import { HashMap, HashSet } from "./hashmap.js";

const test = new HashMap(0.75);

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log("--- after 12 entries ---");
console.log("length:", test.length());
console.log("capacity:", test.capacity());
console.log("load level:", test.loadLevel());

test.set("apple", "green");
test.set("dog", "white");
test.set("lion", "bronze");

console.log("--- after overwriting ---");
console.log("length:", test.length());
console.log("capacity:", test.capacity());
console.log("apple:", test.get("apple"));

test.set("moon", "silver");

console.log("--- after adding moon ---");
console.log("length:", test.length());
console.log("capacity:", test.capacity());
console.log("load level:", test.loadLevel());
console.log("bucket sizes:", test.bucketSizes());

test.set("banana", "gold");
test.set("hat", "red");

console.log("--- after overwriting again ---");
console.log("length:", test.length());
console.log("capacity:", test.capacity());
console.log("banana:", test.get("banana"));
console.log("hat:", test.get("hat"));

console.log("--- other methods ---");
console.log("get moon:", test.get("moon"));
console.log("get zebra:", test.get("zebra"));
console.log("has lion:", test.has("lion"));
console.log("has zebra:", test.has("zebra"));
console.log("remove kite:", test.remove("kite"));
console.log("remove kite again:", test.remove("kite"));
console.log("length:", test.length());
console.log("keys:", test.keys());
console.log("values:", test.values());
console.log("entries:", test.entries());

test.clear();
console.log("--- after clear ---");
console.log("length:", test.length());
console.log("keys:", test.keys());

console.log("--- HashSet ---");
const set = new HashSet();
set.add("red");
set.add("green");
set.add("red");
console.log("length:", set.length());
console.log("has red:", set.has("red"));
console.log("has blue:", set.has("blue"));
console.log("keys:", set.keys());