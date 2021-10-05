	 let fs = require('fs');
	 let arg = process.argv;
	 inputData = fs.readFileSync('input.txt');
	 inputData = inputData.toString();
	 function reverseString(str){

	 return str.split("").reverse().join("");

	 }

	 function Node(letter, freq, used, father, code){
		 this.letter = letter;
		 this.freq = freq;
		 this.used = used;
		 this.father = father;
		 this.code = code;
	 }
	 
	 let alph = new Array();
	 let tree = new Array();
	 let lenmn = 0;
	 let i = 0;
	 
	 
	 for (i = 0; i < inputData.length; i++){
		 alph[inputData.charAt(i)] = 0;
	 }
	 for (i = 0; i < inputData.length; i++){
		 alph[inputData.charAt(i)]++;
	 }
	 
	 
	 for (i in alph){
		 let n = new Node(i, alph[i], false, null, '0');
		 tree.push(n);
		 lenmn++;
	 }
	 if (lenmn == 1){
		 answer = '0'.repeat(inputData.length);
		 fs.writeFileSync('output.txt', answer);
		 fs.writeFileSync('code.txt', inputData.charAt(i) + '0' + ' ');
	 }else{
		 let prmin = 100000000000000000;
		 let min = 10000000000000000000;
		 let minch = '';
		 let prminch = ''
		 let fmin = 0;
		 let fprmin = 0;
		 for (i = 0; i < tree.length; i++){
			 if (tree[i].freq < min){
				 min = tree[i].freq;
				 minch = tree[i].letter;
				 fmin = tree[i].freq;
			 }
		 }
		 for (i = 0; i < tree.length; i++){
			 if (tree[i].freq < prmin && tree[i].freq >= min && tree[i].letter != minch){
				 prmin = tree[i].freq;
				 prminch = tree[i].letter;
				 fprmin = tree[i].freq;
			 }
		 }
		 
		 
		 let n1 = new Node(prminch + minch, fmin + fprmin, true, null, '1');
		 tree.push(n1);
		 for (i = 0; i < tree.length; i++){
			  if (tree[i].letter == minch){
				  tree[i].code = '1';
				  tree[i].used = true;
				  tree[i].father = tree.length - 1;
			  }
			  if (tree[i].letter == prminch){
				  tree[i].code = '0';
				  tree[i].used = true;
				  tree[i].father = tree.length - 1;
			  }
		  }
		 
		 
		 while (tree.length < 2 * lenmn - 1){
			 let ind1 = tree.length - 1;
			 let ind2 = 0;
			 let provmin = 1000000000000000000000000000000000000;
			 for (i = 0; i < tree.length; i++){
				if (tree[i].freq < provmin && tree[i].used == false){
					provmin = tree[i].freq;
					ind2 = i;
				}
			 }
			 let n2 = new Node(tree[ind2].letter + tree[ind1].letter, tree[ind2].freq + tree[ind1].freq, true, null, '1');
			 tree.push(n2);
			 tree[ind1].father = tree.length - 1;
			 tree[ind2].father = tree.length - 1;
			 tree[ind2].used = true;
			 if (tree[tree.length - 1].letter.length == lenmn){
				 tree[tree.length - 1].code = '';
			 }
		 }
		 for (i = 0; i < lenmn; i++){
			 finalcode = tree[i].code;
			 thisel = tree[i];
			 while (thisel.father != null){
				 thisel = tree[thisel.father];
				 finalcode += thisel.code;
			 }
			 tree[i].code = reverseString(finalcode);
		 }
		 //console.log(tree);
		 dict = new Array();
		 for (i = 0; i < lenmn; i++){
			 dict[tree[i].letter] = 0;
		 }
		 for (i = 0; i < lenmn; i++){
			 dict[tree[i].letter] = tree[i].code;
		 }
		 //console.log(dict);
		 let answer = '';
		 for (i = 0; i < inputData.length; i++){
			 answer += dict[inputData.charAt(i)];
		 }
		 codes = '';
		 for (i in dict){
			 codes += i + dict[i] + ' ';
		 }
		 //console.log(codes);
		 fs.writeFileSync('output.txt', answer);
		 fs.writeFileSync('code.txt', codes);
	 }
	 
	 
	 
	 
 