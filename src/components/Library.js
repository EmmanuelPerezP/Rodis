import React from "react";

export default class Library extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
          <div className="container-fluid pl-0">
            <div className="row no-gutters">
              <div className="col-3">

              </div>
              <div className="col-6">
                <form>
                  <div class="form-group">
                    <h1>
                      Buscar Folder
                    </h1>
                    <input type="file" class="form-control-file" id="exampleFormControlFile1"></input>
                  </div>
                </form>
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="row">The space program</td>
                      <td>2:00</td>
                    </tr>
                    <tr>
                      <td scope="row">We the people</td>
                      <td>2:52</td>
                    </tr>
                    <tr>
                      <td scope="row">Whateva Will Be</td>
                      <td>3:54</td>
                    </tr>
                    <tr>
                      <td scope="row">Whateva Will Be loraldksfjalsdf aldkfj alksdjf fekj dcvn lj</td>
                      <td>3:54</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="col-9">
                <div className="row">
                </div>
              </div>
            </div>
          </div>
        )
    }
}
