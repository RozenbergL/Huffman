let fs = require('fs');
let arg = process.argv;
let i = 0;
let l = 0;
let code = '';
let lenmn = 0;
inputData = fs.readFileSync('output.txt');
inputData = inputData.toString();

dict = fs.readFileSync('code.txt');
dict = dict.toString();
let alph = new Array();
for (i = 0; i < dict.length; i++){
	if (dict.charAt(i) == ' '){
		code = dict.substring(l + 1, i);
		alph[code] = dict.charAt(l);
		lenmn++;
		l = i + 1;
		code = '';
	}
}
let left = 0;
let right = 0;
let answer = '';
while (right < inputData.length){
	if (inputData.charAt(right) == '0'){
		answer += alph[inputData.substring(left, right + 1)];
		left = right + 1;
	}
	if (right - left == lenmn - 2){
		answer += alph[inputData.substring(left, right + 1)];
		left = right + 1;
	}
	right++;
}
fs.writeFileSync('decode.txt', answer);