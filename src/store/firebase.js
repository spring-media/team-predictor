import * as firebase from 'firebase';

// Initialize Firebase
const config = require("../data/configFirebase.json");

firebase.initializeApp(config);

export const database = firebase.database();

/*
 * sets up the database structure for corresponding config.json:
 */
export const initDatabase = configData => {
  const sections = configData.mainSection.sections;
  let itemList = {};

  sections.forEach(section => {
    const content = section.content;
    let items = {};

    for (let i = 0; i < content.length; i++) {
      const id = content[i].id;
      items[id] = 0;
    }
    /* create object per sections and its corresponding items:*/
    itemList[section.name] = items;
  });

  const structure = {
    selections: itemList,
    sharedPages: 0,
    voteCounter: 0
  };

  database.ref().set(structure);
};

/*
 * used as Counter for Sharing Page Generation:
 */
export const updateNumberOfSharedPages = currentPagesShared => {
  let updates = {};
  const newVal = currentPagesShared + 1;
  updates['/sharedPages'] = newVal;

  database.ref().update(updates);
};

export const updateNumberOfVotings = currentVotes => {
  database.ref('/voteCounter').transaction(function(current) {
    // If node/clicks has never been set, current will be `null`.
    return (current || 0) + 1;
  });
};
