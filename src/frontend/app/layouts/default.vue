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
  position: fixed;
  width: 10vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  bottom: 5vh;
  left: 2vw;
  gap: min(1vw, 2vh);
}

.nav-button {
  padding: min(1vw, 2vh) min(1.5vw, 3vh);
  background: linear-gradient(to bottom, rgba(139, 69, 19, 0.9), rgba(101, 67, 33, 0.9));
  color: hsl(52, 100%, 50%);
  border: 2px solid hsl(52, 100%, 50%);
  border-radius: 4px;
  cursor: pointer;
  font-size: min(2vh, 1vw);
  font-family: 'Cinzel', serif;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.nav-button:hover {
  background: linear-gradient(to bottom, rgba(160, 82, 45, 0.95), rgba(139, 69, 19, 0.95));
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
}

.content {
  flex: 1;
  padding: 2rem;
  color: white;
}

.links {
  position: fixed;
  bottom: 2vh;
  right: 2vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;
}

.discord-invite {
  height: 50px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.discord-invite:hover {
  transform: scale(1.05);
}

.donate-button {
  padding: min(1vw, 2vh) min(1.5vw, 3vh);
  background: linear-gradient(to bottom, rgba(139, 69, 19, 0.9), rgba(101, 67, 33, 0.9));
  color: hsl(52, 100%, 50%);
  border: 2px solid hsl(52, 100%, 50%);
  border-radius: 4px;
  cursor: pointer;
  font-size: min(2vh, 1vw);
  font-family: 'Cinzel', serif;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.donate-button:hover {
  background: linear-gradient(to bottom, rgba(160, 82, 45, 0.95), rgba(139, 69, 19, 0.95));
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
}
</style>
