import React from 'react';

export default class SearchFolder extends React.Component {
  constructor(props) {
    super(props);
  }
    
  render() {
    // see https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
    // to understand file handeling
    return (            
      <form>
        <div className="form-group">
          <h1>
            Buscar Folder
          </h1>
          {/* <input type="file" className="form-control-file" id="exampleFormControlFile1" /> */}
          {/* <button type="button" class="btn btn-outline-secondary">Browse</button> */}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button className="btn btn-outline-secondary" type="button" onClick={this.props.handleInput} >Browse</button>
            </div>
            <input type="text" value={this.props.filePath} className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" readOnly></input>
          </div>
        </div>
      </form>
    );
  }
}
