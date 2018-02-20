var iteration;
var a = [3, 5, 9, 6, 8, 20, 10, 12, 18, 9];
var start = 0;
var n = (a.length-start);
var i = Math.floor(n/2);

iteration = 1;
for(i = Math.floor(n/2); i>=start; i--) {
  MaxHeapify(a, i);
}


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

function extractMax(a) {
  start++;
  return a[start];
}

function findKthLargest(k) {
  
}
