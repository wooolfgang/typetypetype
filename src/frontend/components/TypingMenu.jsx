import React from 'react';
import injectStyles from 'react-jss';
import ListModal from './ListModal';

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
      modalOpen: false
    }
  }

  onRedditSelect = async (subreddit) => {
    const { getTexts, setRandomText, setCurrentSubreddit } = this.props;
    setCurrentSubreddit(subreddit);
    const texts = await getTexts(subreddit);
    setRandomText(texts);
  }

  toggleModal = () => {
    this.setState({ modalOpen: this.state.modalOpen ? false : true });
  }

  render() {
    const { user, classes, props: { currentSubreddit, subredditList } } = this.props;
    return (
      <div className={classes.container}>
        <ul style={{ 'listStyle': 'none' }}>
          {
            subredditList.map((subreddit, key) =>
              <div key={subreddit} className={classes.linkContainer}>
                <li
                  className={classes.subredditLink}
                  onClick={() => this.onRedditSelect(subreddit)}
                  style={subreddit === currentSubreddit ? styles.activeSubreddit : undefined}>
                  {subreddit}
                </li>
                <span className={classes.viewLink} onClick={this.toggleModal}> view </span>
              </div>
            )
          }
        </ul>
        <div className={classes.userLevelContainer}>
          <div className={classes.expBar}>
          </div>
          <span> Level: <span className={classes.stats}> 21 </span> </span>
          <span> Average WPM: <span className={classes.stats}> {user ? user.wpm : undefined} </span></span>
          <span> Total words typed: <span className={classes.stats}> {user ? user.totalWordsTyped : undefined} </span> </span>
        </div>
        <ListModal modalOpen={this.state.modalOpen} />
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
    justifyContent: 'space-between',
  },
  userLevelContainer: {
    width: '60%',
    height: '90px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  subredditLink: {
    cursor: 'pointer',
    display: 'inline-block',
    width: ''
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  viewLink: {
    padding: '8px',
    fontSize: '12px',
    cursor: 'pointer',
    color: 'blue'
  },
  stats: {
    fontSize: '26px'
  }
})(TypingMenu);