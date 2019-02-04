<template lang="html">
  <div class="main-comparison">
    <p class="main-comparison__text">
      {{userName}} hat <span class="success ">{{mainSuccess}} <img class="icon-status" src="https://static.apps.welt.de/sport/interaktiv/weltmeisterschaft-2018/assets/icons/check_richtig2x.png"/> ausgewählt,</span> {{mainComparison}}<span class="danger">{{mainDanger}}</span> lag {{userName}} leider <span class="danger"><img class="icon-status wrong" src="https://static.apps.welt.de/sport/interaktiv/weltmeisterschaft-2018/assets/icons/check_falsch2x.png"/> falsch.</span>
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
  name: 'main-comparison',
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
      mainConfig: state => state.configData.mainSection.comparison,
      sectionContent: state => state.configData.mainSection.sections,
      sharingName: state => state.sharingName,
      storeTry: state => state.userRetry
    }),
    sectionStatus() {
      // get the current Counter of status per category
      const sections = this.$store.getters.mainContent.sections;
      let choosenCounter = {
        check: 0,
        not: 0
      };

      sections.forEach(section => {
        const sectionContent = section.content;
        sectionContent.forEach(item => {
          const choosen = item.choosen;

          if (choosen) {
            choosenCounter.check += 1;
          } else {
            choosenCounter.not += 1;
          }
        });
      });

      return choosenCounter;
    },
    mainSuccess() {
      const { mainConfig, sectionStatus } = this;
      const currentCount = sectionStatus.check;
      const newCount =
        currentCount > 12 ? currentCount : numberName[currentCount.toString()];

      return newCount + ' ' + mainConfig.itemComparison;
    },
    mainComparison() {
      const { mainConfig } = this;
      return mainConfig.mainComparison;
    },
    mainDanger() {
      const { mainConfig, sectionStatus } = this;
      const currentCount = sectionStatus.not;
      const newCount =
        currentCount > 12 ? currentCount : numberName[currentCount.toString()];

      const items =
        currentCount > 1
          ? newCount + ' ' + mainConfig.itemComparison + 'n'
          : newCount + ' ' + mainConfig.itemComparison;
      return items;
    }
  }
};
</script>

<style lang="scss">
@import '../../../styles/base/_settings.scss';
@import '../../../styles/base/_mixins.scss';
@import '../../../styles/base/_mediaqueries.scss';

.main-comparison {
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
      // white-space: nowrap;
    }

    .success {
      color: #296452;
    }

    .warning {
      color: $warning;
    }

    .danger {
      color: #b71336;
    }

    .icon-status {
      display: inline-block;
      height: 20px;
      width: 20px;
      transform: translateY(5px);
    }
  }
}
</style>
