import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import { trackEvent } from '@/tracking';
import {
  database,
  initDatabase,
  getNumberOfSharedPages,
  updateNumberOfVotings
} from './firebase';
import {
  setSectionStateObject,
  setEditorVotes,
  getResultContent,
  getMajorityContent,
  getInfoFromUrl,
  getVoteSum,
  setCompleteStateArray,
  checkCompleteArray,
  createQueryUrl,
  openShareURL
} from './store-utils';

const configData = require('../data/configData.json');

/* init the Vuex Store: */
Vue.use(Vuex);

/* holds a local copy of the database snapshot: */
let dtbRecord;

/* initial State for Vuex Store (if reset) */
const initialState = () => ({
  sections: [],
  complete: [],
  userRetry: 0,
  finished: false,
  isSharingLink: false,
  userChoices: [],
  userName: '',
  sharingDestination: '',
  sharingUrl: '',
  sharingPopUpOpen: false,
  userHasShared: false,
  isMajorityScreen: false,
  isEditorsScreen: false,
  isComparisonScreen: false,
  toolTipID: '',
  sharingName: '',
  appVersion: 2,
  // editorVotes: setEditorVotes(configData.settings.editorsChoices),
  // editorName: configData.mainSection.editorTitle,
  configData: {}
});

/* the Vuex Store class: */
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    /* holds informations and states about each section: */
    sections: [],

    /* holds selection state of every section --> all true: Selection is complete */
    complete: [],

    /* holds a counter how often User has retried the game :*/
    userRetry: 0,

    /* is the selection complete ? : */
    finished: false,

    /* is the current view a shared view? : */
    isSharingLink: false,

    /* toggles if the Majority Screen should be displayed: */
    isMajorityScreen: false,

    /* toggles if the Choices made by the Editors should be displayed: */
    isEditorsScreen: false,

    /* toggles if the Choices made by the user should be compared with the official selection: */
    isComparisonScreen: false,

    /* item choices made by the user: */
    userChoices: [],

    /* the name given by the user: */
    userName: '',

    /* the social plattform chosen by the user: */
    sharingDestination: '',

    /* has the User already shared his Selection? */
    userHasShared: false,

    /* if the user has shared his url is captured here for sharing with other services: */
    sharingUrl: '',

    /* holds the Name of one of the items to be shared (tagged as dangered as first preference to be in the sharing text)*/
    sharingName: '',

    /* is sharing pop up currently open ? : */
    sharingPopUpOpen: false,

    /* holds the current selected item to toggle corresponding tooltip on mobile devices: */
    toolTipID: '',

    /* current software version used by the user (e.g. old shared site with version 1) : */
    appVersion: 2,
    // /* holds the choices made by the Editors: */
    // editorVotes: setEditorVotes(configData.settings.editorsChoices),
    //
    // /* the name of the editors to display: */
    // editorName: configData.mainSection.editorTitle,

    /* holds the most votet items from the database: */
    majorityVotes: {},

    configData: {}
  },
  getters: {
    mainContent: state => {
      const mainSection = state.configData.mainSection;
      let newContent;

      if (state.isMajorityScreen) {
        newContent = {
          sections: getMajorityContent(state.sections, state.majorityVotes),
          title: mainSection.majorityTitle,
          sub: mainSection.majoritySub,
          evaluation: mainSection.evaluation
        };
      } else if (state.isEditorsScreen) {
        const editorChoices = setEditorVotes(
          state.configData.settings.editorsChoices
        );
        newContent = {
          sections: getResultContent(state.sections, editorChoices),
          title: mainSection.editorTitle,
          sub: mainSection.editorSub
        };
      } else if (state.isComparisonScreen) {
        newContent = {
          sections: getResultContent(state.sections, state.userChoices),
          title: mainSection.comparison.comparisonTitle,
          sub: mainSection.comparison.comparisonSub
        };
      } else if (state.isSharingLink) {
        newContent = {
          sections: getResultContent(state.sections, state.userChoices),
          title: mainSection.sharedTitle,
          sub: mainSection.sharedSub,
          evaluation: mainSection.evaluation
        };
      } else if (state.finished) {
        newContent = {
          sections: getResultContent(state.sections, state.userChoices),
          title: mainSection.resultTitle,
          sub: mainSection.resultSub,
          evaluation: mainSection.evaluation
        };
      } else {
        newContent = {
          sections: state.sections,
          introText: state.configData.introSection.subtitle
        };
      }

      return newContent;
    }
  },
  mutations: {
    initConfigData(state, payload) {
      state.configData = payload;
    },
    initSections(state, payload) {
      state.sections = setSectionStateObject(state.configData);
    },
    modifySections(state, payload) {
      state.sections = payload;
    },
    initCompleteArray(state, payload) {
      state.complete = setCompleteStateArray(state.configData);
    },
    initAppVersion(state, payload) {
      state.appVersion = payload;
    },
    selection(state, payload) {
      if (!state.finished) {
        /* get values: */
        const index = state.sections.findIndex(x => x.name === payload.id);
        const currentSection = state.sections[index];
        const currentChoices = state.userChoices;
        const newValue = payload.itemId;

        /* decide if it's an increment or a decrement: */
        if (currentChoices.indexOf(newValue) !== -1) {
          currentSection.currentCount -= 1;

          const arrayIndex = currentChoices.indexOf(newValue);
          state.userChoices.splice(arrayIndex, 1);

          /* is max choice already reached?, if not add : */
        } else if (currentSection.currentCount < currentSection.maxChoices) {
          currentSection.currentCount++;
          state.userChoices.push(newValue);
        }

        /* check max choices reached: */
        if (currentSection.currentCount === currentSection.maxChoices) {
          currentSection.isComplete = true;
          state.complete[index] = true;
          trackEvent(
            'wm-kader',
            'click',
            'section-complete',
            currentSection.name
          );
          /* check if all selections are made: */
          if (state.complete.every(checkCompleteArray)) {
            this.state.finished = true;
            trackEvent('wm-kader', 'click', 'selection-complete');
          }
        } else {
          currentSection.isComplete = false;
          state.complete[index] = false;
        }

        /* modify the section state object: */
        Vue.set(state.sections, index, currentSection);
        /* mutate the user Choices: */
        // Vue.set(state.userChoices, currentChoices);
      }
    },
    setUserName(state, payload) {
      state.userName = payload;
    },
    setUserChoices(state, payload) {
      state.userChoices = [];
      state.userChoices = payload;
    },
    setSharingDestination(state, payload) {
      state.sharingDestination = payload;
    },
    setSharingScreen(state, payload) {
      state.finished = true;
      state.isSharingLink = true;
    },
    restartGame(state, payload) {
      const url = window.location.href
        .split('?')[0]
        .replace('https://welt.de', ''); // clean up URL in case of shared link: https://static.apps.welt.de
      window.history.replaceState({}, document.title, url);
      //
      // Object.assign(state, initialState()); // reinit stores state (without majorvotes,..
      //
      // window.scroll({ top: 0, left: 0 });
      // state.userRetry += 1; // increment user tries
      window.location.reload();
    },
    setMajorityVotes(state, payload) {
      state.majorityVotes = {};
      state.majorityVotes = payload;
    },
    toggleMajorityScreen(state, payload) {
      state.isEditorsScreen = false;
      state.isMajorityScreen = !state.isMajorityScreen;
    },
    toggleCompareScreen(state, payload) {
      state.isEditorsScreen = false;
      state.isMajorityScreen = false;
      state.isComparisonScreen = !state.isComparisonScreen;
    },
    toggleEditorsScreen(state, payload) {
      state.isMajorityScreen = false;
      state.isEditorsScreen = !state.isEditorsScreen;
    },
    showUserSelection(state, payload) {
      state.isMajorityScreen = false;
      state.isEditorsScreen = false;
    },
    setUserHasShared(state, payload) {
      state.userHasShared = true;
    },
    setSharingUrl(state, payload) {
      state.sharingUrl = payload;
    },
    setSharingName(state, payload) {
      state.sharingName = payload;
    },
    toggleSharingPopUp(state, payload) {
      state.sharingPopUpOpen = !state.sharingPopUpOpen;
    },
    setTooltipID(state, payload) {
      if (state.toolTipID !== payload) {
        state.toolTipID = payload;
      } else {
        state.toolTipID = '';
      }
    }
  },
  actions: {
    loadConfig({ commit, state, dispatch }, payload) {
      commit('initConfigData', configData);
      commit('initSections');
      commit('initCompleteArray');

      const currentPath = window.location.search;
      let sharedView = false;

      if (currentPath.length > 0) {
        /* split back to array: */
        const params = currentPath.split('&');

        /* check if the 2 params are present in query string: ('?' counts as one param) */
        if (params.length >= 3) {
          const name = atob(params[1].split('=')[1]);
          const choices = atob(params[2].split('=')[1]).split(',');

          // // check version --> if no information is present in url, it's version 1:
          const version =
            params.length > 3
              ? atob(params[3].split('=')[1]).split(',')
              : '1';

          commit('initAppVersion', parseInt(version[0], 10));

          /* check if name && and choices exist and if the query is not broken: */
          if (name.length >= 2) {
            sharedView = true;
            dispatch({
              type: 'triggerShareScreen',
              userName: name,
              userChoices: choices
            });
          }
        }
      }

      window.setTimeout(function() {
        trackEvent('wm-kader', 'view', sharedView ? 'shared' : '');
      }, 1000);
    },
    /* manage lineup by modifying the max choices of the sections: */
    triggerDropDownSelect({ commit, state }, payload) {
      const currentSections = setSectionStateObject(state.configData);
      let newSections = [];

      /* First Section ("Tor") is not included in Lineup choices: */
      newSections.push(currentSections[0]);

      /* Fill up the following sections - Lineup Choice means new MaxChoices Value for each section: */
      for (let i = 1; i < currentSections.length; i++) {
        newSections.push({
          ...currentSections[i],
          maxChoices: payload[i - 1]
        });
      }

      /* reset current made choices and update Sections with new maxChoices: */
      commit('setUserChoices', []);
      commit('modifySections', newSections);
    },
    /* manage user Selections on items: */
    triggerSelection({ commit, state, dispatch }, payload) {
      new Promise((resolve, reject) => {
        commit('selection', payload);
        resolve();
      }).then(() => {
        if (state.finished) {
          dispatch({ type: 'getMajorityVotes', updateVotes: true });
        }
      });
    },
    /* manage sharing destination */
    chooseSharing({ commit, state }, payload) {
      commit('setSharingDestination', payload.name);
      if (!state.sharingPopUpOpen) {
        commit('toggleSharingPopUp');
      }
    },
    /* manage user name input: */
    chooseUserName({ commit, state, dispatch }, payload) {
      /* trigger only if no userName hasn't been chosen yet: */
      new Promise((resolve, reject) => {
        commit('setUserName', payload.name);
        resolve();
      }).then(dispatch('generateSharingOutput'));
    },
    generateSharingOutput({ commit, state }, payload) {
      const {
        userName,
        userChoices,
        sharingDestination,
        userHasShared,
        sharingName,
        appVersion
      } = this.state;

      const { fileName } = state.configData.settings;

      if (!userHasShared) {
        // generate only sharing path if user hasn't shared already his selection
        const userURL = createQueryUrl(userName, userChoices, appVersion);

        commit('setSharingUrl', userURL);
        commit('setUserHasShared');

        openShareURL(
          userURL,
          sharingDestination,
          state.configData.sharing.sharingTextIntro,
          state.configData.sharing.sharingTextOutro,
          state.configData.sharing.sharingText,
          sharingName
        );
      } else {
        openShareURL(
          state.sharingUrl,
          sharingDestination,
          state.configData.sharing.sharingTextIntro,
          state.configData.sharing.sharingTextOutro,
          state.configData.sharing.sharingText,
          sharingName
        );
      }
    },
    /* trigger the store to display Sharing Screen: */
    triggerShareScreen({ commit, state, dispatch }, payload) {
      // const params = getInfoFromUrl(payload.currentPath);
      // commit('setSharingScreen');
      new Promise((resolve, reject) => {
        commit('setUserChoices', payload.userChoices);
        commit('setUserName', payload.userName);
        resolve();
      })
        .then(() => {
          commit('setSharingScreen');
        })
        .then(dispatch({ type: 'getMajorityVotes', updateVotes: false }));
    },
    /* gets the most votet selections from the database: */
    getMajorityVotes({ commit, state, dispatch }, payload) {
      database.ref().once('value', snapshot => {
        if (snapshot.exists()) {
          dtbRecord = snapshot.val();

          const votes = dtbRecord.selections;
          let majVotes = {};
          const sections = state.configData.mainSection.sections;
          const voteSum = dtbRecord.voteCounter;

          sections.forEach(section => {
            const max = section.maxChoices;
            const content = Object.keys(votes[section.name]).sort(function(
              a,
              b
            ) {
              return votes[section.name][b] - votes[section.name][a];
            });

            for (let i = 0; i < max; i++) {
              const voteCount = votes[section.name][content[i]]; // get the corresponding vote counter of the database - Record
              const percentage = voteSum > 0 ? voteCount / voteSum * 100 : 0;
              majVotes[content[i]] = percentage;
            }
          });

          new Promise((resolve, reject) => {
            commit('setMajorityVotes', majVotes);
            resolve();
          }).then(() => {
            if (payload.updateVotes) {
              // update database with new selections:
              dispatch({ type: 'updateMajorityVotes' });
              updateNumberOfVotings(dtbRecord.voteCounter);
            }
          });
        } else {
          initDatabase(state.configData);
        }
      });
    },
    /* updates the database with the new user Selections: */
    updateMajorityVotes({ state }) {
      const content = getResultContent(state.sections, state.userChoices);

      let updates = {};

      content.forEach(section => {
        const sectionName = section.name;
        const sectionContent = section.content;

        sectionContent.forEach(item => {
          const id = item.id.toString();
          const currentValue = dtbRecord.selections[sectionName][id];

          if (currentValue == null) {
            const newVal = 1; // if value isn't present (i.e. added later), then it has one selection now,
            updates['/selections/' + sectionName + '/' + id] = newVal;
          } else {
            const newVal = currentValue + 1;
            updates['/selections/' + sectionName + '/' + id] = newVal;
          }
        });
      });
      database.ref().update(updates);
    }
  }
});
