// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms
// Helper function to display JavaScript value on HTML page.
(function(){
    function search(){

    this.title;
    this.videoId;
    this.artist;
    this.image;

    this.getInfo= function(response){
         for (i=0; i<response.items.length; i++){
            this.title= response.items[i].snippet.title;
            this.videoId= response.items[i].id.videoId;
            this.artist= response.items[i].snippet.description;
            this.image= response.items[i].snippet.thumbnails.default.url;
        }
    }

      this.getvideoId= function(){return this.videoId;}
      this.getTitle= function(){return this.title;}
      this.getArtist= function(){return this.artist;}
      this.getImage= function(){return this.image;}
    // Called automatically when JavaScript client library is loaded.
    this.onClientLoad= function () {
        gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
    }

    // Called automatically when YouTube API interface is loaded (see line 9).
    this.onYouTubeApiLoad= function () {
        // This API key is intended for use only in this lesson.
        // See http://goo.gl/PdPA1 to get a key for your own applications.
        gapi.client.setApiKey('AIzaSyBgAgZFXgrB_osmxLAYqTW3DAQOYKno3zI');
        search();
    }

    this.search= function () {
        // Use the JavaScript client library to create a search.list() API call.
        var request = gapi.client.youtube.search.list({
            part: 'snippet',
            q: "melendi tocado y hundido",
            type: 'video',
            maxResults: 1        
        });
    
        // Send the request to the API server,
        // and invoke onSearchRepsonse() with the response.
        request.execute(onSearchResponse);
    }

    // Called automatically with the response of the YouTube API request.
    this.onSearchResponse= function (response) {
        getInfo(response);
    }

    }
}());