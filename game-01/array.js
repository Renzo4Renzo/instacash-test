/*
  getFirstSubset(array,sum) max operations is now equal to the Math Combination formula (https://byjus.com/combination-formula/):
    n! / (n-r)! * r!
  where:
    n = amount of elements in array
    r = size of the subset (in this case, always is 2).
  For example, max operations for an array of 4 elements will be 6.
*/

let array = [2, 5, 8, 14, 0];
let sum = 10;

function getFirstSubset(array, sum) {
  let count = 0;
  for (i = 0; i < array.length - 1; i++) {
    for (j = i + 1; j < array.length; j++) {
      count++;
      console.log(`Test ${count}: [ ${array[i]} ${array[j]} ]`);
      if (array[i] + array[j] == sum) {
        return (sumArray = [array[i], array[j]]);
      }
    }
  }
  return false;
}

let subset = getFirstSubset(array, sum);
if (subset) console.log("Subset: [", subset[0], subset[1], "]");
else console.log("Subset not found!");
