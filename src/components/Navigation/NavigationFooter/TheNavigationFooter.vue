<template lang="html">
  <div class="navigation-footer"
  v-bind:class="{
    show: finished ? true : show,
    fixed,
    finished,
    shareScreen,
    majorityScreen,
    comparisonScreen,
    editorScreen,
    IEorEdge
    }">

    <!-- Result Screen: Show Share Icons: -->
    <sharing-bar v-if="navigationMode" v-bind:isHeader="false"></sharing-bar>

    <!-- Navigation Steps in Select / Default Case: -->
      <div v-if="navigationMode && !hasAnimated" class="navigation-footer__inner-wrap">
          <navigation-step
          v-for="(item, index) in sections"
          v-bind:key="item.name"
          v-bind:id="index"
          v-on:send="scrollToClick(index)"
          v-bind:iconPath="iconPath"
          v-bind:active="index === currentScrollIndex"
          v-bind:title="item.name"
          v-bind:currentCount="item.currentCount"
          v-bind:maxCount="item.maxChoices"></navigation-step>
      </div>
      <!-- Loading Icon: -->
      <div v-if="navigationMode && !hasAnimated" ref="spinner" class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>

      <!-- Shared Screen: Show Personalisation: -->
        <div v-if="!navigationMode" class="navigation-footer__shared">
        <h3 class="title">SIE KÖNNEN DAS BESSER {{shareScreen ? ('ALS ' + userName) : ''}}?</h3>
        <div class="button-wrap">
          <content-button v-if="shareScreen" key="button-3" :content="comparisonScreen ? buttons.createFinalOwn : buttons.createOwn" style="width: 300px" @click.native="restartGame"></content-button>
          <content-button v-else key="button-3" :content="buttons.backToOwn" style="width: 300px" @click.native="backToOwn"></content-button>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { scrollTo } from '@/utils/scrolling';
import { isIEorEdge } from '@/utils/deviceDetectors';

import NavigationStep from './NavigationStep';
import BaseContentButton from '@/components/Navigation/BaseContentButton';
import SharingBar from '@/components/Sharing/SharingBar/SharingBar';

