const jsonData = require('./counts.json');

console.log(jsonData);

console.log(typeof(jsonData));

console.log(Object.keys(jsonData));

console.log(jsonData['mainPage']['url']);

// const result = function(data){
//     data = JSON.parse(data);
//     console.log(data);
//     data.forEach(function(element) {
//         console.log(element);
//     });

// };

// result(jsonData);