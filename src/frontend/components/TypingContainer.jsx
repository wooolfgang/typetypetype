import React from 'react';
import injectStyles from 'react-jss'
import TypingBox from './TypingBox';
import TypingField from './TypingField';
import TypingResults from './TypingResults';
import TypingMenu from './TypingMenu';
import Countdown from './CountDown';
import { fetchSubreddit, getUser } from '../functions';

const initialState = {
  textfieldValue: '',
  typingFinished: false,
  timerStarted: false,
  currentKey: 0,
  currentText: [],
  secondsPassed: 0,
  wpm: undefined,
  correctWords: undefined,
  wrongWords: undefined,
  user: undefined,
  subredditList: ['TodayILearned', 'Showerthoughts', 'Askreddit'],
};

class TypingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount = async () => {
    const texts = await this.getTexts();
    this.setState({ texts: texts });
    this.setRandomText(this.state.texts);
  }

  resetState = async () => {
    this.setState(initialState);
    clearInterval(this.state.timerKey);
    this.setRandomText(this.state.texts);

    if (this.state.user) {
      this.props.setUser(this.state.user);
    }
  }

  getTexts = async (subreddit) => {
    if (!subreddit) {
      this.setState({ currentSubreddit: this.state.subredditList[0] })
      subreddit = this.state.currentSubreddit;
    }

    const response = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=50`);
    const json = await response.json();
    const texts = json.data.children.map(data => {
      return {
        author: data.data.author,
        link: data.data.permalink,
        subreddit: data.data.subreddit,
        text: data.data.title
      }
    });
    console.log(texts);
    return texts;
  }

  setRandomText = (texts) => {
    const randomInt = Math.floor(Math.random() * texts.length);
    const currentTextDetails = texts[randomInt];
    const currentText = currentTextDetails.text.split(' ').map(word => {
      return { word: word }
    });

    this.setState({
      currentText: currentText,
      currentTextDetails: currentTextDetails
    });
  }

  setCurrentSubreddit = (subreddit) => {
    this.setState({ currentSubreddit: subreddit });
  }

  onTypingStart = (e) => {
    this.updateState();

    if (e.which === 32 || e.keyCode === 32) {
      const currentText = this.state.currentText;

      if (this.state.currentKey + 1 <= this.state.currentText.length - 1) {
        const currentWord = this.state.currentText[this.state.currentKey].word;

        if (currentWord === e.target.value.trim()) {

          currentText[this.state.currentKey] = { word: currentWord, status: 'correct' };
          this.setState({ currentText: currentText });
        }
        else {
          currentText[this.state.currentKey] = { word: currentWord, status: 'wrong' };
          this.setState({ currentText: currentText });
        }
        this.setState({ currentKey: this.state.currentKey + 1 })
      }
      else if (this.state.currentText.length !== 0) {
        this.onTypingFinished();
      }
      this.setState({ textfieldValue: '' });
    }
  }

  onTypingFinished = async () => {
    const response = await client.service('api/texts').create({ words: this.getWordCount(this.state.currentText, 'correct'), wpm: this.state.wpm });
    if (response) {
      const token = await client.authenticate();
      const user = await getUser(token);
      if (user) {
        this.setState({ typingFinished: true, user: user });
        clearInterval(this.state.timerKey);
      }
    }
  }

  calculateWPM = (correctWords, secondsPassed) => {
    const oneMinute = 60000;
    const wpm = (oneMinute / secondsPassed) * correctWords;
    return Math.round(wpm);
  }

  getWordCount = (textArray, status) => {
    return textArray.filter(val => {
      return val.status === status;
    }).length
  }

  updateState = () => {
    const oneSec = 1000;

    if (!this.state.timerStarted) {
      let timerKey = setInterval(() => {
        this.setState({
          secondsPassed: this.state.secondsPassed + oneSec
        });
        this.setState({
          correctWords: this.getWordCount(this.state.currentText, 'correct'),
          wrongWords: this.getWordCount(this.state.currentText, 'wrong')
        });
        this.setState({
          wpm: this.calculateWPM(this.state.correctWords, this.state.secondsPassed)
        });
      }, oneSec);
      this.setState({ timerStarted: true, timerKey: timerKey });
    }
  }

  onChange = (e) => {
    this.setState({ textfieldValue: e.target.value });
  }

  render() {
    const { classes, user } = this.props;
    return (
      <div className={classes.container}>
        {
          !this.state.typingFinished ?
            <div className={classes.containerOne}>
              <TypingMenu user={user} getTexts={this.getTexts} setRandomText={this.setRandomText} setCurrentSubreddit={this.setCurrentSubreddit} props={this.state} />
              {
                this.state.currentTextDetails ?
                  <div className={classes.currentTextDetailsContainer}>
                    <span>
                      {'Posted by ' + this.state.currentTextDetails.author + ' at ' + this.state.currentTextDetails.subreddit}
                    </span>
                    <a href={'https://www.reddit.com' + this.state.currentTextDetails.link + ''} className={classes.link} target="_blank"> Link </a>
                  </div>
                  : undefined
              }
              <TypingBox props={this.state} />
              <div className={classes.containerTwo}>
                <TypingField props={this.state} onKeyPress={this.onTypingStart} onChange={this.onChange} />
                <Countdown time={this.state.secondsPassed} />
                <button className={classes.button} onClick={this.resetState}> SKIP TEXT </button>
              </div>
              <div className={classes.statsContainer}>
                <span> WPM: <span className={classes.stats}> {this.state.wpm ? this.state.wpm : ''} </span></span>
                <span> Correct Words: <span className={classes.stats}> {this.state.correctWords ? this.state.correctWords : ''} </span></span>
                <span> Wrong Words: <span className={classes.stats}> {this.state.wrongWords ? this.state.wrongWords : ''} </span></span>
              </div>
            </div> :
            <TypingResults resetState={this.resetState} props={this.state} />
        }
      </div>
    );
  }
}

export default injectStyles({
  container: {
    display: 'flex',
    background: 'white',
  },
  containerOne: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  containerTwo: {
    display: 'flex',
    margin: 'auto',
    marginTop: '30px',
  },
  button: {
    height: '55px',
    background: 'DarkCyan',
    color: 'white',
    fontSize: '15px',
    border: 'none',
    cursor: 'pointer',
  },
  currentTextDetailsContainer: {
    textAlign: 'center',
    marginTop: '20px',
    fontFamily: '10px !important',
  },
  link: {
    textDecoration: 'none',
  },
  statsContainer: {
    marginTop: '70px',
    width: '800px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: '25px'
  },
  stats: {
    fontWeight: 'bold',
    fontSize: '40px',
  }
})(TypingContainer);