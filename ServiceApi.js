
export default class ServiceApi {

  static getData(artistName) {
    return new Promise((resolve, reject) => {
      console.warn(this.artistName);
      const baseUrl = 'https://rest.bandsintown.com/artists/';
      const appid = 'artistapp_asif';
      const artistUrl = baseUrl + artistName + '?app_id=' + appid;
      const eventUrl = baseUrl + artistName + '/events?app_id=' + appid;

      fetch(artistUrl, {
        method: 'GET'
      }).then(response => response.json())
        .then(data => resolve( data ))
        .catch(function (error) {
          console.error('Error:', error);
          reject(error);
        });
    });
  }
}


