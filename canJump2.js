const canJump = (numbers) => {
	if(numbers.length <= 1) {
		return true;
	}

	let _canJump = false;
	for(let index = 0; index < numbers[0]; index++) {
		_canJump = canJump(numbers.slice(1 + index));

		if(_canJump) {
			return true;
		}
	}

	return _canJump;
}

const numbers = [2,3,1,1,4];
// const numbers = [3,2,1,0,4];
console.log(canJump(numbers));