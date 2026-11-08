<script lang="ts" setup>
defineOptions({
  name: 'BlankView'
})
const currentRoute = useRoute()
const router = useRouter()
const { params, query } = currentRoute
const { pathMatch } = params
router.replace({ path: '/' + pathMatch[0], query })
</script>

<template>
  <div class="blank-view"></div>
</template>
