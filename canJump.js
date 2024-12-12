const canJump1 = (numbers) => {
	if(numbers.length <= 1) {
		return true;
	}

	let _canJump = false;
	for(let index = 0; index < numbers[0]; index++) {
		_canJump = canJump1(numbers.slice(1 + index));

		if(_canJump) {
			return true;
		}
	}

	return _canJump;
}

const canJump2 = (numbers, startIndex = 0) => {
	// console.log(numbers, startIndex);

	if(numbers.length - 1 === startIndex) {
		return true;
	}

	for(let index = 1; index <= numbers[startIndex]; index++) {
		const _canJump = canJump2(numbers, startIndex + index);
		
		// console.log("_canJump", _canJump);

		if(_canJump) {
			return true;
		}
	}

	return false;
}

const canJump3 = (numbers, startIndex = 0, cache = new Array(numbers.length).fill(false)) => {
	// console.log(numbers, startIndex);

	if(numbers.length - 1 === startIndex) {
		return true;
	}

	for(let index = 1; index <= numbers[startIndex]; index++) {
		const _canJump = canJump3(numbers, startIndex + index, cache);
		
		cache[startIndex + index] = _canJump;
		console.log("cache", cache, startIndex);
		
		if(_canJump) {
			return true;
		}
	}

	
	return false;
}

const numbers = [2,3,1,1,4];
// const numbers = [3,2,1,0,4];
console.log(canJump1(numbers));
console.log(canJump2(numbers));
console.log(canJump3(numbers));