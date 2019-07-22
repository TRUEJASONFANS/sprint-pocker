import * as React from 'react';
import styles from './card.css';
interface Props {
  usersList: string[]
}
class PlayerSelectedCard extends React.Component {

  render() {
    return <div>
      <img className={styles.selctedCardBack} />
    </div>
  }
}

export default class PlayerAreaView extends React.Component<Props, any> {

  render() {
    return <div>
      {this.props.usersList.map((card, index) => {
        <PlayerSelectedCard />
      })}
    </div>
  }
}

