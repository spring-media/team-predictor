<template lang="html">
  <div class="main-item ia-main-items"
   v-bind:class="{
     'selected': resultScreen ? false : selected, resultScreen,
     'success': statusCheck('success'),
     'warning': statusCheck('warning'),
     'danger': statusCheck('danger'),
     'removed': statusCheck('removed'),
     'tooltipOpen': currentTooltipID === content.id && !isDesktop && resultScreen && !comparisonScreen,
     majorityScreen,
     comparisonScreen,
     officiallyChoosen,
     IEorEdge
     }"
     :style="style" v-on:click="click">
    <span class="main-item__count-id"><span v-bind:id="'ia-main-item-counter-'+content.id"></span>/ {{maxCount}}</span>
    <div class="main-item__description">
      <span class="main-item__title">{{title}}</span>
      <span v-if="!resultScreen" class="main-item__subTitle">{{subTitle}}</span>
    </div>
    <span v-if="resultScreen" class="main-item__tooltip">
      <p>{{description}}</p>
    </span>
    <span v-if="majorityScreen" class="main-item__majority-percentage">
      <b>
        {{percentage}}%
      </b>
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { isIEorEdge } from '@/utils/deviceDetectors';

export default {
  name: 'main-item',
  data: () => ({
    selected: false,
    showTooltip: false
  }),
  props: {
    content: {
      type: Object,
      required: true
    },
    currentCount: {
      type: Number,
      required: true
    },
    maxCount: {
      type: Number,
      required: true
    },
    projectPath: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  watch: {
    currentCount: function(val) {
      if (val === 0) {
        this.selected = false;
      }
    }
  },
  computed: {
    ...mapState({
      resultScreen: state => state.finished,
      shareScreen: state => state.isSharingLink,
      majorityScreen: state => state.isMajorityScreen,
      comparisonScreen: state => state.isComparisonScreen,
      currentTooltipID: state => state.toolTipID
    }),
    title() {
      return this.content.name;
    },
    subTitle() {
      return this.content.sub;
    },
    description() {
      return this.content.desc;
    },
    percentage() {
      return parseInt(this.content.percentage, 10);
    },
    officiallyChoosen() {
      return this.content.choosen;
    },
    style() {
      return `background-image: url(${this.projectPath +
        '/assets/images/spieler/' +
        this.content.img});`;
    },
    isDesktop() {
      return window.innerWidth > 640;
    },
    IEorEdge() {
      return isIEorEdge;
    }
  },
  methods: {
    click() {
      if (
        !this.$store.state.finished &&
        !this.comparisonScreen &&
        this.content.status.toString() !== 'removed'
      ) {
        if (!this.disabled) {
          this.selected = !this.selected;
        } else if (this.selected) {
          /* if selection is complete, unselecting is still an option: */
          this.selected = !this.selected;
        }
        this.$emit('send', this.content.id);
      } else {
        this.$store.commit('setTooltipID', this.content.id);
      }
    },
    statusCheck(a) {
      return a.toString() === this.content.status.toString();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../styles/base/_settings.scss';
@import '../../../styles/base/_mixins.scss';
@import '../../../styles/base/_mediaqueries.scss';
@import '../../../styles/animations/_animations.scss';

.main-item {
  position: relative;
  width: 138px;
  height: 138px;
  border-radius: 50%;
  border: 2px solid #fff;
  cursor: pointer;

  background-image: url('');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  &:not(.IEorEdge) {
    background-blend-mode: multiply;
  }

  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);

  margin: 50px 15px;

  transition: all 0.3s ease-out;

  /* iphone 5/Se + 4: */
  @include mobile-portrait-only {
    width: 100px;
    height: 100px;
  }

  &::after {
    display: block;
    content: '';
    height: 60px;
    width: 60px;

    background-image: url('https://static.apps.welt.de/sport/interaktiv/weltmeisterschaft-2018/assets/icons/selected2x.png');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;

    position: absolute;
    top: -15px;
    right: -15px;
    opacity: 0;

    transition: opacity 0.3s ease-out;
  }

  &:not(.resultScreen):not(.selected):not(.IEorEdge) {
    @include desktop-and-up {
      &:hover {
        background-color: rgba(241, 136, 37, 0.7);
      }
    }
  }

  &.selected {
    border: 2px solid transparent;
    box-shadow: none;

    &:not(.IEorEdge) {
      background-color: rgba(41, 100, 82, 0.7);
    }

    &::after {
      opacity: 1;
    }

    .main-item__count-id {
      opacity: 1;
      transition: opacity 0.3s ease-out;
    }
  }

  &__count-id {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);

    @include MarkOt;
    font-size: 12px;
    font-weight: 800;
    color: #fff;

    opacity: 0;
    transition: opacity 0s ease-out;
  }

  &__description {
    position: absolute;
    bottom: -60px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;

    @include mobile-portrait-only {
      bottom: -50px;
    }
  }

  &__title {
    @include MarkOt;
    display: block;
    font-size: 12px;
    font-weight: 800;
    line-height: 5.83;
    text-align: center;
    color: #1d1d1d;
    height: 30px;

    @include mobile-portrait-only {
      font-size: 9px;
    }
  }

  &__subTitle {
    @include MarkOt;
    display: block;
    font-size: 11px;
    line-height: 4;
    text-align: center;
    color: #1d1d1d;

    @include mobile-portrait-only {
      font-size: 8px;
      line-height: 3;
    }
  }

  &__tooltip {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 6px #b2b2b2;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 11px 23px;

    width: 25vw;

    position: absolute;
    vertical-align: top;
    left: 50%;
    transform: translate(-50%, 0%);

    z-index: 20;

    @include MarkOt;
    text-align: center;
    font-size: 12px;
    white-space: wrap;
    line-height: 1.33;

    opacity: 0;
    visibility: hidden;

    transition: opacity 0.4s ease-out, transform 0.3s ease-out;

    @include desktop-and-up {
      width: 330px;
      height: auto;
      transform: translate(-50%, 50%);
    }

    &::before {
      background-color: #fff;
      box-shadow: 2px -2px 2px 0 rgba(178, 178, 178, 0.4);
      content: '';
      display: block;
      height: 13px;
      position: absolute;
      top: -14.4px;
      width: 14px;
      left: 50%;
      transform: rotate(-45deg) translateX(-50%);
      z-index: 21;
    }
  }

  /* result Screen: */
  &.resultScreen {
    width: 96px;
    height: 96px;
    margin-top: 20px;
    cursor: default;

    .main-item__description {
      bottom: -40px;

      .main-item__title {
        width: 132px;
        position: absolute;
        left: 50%;
        top: -25px;
        transform: translateX(-50%);
        line-height: 1.5;
      }
    }

    &.success {
      border: 2px solid $success;
      .main-item__tooltip {
        border: 2px solid $success;
        &::before {
          border-top: 2px solid $success;
          border-right: 2px solid $success;
        }
      }

      &:not(.IEorEdge):hover {
        background-color: rgba(110, 148, 84, 0.5);
      }
    }

    &.warning {
      border: 2px solid $warning;
      .main-item__tooltip {
        border: 2px solid $warning;
        &::before {
          border-top: 2px solid $warning;
          border-right: 2px solid $warning;
        }
      }

      &:not(.IEorEdge):hover {
        background-color: rgba(210, 172, 25, 0.5);
      }
    }

    &.danger {
      border: 2px solid $danger;
      animation: wiggle 0.4s 5.5s ease-in;

      .main-item__tooltip {
        border: 2px solid $danger;
        &::before {
          border-top: 2px solid $danger;
          border-right: 2px solid $danger;
        }
      }

      &:not(.IEorEdge):hover {
        background-color: rgba(183, 19, 54, 0.5);
      }
    }

    &.tooltipOpen {
      .main-item__tooltip {
        opacity: 1;
        visibility: visible;
        transform: translate(-50%, 50%);
      }
    }

    @include desktop-and-up {
      &:hover:not(.comparisonScreen) {
        .main-item__tooltip {
          opacity: 1;
          visibility: visible;
          transform: translate(-50%, 100%);
        }
      }
    }
  }

  /* majority Screen: */
  &.majorityScreen {
    .main-item__majority-percentage {
      display: block;
      height: 35px;
      width: 35px;
      position: absolute;
      right: -10px;
      border-radius: 50%;
      background-color: #fff;

      b {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        @include MarkOt;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.2px;
        text-align: center;
        color: #1d1d1d;
      }
    }
  }

  &.removed {
    &::before {
      display: block;
      content: '';
      cursor: default;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 100%;
      width: 100%;
      border-radius: 50%;
      border: 2px solid #fff;
      background-color: #fff;
      opacity: 0.4;
    }

    .main-item__title,
    .main-item__description {
      opacity: 0.4;
    }

    .main-item__majority-percentage b {
      opacity: 0.4;
    }

    .main-item__tooltip {
      &::before {
        top: -11px;
      }
    }
  }

  /* comparison display: */
  &.resultScreen.comparisonScreen {
    border: 2px solid $danger;

    &::after {
      height: 35px;
      width: 35px;
      top: 0;

      background-image: url('https://static.apps.welt.de/sport/interaktiv/weltmeisterschaft-2018/assets/icons/check_falsch2x.png');
      opacity: 1;
    }

    &:not(.IEorEdge):hover {
      background-color: rgba(183, 19, 54, 0.5);
    }

    &.officiallyChoosen {
      border: 2px solid $success;
      &::after {
        background-image: url('https://static.apps.welt.de/sport/interaktiv/weltmeisterschaft-2018/assets/icons/check_richtig2x.png');
      }

      &:not(.IEorEdge):hover {
        background-color: rgba(110, 148, 84, 0.5);
      }
    }
  }

  /* IE & Edge fixes: */
  &.IEorEdge {
    &::before {
      display: block;
      content: '';
      width: 138px;
      height: 138px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;

      opacity: 0;
      transition: opacity 0.3s ease-out;
    }

    &:not(.resultScreen):not(.selected) {
      @include desktop-and-up {
        &:hover::before {
          background-color: rgba(241, 136, 37, 0.7);
          opacity: 0.6;
        }
      }
    }

    &.selected::before {
      background-color: rgba(41, 100, 82, 0.7);
      opacity: 0.6;
    }

    &.resultScreen::before {
      width: 96px;
      height: 96px;
    }

    &.success {
      &:hover::before {
        background-color: rgba(110, 148, 84, 0.5);
        opacity: 0.6;
      }
    }

    &.warning {
      &:hover::before {
        background-color: rgba(210, 172, 25, 0.5);
        opacity: 0.6;
      }
    }

    &.danger {
      &:hover::before {
        background-color: rgba(183, 19, 54, 0.5);
        opacity: 0.6;
      }
    }

    &.isComparisonScreen {
      &:hover::before {
        background-color: rgba(183, 19, 54, 0.5);
        opacity: 0.6;
      }
      &.officiallyChoosen {
        &:hover::before {
          background-color: rgba(110, 148, 84, 0.5);
        }
      }
    }
  }
}
</style>
