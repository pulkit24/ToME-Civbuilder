<template>
  <div class="updates-page">
    <h1 class="page-title">Update Log</h1>
    
    <div class="content-wrapper">
      <div class="changelog-content" v-if="changelogHtml">
        <div v-html="changelogHtml"></div>
      </div>
      <div v-else-if="loading" class="loading">
        Loading changelog...
      </div>
      <div v-else class="error">
        Failed to load changelog. Please try again later.
      </div>
      
      <div class="back-button-wrapper">
        <NuxtLink to="/" class="back-button">Back to Home</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const changelogHtml = ref('')
const loading = ref(true)
const error = ref(false)

// Helper function to compare semantic versions
function compareVersion(v1: string, v2: string): number {
  const parts1 = v1.split('.').map(p => parseInt(p, 10))
  const parts2 = v2.split('.').map(p => parseInt(p, 10))
  
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const p1 = parts1[i] || 0
    const p2 = parts2[i] || 0
    
    if (p1 > p2) return 1
    if (p1 < p2) return -1
  }
  
  return 0
}

// Helper function to parse changelog markdown and convert to HTML
function parseChangelogMarkdown(markdown: string): string {
  const VERSION_PATTERN = /^## \[?([^\]]+)\]? - (\d{4}-\d{2}-\d{2})/
  const VERSION_PATTERN_ALT = /^## ([0-9.]+) \((\d{4}-\d{2}-\d{2})\)/
  const SECTION_PATTERN = /^### /
  const BULLET_PATTERN = /^[-*] /
  const SKIP_PATTERNS = [
    /^# Changelog/,
    /^All notable changes/,
    /^The format is based on/
  ]
  
  const lines = markdown.split('\n')
  let html = ''
  let inList = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Skip empty lines
    if (line === '') {
      continue
    }
    
    // Skip header and preamble lines
    if (SKIP_PATTERNS.some(pattern => pattern.test(line))) {
      continue
    }
    
    // Match version headers
    let versionMatch = line.match(VERSION_PATTERN)
    if (!versionMatch) {
      versionMatch = line.match(VERSION_PATTERN_ALT)
    }
    
    if (versionMatch) {
      if (inList) {
        html += '<br>'
        inList = false
      }
      const version = versionMatch[1]
      const date = versionMatch[2]
      
      // Skip "Unreleased" versions
      if (version.toLowerCase() === 'unreleased') {
        continue
      }
      
      // Compare version to 0.1.0 to determine if we should add a GitHub release link
      const shouldLink = compareVersion(version, '0.1.0') > 0
      
      if (shouldLink) {
        html += `<b>${date} - <a href="https://github.com/fritz-net/AoE2-Civbuilder/releases/tag/v${version}" target="_blank" rel="noopener noreferrer" style="color: hsl(52, 100%, 60%);">v${version}</a></b><br>`
      } else {
        html += `<b>${date} - v${version}</b><br>`
      }
      continue
    }
    
    // Skip section headers like ### Added, ### Fixed
    if (SECTION_PATTERN.test(line)) {
      continue
    }
    
    // Match bullet points
    if (BULLET_PATTERN.test(line)) {
      let content = line.substring(2).trim()
      // Replace markdown links with HTML links
      content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: hsl(52, 100%, 60%);">$1</a>')
      html += `&emsp;&emsp;• ${content}<br>`
      inList = true
      continue
    }
  }
  
  return html
}

onMounted(async () => {
  try {
    const response = await fetch('/civbuilder/CHANGELOG.md')
    if (!response.ok) {
      throw new Error('Failed to load changelog')
    }
    const markdownText = await response.text()
    changelogHtml.value = parseChangelogMarkdown(markdownText)
    loading.value = false
  } catch (err) {
    console.error('Error loading changelog:', err)
    error.value = true
    loading.value = false
  }
})
</script>

<style scoped>
.updates-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: min(6vh, 3vw);
  color: hsl(52, 100%, 50%);
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 3px 3px 5px black;
  font-family: 'Cinzel', serif;
}

.content-wrapper {
  background: rgba(0, 0, 0, 0.8);
  border: 3px solid hsl(52, 100%, 50%);
  border-radius: 8px;
  padding: 2rem;
  max-height: 70vh;
  overflow-y: auto;
}

.changelog-content {
  color: #ffffff;
  font-size: 1.1rem;
  line-height: 1.8;
}

.changelog-content :deep(b) {
  color: hsl(52, 100%, 50%);
  font-size: 1.2rem;
  display: block;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.changelog-content :deep(a) {
  color: hsl(52, 100%, 60%);
  text-decoration: none;
  transition: color 0.2s ease;
}

.changelog-content :deep(a:hover) {
  color: hsl(52, 100%, 70%);
  text-decoration: underline;
}

.loading,
.error {
  color: #ffffff;
  font-size: 1.2rem;
  text-align: center;
  padding: 2rem;
}

.error {
  color: #ff6b6b;
}

.back-button-wrapper {
  margin-top: 2rem;
  text-align: center;
}

.back-button {
  padding: 1rem 2rem;
  background: linear-gradient(to bottom, rgba(139, 69, 19, 0.85), rgba(101, 67, 33, 0.85));
  color: hsl(52, 100%, 50%);
  border: 3px solid hsl(52, 100%, 50%);
  border-radius: 6px;
  font-size: 1.1rem;
  font-family: 'Cinzel', serif;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: linear-gradient(to bottom, rgba(160, 82, 45, 0.95), rgba(139, 69, 19, 0.95));
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
}

@media (max-width: 768px) {
  .updates-page {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .changelog-content {
    font-size: 1rem;
  }
}
</style>