export default {
  name: 'the-navigation-footer',
  components: {
    'navigation-step': NavigationStep,
    'sharing-bar': SharingBar,
    'content-button': BaseContentButton
  },
  data: () => ({
    show: false,
    fixed: false,
    currentScrollIndex: 0,
    currentComplete: null,
    currentTry: 0,
    pageFooterOffset: 0,
    hasAnimated: false
  }),
  computed: {
    ...mapState({
      sections: state => state.sections,
      settings: state => state.configData.settings,
      complete: state => state.complete,
      finished: state => state.finished,
      shareScreen: state => state.isSharingLink,
      majorityScreen: state => state.isMajorityScreen,
      editorScreen: state => state.isEditorsScreen,
      comparisonScreen: state => state.isComparisonScreen,
      userName: state => state.userName,
      buttons: state => state.configData.navigation.buttons
    }),
    IEorEdge() {
      return isIEorEdge;
    },
    navigationMode() {
      return !this.shareScreen && !this.majorityScreen && !this.editorScreen;
    },
    iconPath() {
      const projectPath = this.settings.projectPath;
      const assetPath = this.settings.icons;
      return projectPath + assetPath;
    },
    sectionBreakpoints() {
      const idStart = 'ia-wm-kader-section-';
      const sections = this.sections;
      const navBarHeight = document.getElementById('ia-wm-kader-the-navbar')
        .clientHeight;

      /* get the corresponding offsets of the main sections to Top: */
      let breakpointArray = new Array();

      for (let i = 0; i < sections.length; i++) {
        const currentId = idStart + sections[i].name;
        const currentSection = document.getElementById(currentId);
        const headerSize = currentSection.childNodes[0].clientHeight;
        /* + this Elements height:  84 / 2 */
        breakpointArray.push(
          currentSection.getBoundingClientRect().top +
            window.pageYOffset -
            headerSize +
            42
        );
      }
      return breakpointArray;
    }
  },
  watch: {
    currentComplete: function(newValue, oldValue) {
      if (!this.finished) {
        this.checkCurrentScroll();
      } else if (this.navigationMode) {
        /* check if animation has already played once:  */
        this.$refs.spinner.addEventListener(
          'animationend',
          () => {
            this.hasAnimated = true;
          },
          false
        );

        window.scroll({
          top: 0,
          left: 0
        });
      }
    }
  },
  methods: {
    handleScroll() {
      /* toggle / show navbar on and off : */
      const windowScrollY =
        window.scrollY || //Modern Way (Chrome, Firefox)
        window.pageYOffset || //(Modern IE, including IE11
        document.documentElement.scrollTop; //(Old IE, 6,7,8);

      if (windowScrollY > window.innerHeight * 0.25) {
        this.show = true;
      } else if (windowScrollY < window.innerHeight) {
        this.show = false;
      }

      /* check Naigation Footer's Positioning (fixed/absolute): */
      this.checkPositioning();

      /* check in which scroll section the current viewport is: */
      const breakpointArray = this.sectionBreakpoints;

      let currentPosition;

      if (window.innerWidth >= 640) {
        currentPosition = windowScrollY + window.innerHeight * 0.5 - (84 + 43);
      } else {
        currentPosition = windowScrollY + window.innerHeight * 0.5 - (84 + 50);
      }

      for (let i = 0; i < breakpointArray.length; i++) {
        if (currentPosition >= breakpointArray[breakpointArray.length - 1]) {
          this.currentScrollIndex = breakpointArray.length - 1;
        } else if (
          currentPosition >= breakpointArray[i] &&
          currentPosition < breakpointArray[i + 1]
        ) {
          this.currentScrollIndex = i;
        }
      }
    },
    scrollToClick(id) {
      const targetId = parseInt(id);
      const offset = this.sectionBreakpoints[targetId];
      const current = this.sectionBreakpoints[this.currentScrollIndex];
      const distance = Math.abs(current - offset);

      /* scroll duration proportionally to distance to travel: */
      switch (true) {
        case distance === 0:
          break;
        case distance < 1000:
          scrollTo(offset, '', 800);
          break;
        case distance < 2000:
          scrollTo(offset, '', 800);
          break;
        case distance < 4000:
          scrollTo(offset, '', 1200);
          break;
        case distance > 4000:
          scrollTo(offset, '', 2000);
          break;
        default:
          scrollTo(offset, '', 400);
      }
    },
    checkCurrentScroll() {
      /* trigger only if complete state has changed*/
      const currentPosition = this.currentScrollIndex;
      const sectionPositions = this.sectionBreakpoints;

      if (this.complete[currentPosition]) {
        /* go to next setion if the next one isn't selected already / was the last possible section: */
        if (
          currentPosition + 1 < sectionPositions.length &&
          !this.complete[currentPosition + 1]
        ) {
          this.scrollToClick(currentPosition + 1);
        } else {
          let index = null;

          for (let i = 0; i < sectionPositions.length; i++) {
            if (!this.complete[i]) {
              index = i;
              break;
            }
          }
          /* scroll only if open section was found: */
          if (index !== null) {
            this.scrollToClick(index);
          }
        }
      } else if (!this.complete[currentPosition]) {
        /* do nothing if section isn't complete yet: */
        return;
      }
    },
    getCurrentComplete() {
      this.currentComplete = this.complete.toString();
    },
    updatePageOffset() {
      const mainContent = document.getElementById('ia-wm-kader-main-content');
      const mainContentStyle = window
        .getComputedStyle(mainContent, null)
        .getPropertyValue('margin-top');
      const marginMain = parseInt(mainContentStyle, 10);

      this.pageFooterOffset =
        document.getElementById('ia-wm-kader-mainfooter').offsetTop +
        marginMain;

      /*check if The Navigation Footer's Positioning should be updated: */
      this.checkPositioning();
    },
    checkPositioning() {
      /* value is the styled Height of the navigation footer: */
      const windowScrollY =
        window.scrollY || //Modern Way (Chrome, Firefox)
        window.pageYOffset || //(Modern IE, including IE11
        document.documentElement.scrollTop; //(Old IE, 6,7,8);

      const elementsHeight = 84;
      const currentOffset = windowScrollY + window.innerHeight;

      if (currentOffset >= this.pageFooterOffset) {
        this.fixed = true;
      } else if (currentOffset <= this.pageFooterOffset) {
        this.fixed = false;
      }
    },
    restartGame() {
      this.$store.commit('restartGame');
    },
    backToOwn() {
      this.$store.commit('showUserSelection');
      window.scrollTo({ top: 0, left: 0 });
    },
    checkCurrentTry() {
      const currentStoreRetry = this.$store.state.userRetry;
      if (this.currentTry !== currentStoreRetry) {
        this.hasAnimated = false;
      }
      this.currentTry = currentStoreRetry;
    }
  },
  updated() {
    this.getCurrentComplete();
    /* result + share screens have new page offsets --> update the values*/
    this.updatePageOffset();

    this.checkCurrentTry();
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    /* on init: check current page position: */
    this.handleScroll();
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style lang="scss">
@import '../../../styles/base/_mediaqueries.scss';
@import '../../../styles/base/_settings.scss';
@import '../../../styles/base/_mixins.scss';
@import '../../../styles/animations/_animations.scss';

.navigation-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  max-width: 100%;
  width: 100%;
  height: 84px;
  background-color: #fff;
  box-shadow: 0 -3px 6px 0 rgba(0, 0, 0, 0.2);
  z-index: 2;
  transform: translateY(100vh);

  transition: transform 0.2s ease;

  /* fixes for Internet Explorer 11 and Edge: */
  &.IEorEdge {
    // position: fixed;
    // _position: absolute;
    // bottom: 0;
    // _top: expression(
    //   document.body.scrollTop + document.body.clientHeight-this.clientHeight
    // );
  }

  &.show {
    transform: translateY(0vh);
    transition: transform 1s ease-out;
  }

  &.fixed {
    position: absolute;
    bottom: 84px;
    transition: transform 0.3s ease-out;
  }

  &__inner-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    height: 100%;
    width: 95%;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: center;

    .navigation-step:last-of-type {
      &::before {
        display: none;
      }
    }
  }

  /* loading animation: */
  .spinner {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70px;
    text-align: center;

    > div {
      width: 18px;
      height: 18px;
      background-color: $weltorange;

      border-radius: 100%;
      display: inline-block;
      -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
      animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }

    .bounce1 {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }

    .bounce2 {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }
  }

  /*
 *  Result Screen Stylings:
 */
  .sharing-bar {
    visibility: hidden;
    opacity: 0;
  }

  &.finished {
    .spinner {
      animation: fadeInOut 2.5s 1.6s ease-out;
    }

    .navigation-footer__inner-wrap {
      animation: fadeOut 0.1s 4.4s forwards;
    }

    .sharing-bar {
      visibility: visible;
      opacity: 1;
      transition: all 1s 4s ease-out;
    }
  }

  /*
 *  Share Screen Stylings:
 */
  &.shareScreen,
  &.majorityScreen,
  &.editorScreen {
    height: 115px;
  }

  &__shared {
    position: relative;
    display: block;

    .title {
      display: block;
      height: 100%;
      margin: 0 auto;
      padding: 12px 0;

      @include MarkOt;
      font-size: 12px;
      font-weight: 800;
      color: #fff;
      text-transform: uppercase;
      background-image: linear-gradient(254deg, #246ea7, #003a5a);

      @include desktop-and-up {
        font-size: 14px;
      }
    }

    .button-wrap {
      padding-top: 13px;

      .content-button {
        display: block;
        margin: 0 auto;
        &:not(:hover) {
          animation: pulse 5s infinite;
        }
      }
    }
  }

  /* comparison Screen with official Selection: */
  &.comparisonScreen {
    .content-button {
      background-color: $success;
      border-color: $success;

      &:hover:not([disabled='disabled']) {
        color: $success;
      }

      &:not(:hover) {
        animation: pulseFinal 5s infinite;
      }
    }
  }
}
</style>
