<script setup>
import { ref, computed } from 'vue'

// Game state
const player = ref('X') // X goes first
const board = ref(Array(9).fill(null))
const winningPlayer = ref(null)

// Check for win condition
const checkWin = (currentBoard) => {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]            // diagonals
  ]
  
  for (const [a, b, c] of wins) {
    if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
      return currentBoard[a]
    }
  }
  return null
}

// Check for draw
const checkDraw = (currentBoard) => {
  return currentBoard.every(cell => cell !== null)
}

// Handle cell click
const handleCellClick = (index) => {
  // Only allow clicks on empty cells when there's no winner
  if (winningPlayer.value || board.value[index]) {
    return
  }

  // Update board - switch from X to O or vice versa
  board.value[index] = player.value === 'X' ? 'O' : 'X'
  
  // Check game status immediately
  const winResult = checkWin(board.value)
  
  if (winResult) {
    winningPlayer.value = winResult
  } else if (checkDraw(board.value)) {
    winningPlayer.value = 'draw'
  } else {
    // Switch player for next turn
    player.value = player.value === 'X' ? 'O' : 'X'
  }
}

const resetGame = () => {
  board.value = Array(9).fill(null)
  winningPlayer.value = null
  player.value = 'X'
}

const clearBoard = () => {
  board.value = Array(9).fill(null)
  winningPlayer.value = null
  player.value = 'X'
}
</script>

<template>
  <div class="game-container">
    <h1 class="game-title">Tic-Tac-Toe</h1>
    
    <div class="score-board">
      <div v-if="winningPlayer" class="score-label winner-indicator">
        Winner: {{ winningPlayer }}! 🎉
      </div>
      <div v-else class="score-label status">Current player: {{ player }}</div>
    </div>
    
    <div class="game-info">
      <p>Click any empty cell to place your mark</p>
    </div>
    
    <div class="board" @click.self="clearBoard">
      <div 
        v-for="(cell, index) in board" 
        :key="index"
        class="cell"
        :class="{ selected: !winningPlayer && cell }"
        :data-player="cell || ''"
        @click.stop="handleCellClick(index)"
      >
        <span v-if="cell">{{ cell }}</span>
        <span v-else>-</span>
      </div>
    </div>
    
    <div class="game-actions">
      <button @click="resetGame" class="action-btn primary">Restart Game</button>
      <button @click="clearBoard" class="action-btn secondary">Clear Board</button>
    </div>
  </div>
</template>

<style scoped>
.game-container {
  max-width: 400px;
  margin: 1rem auto;
  padding: 1rem;
  background-color: #1a1a2e;
  border-radius: 8px;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 8px;
  background-color: #16213e;
  border-radius: 8px;
  min-height: 300px;
}

.cell {
  aspect-ratio: 1;
  min-height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  border-radius: 8px;
  background-color: #16213e;
  border: 2px solid #4f46e5;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.cell:hover {
  transform: scale(1.02);
}

.cell.selected {
  background-color: rgba(79, 70, 229, 0.3);
}

.cell[data-player="X"] {
  color: #4f46e5;
}

.cell[data-player="O"] {
  color: #ef4444;
}

.game-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
  color: #eee;
}

.score-board {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #16213e;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.score-label {
  font-size: 1rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.winner-indicator {
  color: #4f46e5;
  font-weight: bold;
}

.status {
  color: #eee;
  font-weight: 500;
}

.game-info {
  text-align: center;
  color: #888;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.game-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  justify-content: center;
}

.action-btn {
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: opacity 0.2s ease, transform 0.1s ease;
}

.action-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.action-btn:active {
  transform: translateY(0);
}

.primary {
  background-color: #4f46e5;
  color: white;
}

.secondary {
  background-color: #888;
  color: #eee;
}

@media (max-width: 480px) {
  .game-container {
    margin: 0.5rem;
    padding: 0.5rem;
  }
  
  .game-title {
    font-size: 2rem;
  }
  
  .cell {
    font-size: 2rem;
    min-height: 75px;
  }
}
</style>
