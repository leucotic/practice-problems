var map1 = [[1, 0, 1, 0, 1, 0, 0, 1, 0],
	    [1, 0, 0, 1, 1, 0, 0, 1, 0],
	    [1, 0, 1, 0, 1, 0, 0, 1, 0],
	    [0, 0, 0, 0, 1, 0, 0, 0, 0],
	    [0, 0, 0, 1, 1, 1, 0, 1, 0],
	    [0, 0, 1, 0, 1, 0, 0, 1, 0]];

function findLand(mymap){
	let mapwidth = mymap[0].length;
	let mapheight = mymap.length;
	let land = [];
		for(y = 0; y < mapheight; y++){
		for(x = 0; x < mapwidth; x++){
			if(mymap[y][x]===1){
			   land.push({"x":x,"y":y});
			}
		}
	}
	return land;
}

function makeIsland(pointsLeft){
	let newPoint = pointsLeft.pop(); 
	let workPath = [newPoint]; //current island exploration

	for(i = 0; i<workPath.length; i++){ 
		let currentPoint = workPath[i];
		for(j = pointsLeft.length-1; j>=0; j--){
			let point = pointsLeft[j];

			//if the point is adjacent
			if((currentPoint.y == point.y && ((currentPoint.x - 1) == point.x || (currentPoint.x + 1) == point.x))||(currentPoint.x == point.x && ((currentPoint.y - 1) == point.y || (currentPoint.y + 1) == point.y))){

				workPath.push(point);					
				pointsLeft.splice(j,1);
				if(j < pointsLeft.length) j++; //unless first one is a hit
			} 
		}
	} 

	return [pointsLeft, workPath];
}

function countIslands(mymap){
	let islands = [];
	let pointsLeft = findLand(mymap);

	do { // if workPath runs out just go to the next point
		let island = makeIsland(pointsLeft);
		pointsLeft = island[0];
		islands.push(island[1]);
	} while(pointsLeft.length > 0);
	return islands.length;
}

console.log(countIslands(map1));
