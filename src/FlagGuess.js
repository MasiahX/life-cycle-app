import React, { Component } from 'react';
import './FlagGuess.css';


class FlagGuess extends Component {
  render() {
   // if(this.props) console.log(this.props, 'options');
   const {random,
         options,
         api,
         flag,
         asked,
         answer,
         guessed,
         num_wrong,
         num_total,
         num_correct,
         answered_correctly
        } = this.props;
   let res, styles = {
     padding: 20,
     fontSize: 20,
     backgroundColor:'#f7f8fa'
   };

   if(options) {
     console.log(answered_correctly, 'statequestioned')
     // console.log(flag, 'flafg')
      res = options.map((opt, idx) =>(
        <li key={`${opt.name}${idx}`}>
         <input
         type="radio"
         name="country"
         onChange={this.props.handleChange}
         value={opt.name.toLowerCase()}
         /> {opt.name}
         </li>
     ))


   } else {
     res = 'loading...'
   }
   
   if(answered_correctly) {
      styles = {...styles, color: '#42704f'}
   } else {
     styles = {...styles,color: '#bd081c'}
   }

    return(
      <div className="_form">
       <h2> Which country reps the flag below? </h2>
       <h3><span>Correct:{num_correct}</span>  <span>Wrong:{num_wrong}</span>  <span>Total Answered:{num_total}</span> <span>Overview:{num_correct}/{num_total}</span> </h3>

       {guessed &&
         <p style={styles}>{asked} <strong>{answer}</strong>. </p>
       }
       <div className="inputs">
      <form onSubmit={this.props.handleSubmit}>
      <ul>
         {res}
      </ul>

        {guessed &&
           <button onClick={this.props.handleButton} type="submit">NEXT</button>
        }
        {!guessed &&
           <button type="submit">GUESS</button>
        }


      </form>
      </div>
      {flag &&
        <div className="imgCont">
          <img  src={flag} />
        </div>
       }
        <div>

       </div>

      </div>
    )
  }
}
export default FlagGuess;
