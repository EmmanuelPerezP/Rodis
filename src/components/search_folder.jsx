import React from 'react';

export default class SearchFolder extends React.Component {
  constructor(props) {
    super(props);
  }
    
  render() {
    return (            
      <form>
        <div className="form-group">
          <h1>
            Buscar Folder
          </h1>
          <input type="file" className="form-control-file" id="exampleFormControlFile1" />
        </div>
      </form>
    );
  }
}
