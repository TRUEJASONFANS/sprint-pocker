import * as React from 'react';
import styles from './pokerBoardFooter.css';

export interface Props {
  cards: [];
}

export default function PokerBoardFooter({cards}: Props) {
 

  return (
    <div>
        {
          cards.map(card => (
            <div className="hand hhand-compact active-hand">
              <img className='card' src='cards/AS.svg'/>
            </div>
          ))}
    </div>
  );
}


// helpers
