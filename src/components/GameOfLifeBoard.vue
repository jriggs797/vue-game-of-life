<template>
  <div class="game-of-life-board">
    <div class="board" :style="boardStyle">
      <div v-for="row in game.rows" :key="row.index" class="row">
        <div v-for="cell in row.cells" :key="cell.index" class="cell" @click.prevent="clickCell(row.index, cell.index)" @mouseover="mouseoverCell(row.index, cell.index)" :style="getCellStyle(cell)"></div>
      </div>
    </div>
    <span class="cycle-number">Cycle Number: {{game.cycle}}</span>
  </div>
</template>

<script>
export default {
  name: 'game-of-life-board',
  props: ['game'],
  data: function() {
    return {
      shiftDown: false,
      ctrlDown: false
    }
  },
  methods: {
    clickCell: function(rowIndex, cellIndex) {
      if(!this.shiftDown) this.toggleCell(rowIndex, cellIndex)
    },
    mouseoverCell: function(rowIndex, cellIndex) {
      if(this.shiftDown && !this.ctrlDown && !this.game.rows[rowIndex].cells[cellIndex].alive) this.toggleCell(rowIndex, cellIndex)
      if(this.shiftDown && this.ctrlDown && this.game.rows[rowIndex].cells[cellIndex].alive) this.toggleCell(rowIndex, cellIndex) 
    },
    toggleCell: function(rowIndex, cellIndex) {
      this.$emit('toggleCell', rowIndex, cellIndex)
    },
    getCellStyle: function(cell) {
      if(!cell.alive) return 'background: #333340'

      if(cell.age < 10) {
        let hue = 270 - (27 * (cell.age - 1))
        return `background: hsl(${hue}, 100%, 65%)`
      }
      else {
        return 'background: hsl(0, 100%, 65%)'
      }
    }
  },
  computed: {
    boardStyle: function() {
      if(this.game.width > this.game.height) {
        return { width: '100%', height: `${(this.game.height/this.game.width) * 100}%` }
      }
      
      if(this.game.width < this.game.height) {
        return { width: `${(this.game.width/this.game.height) * 100}%`, height: '100%' }
      }

      return { width: '100%', height: '100%' }
      
    },
  },
  created() {
    document.onkeydown = (evt) => {
      evt = evt || window.event
      if(evt.keyCode === 16) this.shiftDown = true
      if(evt.keyCode === 17) this.ctrlDown = true
    }

    document.onkeyup = (evt) => {
      evt = evt || window.event
      if(evt.keyCode === 16) this.shiftDown = false
      if(evt.keyCode === 17) this.ctrlDown = false
    }
  }
}
</script>

<style scoped>
.game-of-life-board {
  height: 85vmin;
  width: 85vmin;
  display: flex;
  flex-direction: column;
}

.board {
  align-self: center;
  display: flex;
  flex-direction: column;
  padding: 1px;
  background: #505058;
}

.row {
  display: flex;
  height: 100%;
  width: 100%;
}

.cell {
  border: 1px solid #505058;
  height: 100%;
  width: 100%;
}

.cycle-number {
  line-height: 1.6rem;
}
</style>