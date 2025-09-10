
let a = "";
let b = ""; 
let sign = "";
let finish = false;

const digits = ['0', '1', '2', '3', '4', '5', '6', '7' ,'8', '9', '.'];
const operations = ['+', '×', '-', '÷'];


const out = document.querySelector('.calculation__result');
const log = document.querySelector('.calculation-log__text');



const clearAll = function( ) {
  a = '';
  b = '';
  
  sign = '';
  finish = false;
  out.textContent = 0;
  log.textContent =  0;
}

function formatResult(num) {
    if (num === 0) return '0';
    const absNum = Math.abs(num);

    if (absNum >= 100000 || absNum < 0.01) {
        return num.toExponential(1); 
    }

    let str = num.toString();
    if (str.length > 5) {
        str = Number(num).toPrecision(5);
    }
    return str;
}


document.querySelector('.keyboard').onclick = (event) => {


  const btn = event.target.closest('.keyboard__button'); 
  if (!btn) return; 
  
  if (btn.classList.contains('keyboard__button--ac')) {
    clearAll();
    return;
  }

  if (btn.classList.contains('keyboard__button--number')){
    let key = btn.textContent
	if (key === '.' && a.includes('.') && sign === "") return;
	if (key === '.' && b.includes('.') && sign !== "") return;

	if (digits.includes(key)) {
		if (finish) {
			a = key === '0' ? '0' : key;  
			b = "";
			sign = ""; 
			finish = false;
			
		} else if (b === "" && sign === "") {
			if (a === '0' && key === '0') return; 
    		if (a === '0' && key !== '.') a = key;
			else if (a.length < 5) a += key;
		} else {
			if (a === '0' && key === '0') return; 
    		if (a === '0' && key !== '.') a = key;
			else if (b.length < 5) b += key;
		}
		out.textContent = sign === "" ? a : b;
		log.textContent = `${a} ${sign} ${b}`;
		return;
}

  }


  if (btn.classList.contains('keyboard__button--operator')){
    let key = btn.textContent
    if (operations.includes(key)){
		if (finish) finish = false;
      sign = key;
	  if(a === ''){
		a = 0;
	  }
	  if (b === '') b = '';
      out.textContent = sign;
	  log.textContent = `${a} ${sign} ${b}`
      return;
    }
  }

  if (btn.textContent === "+/-"){
	if (b === "" && sign === ""){
        a = (-1) * a;
        out.textContent = a;
		
      }
      else if(a !== "" && b !== "" && finish) {
		a = (-1) * a;
		out.textContent = a;
      }
      else{
        b  = (-1) * b;
        out.textContent = b;
      }

	  log.textContent = `${a} ${sign} ${b}`

      return;
  }

	if (btn.textContent === '⌫') {
		if (sign !== "" && !finish) {
			if (b.length > 0) {
				b = b.slice(0, -1);
				out.textContent = b === '' ? '0' : b;
			}
		} 
		else if (finish) {
			a = a.slice(0, -1);
			if (a === '') a = '0';
			out.textContent = a;
			finish = false; 
		} 
		else {
			a = a.slice(0, -1);
			if (a === '') a = '0';
			out.textContent = a;
		}

		log.textContent = sign === "" ? a : `${a} ${sign} ${b}`;
		return;
	}




  if (btn.textContent === '='){
	if (b === "") b = a;
    switch (sign) {
    	case "+":
			a = (+a) + (+b);
			break;
		case '-':
			a = (+a) - (+b); 
			break;
		case '×':
			a = (+a) * (+b);

			break;
		case '÷':
			if (b === '0'){
				out.textContent = 'Error';
				a = '';
				b = '';
				sign = '';
				finish = false;
				return
			}
			a = (+a) / (+b);
			break;
			

    }
	a = formatResult(a);
	b = '';
	sign = '';
	finish = true;

	out.textContent = a;
	log.textContent = `${a}`
	
  }

}
