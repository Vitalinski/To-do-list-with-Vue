<template >
    <button @click="switchLanguage" class="language-btn">{{ $t('changeLang') }}</button>
<router-view></router-view>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { locale} = useI18n({useScope:'global'})
const switchLanguage =()=> {
locale.value==="en"?locale.value="pl":locale.value="en"
}
</script>