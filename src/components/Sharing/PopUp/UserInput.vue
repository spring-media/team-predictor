<template lang="html">
  <div class="sharing-popup__input-wrap" :class="{'error': !inputCorrect && validInputLength, 'correct': inputCorrect && validInputLength}">
    <input class="sharing-popup__input" v-model="userInput" type="text" name="username" id="username" value="0" required></input>
    <label for="username">{{inputLabel}}</label>
    <!-- Show corresponding icon on user input: Success / Warn:  -->
    <span v-if="inputCorrect && validInputLength" class="input__icon input__icon--correct">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <g fill="none" fill-rule="evenodd">
              <circle cx="8" cy="8" r="8" fill="#6E9454"/>
              <path fill="#FFF" fill-rule="nonzero" d="M6.938 12.16a.592.592 0 0 1-.42-.178L3.2 8.619l.676-.685 3.018 3.06 5.133-7.154.773.57-5.382 7.5a.593.593 0 0 1-.48.25z"/>
          </g>
      </svg>
    </span>
    <span v-else-if="!inputCorrect && validInputLength" class="input__icon input__icon--warn">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <g fill="none" fill-rule="evenodd">
              <circle cx="8" cy="8" r="8" fill="#B71336"/>
              <path fill="#FFF" fill-rule="nonzero" stroke="#FFF" stroke-width=".5" d="M4 4.337L7.663 8 4 11.663l.337.337L8 8.337 11.663 12l.337-.337L8.337 8 12 4.337 11.663 4 8 7.663 4.337 4z"/>
          </g>
      </svg>
    </span>
  </div>
</template>

<script>
import axios from 'axios';
/*  Vue guide for name checking: https://vuejs.org/v2/guide/computed.html */
const blackListUrl =
  'https://static.apps.welt.de/sport/interaktiv/weltmeisterschaft-2018/assets/data/blacklist.json';
let blacklist;

/* check if input is a number: */
const checkIfNmbr = x => {
  return /\d/.test(x);
};

const checkIfBlacklisted = input => {
  const newInput = input.toLowerCase();
  for (var i = 0; i < blacklist.length; i++) {
    const token = blacklist[i].toLowerCase();
    if (newInput.match(token)) {
      return true;
    }
  }
  return false;
};

/* validation after RFC822 version: (https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript) */
const checkEmail = emailAddress => {
  var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
  var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
  var sAtom =
    '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
  var sQuotedPair = '\\x5c[\\x00-\\x7f]';
  var sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
  var sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
  var sDomain_ref = sAtom;
  var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
  var sWord = '(' + sAtom + '|' + sQuotedString + ')';
  var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
  var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
  var sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
  var sValidEmail = '^' + sAddrSpec + '$'; // as whole string

  var reValidEmail = new RegExp(sValidEmail);

  return reValidEmail.test(emailAddress);
};

export default {
  name: 'user-input',
  data: () => ({
    userInput: '',
    inputLabel: ''
  }),
  props: {
    defaultLabel: {
      type: String,
      required: true
    },
    wrongInputLabel: {
      type: String,
      required: true
    },
    isMail: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    inputCorrect() {
      /* // TODO: here insert check function, --> need's name list*/
      const input = this.userInput;

      if (this.validInputLength) {
        const isCorrect = this.isMail
          ? this.checkMail(input)
          : this.checkUserName(input);

        this.inputLabel = isCorrect ? '' : this.wrongInputLabel; // set label
        this.$emit('send', { isCorrect, input }); // notify parent
        return isCorrect;
      } else {
        this.inputLabel = this.defaultLabel;
        this.$emit('send', { isCorrect: false, input });
      }
    },
    validInputLength() {
      return this.userInput.length >= 2;
    }
  },
  methods: {
    checkMail(input) {
      if (checkEmail(input)) {
        return true;
      } else return false;
    },
    checkUserName(input) {
      if (!checkIfBlacklisted(input)) {
        return true;
      } else return false;
    }
  },
  created() {
    /* get blacklist for user input check:*/
    axios.get(blackListUrl).then(response => {
      const list = response.data.keywords;
      blacklist = list.split(', ');
    });
  }
};
</script>

<style lang="scss">
@import '../../../styles/base/_mediaqueries.scss';
@import '../../../styles/base/_settings.scss';
@import '../../../styles/base/_mixins.scss';

.sharing-popup {
  &__input {
    display: block;
    position: relative;
    width: 100%;
    margin: 0 auto;
    padding-top: 15px;
    outline: none;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #9e9e9e;

    @include MarkOt;
    font-size: 15px;
    line-height: 0.91;
    letter-spacing: 1.1px;
    color: #1d1d1d;

    transition: border-color 0.2s ease-out, box-shadow 0.2s ease-out;

    div {
      border: none;
    }

    + label {
      display: block;
      position: relative;
      height: 10px;
      @include MarkOt;
      font-size: 11px;
      line-height: 0.91;
      letter-spacing: 1.1px;
      text-transform: uppercase;
      text-align: left;
      color: #1d1d1d;
      opacity: 0.6;
      transform: translateY(-25px);

      transition: transform 0.2s ease-out, color 0.2s ease-out,
        opacity 0.2s ease-out;
      will-change: transform color opacity;

      @include mobile-portrait-only {
        font-size: 9px;
      }
    }
    /* firefox :*/
    &:-moz-ui-invalid {
      box-shadow: 0 1px 0 0 #246ea7;
    }

    &:focus,
    &:valid {
      border-bottom: 1px solid #246ea7;
      box-shadow: 0 1px 0 0 #246ea7;

      + label {
        transform: translateY(-40px);
        color: #246ea7;
        opacity: 1;
      }
    }
  }

  &__input-wrap {
    position: relative;
    display: block;
    margin-top: 15px;
    width: 100%;

    &.error {
      .sharing-popup__input {
        &:focus,
        &:valid {
          border-bottom: 1px solid #b71336;
          box-shadow: 0 1px 0 0 #b71336;

          + label {
            color: #b71336;
            text-transform: none;
          }
        }
      }
    }

    .input__icon {
      position: absolute;
      top: 0;
      right: -20px;
    }
  }
}
</style>
