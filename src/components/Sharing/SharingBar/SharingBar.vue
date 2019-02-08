<template lang="html">
    <div class="ia-sharing-bar sharing-bar" ref="sharingBar">
      <span v-if="!majorityScreen && isHeader" key="header" class="sharing-bar__title">IHRE AUFSTELLUNG SPEICHERN UND MIT FREUNDEN TEILEN</span>
      <span v-else key="footer" class="sharing-bar__title sharing-bar__title--footer">Aufstellung mit Freunden teilen</span>
      <div class="sharing-bar__wrapper">
        <div class="sharing-bar__icon-wrap">
            <!-- @TODO: sharing links austauschen gegen die richtigen -->
            <sharing-button-facebook :class="{disabled: currentPlattform !== '' && currentPlattform !== 'facebook' && sharingPopUpOpen}" @click.native="handleClick('facebook')"></sharing-button-facebook>
            <span class="vertical-divider"></span>
            <sharing-button-twitter :class="{disabled: currentPlattform !== '' && currentPlattform !== 'twitter' && sharingPopUpOpen}" @click.native="handleClick('twitter')"></sharing-button-twitter>
            <span class="vertical-divider"></span>
            <sharing-button-whatsapp :class="{disabled: currentPlattform !== '' && currentPlattform !== 'whatsapp' && sharingPopUpOpen}" @click.native="handleClick('whatsapp')"></sharing-button-whatsapp>
            <sharing-button-mail :class="{disabled: currentPlattform !== '' && currentPlattform !== 'mail' && sharingPopUpOpen}" @click.native="handleClick('mail')"></sharing-button-mail>
        </div>
      </div>
    </div>
</template>

<script>
import { scrollTo } from '@/utils/scrolling';
import { trackEvent } from '@/tracking';

import SharingButton_Facebook from './Icons/SharingButton_Facebook';
import SharingButton_Mail from './Icons/SharingButton_Mail';
import SharingButton_Twitter from './Icons/SharingButton_Twitter';
import SharingButton_Whatsapp from './Icons/SharingButton_Whatsapp';

export default {
  name: 'sharing-bar',
  components: {
    'sharing-button-facebook': SharingButton_Facebook,
    'sharing-button-mail': SharingButton_Mail,
    'sharing-button-twitter': SharingButton_Twitter,
    'sharing-button-whatsapp': SharingButton_Whatsapp
  },
  props: {
    isHeader: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    majorityScreen() {
      return this.$store.state.isMajorityScreen;
    },
    currentPlattform() {
      return this.$store.state.sharingDestination;
    },
    sharingPopUpOpen() {
      return this.$store.state.sharingPopUpOpen;
    }
  },
  methods: {
    handleClick(plattform) {
      /* set plattform in store: */
      this.$store.dispatch({
        type: 'chooseSharing',
        name: plattform
      });

      const popUp = document.getElementById('ia-wm-kader-sharing-popup');
      const sharingBar = this.$refs.sharingBar;
      if (!this.isHeader) {
        const offsetSharingBar = sharingBar.offsetHeight + sharingBar.offsetTop;
        scrollTo(popUp.offsetTop - offsetSharingBar, '', 800);
      }
      popUp.classList.add('active');
      trackEvent('wm-kader', 'click', 'sharing', 'popup-open');
    }
  }
};
</script>

<style lang="scss"  >
@import '../../../styles/base/_mediaqueries.scss';
@import '../../../styles/base/_settings.scss';
@import '../../../styles/base/_mixins.scss';

.sharing-bar {
  display: block;
  position: relative;
  margin: 0 auto;

  &__wrapper {
    text-align: center;
    display: block;
    max-width: 100%;
    width: 300px;
    margin: 0 auto;
  }

  &__title {
    display: block;
    @include MarkOt;
    font-size: 12px;
    font-weight: 800;
    line-height: 1.17;
    text-align: center;
    text-transform: uppercase;
    color: #003a5a;
    margin-top: 15px;
    margin-bottom: 5px;

    &--footer {
      font-size: 14px;
      text-align: center;
      color: #1d1d1d;
    }
  }

  &__icon-wrap {
    height: 41px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    .sharing-button {
      position: relative;
      margin: 0 38px;
      cursor: pointer;

      &.disabled {
        opacity: 0.3;
        transition: opacity 0.3s ease-out;
      }

      &.disabled:hover {
        opacity: 1;
      }
    }

    .vertical-divider {
      display: block;
      width: 1px;
      height: 20px;
      background-color: #bcbcbc;
    }
  }
}
</style>
