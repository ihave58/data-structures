function runFunction(fn, retries = 3) {
	if(typeof fn !== "function") {
		throw new Error("invalidFnValue", fn);
	}

	return new Promise(async (resolve, reject) => {	
		let lastException;

		for(let i = 0; i < retries; i++) {
			try {
				const result = await fn(i);	
				
				resolve(result);
				break;
			} catch(ex) {
				console.log("Exception:", ex);
				lastException = ex;
			}		
		}

		reject(lastException);
	});

}


const fn1 = (retryCount) => {
	const delay = Math.floor(Math.random() * 100);
	console.log("fn1", retryCount, delay);

	return new Promise((resolve, reject) => setTimeout(() => {
		if(delay > 60) {
			resolve(delay);
		} else {
			reject(`unknownError fn1: ${retryCount}`)
		}
	}, delay * 100));
}

const fn2 = (retryCount) => {
	const delay = Math.floor(Math.random() * 100);
	console.log("fn2", retryCount, delay);

	return new Promise((resolve, reject) => setTimeout(() => {
		if(delay > 60) {
			resolve(delay);
		} else {
			reject(`unknownError fn2: ${retryCount}`)
		}
	}, delay * 100));
}

try {
	runFunction(fn1, 5).then(result => console.log(result));	
} catch(ex) {
}

try {
	runFunction(fn2, 5).then(result => console.log(result));	
} catch(ex) {
}

