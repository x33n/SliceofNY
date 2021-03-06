import React, { Component } from 'react';



const google = window.google;

class Map extends Component {
  constructor(props) {
    super(props);
    this.pSubmit = this.pSubmit.bind(this);
    this.drawPath = this.drawPath.bind(this);
    this.moveMarker = this.moveMarker.bind(this);
    this.panMap = this.panMap.bind(this);
    this.state = { center: {lat: 40.758896, lng: -73.985130}, id: -1, flight: null, colors: [], card: 0, markers: [],directionsService: null}
  }

  componentDidMount() {
    this.renderMap();
    console.log(this.props.destination);
    if(this.props.origin != null && this.props.destination != null){
      this.submit(this.props.origin,this.props.destination)
    }
  }

  renderMap(){
    this.map = new google.maps.Map(this.refs.map, {
      center: this.state.center,
      zoom: 11
    });
  }

  addMarker(LatLng,title,label,icon){
    var marker = new google.maps.Marker({
      position: LatLng,
      map: this.map,
      title: title,
      label: label,
      icon: icon
    });
    return marker;
  }

  pSubmit(cords){
    console.log("psubmit");
    console.log(cords[0][1]);
    this.map.panTo(cords[0][1]);

    this.setState((prevState) => ({
      center: cords[0][1],
      id: prevState.id+1,
      card: prevState.id+1
    }));

    var srcLatLng = cords[0][1];
    var destLatLng = cords[1][1];

    this.addMarker(srcLatLng,'Origin','A');
    this.addMarker(destLatLng,'Destination','B');

    const DirectionsService = new google.maps.DirectionsService();
    this.setState({directionsService: DirectionsService});
    DirectionsService.route({
      origin: srcLatLng,
      destination: destLatLng,
      travelMode: google.maps.TravelMode.WALKING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
          this.drawPath(result.routes[0].overview_path,this.map,this.state.colors[this.state.id]);
          this.moveMarker(result.routes[0].overview_path,this.state.id)
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }

  drawPath(cords,map,color){
    var flightPlanCoordinates = cords;
    this.state.flight = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: color,
      strokeOpacity: 0.6,
      strokeWeight: 5
    });
    this.state.flight.setMap(map);
  }

  moveMarker(cords,id){   
    var marker = this.addMarker(cords[0],'Vehicle','','markcar.png');
    this.setState((prevState) => ({
      markers: prevState.markers.concat([marker]),
    }));
    var count = 0;
    var that = this;
    window.setInterval(function() {
      if (count>cords.length-2){
        return;
      }
      count = (count + 1);
      marker.setPosition( cords[count] );
      that.state.markers[id] = cords[count];
      that.drawPath([cords[count-1],cords[count]],that.map,that.state.colors[id]);
    }, 100);
  }
  
  clearMap(){
    
    this.setMapOnAll(null);

  }

  setMapOnAll(map) {
    console.log("clear")
    this.state.flight.setMap(null);
    this.setState({
      flight: null
    });
    this.forceUpdate();

  }

  submit(orig, add){
    var origin = orig;
    var destination = add;
    console.log(origin,destination);
    if(origin!=="" && destination!==""){
      var geocoder = new google.maps.Geocoder();
      var values = [];
      var that = this;
      geocoder.geocode({address: origin},function(results,status){
        values.push([origin,results[0].geometry.location]);
        geocoder.geocode({address: destination}, function(results, status) {
            values.push([destination,results[0].geometry.location]);
            that.pSubmit(values);
        });
      });
      
    }
  }

  

  panMap(vehicle,index){
    this.map.panTo(this.state.markers[index]);
    this.setState({card: index});
  }

  render(){
    return(
      <div className="row">
        <div className="col-md-8 mapcont">
          <div ref="map" className="map"></div><br />
        </div>
      </div>  
    );
  }
  

}

export default Map;