<template>
  <div class="app-layout">
    <nav class="navigation" v-if="showNavigation">
      <NuxtLink to="/v2" class="nav-button">Home</NuxtLink>
      <button class="nav-button">Help</button>
      <button class="nav-button">About</button>
      <button class="nav-button">Events</button>
      <button class="nav-button">Updates</button>
    </nav>
    
    <main class="content">
      <slot />
    </main>
    
    <footer class="links" v-if="showNavigation">
      <img 
        src="/img/kraken_invite.png" 
        alt="Krakenmeister's Maelstrom" 
        class="discord-invite"
      />
      <button class="donate-button">Donate</button>
    </footer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// Hide navigation on certain pages (e.g., draft pages)
const showNavigation = computed(() => {
  return !route.path.includes('/draft/')
})
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navigation {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.7);
  justify-content: center;
  flex-wrap: wrap;
}

.nav-button {
  padding: 0.5rem 1rem;
  background: #8b4513;
  color: white;
  border: 2px solid #654321;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
  display: inline-block;
}

.nav-button:hover {
  background: #a0522d;
}

.content {
  flex: 1;
  padding: 2rem;
  background: #1a1a1a;
  color: white;
}

.links {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
}

.discord-invite {
  height: 50px;
  cursor: pointer;
}

.donate-button {
  padding: 0.5rem 1rem;
  background: #8b4513;
  color: white;
  border: 2px solid #654321;
  cursor: pointer;
}

.donate-button:hover {
  background: #a0522d;
}
</style>
