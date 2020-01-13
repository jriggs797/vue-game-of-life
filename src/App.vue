<template>
  <div id="app">
    <GameOfLifeControls :game="gameOfLife"
      :randomizationDensity="randomizationDensity"
      @step="step" 
      @run="run" 
      @pause="pause" 
      @reset="reset" 
      @randomize="randomize" 
      @setWidth="setWidth" 
      @setHeight="setHeight" 
      @setSpeed="setSpeed"
      @setRandomizationDensity="setRandomizationDensity"
      @setBoardType="setBoardType"/>
    <GameOfLifeBoard :game="gameOfLife" @toggleCell="toggleCell" />
  </div>
</template>

<script>
import { GameOfLife, BOARD_TYPE } from '@/gameOfLife';
import GameOfLifeControls from '@/components/GameOfLifeControls'
import GameOfLifeBoard from '@/components/GameOfLifeBoard'

export default {
  name: 'app',
  components: { GameOfLifeControls, GameOfLifeBoard },
  data: function() {
    return {
      gameOfLife: new GameOfLife(35, 35, 5, BOARD_TYPE.FLAT),
      randomizationDensity: 0.5
    }
  },
  methods: {
    step() {
      this.gameOfLife.step()
    },
    run() {
      this.gameOfLife.run()
    },
    pause() {
      this.gameOfLife.pause()
    },
    reset() {
      this.gameOfLife.reset()
    },
    randomize() {
      this.gameOfLife.randomize(this.randomizationDensity)
    },
    setWidth(width) {
      this.gameOfLife.setWidth(width)
    },
    setHeight(height) {
      this.gameOfLife.setHeight(height)
    },
    setSpeed(speed) {
      this.gameOfLife.setCyclesPerSecond(speed)
    },
    setRandomizationDensity(density) {
      this.randomizationDensity = density
    },
    setBoardType(boardType) {
      this.gameOfLife.setBoardType(boardType)
    },
    toggleCell(rowIndex, cellIndex) {
      this.gameOfLife.toggleCell(rowIndex, cellIndex)
    }
  }
}
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
}

.game-of-life-controls {
  margin-bottom: 20px;
}
</style>
