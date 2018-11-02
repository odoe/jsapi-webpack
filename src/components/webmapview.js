import SceneView from "esri/views/SceneView";
import React from "react";


export class WebMapComponent extends React.Component {
  componentDidMount() {
    const view = new SceneView({
      map: this.props.webmap,
      container: this.mapDiv
    });
    this.props.onload(view);
  }

  render() {
    return (
      <div className="webmap"
        ref={
          element => this.mapDiv = element
        }>
      </div>
    );
  }
}
