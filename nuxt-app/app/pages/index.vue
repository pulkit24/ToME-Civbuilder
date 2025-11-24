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
  min-height: 70vh;
  padding: 2rem;
}

.title {
  font-size: 3rem;
  margin-bottom: 3rem;
  color: #d4af37;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  text-align: center;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
}

.action-button {
  padding: 1.5rem 2rem;
  background: linear-gradient(to bottom, #8b4513, #654321);
  color: white;
  border: 3px solid #d4af37;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.action-button:hover {
  background: linear-gradient(to bottom, #a0522d, #8b4513);
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4);
}

.action-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.spacer {
  height: 0.5rem;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  
  .action-button {
    font-size: 1rem;
    padding: 1rem 1.5rem;
  }
}
</style>
