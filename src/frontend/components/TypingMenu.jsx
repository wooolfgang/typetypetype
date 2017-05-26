import React from 'react';
import injectStyles from 'react-jss';

const subredditList = ['TodayILearned', 'Showerthoughts', 'Askreddit'];

const styles = {
  activeSubreddit: {
    background: 'DarkSlateBlue',
    borderRadius: '5px',
    color: 'white',
  }
}

class TypingMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSubreddit: subredditList[0],
    }
  }

  onRedditSelect = async (subreddit) => {
    this.setState({ currentSubreddit: subreddit });
    const { getTexts, setRandomText } = this.props;
    const texts = await getTexts(subreddit);
    setRandomText(texts);
  }

  render() {
    const { user, classes } = this.props;
    return (
      <div className={classes.container}>
        <ul style={{ 'listStyle': 'none' }}>
          {
            subredditList.map(subreddit =>
              <li key={subreddit} className={classes.subredditLink} onClick={() => this.onRedditSelect(subreddit)} style={subreddit === this.state.currentSubreddit ? styles.activeSubreddit : undefined}> {subreddit} </li>
            )
          }
        </ul>
        <div className={classes.userLevelContainer}>
          <div className={classes.expBar}>
          </div>
          <span> Average WPM: {user ? user.wpm : undefined} </span>
          <span> Total words typed: {user ? user.totalWordsTyped : undefined} </span>
        </div>
      </div>
    );
  }
}

export default injectStyles({
  container: {
    display: 'flex',
    height: '120px',
    width: '100%',
    borderBottom: '1px solid lightgray',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  userLevelContainer: {
    width: '40%',
    height: '90px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  subredditLink: {
    cursor: 'pointer',
  }
})(TypingMenu);