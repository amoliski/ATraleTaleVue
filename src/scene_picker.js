function get_scene({location, time, weather}){
  switch(time) {
    case "morning":
      switch(location){
        case 'mountain':
          return 'hike_highlands__dawn_dusk';

        case 'valley':
          return 'hike_cades_cove__dawn_dusk';

        case 'forest':
          return 'hike_green_tunnel__dawn_dusk';

        case 'town':
          return 'hike_town__dawn_dusk';

        case 'zero':
          if (weather === 'clear') {
            return 'zero_day';
          } else {
            return 'zero_day__rainy';
          }
      }
      break;
    case "midday":
      switch(location){
        case 'mountain':
          if (weather === 'clear') {
            return 'hike_highlands';
          } else {
            return 'hike_highlands__rainy';
          }
        case 'valley':
          if (weather === 'clear') {
            return 'hike_cades_cove';
          } else {
            return 'hike_cades_cove__rainy';
          }
        case 'forest':
          if (weather === 'clear') {
            return 'hike_green_tunnel';
          } else {
            return 'hike_green_tunnel__rainy';
          }
        case 'town':
          if (weather === 'clear') {
            return 'hike_town';
          } else {
            return 'hike_town_rainy';
          }
        case 'zero':
          if (weather === 'clear') {
            return 'zero_day';
          } else {
            return 'zero_day__rainy';
          }

      }
      break;
    case "evening":
      if (weather === 'clear') {
        return 'campsite_evening';
      } else {
        return 'campsite_evening__rainy';
      }
    case "midnight":
      return 'campsite_midnight';
  }
  return 'interstitials'
}

export default get_scene;
