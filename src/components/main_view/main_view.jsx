import React from 'react';

export default function MainView(props) {
  const { hideAlbumArt, currentAlbumArt } = props;
  return (
    <div className="row no-gutters">
      <div className="col">
        <div className="row">
          {hideAlbumArt ? (
            <img
              src={`file://${currentAlbumArt}`}
              className="album-art rounded mx-auto d-block"
              alt="..."
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
