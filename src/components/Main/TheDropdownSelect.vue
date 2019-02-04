<template lang="html">
  <div class="dropdown-wrap">
    <label>
      <select class="dropdown-select" v-model="currentSelection" @change="setLineup">
        <!-- <option disabled value="null"> {{ options[0].join(' - ') }}</option> -->
        <option v-for="(option, index) in options" :key="'option-'+ option.join(' - ')" :value="option">
         {{ option.join(' - ') }}
        </option>
    </select>
    </label>
    <div class="dropdown-select__tooltip" :class="{showTooltip}">
      <!-- <p>Aufstellung gewechselt zu <b>{{currentSelection.join(' - ')}}</b>.</p> -->
      <p>Die Auswahl wurde zurück gesetzt.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'the-drop-down-select',
  data: () => ({
    currentSelection: null,
    showTooltip: false
  }),
  computed: {
    options() {
      return this.$store.state.configData.mainSection.lineup;
    },
    /* @returns Boolean*/
    selectionContainsValues() {
      return this.$store.state.userChoices.length > 0;
    }
  },
  methods: {
    setLineup() {
      const newValue = this.currentSelection;

      if (this.selectionContainsValues) {
        this.showTooltip = true;
        setTimeout(() => {
          this.showTooltip = false;
        }, 3000);
      }
      this.$store.dispatch('triggerDropDownSelect', newValue);
    }
  },
  mounted() {
    this.currentSelection = this.options[1];
  }
};
</script>

<style lang="scss">
@import '../../styles/base/_mediaqueries.scss';
@import '../../styles/base/_settings.scss';
@import '../../styles/base/_mixins.scss';
@import '../../styles/animations/_animations.scss';

.dropdown-wrap {
  position: relative;
  display: block;
  margin: 0 auto;
  margin-top: 50px;
  width: 128px;
  height: 44px;
  background: url('https://static.apps.welt.de/sport/interaktiv/weltmeisterschaft-2018/assets/icons/drop-down-select-arrow.svg');
  background-repeat: no-repeat;
  background-position: 90% center;

  border-radius: 3px;
  border: solid 1px #bcbcbc;
}

/* To remove button from IE11: */
// url: https://fabriceleven.com/design/clever-way-to-change-the-drop-down-selector-arrow-icon/
select.dropdown-select::-ms-expand {
  display: none;
}

.dropdown-select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  width: 128px;
  height: 44px;
  border: none;
  background-color: transparent;

  @include MarkOt;
  font-size: 16px;
  font-weight: 800;
  text-align: justify;
  /* drop down select hack: */
  text-align-last: center;
  letter-spacing: 0;
  color: #00395b;

  option {
    text-align: center;
  }

  &__tooltip {
    display: block;
    position: fixed;
    bottom: 0;
    left: 50%;
    height: 60px;
    width: 300px;
    border-radius: 15%/80%;
    border: 2px solid $success;
    background-color: $success;
    z-index: 9999999;

    opacity: 0;
    visibility: 0;
    transform: translate(-50%, 30%);

    transition: all 0.6s ease-out;

    p {
      @include MarkOt;
      font-size: 14px;
      display: block;
      margin: 0 auto;
      margin-top: 20px;
      text-align: center;
      width: 90%;
      font-weight: 800;
      color: #fff;
    }

    &.showTooltip {
      display: block;
      animation: showDropdownTooltip 3s ease-out;
    }
  }
}
</style>
