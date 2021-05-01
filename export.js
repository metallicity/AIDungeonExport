var { accessToken } = JSON.parse(window.localStorage.LOGGED_IN_USER);

var variables = {
  input: {
    searchTerm: "",
    saved: false,
    trash: false,
    contentType: "adventure",
    sortOrder: "updatedAt",
  },
};

var query = `
query ($input: SearchInput) {
  user {
    id
    search(input: $input) {
      ...ContentListSearchable
      __typename
    }
    __typename
  }
}

fragment ContentListSearchable on Searchable {
  ...ContentCardSearchable
  __typename
}

fragment ContentCardSearchable on Searchable {
  id
  publicId
  userId
  title
  description
  tags
  createdAt
  publishedAt
  updatedAt
  deletedAt
  published
  isOwner
  user {
    ...UserTitleUser
    __typename
  }
  ... on Adventure {
    actionCount
    actions {
      id
      text
      __typename
    }
    worldInfo
    userJoined
    scenario {
      id
      title
      publicId
      published
      deletedAt
      __typename
    }
    ...QuestControllerAdventure
    ...EventControllerAdventure
    ...RememberControllerAdventure
    ...ScoreDisplayAdventure
    __typename
  }
  ...ContentOptionsSearchable
  ...ContentStatsCommentable
  ...ContentStatsVotable
  ...DeleteButtonSearchable
  ...SaveButtonSavable
  __typename
}

fragment ContentOptionsSearchable on Searchable {
  id
  publicId
  published
  isOwner
  tags
  title
  userId
  ... on Savable {
    isSaved
    __typename
  }
  ... on Adventure {
    userJoined
    __typename
  }
  __typename
}

fragment ContentStatsCommentable on Commentable {
  ...CommentButtonCommentable
  __typename
}

fragment CommentButtonCommentable on Commentable {
  id
  publicId
  allowComments
  totalComments
  __typename
}

fragment ContentStatsVotable on Votable {
  ...VoteButtonVotable
  __typename
}

fragment VoteButtonVotable on Votable {
  id
  userVote
  totalUpvotes
  __typename
}

fragment DeleteButtonSearchable on Searchable {
  id
  publicId
  published
  __typename
}

fragment SaveButtonSavable on Savable {
  id
  isSaved
  __typename
}

fragment UserTitleUser on User {
  id
  username
  icon
  ...UserAvatarUser
  __typename
}

fragment UserAvatarUser on User {
  id
  username
  avatar
  __typename
}

fragment QuestControllerAdventure on Adventure {
  id
  publicId
  lastAction {
    id
    text
    __typename
  }
  quests {
    id
    text
    completed
    active
    actionGainedId
    actionCompletedId
    __typename
  }
  __typename
}

fragment EventControllerAdventure on Adventure {
  id
  publicId
  events
  __typename
}

fragment RememberControllerAdventure on Adventure {
  id
  memory
  authorsNote
  __typename
}

fragment ScoreDisplayAdventure on Adventure {
  id
  score
  gameState
  __typename
}
`;

var fetchAdventures = (offset) => {
  var input = { ...variables.input, offset };
  var body = { variables: { input }, query };
  return fetch("https://api.aidungeon.io/graphql", {
    headers: {
        "content-type": "application/json",
        "X-Access-Token": accessToken,
    },
    "body": JSON.stringify(body),
    "method": "POST",
  }).then((r) => r.json());
};

var fetchAllAdventures = async () => {
  var allAdventures = [];
  for (var offset = 0; true; offset += 15) {
    var results = await fetchAdventures(offset);
    var adventures = results.data.user.search;
    allAdventures.push(...adventures);
    console.log(`retrieved ${allAdventures.length} total adventures`);
    if (adventures.length < 15) break;
  }
  return allAdventures;
};

var getText = (allAdventures) => {
  if (!allAdventures) return console.log("adventures not loaded");
  var adventuresText = allAdventures.map((adventure) => {
    var { tags, worldInfo, quests, actions } = adventure;
    var createdAt = new Date(adventure.createdAt).toDateString();
    var updatedAt = new Date(adventure.updatedAt).toDateString();
    var statsText = `Created At: ${createdAt}\n\nUpdated At: ${updatedAt}`;
    var tagsText = (tags || []).map((tag) => ` - ${tag}`).join("\n");
    var worldInfoText = (worldInfo || []).map(({ keys, entry }) => {
      return `#### ${keys}\n\n${entry}`;
    }).join("\n\n");
    var questsText = (quests || []).map(({ text, active, completed }) => {
      var activeText = active ? " (Active)" : "";
      var completedText = completed ? " (Completed)" : "";
      return ` - ${text}${activeText}${completedText}`;
    }).join("\n");
    var actionsText = (actions || []).map(({ text }) => {
      return text.replace(/\n/g, "\n\n");
    }).join("").trim();
    var sections = [
      { header: "Description", content: adventure.description || "" },
      { header: "Tags", content: tagsText },
      { header: "Remember", content: adventure.memory || "" },
      { header: "Author's Note", content: adventure.authorsNote || "" },
      { header: "World Info", content: worldInfoText },
      { header: "Quests", content: questsText },
      { header: "Actions", content: actionsText },
    ];
    var getSection = ({ header, content }) => `### ${header}\n\n${content}`;
    var sectionsText = sections.map(getSection).join("\n\n");
    return `## ${adventure.title}\n\n${statsText}\n\n${sectionsText}`;
  }).join("\n\n\n");
  return `# AI Dungeon Export\n\n${adventuresText}`;
};

var allAdventures, allAdventuresText;

fetchAllAdventures().then((data) => {
  allAdventures = data;
  allAdventuresText = getText(allAdventures);
  console.log("done", allAdventures);
});
