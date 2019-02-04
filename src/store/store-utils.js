/********************************************************
 * ----> Helper functions for the Vuex Store: <-------  *
 ****************************************************** */

/*
 * set the state object array for the main sections
 * (based on the given config data) :
 */
export const setSectionStateObject = configData => {
  const newStateObject = [];

  for (let i = 0; i < configData.mainSection.sections.length; i++) {
    newStateObject.push({
      ...configData.mainSection.sections[i],
      currentCount: 0,
      isComplete: false
    });
  }

  return newStateObject;
};

/*
 * get corresponding result-Content for page to display:
 */
export const getResultContent = (sectionContent, choices) => {
  const resultContent = [];

  /* loop through sections: */
  for (let i = 0; i < sectionContent.length; i++) {
    const currentContent = sectionContent[i].content;
    resultContent.push({
      ...sectionContent[i],
      currentCount: sectionContent[i].maxChoices,
      isComplete: true,
      content: []
    });

    /* get selected items: */
    for (let k = 0; k < currentContent.length; k++) {
      const currentItem = currentContent[k].id.toString();
      if (choices.indexOf(currentItem) !== -1) {
        resultContent[i].content.push(currentContent[k]);
      }
    }
  }

  return resultContent;
};

/*
 * get corresponding majority-Content based on firebase votings for page to display:
 */
export const getMajorityContent = (sectionContent, newContent) => {
  const resultContent = [];
  const choices = Object.keys(newContent);

  /* loop through sections: */
  for (let i = 0; i < sectionContent.length; i++) {
    const currentContent = sectionContent[i].content;
    resultContent.push({
      ...sectionContent[i],
      currentCount: sectionContent[i].maxChoices,
      isComplete: true,
      content: []
    });

    /* get selected items: */
    for (let k = 0; k < currentContent.length; k++) {
      const currentItem = currentContent[k].id.toString();
      if (choices.indexOf(currentItem) !== -1) {
        resultContent[i].content.push({
          ...currentContent[k],
          percentage: newContent[currentItem]
        });
      }
    }
  }

  return resultContent;
};

/*
 * set the array of the different
 * complete states of the main sections:
 */
export const setCompleteStateArray = configData => {
  const newStateObject = [];

  for (let i = 0; i < configData.mainSection.sections.length; i++) {
    newStateObject.push(false);
  }
  return newStateObject;
};

/* helper function for array check: */
export const checkCompleteArray = isComplete => isComplete;

export const createQueryUrl = (userName, userChoices, currentAppVersion) => {
  /* encode userName and choices: */
  const encodedName = btoa(userName);
  const encodedChoices = btoa(userChoices.toString());
  const encodedVersion = btoa(currentAppVersion);
  // eslint-disable-next-line
  const userPath = `&name=${encodedName}&choices=${encodedChoices}&version=${encodedVersion}`;
  // const userPath = `?&name=${encodedName}&choices=${encodedChoices}`;
  const url =
    window.location.href.replace(location.hash, '') +
    '?' +
    encodeURIComponent(userPath);
  return url;
};

/*
 * create share Url and open the sharing destination:
 */
export const openShareURL = (
  userUrl,
  sharingDestination,
  sharingTextIntro,
  sharingTextOutro,
  sharingTextGeneral,
  sharingName
) => {
  let shareUrl;
  const sharingText =
    sharingName.length > 0
      ? encodeURIComponent(
          `${sharingTextIntro} auch ${sharingName} soll mit! ${sharingTextOutro}`
        )
      : encodeURIComponent(`${sharingTextGeneral}`);

  switch (sharingDestination) {
    case 'twitter': {
      shareUrl = `https://twitter.com/share?url=${userUrl}&text=${sharingText}`;
      break;
    }
    case 'mail': {
      shareUrl = `mailto:?subject=Empfohlener%20Artikel%20von%20welt.de&body=Hallo%2C%0A%0Adas%20hier%20ist%20interessant%20%E2%80%93%20kommt%20von%20welt.de%3A%0A%0A${sharingText}%0A%0A${userUrl}%0A%0ACheck%20die%20Welt%3A%20Aktuelle%20Nachrichten%2C%20Hintergr%C3%BCnde%2C%20Analysen%20%E2%80%93%20jetzt%20auf%20https%3A%2F%2Fwww.welt.de%2F%0A`;
      break;
    }
    case 'facebook': {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${userUrl}`;
      break;
    }
    case 'whatsapp': {
      const whatsAppMessage = `${sharingText}
        ${userUrl}`;
      shareUrl = `whatsapp://send?text=${whatsAppMessage}`;
      break;
    }
    default:
      console.warn('no matching sharing plattform found.');
      break;
  }

  window.open(shareUrl.toString(), '_blank');
};

/*
 * gets the Information hold in the shared URL - Path:
 */
export const getInfoFromUrl = path => {
  const params = path.split('&');
  const name = atob(params[1].split('=')[1]);
  /* split back to array: */
  const choices = atob(params[2].split('=')[1]).split(',');

  return { name, choices };
};

/*
 * set Editor Votes:
 */
export const setEditorVotes = path => {
  const params = getInfoFromUrl(path);
  return params.choices;
};

/*
 * get the Sum of all votes counted by the firebase:
 */
export const getVoteSum = (sections, votes) => {
  let counter = 0;

  sections.forEach(section => {
    const currentCount = Object.values(votes[section.name]).reduce(
      (a, b) => a + b
    );
    counter += currentCount;
  });

  return counter;
};
