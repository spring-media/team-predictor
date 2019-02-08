<template lang="html">
  <div class="main-section" :class="{resultScreen}" v-bind:id="'ia-wm-kader-section-'+headline">
    <div class="main-section__header">
      <h3 class="main-section__headline">{{headline}}</h3>
      <span v-if="!resultScreen" class="main-section__sub-headline">
        Wählen Sie <b>{{numberOfChoices}}</b> {{instruction}}
      </span>
    </div>
    <div class="main-section__items">
      <main-item
      v-for="(item) in content.content"
      v-if="(item.choosen && !resultScreen) || resultScreen"
      v-bind:key="item.id"
      v-bind:content="item"
      v-bind:maxCount="content.maxChoices"
      v-bind:currentCount="content.currentCount"
      v-bind:disabled="isComplete"
      v-bind:projectPath="projectPath"
      v-on:send="clickHandler(item.id)"></main-item>
    </div>
  </div>
</template>

<script>
import MainItem from '@/components/Main/Section/MainItem';

export default {
  name: 'main-section',
  components: {
    'main-item': MainItem
  },
  data: () => ({
    selected: [],
    currentTooltipIndex: 0
  }),
  props: {
    content: {
      type: Object,
      required: true
    },
    projectPath: {
      type: String,
      required: true
    },
    isComplete: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    content: function(val) {
      if (val.currentCount === 0) {
        this.selected = [];
      }
    }
  },
  computed: {
    headline() {
      return this.content.name;
    },
    numberOfChoices() {
      const max = this.content.maxChoices;
      const current = this.content.currentCount;

      if (current === 0) {
        return max;
      } else {
        const newVal = max - current;
        return 'noch ' + newVal;
      }
    },
    instruction() {
      return this.content.counterText;
    },
    resultScreen() {
      return this.$store.state.finished;
    }
  },
  methods: {
    /* sets the current selection count on main items: */
    manageSelections(itemId) {
      if (this.selected.indexOf(itemId) !== -1) {
        const arrayIndex = this.selected.indexOf(itemId);
        this.selected.splice(arrayIndex, 1);
      } else {
        this.selected.push(itemId);
      }
      for (let i = 0; i < this.selected.length; i++) {
        const targetItem = document.getElementById(
          'ia-main-item-counter-' + this.selected[i]
        );
        targetItem.innerHTML = i + 1;
      }
    },
    clickHandler(itemId) {
      if (!this.resultScreen) {
        this.manageSelections(itemId);

        this.$store.dispatch({
          type: 'triggerSelection',
          id: this.content.name,
          itemId: itemId
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../styles/base/_settings.scss';
@import '../../../styles/base/_mixins.scss';

.main-section {
  position: relative;
  max-width: 100%;
  width: 100%;

  &__header {
    position: relative;
  }

  &__headline {
    position: relative;
    @include MarkOt;
    font-size: 25px;
    font-weight: 800;
    line-height: 3.12;
    text-align: center;
    color: #1d1d1d;
    text-transform: uppercase;
    margin-bottom: 0;
    height: 50px;
  }

  &__sub-headline {
    position: relative;
    @include MarkOt;
    font-size: 16px;
    line-height: 2.75;
    text-align: center;
    color: #1d1d1d;
  }

  &__items {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
  }

  /* result screen: */
  &.resultScreen {
    .main-section__headline {
      font-size: 18px;
    }
  }
}
</style>
