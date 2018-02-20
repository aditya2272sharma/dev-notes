var iteration;
var a = [3, 5, 9, 6, 8, 20, 10, 12, 18, 9];
var n = a.length;
var i = Math.floor(n/2);

iteration = 1;
for(i = Math.floor(n/2); i>=0; i--) {
  MaxHeapify(a, i);
}
console.log(iteration, a);

iteration = 1;
for(i = Math.floor(n/2); i>=0; i--) {
  MinHeapify(a, i);
}
console.log(iteration, a);

function MaxHeapify(a, i) {
  var left = 2 * i + 1;
  var right = 2 * i + 2;
  var max = a[left] > a[right] ? left : right;
  var temp = null;
  iteration++;

  if(a[i] < a[max]) {
    temp = a[max];
    a[max] = a[i];
    a[i] = temp;
    MaxHeapify(a, max);
  }
}

function MinHeapify(a, i) {
  var left = 2 * i + 1;
  var right = 2 * i + 2;
  var min = a[left] < a[right] ? left : right;
  var temp = null;
  iteration++;

  if(a[i] > a[min]) {
    temp = a[min];
    a[min] = a[i];
    a[i] = temp;
    MinHeapify(a, min);
  }
}
