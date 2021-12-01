let array = [2, 5, 8, 13, 1, 0];
let sum = 13;

function getFirstPossible(array, sum) {
  let sumArray = [];
  let found = false;
  for (i = 0; i < array.length; i++) {
    if (found) {
      break;
    } else {
      for (j = 0; j < array.length; j++) {
        if (array[i] == array[j]) {
          continue;
        } else if (array[i] + array[j] == sum) {
          found = true;
          sumArray[0] = array[i];
          sumArray[1] = array[j];
          console.log("Subset: [", sumArray[0], sumArray[1], "]");
          break;
        }
      }
    }
  }
  if (!found) {
    console.log("Cannot find any subset for: ", sum);
  }
}

getFirstPossible(array, sum);
