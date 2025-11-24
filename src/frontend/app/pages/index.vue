<template>
  <div class="home-page">
    <h1 class="title">Civilization Builder</h1>
    
    <div class="action-buttons">
      <NuxtLink to="/v2/build" class="action-button">
        Build Civilization
      </NuxtLink>
      
      <div class="spacer"></div>
      
      <button class="action-button" @click="goToCombine">
        Combine Civilizations
      </button>
      
      <div class="spacer"></div>
      
      <button class="action-button" @click="goToCreateDraft">
        Create Draft
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const goToCombine = () => {
  // TODO: Implement combine civilizations page
  alert('Combine Civilizations - Coming soon in Vue3 version!')
}

const goToCreateDraft = () => {
  // TODO: Implement create draft page
  alert('Create Draft - Coming soon in Vue3 version!')
}
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
}

.title {
  font-size: min(12vh, 6vw);
  margin-top: 5vh;
  margin-bottom: 5vh;
  color: hsl(52, 100%, 50%);
  text-shadow: 3px 3px 5px black;
  text-align: center;
  font-family: 'Cinzel', serif;
  max-width: 70vw;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  max-width: 600px;
  margin-top: 5vh;
}

.action-button {
  padding: min(3vh, 1.5rem) min(4vw, 2rem);
  background: linear-gradient(to bottom, rgba(139, 69, 19, 0.85), rgba(101, 67, 33, 0.85));
  color: hsl(52, 100%, 50%);
  border: 3px solid hsl(52, 100%, 50%);
  border-radius: 6px;
  cursor: pointer;
  font-size: min(6vh, 3vw);
  font-family: 'Cinzel', serif;
  font-weight: normal;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.6);
}

.action-button:hover {
  background: linear-gradient(to bottom, rgba(160, 82, 45, 0.95), rgba(139, 69, 19, 0.95));
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.8);
  border-color: hsl(52, 100%, 60%);
}

.action-button:active {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.6);
}

.spacer {
  height: 10vh;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  
  .action-button {
    font-size: 1.5rem;
    padding: 1rem 1.5rem;
  }
  
  .spacer {
    height: 5vh;
  }
}
</style>
