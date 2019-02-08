<template >
<div id="ia-wm-kader-main-content" class="main-content" :class="{resultScreen: (shareScreen ? false : resultScreen), shareScreen, majorityScreen, IEorEdge}">
  <div class="main-content_wrap">
    <main-intro v-bind:content="{title: mainContent.title, sub: mainContent.sub, introText: mainContent.introText}"></main-intro>
    <div class="main-content__inner-wrap">
      <drop-down-select v-if="!resultScreen && !shareScreen && !majorityScreen && !editorScreen"/>
      <div v-if="resultScreen && !shareScreen && !majorityScreen && !editorScreen">
        <sharing-bar v-bind:isHeader="true"></sharing-bar>
        <sharing-popup></sharing-popup>
      </div>
      <main-section v-for="item in mainContent.sections" v-bind:key="item.name" v-bind:content="item" :isComplete="item.isComplete" v-bind:projectPath="projectPath"></main-section>
    </div>
    <div v-if="resultScreen" class="button-wrapper">
      <content-button key="button-1" :content="editorScreen ? (shareScreen ? buttons.other + userName : buttons.own) : (buttons.comparison)" @click.native="showEditorChoice" ></content-button>
      <content-button key="button-2" :content="majorityScreen ? (shareScreen ? buttons.other + userName : buttons.own) : (mainConfig.majorityTitle)" @click.native="showMajority"></content-button>
      <content-button v-if="!shareScreen" key="button-3" :content="buttons.new" @click.native="restartGame"></content-button>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import { isIEorEdge } from '@/utils/deviceDetectors';
import TheDropdownSelect from '@/components/Main/TheDropdownSelect';
import TheMainIntro from '@/components/Main/Intro/TheMainIntro';
import MainSection from '@/components/Main/Section/MainSection';
import BaseContentButton from '@/components/Navigation/BaseContentButton';
import TheSharingPopup from '@/components/Sharing/PopUp/TheSharingPopup';
import SharingBar from '@/components/Sharing/SharingBar/SharingBar';

export default {
  name: 'main-content',
  components: {
    'main-intro': TheMainIntro,
    'main-section': MainSection,
    'content-button': BaseContentButton,
    'sharing-popup': TheSharingPopup,
    'sharing-bar': SharingBar,
    'drop-down-select': TheDropdownSelect
  },
  props: {
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
      editorScreen: state => state.isEditorsScreen,
      comparisonScreen: state => state.isComparisonScreen,
      userName: state => state.userName,
      mainConfig: state => state.configData.mainSection,
      buttons: state => state.configData.navigation.buttons,
      appVersion: state => state.appVersion
    }),
    mainContent() {
      return this.$store.getters.mainContent;
    },
    IEorEdge() {
      return isIEorEdge;
    }
  },
  methods: {
    restartGame() {
      this.$store.commit('restartGame');
    },
    showMajority() {
      this.$store.commit('toggleMajorityScreen');
      window.scroll({ top: 0, left: 0 });
    },
    showComparisonChoice() {
      this.$store.commit('toggleCompareScreen');
      window.scroll({ top: 0, left: 0 });
    },
    showEditorChoice() {
      this.$store.commit('toggleEditorsScreen');
      window.scroll({ top: 0, left: 0 });
    }
  }
};
</script>

<style lang="scss" scoped="">
@import '../../styles/base/_mediaqueries.scss';
@import '../../styles/base/_settings.scss';
@import '../../styles/base/_mixins.scss';

.main-content {
  position: relative;
  max-width: 100%;
  width: 100vw;
  margin-top: calc(100vh - 125px);
  padding-bottom: 100px;
  background-color: #fff;
  z-index: 2;

  @include desktop-and-up {
    margin-top: calc(100vh - 115px);
  }

  &__inner-wrap {
    display: block;
    margin: 0 auto;
    max-width: 800px;
    width: 100%;
  }

  /*
     * Result Screen Stylings:
     */
  &::after {
    display: block;
    content: 'Ihre Aufstellung wird erstellt...';
    text-transform: uppercase;

    position: absolute;
    top: 5%;
    left: 50%;
    transform: translateX(-50%) scale(0);

    width: 100%;

    color: #1d1d1d;

    @include MarkOt;
    font-size: 22px;
    font-weight: 800;
    line-height: 1.2;
    text-align: center;
    color: #1d1d1d;
    opacity: 0;

    @include desktop-and-up {
      font-size: 28px;
    }
  }

  &.resultScreen {
    margin-top: 60px;

    &.IEorEdge {
      margin-top: 70px;
    }

    .main-content__inner-wrap {
      max-width: 649px;
      animation: fadeInUp 5s ease-out;
    }

    .main-content_wrap {
      animation: fadeOutAndBack 4.8s ease-out;
    }
    &::after {
      animation: fadeInOut 3.5s 0.5s ease-out;
    }
  }

  /*
     * Share Screen Stylings:
     */
  &.shareScreen {
    margin-top: 60px;

    &.IEorEdge {
      margin-top: 70px;
    }
  }

  /*
     * Majority Screen Stylings:
     */
  &.majorityScreen {
    animation: fadeOutAndBack 0.6s ease-out;
  }
}

.button-wrapper {
  position: relative;
  margin-top: 50px;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @include desktop-and-up {
    flex-direction: row;
  }
}
</style>
