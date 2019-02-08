<template>
  <!-- Comparison Screen: -->
  <div v-if="comparisonScreen" class="main-intro-result">
    <h1 class="main-intro-result__title">{{content.title}}</h1>
    <main-comparison></main-comparison>
  </div>
  <!-- Majority Screen: -->
  <div v-else-if="majorityScreen" class="main-intro-result">
    <h1 class="main-intro-result__title">{{content.title}}</h1>
    <main-evaluation></main-evaluation>
  </div>
  <!--  Editor Screen: -->
  <div v-else-if="editorScreen" class="main-intro-result">
    <h1 class="main-intro-result__title">{{content.title}}</h1>
  </div>
  <!-- Share Screen: -->
  <div v-else-if="shareScreen" class="main-intro-result">
    <h1 class="main-intro-result__title">{{content.title}} {{userName}}</h1>
      <main-evaluation></main-evaluation>
  </div>
  <!-- Result Screen: -->
  <div v-else-if="resultScreen" class="main-intro-result">
    <h1 class="main-intro-result__title">{{content.title}}</h1>
      <main-evaluation></main-evaluation>
  </div>
<!-- Selection (Default) Screen:  -->
<div v-else class="main-intro">
  <p class="main-intro__text" v-html="content.introText"></p>
  <button class="main-intro__scroll" v-on:click="scrollToStart">
    <svg class="icon icon__arrow-down" xmlns="http://www.w3.org/2000/svg" width="57" height="57" viewBox="0 0 57 57">
          <defs>
              <path id="b" d="M19.251 38.503c10.633 0 19.252-8.62 19.252-19.252S29.883 0 19.25 0 0 8.62 0 19.251c0 10.633 8.62 19.252 19.251 19.252z" />
              <filter id="a" width="180.5%" height="180.5%" x="-40.3%" y="-37.7%" filterUnits="objectBoundingBox">
                  <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1" />
                  <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="5" />
                  <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              </filter>
          </defs>
          <g fill="none" fillRule="evenodd">
              <g transform="translate(9.357 8.357)">
                  <use fill="#000" filter="url(#a)" xlinkHref="#b" />
                  <use fill="#FFF" xlinkHref="#b" />
              </g>
              <path fill="#595959" id="arrow-stroke" d="M38.02 24.185l-9.412 9.412-9.412-9.412 1.255-1.255 8.157 8.157 8.157-8.157 1.255 1.255z" />
          </g>
      </svg>
  </button>
</div>
</template>

<script>
import { mapState } from 'vuex';
import { scrollTo } from '@/utils/scrolling';

import TheMainEvaluation from './TheMainEvaluation';
import TheMainComparison from './TheMainComparison';

export default {
  name: 'main-intro',
  components: {
    'main-evaluation': TheMainEvaluation,
    'main-comparison': TheMainComparison
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      resultScreen: state => state.finished,
      shareScreen: state => state.isSharingLink,
      majorityScreen: state => state.isMajorityScreen,
      comparisonScreen: state => state.isComparisonScreen,
      editorScreen: state => state.isEditorsScreen,
      editorName: state => state.editorName,
      userName: state => state.userName
    }),
    contentToHtml() {
      return this.content.toH;
    }
  },
  methods: {
    scrollToStart() {
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
};
</script>

<style lang="scss" scoped>
@import '../../../styles/base/_icons.scss';
@import '../../../styles/base/_settings.scss';
@import '../../../styles/base/_mixins.scss';
@import '../../../styles/base/_mediaqueries.scss';

.main-intro {
  position: relative;
  max-width: 100%;
  height: 125px;
  background-color: #f9f9f8;
  box-shadow: 0 -3px 6px 1px rgba(0, 0, 0, 0.1); //0px -8px 9px -1px rgba(0,0,0,.2);

  // padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  @include desktop-and-up {
    height: 115px;
  }

  &__text {
    @include MarkOt;
    font-size: 16px;
    line-height: 1.5;
    text-align: center;
    color: #1d1d1d;
  }

  &__scroll {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);

    background: #fff;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    box-shadow: 1px -3px 14px 4px rgba(0, 0, 0, 0.2);

    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

.main-intro-result {
  padding-top: 28px;

  &__title {
    display: block;
    margin: 0 auto;
    width: 75%;

    @include MarkOt;
    font-size: 22px;
    font-weight: 800;
    line-height: 1.23;
    text-align: center;
    text-transform: uppercase;
    color: #1d1d1d;
  }

  &__sub {
    @include MarkOt;
    font-size: 16px;
    line-height: 2.75;
    text-align: center;
    color: #1d1d1d;
    margin-bottom: 25px;
  }
}
</style>
