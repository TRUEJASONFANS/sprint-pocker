export default function Cards() {

    return (

        <div className="card-rig card-in-hand">
            <div className="card-wrapper perspective-wrapper">
                <div className="animation-wrapper">
                    <div className="card-container rotate face-up card-green" onClick={this.changeStyle} id="container">
                        <div className="card card-back"></div>
                        <div className="card card-face">
                            <div className="small-card-id">
                                <span>1</span>
                            </div>
                            <div className="text-center player-vote">
                                <span>1</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}