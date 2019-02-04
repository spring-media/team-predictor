<template lang="html">
  <div class="main-evaluation">
    <p class="main-evaluation__text">
      {{intro}} <span class="success mobile-br">{{mainSuccess}},</span> <span class="warning">{{mainWarning}}</span> <br> und <span class="danger mobile-br">{{mainDanger}}.</span> {{mainAdvice}}
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

const numberName = {
  '0': 'null',
  '1': 'einem',
  '2': 'zwei',
  '3': 'drei',
  '4': 'vier',
  '5': 'fünf',
  '6': 'sechs',
  '7': 'sieben',
  '8': 'acht',
  '9': 'neun',
  '10': 'zehn',
  '11': 'elf',
  '12': 'zwölf'
};

export default {
  name: 'main-evaluation',
  data: () => ({
    currentTry: null
  }),
  computed: {
    ...mapState({
      resultScreen: state => state.finished,
      shareScreen: state => state.isSharingLink,
      majorityScreen: state => state.isMajorityScreen,
      comparisonScreen: state => state.isComparisonScreen,
      userName: state => state.userName,
      mainConfig: state => state.configData.mainSection.evaluation,
      sectionContent: state => state.configData.mainSection.sections,
      sharingName: state => state.sharingName,
      storeTry: state => state.userRetry
    }),
    sectionStatus() {
      // get the current Counter of status per category
      const sections = this.$store.getters.mainContent.sections;
      let statusCounter = {
        success: {
          ids: [],
          count: 0
        },
        warning: {
          ids: [],
          count: 0
        },
        danger: {
          ids: [],
          count: 0
        }
      };

      sections.forEach(section => {
        const sectionContent = section.content;
        sectionContent.forEach(item => {
          const status = item.status;

          switch (status) {
            case 'success':
              statusCounter.success.ids.push(item.id);
              statusCounter.success.count += 1;
              break;
            case 'warning':
              statusCounter.warning.ids.push(item.id);
              statusCounter.warning.count += 1;
              break;
            case 'danger':
              statusCounter.danger.ids.push(item.id);
              statusCounter.danger.count += 1;
              break;
            case 'removed':
              break;
            default:
              console.warn(
                status + 'is not matching any status possibility given!'
              );
              break;
          }
        });
      });

      if (
        (this.currentTry === null && !this.shareScreen) ||
        (this.storeTry !== this.currentTry &&
          this.sharingName.length === 0 &&
          !this.shareScreen)
      ) {
        // const newName = this.sendSharingCandidate(statusCounter.danger.ids);
        //
        // this.$store.commit('setSharingName', newName);
        this.currentTry = this.storeTry;
      }
      return statusCounter;
    },
    intro() {
      const {
        majorityScreen,
        shareScreen,
        resultScreen,
        introResult,
        userName,
        mainConfig
      } = this;

      if (majorityScreen) {
        return mainConfig.introMajority;
      } else if (shareScreen) {
        return userName + mainConfig.introShared;
      } else if (resultScreen) {
        return mainConfig.introResult;
      }
    },
    mainSuccess() {
      const { mainConfig, sectionStatus } = this;
      const currentCount = sectionStatus.success.count;
      const newCount =
        currentCount > 12 ? currentCount : numberName[currentCount.toString()];

      return newCount + ' ' + mainConfig.success;
    },
    mainWarning() {
      const { mainConfig, sectionStatus } = this;
      const currentCount = sectionStatus.warning.count;
      const newCount =
        currentCount > 12 ? currentCount : numberName[currentCount.toString()];

      return newCount + ' ' + mainConfig.warning;
    },
    mainDanger() {
      const { mainConfig, sectionStatus } = this;
      const currentCount = sectionStatus.danger.count;
      const newCount =
        currentCount > 12 ? currentCount : numberName[currentCount.toString()];

      return newCount + ' ' + mainConfig.danger;
    },
    mainAdvice() {
      const { mainConfig } = this;
      return mainConfig.advice;
    }
  },
  methods: {
    sendSharingCandidate(candidats) {
      const sections = this.sectionContent;
      let candidateName = '';
    
      // Mittelfeld first --> Sturm --> and last Tor for Sharing Name Preference:
      for (let i = 2; i < sections.length; i++) {
        if (i === 0) {
          break;
        } else if (i === 1) {
          i = 0;
        } else if (i === sections.length - 1) {
          i = 1;
        }
        if (candidateName.length === 0) {
          const current = sections[i].content;
          current.forEach(item => {
            if (candidats.indexOf(item.id) !== -1) {
              candidateName = item.name;
              return;
            }
          });
        } else return candidateName;
      }

      return candidateName; // if nothing was found, return empty string
    }
  }
};
</script>

<style lang="scss">
@import '../../../styles/base/_settings.scss';
@import '../../../styles/base/_mixins.scss';
@import '../../../styles/base/_mediaqueries.scss';

.main-evaluation {
  display: block;
  margin: 0 auto;
  margin-top: 15px;
  padding: 0px;
  width: 90%;

  &__text {
    display: block;
    margin: 0 auto;
    @include MarkOt;
    font-size: 16px;
    line-height: 1.56;
    text-align: center;
    color: #1d1d1d;
    max-width: 650px;

    br {
      display: none;
    }

    .mobile-br {
      display: block;
    }

    @include desktop-and-up {
      br {
        display: block;
      }

      .mobile-br {
        display: inline-block;
      }
    }

    span {
      display: inline-block;
      font-weight: 800;
      white-space: nowrap;
    }

    .success {
      color: $success;
    }

    .warning {
      color: $warning;
    }

    .danger {
      color: $danger;
    }
  }
}
</style>
