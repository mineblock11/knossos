<template>
  <div class="markdown-body card" v-html="renderHighlightedString(project.body)" />
</template>

<script>
import { renderHighlightedString } from '~/helpers/highlight'

export default defineNuxtComponent({
  props: {
    project: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: { renderHighlightedString },
})
</script>

<style lang="scss" scoped></style>
