class SudokuNode {
    constructor(data) {
        this.data = data;
        this.solutionSet = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.isSolved = false;
    }

    addElement(element) {
        if(this.solutionSet.indexOf(element) < 0) {
            this.solutionSet.push(element);
        }
    }

    removeElement(element) {
        const elementIndex = this.solutionSet.indexOf(element);

        if(elementIndex >= 0) {
            this.solutionSet.splice(elementIndex, 1);
        }
    }
}

class Sudoku {
    constructor(map) {
        const mapLength = map[0].length,
            mapHeight = map.length;

        this.map = map;
        this.solutionMap = new ArrayClass(mapHeight, mapLength, (j, i) => {
            return new SudokuNode(this.map[i][j]);
        });
    }

    solve() {

    }
}