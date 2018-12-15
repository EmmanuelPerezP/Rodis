import React from 'react';

export default function SearchFolder(props) {
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
            <button className="btn btn-outline-secondary" type="button" onClick={props.handleInput} >Browse</button>
          </div>
          <input type="text" value={props.filePath} className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1"></input>
        </div>
        <button className="btn btn-outline-secondary" type="button" onClick={props.saveState} >Save State</button>
        <button className="btn btn-outline-secondary" type="button" onClick={props.loadState} >Load State</button>
      </div>
    </form>
  );
}
