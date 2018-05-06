import React from "react";

export default () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h2 className="display-4 text-center">Page Not Found</h2>
        </div>
        <div className="col-sm-12">
          <p className="text-center">Sorry, this page does not exist</p>
        </div>
        <div className="col-sm-12">
          <p className="text-center">
            Here is a picture of a kitten and a puppy
          </p>
        </div>
        <div className="col-sm-12">
          <img
            className="text-center"
            src="http://kenikin.com/w/cute-baby-animal-Wallpaper-HD-Resolution-number-lmj.jpg"
          />
        </div>
      </div>
    </div>
  );
};
