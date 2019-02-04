<template >
<div v-if="!resultScreen || majorityScreen || editorScreen || shareScreen" class="intro" :class="{shareScreen, majorityScreen, editorScreen}" :style="style">
  <img class="intro__logo" :src="logoSrc" v-on:click="scrollToStart"/>
  <h1 class="intro__title">{{title}}</h1>
</div>
</template>

<script>
import { mapState } from 'vuex';
import { scrollTo } from '@/utils/scrolling';

export default {
  name: 'the-intro-content',
  props: {
    content: {
      type: Object,
      required: true
    },
    projectPath: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      resultScreen: state => state.finished,
      shareScreen: state => state.isSharingLink,
      majorityScreen: state => state.isMajorityScreen,
      editorScreen: state => state.isEditorsScreen
    }),
    style() {
      if (window.innerWidth > 620) {
        return `background-image: url(${this.projectPath +
          this.content.header});`;
      } else {
        return `background-image: url(${this.projectPath +
          this.content.headerMobile});`;
      }
    },
    logoSrc() {
      return this.projectPath + this.content.headerLogo;
    },
    title() {
      return this.content.title;
    }
  },
  methods: {
    scrollToStart() {
      const { resultScreen, shareScreen, majorityScreen, editorScreen } = this;
      const shouldScroll =
        !resultScreen && !shareScreen && !majorityScreen && !editorScreen;

      if (shouldScroll) {
        const navBarHeight = document.getElementById('ia-wm-kader-the-navbar')
          .clientHeight;
        const startSection = document.getElementById('ia-wm-kader-section-Tor');
        const headerSize = startSection.childNodes[0].clientHeight;

        const offset =
          startSection.getBoundingClientRect().top +
          window.pageYOffset -
          headerSize +
          42;
        scrollTo(offset, '', 800);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/base/_mediaqueries.scss';
@import '../../styles/base/_settings.scss';
@import '../../styles/base/_mixins.scss';

.intro {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: calc(100vh - 171px);
  width: 100%;
  background-image: url('');
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;

  margin-top: 50px;

  @include desktop-and-up {
    margin-top: 43px;
    background-size: auto 120%;
  }

  &__logo {
    height: 35%;
    max-height: 250px;
    position: absolute;
    top: 22vh;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    z-index: 1;

    /* iphone 5/Se + 4: */
    @include mobile-portrait-only {
      top: 18vh;
    }

    @include desktop-and-up {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 250px;
    }
  }

  &__title {
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;

    @include MarkOt;
    font-size: 30px;
    font-weight: 800;
    line-height: 1.2;
    text-align: center;
    color: #1d1d1d;

    /* iphone 5/Se + 4: */
    @include mobile-portrait-only {
      font-size: 25px;
      bottom: 20px;
    }

    @include desktop-and-up {
      width: 100%;
      font-size: 36px;
    }
  }

  /* share screen: */
  &.shareScreen,
  &.majorityScreen,
  &.editorScreen {
    position: relative;
    height: 160px;
    background-position: top center;
    background-size: cover;
    z-index: 2;

    @include desktop-and-up {
      background-position: 50% 10%;
      // background-size: 100% 400%;
    }

    .intro__logo {
      top: 100px;
      transform: translateX(-50%);
      height: 120px;
      width: 120px;
      cursor: default;
    }

    .intro__title {
      display: none;
    }
  }
}
</style>
