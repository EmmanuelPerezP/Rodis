import React from "react";

export default class Player extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
          <div className="container-fluid pl-0">
            <div className="row no-gutters">
              <div className="col-3">
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
                  <img src="cover2.jpg" className="rounded mx-auto d-block" alt="..."></img>
                </div>
              </div>
            </div>

            <footer className="footer">
            <div className="row pt-2 justify-content-center no-gutters">
              <div className="col-3">

              </div>
              <div className="col-6 mx-auto">
                <div className="row controls">
                  <div className="col">
                    <a><i className="fas fa-step-backward"></i></a>
                  </div>
                  <div className="col">
                    <a><i className="fas fa-play"></i></a>
                  </div>
                  <div className="col">
                    <a><i className="fas fa-pause"></i></a>
                  </div>
                  <div className="col">
                    <a><i className="fas fa-step-forward"></i></a>
                  </div>
                </div>
              </div>
              <div className="col-3">

              </div>
            </div>
          </footer>
          </div>
      )
    }
}
