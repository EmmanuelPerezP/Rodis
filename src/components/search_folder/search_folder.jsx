import React from 'react';

export default function SearchFolder(props) {
  const { saveState, handleInput, loadState, filePath, clearState } = props;

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
            <button className="btn btn-outline-secondary" type="button" onClick={handleInput}>Browse</button>
          </div>
          <input type="text" value={filePath} className="form-control" placeholder="" />
        </div>
        <button className="btn btn-outline-secondary" type="button" onClick={saveState}>Save State</button>
        <button className="btn btn-outline-secondary" type="button" onClick={loadState}>Load State</button>
        <button className="btn btn-outline-secondary" type="button" onClick={clearState}>Clear State</button>
      </div>
    </form>
  );
}
