
export default class ServiceApi {

  static getData(artistName) {
    return new Promise((resolve, reject) => {      
      const baseUrl = 'https://rest.bandsintown.com/artists/';
      const appid = 'artistapp_asif';
      const artistUrl = baseUrl + artistName + '?app_id=' + appid;
      const eventUrl = baseUrl + artistName + '/events?app_id=' + appid;
      let eventsdata='';
      fetch(artistUrl, {
        method: 'GET'
      }).then(response => response.json())
        .then(function(data) 
        { 
          if(data.upcoming_event_count > 0)
          {
            fetch(eventUrl,{method: 'GET'})
            .then(response => response.json())
            .then(function(edata) { data.eventsdata=edata; resolve(data);   }  );

          }
          else
          {
            resolve(data);
          }
           
        })
        .catch(function (error) {
          console.error('Error:', error);
          reject(error);
        });
    });
  }
}


