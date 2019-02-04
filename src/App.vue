<template>
<div id="app">
  <div v-if="dataLoaded">
    <the-navbar></the-navbar>
    <the-intro-content v-bind:content="intro" v-bind:projectPath="projectPath"></the-intro-content>
    <the-main-content v-bind:projectPath="projectPath"></the-main-content>
    <the-navigation-footer></the-navigation-footer>
    <the-footer></the-footer>
  </div>
  <div v-else classname="ia-kader-loader fixed" style="position:relative;top:0;left:0;right:0;bottom:0;background-color:#fff;height:100vh;width:100vw">
    <div classname="ia-kader-loader__icon-wrap" style="position:absolute;height:50%;width:50%;max-width:200px;max-height:200px;top:50%;left:50%;transform:translate(-50%,-50%)"><svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="uil-ring-alt" style="position:absolute;height:100%;width:100%;top:50%;left:50%;transform:translate(-50%,-50%)"><rect x="0" y="0" width="100" height="100" fill="none" className="bk"/><circle cx="50" cy="50" r="40" stroke="#ffffff" fill="none" strokeWidth="4" strokeLinecap="round"/><circle cx="50" cy="50" r="40" stroke="#f18825" fill="none" strokeWidth="4" strokeLinecap="none"><animate attributeName="stroke-dashoffset" dur=".3s" repeatCount="indefinite" from="0" to="502"/><animate attributeName="stroke-dasharray" dur=".3s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4"/></circle></svg></div>
  </div>
</div>
</template>

<script>
import TheNavbar from '@/components/Navigation/TheNavbar';
import TheIntroContent from '@/components/Intro/TheIntroContent';
import TheMainContent from '@/components/Main/TheMainContent';
import TheNavigationFooter from '@/components/Navigation/NavigationFooter/TheNavigationFooter';
import TheFooter from '@/components/Navigation/TheFooter';

export default {
  name: 'App',
  components: {
    TheNavbar,
    TheIntroContent,
    TheMainContent,
    TheNavigationFooter,
    TheFooter
  },
  computed: {
    intro() {
      return this.$store.state.configData.introSection;
    },
    projectPath() {
      return this.$store.state.configData.settings.projectPath;
    },
    dataLoaded() {
      return !(this.$store.state.configData.settings == null);
    }
  },
  created() {
    this.$store.dispatch('loadConfig');
  }
};
</script>

<style>
#app {
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  max-width: 100%;
  width: 100%;
  height: 100%;
}
</style>
