<template>
  <div class="game-of-life-controls">
    <h1>Game of Life</h1>
    <div class="game-controls">
      <button @click.prevent="step" class="step-forward-button" title="Step Forward"><FontAwesomeIcon icon="step-forward" /></button>
      <button @click.prevent="run" class="run-button" title="Run"><FontAwesomeIcon icon="play" /></button>
      <button @click.prevent="pause" class="pause-button" title="Pause"><FontAwesomeIcon icon="pause" /></button>
      <button @click.prevent="reset" class="reset-button" title="Reset"><FontAwesomeIcon icon="redo" /></button>
      <button @click.prevent="randomize" class="randomize-button" title="Randomize"><FontAwesomeIcon icon="dice" /></button>
    </div>
    <div class="game-options">
      <button @click.prevent="showSettings = !showSettings" class="settings-button"><FontAwesomeIcon icon="cogs" /></button>
      <div class="blocker" v-if="showSettings" z-index="100" @click="showSettings = false"></div>
      <div v-if="showSettings" class="options-dropdown" z-index="102">
        <div class="option-input-group">
          <label for="width-input">Width: {{game.width}}</label>
          <input id="width-input" type="range" min="1" max="70" :value="game.width" @change="setWidth($event.target.value)" />
        </div>
        <div class="option-input-group">
          <label for="width-input">Height: {{game.height}}</label>
          <input id="height-input" type="range" min="1" max="70" :value="game.height" @change="setHeight($event.target.value)" />
        </div>
        <div class="option-input-group">
          <label for="speed-input">Cycles/Second: {{game.cyclesPerSecond}}</label>
          <input id="speed-input" type="range" min="1" max="10" :value="game.cyclesPerSecond" @change="setSpeed($event.target.value)" />
        </div>
        <div class="option-input-group">
          <label for="randomization-density-input">Randomization Density: {{randomizationDensity}}</label>
          <input id="randomization-density-input" type="range" min="0.01" max="1" step="0.01" :value="randomizationDensity" @change="setRandomizationDensity($event.target.value)" />
        </div>
        <fieldset>
          <legend>Board Type</legend>
          <input type="radio" id="board-type-input-flat" name="board-type" value="FLAT" v-model="selectedBoardType">
          <label for="board-type-input-flat">Flat</label>
          <input type="radio" id="board-type-input-toroidal" name="board-type" value="TOROIDAL" v-model="selectedBoardType">
          <label for="board-type-input-toroidal">Toroidal</label>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "game-of-life-controls",
  props: ['game', 'randomizationDensity'],
  data: function () {
    return {
      showSettings: false,
      selectedBoardType: null
    }
  },
  methods: {
    step() {
      this.$emit('step')
    },
    run() {
      this.$emit('run')
    },
    pause() {
      this.$emit('pause')
    },
    reset() {
      this.$emit('reset');
    },
    randomize() {
      this.$emit('randomize');
    },
    setWidth(width) {
      this.$emit('setWidth', width)
    },
    setHeight(height) {
      this.$emit('setHeight', height)
    },
    setSpeed(speed) {
      this.$emit('setSpeed', speed)
    },
    setRandomizationDensity(density) {
      this.$emit('setRandomizationDensity', density)
    }
  },
  watch: {
    selectedBoardType: function() {
      this.$emit('setBoardType', this.selectedBoardType);
    }
  },
  mounted: function() {
    this.selectedBoardType = this.game.boardType
  }
}
</script>

<style scoped>
.game-of-life-controls {
  background: #333340;
  width: 100%;
  display: flex;
}

h1 {
  margin-left: 10px;
}

.game-controls {
  padding: 0 15px;
}

.game-options {
  margin-left: auto;
  position: relative;
}

.blocker {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
}

button {
  border: none;
  background: transparent;
  padding: 10px 12px;
  height: 100%;
}

button:hover {
  cursor: pointer;
  background: #505058;
}

.step-forward-button {
  color: rgb(39, 206, 39);
}

.run-button {
  color: rgb(39, 206, 39);
}

.pause-button {
  color: rgb(238, 102, 102);
}

.reset-button {
  color: rgb(30, 179, 238);
}

.randomize-button {
  color: white;
}

.settings-button {
  color: white;
}

.options-dropdown {
  position: absolute;
  background: #333340; 
  right: 0;
  width: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.option-input-group {
  display: flex;
  flex-direction: column;
}

.option-input-group:not(:last-child) {
  margin-bottom: 10px;
}
</style>