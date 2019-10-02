import React, { Component } from 'react';
import Navbar    from './Navbar';
import FlagGuess from './FlagGuess';

const ANSWER = {
  _CORRECT: "You got it! The correct answer is",
  _INCORRECT: "Sorry bud, the correct answer should've been"
}

class FlagApp extends Component {
  constructor(props) {
    super(props);


    this.state = {
      countries: [],
      options: [],
      correctOption: undefined,
      questionState: undefined,
      answered_correctly: false,
      correct: 0,
      wrong: 0,
      total: 0,
    };

     this.bind = this.bind();

  }

  bind() {
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleButton = this.handleButton.bind(this);
      // this.nestQuestion = this.nextQuestion.bind(this);
      // this.onGuess      = this.onGuess.bind(this);
    }


componentDidMount() {
    let url = 'https://restcountries.eu/rest/v2/all';
    fetch(url)
        .then(data => data.json())
        .then((countries) => {
          let random = this.randomAPI(countries),
               selected = countries[random],
               options = [...this.getSelections(countries), selected],
               shuffled = this.shuffle(options, Math.floor(options.length/3)),
               correctOption = selected.name,
               flag = selected.flag;


        this.setState(
          {
             countries,
             options: shuffled,
             correctOption,
             flag
          }
        )
    });


  }



  nextQuestion() {
     let {countries} = this.state;
    if(countries.length) {
      let random = this.randomAPI(countries),
           selected = countries[random],
           options = [...this.getSelections(countries), selected],
           shuffled = this.shuffle(options, Math.floor(options.length/3)),
           correctOption = selected.name,
           flag = selected.flag;
      this.setState({
        options,
        correctOption,
        flag,
        guessed: false,
        answered_correctly: false
      })
    }

  }
  onGuess(answer) {
    let {correctOption} = this.state,
        total,
        correct,
        wrong,
        answered_correctly ,
        expression = answer === correctOption.toLowerCase();

    let questionState =  expression ? ANSWER._CORRECT : ANSWER._INCORRECT;
     if(expression) answered_correctly =  true;

 if(expression) {
    correct = 1;
    wrong  = 0;
 } else {
   correct = 0;
    wrong  = 1;
 }
    this.setState({questionState,
       correct: this.state.correct + correct,
       wrong: this.state.wrong + wrong,
       total: this.state.total + 1,
       guessed: true,
       answered_correctly});

  }

  getSelections(api) {
      let shuffled = this.shuffle(api, Math.floor(api.length/1.5)),
          arr = [];

       for(var i = 0; i< 3; i++) {
          arr.push(shuffled[i]);
       }

     return arr;
  }


  shuffle(arg, num_times) {
     let copy = [...arg];
     for(var i = 0 ; i<=  num_times; i++) {
        let random = Math.floor( Math.random() * copy.length),
              rand = Math.floor( Math.random() * copy.length);
        copy.splice(rand, 0, ...copy.splice(random, 1));
    }
     return copy;
  }


  randomAPI(api) {
      const API = api;
      let random = Math.floor(Math.random() * API.length);
      return random;
  }



  handleSubmit(e) {
   e.preventDefault();
    if(!this.state.input) return;
  this.onGuess(this.state.input);

  }

     handleChange(e) {
       console.log(e.target.value, 'value received')
       this.setState({input: e.target.value})
     }

     handleButton() {
           this.nextQuestion();
     }


  render() {
    const { options,
            countries,
            correctOption,
            selected,
            guessed,
            questionState,
            flag,
            correct,
            wrong,
            total,
            answered_correctly
          } = this.state;

          console.log(countries, 'countries')

    return (
      <div className="App">
      <Navbar />
      <FlagGuess
         api={countries}
         options={options}
         answer={correctOption}
         answered_correctly={answered_correctly}
         selected={selected}
         asked={questionState}
         guessed={guessed}
         num_correct={correct}
         num_wrong={wrong}
         num_total={total}
         flag={flag}
         handleButton={this.handleButton}
         handleSubmit={this.handleSubmit}
         handleChange={this.handleChange}

       />
      </div>
    )
  }
}

export default FlagApp;
