<template lang="html">
<div class="sharing-popup" id="ia-wm-kader-sharing-popup">
  <div class="sharing-popup__close-button">
    <span class="close-button__icon" v-on:click="handleClose">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <path fill="#1D1D1D" fill-rule="evenodd" d="M6.933 8L0 14.933 1.067 16 8 9.067 14.933 16 16 14.933 9.067 8 16 1.067 14.933 0 8 6.933 1.067 0 0 1.067z"/>
      </svg>
    </span>
  </div>
  <div class="sharing-popup__inner-wrap">
    <h3 class="sharing-popup__title">Um Ihre Aufstellung zu speichern, brauchen wir noch folgende Informationen:</h3>
    <!-- Name: -->
    <user-input
      :defaultLabel="'Bitte tragen Sie einen Namen ein'"
      :wrongInputLabel="'Name entspricht nicht den Vorgaben'"
      :isMail="false"
      @send="setNameCorrect" @keyup.enter.native="handleSubmit"></user-input>
    <!-- E-Mail: -->
    <!-- <user-input
      :defaultLabel="'Bitte tragen Sie Ihre E-Mail Adresse ein'"
      :wrongInputLabel="'Adresse entspricht nicht den Vorgaben'"
      :isMail="true"
      @send="setAdressCorrect"></user-input> -->

    <div class="sharing-popup__button-wrap">
        <button class="sharing-popup__button" ref="submitButton" :disabled="disableButton" @click="handleSubmit" href="">IHRE AUFSTELLUNG TEILEN</button>
    </div>
  </div>
</div>
</template>

<script>
import UserInput from './UserInput';

export default {
  name: 'sharing-popup',
  data: () => ({
    userName: {
      correct: false,
      content: '',
      submitted: false,
    },
    userAdress: {
      correct: false,
      content: ''
    }
  }),
  components: {
    'user-input': UserInput
  },
  computed: {
    disableButton() {
      if (!this.userName.correct) {
        return true;
      } else return false;
    }
  },
  methods: {
    handleClose() {
      /* element has extern added classes: */
      const thisEl = document.getElementById('ia-wm-kader-sharing-popup');
      thisEl.classList.remove('active');
      this.$store.commit('toggleSharingPopUp');
    },
    /* token is authentification object send from invisible recaptcha: */
    handleSubmit() {
      if (this.userName.correct) {
        this.$store.dispatch({
          type: 'chooseUserName',
          name: this.userName.content
        });
      }
    },
    setNameCorrect(params) {
      this.userName = {
        correct: params.isCorrect,
        content: params.input
      };
    },
    setAdressCorrect(params) {
      this.userAdress = {
        correct: params.isCorrect,
        content: params.input
      };
    }
  }
};
</script>

<style lang="scss"  >
@import '../../../styles/base/_mediaqueries.scss';
@import '../../../styles/base/_settings.scss';
@import '../../../styles/base/_mixins.scss';

.sharing-popup {
  position: relative;
  display: block;
  max-width: 640px;
  width: 100%;
  height: 260px;

  margin: 0 auto;
  padding-top: 25px;
  border: none;
  margin-top: 15px;
  margin-bottom: -30px;

  /* transition values: */
  max-height: 0;
  transform: scale(1, 0.001);

  transition: all 0.3s 0.1s ease-out;

  @include desktop-and-up {
    width: 100%;
    height: 250px;
  }

  &.active {
    max-height: 260px;
    margin-bottom: 0;
    border: solid 1px #bcbcbc;
    border-left: none;
    border-right: none;
    transform: scale(1, 1);
    transition: all 0.3s 0s ease-out;

    .sharing-popup__inner-wrap {
      opacity: 1;
      transition: opacity 0.3s 0.4s ease-out;
    }

    .sharing-popup__close-button {
      opacity: 1;
      z-index: 999999;
      transition: opacity 0.6s 0.4s ease-out;
    }

    @include desktop-and-up {
      border-left: solid 1px #bcbcbc;
      border-right: solid 1px #bcbcbc;

      &:hover {
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
      }
    }
  }

  &__inner-wrap {
    display: block;
    margin: 0 auto;
    height: 100%;
    width: 85%;
    opacity: 0;

    transition: opacity 0.1s ease-out;
  }

  &__close-button {
    display: block;
    position: relative;
    text-align: right;
    margin-right: 15px;
    opacity: 0;
    cursor: pointer;

    transition: opacity 0.1s ease-out;

    span {
      object-fit: contain;
    }
  }

  &__title {
    display: block;
    position: relative;
    @include MarkOt;
    font-size: 18px;
    font-weight: 800;
    line-height: 1.39;
    text-align: left;
    color: #000000;
    margin-top: 0;
    margin-bottom: 40px;

    @include desktop-and-up {
      font-size: 22px;
    }
  }

  &__button {
    display: block;
    margin-top: 30px;

    width: 100%;
    padding: 0;
    border: none;
    outline: none;
    background-color: transparent;

    @include MarkOt;
    font-size: 14px;
    font-weight: 800;
    text-align: right;
    text-decoration: none;
    text-transform: uppercase;
    color: $weltorange;
    opacity: 1;
    cursor: pointer;
    transition: opacity 0.3s ease-out;

    &[disabled='disabled'] {
      opacity: 0.6;
      cursor: default;
    }
  }
}
</style>
