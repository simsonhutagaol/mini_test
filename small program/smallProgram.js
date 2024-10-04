let numArray = Array.from({ length: 100 }, (_, i) => i + 1);

function isPrimeNumber(num) {
  if (num < 2) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

let result = [];

for (let num of numArray.reverse()) {
  if (isPrimeNumber(num)) {
    continue;
  } else if (num % 3 === 0 && num % 5 === 0) {
    result.push("FooBar");
  } else if (num % 3 === 0) {
    result.push("Foo");
  } else if (num % 5 === 0) {
    result.push("Bar");
  } else {
    result.push(num);
  }
}

console.log(result.join(", "));
