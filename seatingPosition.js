/**
 * @param {number} n
 */
var ExamRoom = function(n) {
    this.seats = new Array(n);

    this.initNext();
};

ExamRoom.prototype.initNext = function() {
    if(this.next == null) {
        this.next = 0;
        return;        
    } else if(this.seats[this.seats.length - 1] == null) {
        this.next = this.seats.length - 1;;
        return;
    }


    let maxDistance = 0;
    let maxDistanceStartIndex = null;
    let currentDistanceStartIndex = null;

    for(let index = 0; index < this.seats.length; index++) {
        if(this.seats[index]) {
            currentDistanceStartIndex = index;
        } else {
            if(currentDistanceStartIndex != null) {
                
                if(index - currentDistanceStartIndex > maxDistance) {
                    maxDistance = index - currentDistanceStartIndex;
                    maxDistanceStartIndex = currentDistanceStartIndex;
                }

                //console.log("#", index, currentDistanceStartIndex, maxDistance);
            }
        }
    }

    if(maxDistance) {
        this.next = maxDistanceStartIndex + Math.ceil(maxDistance / 2);
    }

    console.log("#", this.next, maxDistanceStartIndex, maxDistance);
}

/**
 * @return {number}
 */
ExamRoom.prototype.seat = function() {
    const next = this.next;
    this.seats[next] = true;
    
    this.initNext();
    return next;
};

/** 
 * @param {number} p
 * @return {void}
 */
ExamRoom.prototype.leave = function(index) {
    this.seats[index] = false;
    this.initNext();
};