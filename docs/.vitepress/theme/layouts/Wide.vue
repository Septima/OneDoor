<script setup>
import { useData } from 'vitepress'
const { page } = useData()
</script>

<template>
  <div class="VPDocWide">
    <div class="container">

      <div class="content">
        <div class="content-container">
          <main class="main">
            <Content
              class="vp-doc"
            />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPDocWide {
  padding: 32px 24px 96px;
  width: 100%;
}

@media (min-width: 768px) {
  .VPDocWide {
    padding: 48px 32px 128px;
  }
}

@media (min-width: 960px) {
  .VPDocWide {
    padding: 48px 32px 0;
  }

  .VPDocWide:not(.has-sidebar) .container {
    display: flex;
    justify-content: center;
  }

  .VPDocWide:not(.has-sidebar) .content {
    max-width: 1280px;
  }
}

@media (min-width: 1280px) {
  .VPDocWide .container {
    display: flex;
    justify-content: center;
  }

  .VPDocWide .aside {
    display: block;
  }
}

.container {
  margin: 0 auto;
  width: 100%;
}

.content {
  position: relative;
  margin: 0 auto;
  width: 100%;
}

@media (min-width: 960px) {
  .content {
    padding: 0 32px 128px;
  }
}

@media (min-width: 1280px) {
  .content {
    order: 1;
    margin: 0;
    min-width: 640px;
  }
}

.content-container {
  margin: 0 auto;
}

</style>