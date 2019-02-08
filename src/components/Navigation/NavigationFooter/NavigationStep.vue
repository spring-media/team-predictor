<template lang="html">
<!-- <transition name="shrink">
  v-if="!resultScreen && !shareScreen" -->
  <div  class="navigation-step" :class="{active, checked, resultScreen}" :style="style" v-on:click="clickHandler">
    <span class="navigation-step__title">{{title}}</span>
    <span ref="circleblink" class="navigation-step__progress" :class="{blink}">{{currentCount}}/{{maxCount}}</span>
  </div>
<!-- </transition> -->
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'navigation-step',
  data: () => ({
    blink: false
  }),
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    currentCount: {
      type: [String, Number],
      required: true
    },
    maxCount: {
      type: [String, Number],
      required: true
    },
    iconPath: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    currentCount: function(val) {
      this.blink = true;
    }
  },
  computed: {
    ...mapState({
      shareScreen: state => state.isSharingLink,
      resultScreen: state => state.finished
    }),
    checked() {
      return this.currentCount === this.maxCount;
    },
    style() {
      return `background-image: url(${this.iconPath}checkmark-01.svg);`;
    }
  },
  methods: {
    clickHandler() {
      this.$emit('send', this.id);
    }
  },
  mounted() {
    const circle = this.$refs.circleblink;
    circle.addEventListener(
      'animationend',
      () => {
        this.blink = false;
      },
      false
    );
  }
};
</script>

<style lang="scss">
@import '../../../styles/base/_mediaqueries.scss';
@import '../../../styles/base/_settings.scss';
@import '../../../styles/base/_mixins.scss';
@import '../../../styles/animations/_animations.scss';

.navigation-step {
  position: relative;
  margin: 40px 7vw 0;
  border-radius: 50%;
  border: solid 2px #003a5a;
  background-color: #fff;
  height: 25px;
  width: 25px;

  cursor: pointer;

  background-image: url('');
  background-position: center;
  background-size: 0;
  background-repeat: no-repeat;

  transition: all 0.3s ease-in;

  &::before {
    position: absolute;
    top: 50%;
    left: 110%;
    transform: translateY(-50%);

    display: block;
    content: '';
    height: 1px;
    background-color: #bcbcbc;
    width: 15vw;
  }

  &.active {
    background-color: #f18825;
    border-color: #f18825;
  }

  &.checked {
    background-color: #6d9453;
    border-color: #6d9453;
    background-size: contain;
  }

  &__indicator {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: block;
    content: '';
    height: 25px;
    width: 25px;
    background-color: #f18825;
    border-radius: 50%;
    border: solid 2px #f18825;
    opacity: 0;
    z-index: -1;
  }

  &__progress,
  &__title {
    position: absolute;
    top: -35px;
    left: 50%;
    transform: translateX(-50%);

    @include MarkOt;
    font-size: 12px;
    font-weight: 800;
    line-height: 1.08;
    text-transform: uppercase;
    text-align: center;
    color: #1d1d1d;
  }

  &__progress {
    font-weight: normal;
    top: -20px;

    &.blink {
      animation: blinking-text 0.3s;
    }
  }
}

/*
 * Result Screen Styling:
 */
.navigation-step.resultScreen {
  animation: shrinkAnimation 0.4s 1s ease-out forwards;
  background-color: #6d9453;
  border-color: #6d9453;
  background-size: contain;

  .navigation-step {
    &__title,
    &__progress {
      opacity: 0;
      transition: 0.3s;
    }
  }

  &::before {
    opacity: 0;
    transition: 0.3s;
  }
}
</style>
