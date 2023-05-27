import React, { Component } from "react";
import { View } from "react-native";
import MapplsGL from 'mappls-map-react-native';

MapplsGL.setMapSDKKey("b532ca62778c1c68af8828bcd010b481");
MapplsGL.setRestAPIKey("b532ca62778c1c68af8828bcd010b481");
MapplsGL.setAtlasClientId("33OkryzDZsJJPSHy-LIsudRDEgS25wtqcacLcRpt_agIh2iJxVqXF9rKLb22ZYBEHXGn8RfZZilk1qaH4uDKYg==");
MapplsGL.setAtlasClientSecret("lrFxI-iSEg_AQVsDRJjucfIAW_4dTePuoISvJEJN9Xyfsn-1BXgvUIelncqbxqSZdnP4RUZuP0Fe2OQ6ky8Gjdbc3NF0WXGH");

export default class App extends Component {
  camera: MapplsGL.Camera | null | undefined;

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapplsGL.MapView style={{ flex: 1 }}>
          <MapplsGL.Camera
            ref={c => (this.camera = c)}
            zoomLevel={12}
            minZoomLevel={4}
            maxZoomLevel={22}
            centerCoordinate={[77.231409, 28.6162]}
          />
        </MapplsGL.MapView>
      </View>
    );
  }
}
