<template>
  <div class="build-page">
    <h1 class="page-title">Build Your Civilization</h1>
    
    <div class="content-wrapper">
      <div class="info-panel">
        <p>Welcome to the Civilization Builder!</p>
        <p>This is the new Vue3/Nuxt4 version.</p>
        <p><strong>Coming soon:</strong></p>
        <ul>
          <li>Tech Tree Editor</li>
          <li>Flag Builder</li>
          <li>Civilization Bonuses Selector</li>
          <li>Unique Units and Technologies</li>
          <li>Mod Generation</li>
        </ul>
      </div>
      
      <div class="placeholder">
        <p>⚙️ Build interface is being migrated to Vue3...</p>
        <NuxtLink to="/" class="back-button">Back to Home</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO: Implement civilization building functionality
// This will include:
// - Tech tree component
// - Flag builder component
// - Bonus selection
// - Form handling for civ creation
</script>

<style scoped>
.build-page {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.page-title {
  font-size: 2.5rem;
  color: #d4af37;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.content-wrapper {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
}

.info-panel {
  background: rgba(139, 69, 19, 0.3);
  border: 2px solid #d4af37;
  padding: 2rem;
  border-radius: 8px;
}

.info-panel h2 {
  color: #d4af37;
  margin-bottom: 1rem;
}

.info-panel ul {
  margin-left: 2rem;
  margin-top: 1rem;
}

.info-panel li {
  margin-bottom: 0.5rem;
}

.placeholder {
  background: rgba(0, 0, 0, 0.5);
  border: 2px dashed #666;
  padding: 3rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 2rem;
}

.placeholder p {
  font-size: 1.5rem;
  color: #888;
}

.back-button {
  padding: 1rem 2rem;
  background: #8b4513;
  color: white;
  border: 2px solid #d4af37;
  text-decoration: none;
  font-size: 1.1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: #a0522d;
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 1.8rem;
  }
  
  .build-page {
    padding: 1rem;
  }
}
</style>
