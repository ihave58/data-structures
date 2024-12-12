const tree = {
	value: 1,
	nodes: [
		{
			value: 2,
			nodes: [
				{
					value: 3,
					nodes: [
						{
							value: 4
						}
					]
				}
			]
		},{
			value: 5,
			nodes: []
		},{
			value: 6,
			nodes: []
		},{
			value: 7,
			nodes: [
				{
					value: 9,
					nodes: [
						{
							value: 10,
							nodes: [
								{
									value: 11,
									nodes: [
										{
											value: 12,
											nodes:[
												{
													value: 14,
													nodes: []
												}
											]
										}
									]
								}
							]
						},{
							value: 13,
							nodes: []
						},{
							value: 14,
							nodes: []
						},{
							value: 15,
							nodes: []
						},{
							value: 16,
							nodes: []
						}
					]
				}
			]
		},{
			value: 8,
			nodes: []
		}
	]
};


function findDepth(root) {	
	
	if(!root.nodes || !root.nodes.length) {
		return 0;
	}
	
	let maxDepth = 0;
	
	for(let node of root.nodes) {
		maxDepth = Math.max(findDepth(node) + 1, maxDepth);
	}
	
	return maxDepth;
}

findDepth(tree);