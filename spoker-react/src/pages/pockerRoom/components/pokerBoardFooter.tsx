import * as React from 'react';

export interface Props {
  cards: [];
}

function PokerBoardFooter({cards}: Props) {
 
  for (let card of cards) {
    <div className="hand hhand-compact active-hand">
          <img className='card' src='cards/AS.svg'/>
    </div>
  }
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

export default PokerBoardFooter;

// helpers
