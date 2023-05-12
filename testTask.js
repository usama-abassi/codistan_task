//PART 1
const text = "I am a master at strings";
//replace first occurance of a by using replace method
console.log("After replacing first occurance only: ", text.replace("a", "z"));
//replace all occurances of a by using replace method and regular expression
console.log("After replacing all occurances: ", text.replace(/a/g, "z"));
//0-based position of the first letter 'm'
console.log("Position of first m is: ", text.indexOf("m"));

//PART 2
const list = [2, 6, 3, 7, 9];
// Sum of only off numbers from list
let sum = 0;
for (let i = 0; i < list.length; i++) {
  if (list[i] % 2 !== 0) {
    sum += list[i];
  }
}
console.log("Sum of odd numbers is: ", sum);
// Sort the list highest to lowest
list.sort((a, b) => b - a);
console.log("List in decending order: ", list);
// Print the numbers in a ~ delimited string like '1~2~3'
console.log("Delimited string: " + list.join("~"));