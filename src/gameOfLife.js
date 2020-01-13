export const BOARD_TYPE = { FLAT: "FLAT", TOROIDAL: "TOROIDAL" }

export class GameOfLife {
  constructor(height, width, cyclesPerSecond, boardType) {
    this.setCyclesPerSecond(cyclesPerSecond)
    this.setWidth(width, false)
    this.setHeight(height, false)
    this.setBoardType(boardType)
  }

  setCyclesPerSecond(cyclesPerSecond) {
    this.cyclesPerSecond = cyclesPerSecond

    if(this._interval) {
      this.pause()
      this.run()
    }
  }

  setWidth(width, reset = true) {
    if(width < 1 || width > 100) return
    this.width = width
    if(reset) this.reset() 
  }

  setHeight(height, reset = true) {
    if(height < 1 || height > 100) return
    this.height = height
    if(reset) this.reset() 
  }

  setBoardType(boardType, reset = true) {
    this.boardType = boardType
    if(reset) this.reset()
  }

  toggleCell(rowIndex, cellIndex) {
    this.rows[rowIndex].cells[cellIndex].alive = !this.rows[rowIndex].cells[cellIndex].alive
    this.rows[rowIndex].cells[cellIndex].age = this.rows[rowIndex].cells[cellIndex].alive ? 1 : 0 
  }

  reset() {
    this.pause()
    this.cycle = 0
    this.rows = []

    for(let i = 0; i < this.height; i++) {
      this.rows.push({ index: i, cells: [] })
      for(let j = 0; j < this.width; j++) {
        this.rows[i].cells.push({ index: j, alive: false, age: 0 })
      }
    }
  }

  randomize(density) {
    this.reset()

    for(let row of this.rows) {
      for(let cell of row.cells) {
        if(Math.random() < density) this.toggleCell(row.index, cell.index)
      }
    }
  }

  run() {
    if(!this._interval) {
      const intervalTime = Math.round(1000 / this.cyclesPerSecond)
      this._interval = setInterval(() => this.step(), intervalTime)
    }
  }

  pause() {
    if(this._interval) {
      clearInterval(this._interval)
      this._interval = null
    }
  }

  step() {
    switch(this.boardType) {
      case BOARD_TYPE.FLAT:
        this._stepFlat()
        break
      case BOARD_TYPE.TOROIDAL:
        this._stepToroidal()
        break
      default: return
    }
  }

  _stepFlat() {
    let previousValues = []
    
    for(let i = 0; i < this.height; i++) {
      previousValues.push([])
      for(let j = 0; j < this.width; j++) {
        previousValues[i].push(this.rows[i].cells[j].alive)
        let numAliveNeighbors = 0

        for(let x = -1; x <= 1; x++) {
          for(let y = -1; y <= 1; y++) {
            if(x === 0 && y === 0) continue
            let rowIndex = i + x
            let cellIndex = j + y
            if(rowIndex >= 0 && rowIndex < this.height && cellIndex >= 0 && cellIndex < this.width) {
              if(x < 0 || (x === 0 && y < 0)) numAliveNeighbors += previousValues[rowIndex][cellIndex] ? 1 : 0
              else numAliveNeighbors += this.rows[rowIndex].cells[cellIndex].alive ? 1 : 0
            }
          }
        }

        if(numAliveNeighbors === 3 || (numAliveNeighbors === 2 && this.rows[i].cells[j].alive)) {
          this.rows[i].cells[j].alive = true
          this.rows[i].cells[j].age++
        } else {
          this.rows[i].cells[j].alive = false
          this.rows[i].cells[j].age = 0
        }
      }
    }

    this.cycle++
  }

  _stepToroidal() {
    let previousValues = []
    
    for(let i = 0; i < this.height; i++) {
      previousValues.push([])
      for(let j = 0; j < this.width; j++) {
        previousValues[i].push(this.rows[i].cells[j].alive)
        let numAliveNeighbors = 0

        for(let x = -1; x <= 1; x++) {
          for(let y = -1; y <= 1; y++) {
            if(x === 0 && y === 0) continue
            let rowIndex = i + x
            let cellIndex = j + y

            if(rowIndex < 0) rowIndex = this.height - 1
            if(rowIndex >= this.height) rowIndex = 0
            if(cellIndex < 0) cellIndex = this.width - 1
            if(cellIndex >= this.width) cellIndex = 0

            if(rowIndex < i || (rowIndex === i && cellIndex < j)) numAliveNeighbors += previousValues[rowIndex][cellIndex] ? 1 : 0
            else numAliveNeighbors += this.rows[rowIndex].cells[cellIndex].alive ? 1 : 0
          }
        }

        if(numAliveNeighbors === 3 || (numAliveNeighbors === 2 && this.rows[i].cells[j].alive)) {
          this.rows[i].cells[j].alive = true
          this.rows[i].cells[j].age++
        } else {
          this.rows[i].cells[j].alive = false
          this.rows[i].cells[j].age = 0
        }
      }
    }

    this.cycle++
  }
}