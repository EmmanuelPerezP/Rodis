import React from 'react';


export default class Playbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="footer">
        <div className="row pt-2 justify-content-center no-gutters">
          <div className="col-3" />
          <div className="col-6 mx-auto">
            <div className="row controls">
              <div className="col">
                <a onClick={this.props.handlePrevious} >
                  <i className="fas fa-step-backward" />
                </a>
              </div>
              <div className="col">
                <a onClick={this.props.handlePlay} >
                  <i className="fas fa-play" />
                </a>
              </div>
              <div className="col">
                <a onClick={this.props.handlePause} >
                  <i className="fas fa-pause" />
                </a>
              </div>
              <div className="col">
                <a onClick={this.props.handleNext} >
                  <i className="fas fa-step-forward" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-3" />
        </div>
      </footer>
    );
  }
}
