	
	var ArrayData;
	var player;
	//this.json_object;
	var musicSearch;
	var musicRecommend;
	var musicListened= null;
	musicRecommender=new MusicRecommender();
	function botonBuscar()
	{
		//musicRecommender=new MusicRecommender();
		var x=document.getElementById("areabusqueda").value;
		var resultsSearched=musicRecommender.search(x);
		for(var i=0; i<resultsSearched.length;i++){
			addTrack(resultsSearched[i],i);
		}
	}


	function botonRecomendado(){
		console.log("RECOMENDADO");
		//musicRecommender=new MusicRecommender();
		var resultsSearched=musicRecommender.recommend();
		for(var i=0; i<resultsSearched.length;i++){
			addRecomendedSong(resultsSearched[i],i);
		}


	}
	function botonMusica(){
		console.log("MUSICA");
	}
	function botonBusqueda(){
		console.log("BUSQUEDA");

	}
	function playsongR(id){
		
		var title= musicRecommend[id].getTitle();
		search(title);
		//var idVideo= button.getvideoId();
		//loadSong(idVideo);
	}

	function addRecomendedSong(track,i){
		$( "#sectionB" ).append(" <div class='col-xs-4 col-md-4'> <a href='#' class='thumbnail' id="+i+" onclick=playsongR(id)> <img src="+track.imageAlbum+" alt='...'></a></div>")
	}
	function addTrack(track,i){

		$( "#sectionC" ).append( " <div class='row container'> <div class='col-xs-3'><a href='#'' class='thumbnail' id="+i+"><img src="+track.imageAlbum+" alt='...''></a></div><div class='col-xs-9'> <p> "+track.title+"</p> <p>"+track.artist+"</p> </div></div>" );
	}
	function track(){
		this.id;
		this.title;
		this.artist;
		this.album;
		this.imageAlbum;
		this.getId=function(){
			return this.id;
		}
		this.getTitle=function(){
			return this.title;
		}
		this.getArtist=function(){
			return this.artist;
		}
		this.getAlbum=function(){
			return this.album;
		}
		this.getImageAlbum=function(){
			return this.imageAlbum;
		}
		this.setId=function(id){
			this.id=id;
		}
		this.setTitle=function(title){
			this.title=title;
		}
		this.setArtist=function(artist){
			this.artist=artist;
		}
		this.setAlbum=function(album){
			this.album=album;
		}
		this.setImageAlbum=function(image){
			this.imageAlbum=image;
		}
	}

	function MusicRecommender(){



		//busca les cançons corresponents al buscador. 
		this.search= function(inputBuscador){
			//busca la cançó que ha entrat l'usuari. 

			var apiKey = "&api_key=b1a1877a71b1e84036a5e9aef8a11703&limit=15&format=json";
			var api_url = "http://ws.audioscrobbler.com/2.0/?method=track.search&track="+inputBuscador+apiKey;
			var search= new AJAX;
			var json_object=search.connect(api_url);
			musicSearch = new Array();
		 	//obtenim els artistes i el titol de la canso
		 	for (var i=0; i<json_object.results.trackmatches.track.length; i++){
		 		musicSearch[i]= new track();
		 		musicSearch[i].setArtist(json_object.results.trackmatches.track[i].artist);
		 		musicSearch[i].setTitle(json_object.results.trackmatches.track[i].name);
		 		//busquem informacio de la canso, per obtenir album i foto de album. 

		 		var api_url1 = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&track="+musicSearch[i].getTitle()+"&artist="+musicSearch[i].getArtist()+apiKey;
				var json_object1=search.connect(api_url1);

				if(json_object1.track.album==null){
					musicSearch[i].setImageAlbum("./images/no-image-icon-md.png");
					musicSearch[i].setAlbum("No Album name");
				}else{
					musicSearch[i].setImageAlbum(json_object1.track.album.image[1]["#text"]);//llegir imatge
					musicSearch[i].setAlbum(json_object1.track.album.title);

				}
		 	}
		 	return musicSearch;
		}

		this.playlist=function(track){

			musicListened = new Array()
			var i=musicListened.length;
			musicListened[i]= new track();
			musicListened[i]=track; 
		}

		this.list=function(){
			return musicListened;
		}

		this.recommend= function(){
			var apiKey = "&api_key=b1a1877a71b1e84036a5e9aef8a11703&limit=27&format=json";
			var search= new AJAX;
			musicRecommend = new Array();

			if(this.musicListened==null){
				var api_url = "http://ws.audioscrobbler.com/2.0/?method=geo.getTopTracks&country=Spain"+apiKey;
				var json_object=search.connect(api_url);
				
				for(var i=0; i<json_object.toptracks.track.length; i++){
					musicRecommend[i]= new track();
					musicRecommend[i].setTitle(json_object.toptracks.track[i].name);
					musicRecommend[i].setArtist(json_object.toptracks.track[i].artist.name);

					var api_url1 = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&track="+musicRecommend[i].getTitle()+"&artist="+musicRecommend[i].getArtist()+apiKey;
					var json_object1=search.connect(api_url1);

					if(json_object1.track.album==null){
						musicRecommend[i].setImageAlbum("./images/no-image-icon-md.png");
						musicRecommend[i].setAlbum("No Album name");
					}else{
						musicRecommend[i].setImageAlbum(json_object1.track.album.image[1]["#text"]);//llegir imatge
						musicRecommend[i].setAlbum(json_object1.track.album.title);

					}
				}

			}else{
				
				var title= musicListened[0].getTitle();
				var artist= musicListened[0].getArtist();
				var api_url = "http://ws.audioscrobbler.com/2.0/?method=track.getSimilar&track="+title+"&artist="+artist+apiKey;
				var json_object=search.connect(api_url);

				for(var i=0; i<json_object.similartracks.track.length; i++){
					musicRecommend[i]= new track();
					musicRecommend[i].setTitle(json_object.similartracks.track[i].name);
					musicRecommend[i].setArtist(json_object.similartracks.track[i].artist.name);


					var api_url1 = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&track="+musicRecommend[i].getTitle()+"&artist="+musicRecommend[i].getArtist()+apiKey;
					var json_object1=search.connect(api_url1);

					if(json_object1.track.album==null){
						musicRecommend[i].setImageAlbum("./images/no-image-icon-md.png");
						musicRecommend[i].setAlbum("No Album name");
					}else{
						musicRecommend[i].setImageAlbum(json_object1.track.album.image[1]["#text"]);//llegir imatge
						musicRecommend[i].setAlbum(json_object1.track.album.title);

					}
				}
				
			}
			return musicRecommend;

		}

		

	}
	function track(){
		this.id;
		this.title;
		this.artist;
		this.album;
		this.imageAlbum;

		this.getId=function(){
			return this.id;
		}
		this.getTitle=function(){
			return this.title;
		}
		this.getArtist=function(){
			return this.artist;
		}
		this.getAlbum=function(){
			return this.album;
		}
		this.getImageAlbum=function(){
			return this.imageAlbum;
		}
		this.setId=function(id){
			this.id=id;
		}
		this.setTitle=function(title){
			this.title=title;
		}
		this.setArtist=function(artist){
			this.artist=artist;
		}
		this.setAlbum=function(album){
			this.album=album;
		}
		this.setImageAlbum=function(image){
			this.imageAlbum=image;
		}
	}

	 function AJAX(){

		this.connect= function(url){
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url, false);
			xhr.send();

			
			var json_response = JSON.parse(xhr.responseText);
			return json_response;
		}
	}



// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See http://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('AIzaSyBgAgZFXgrB_osmxLAYqTW3DAQOYKno3zI');

  
}

function search() {
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
function onSearchResponse(response) {
    showResponse(response);
}

// inicialirzem el player. 
      var params = { allowScriptAccess: "always" };
      var atts = { id: "myytplayer" };
      swfobject.embedSWF("http://www.youtube.com/v/HiD0zBQfKwA?enablejsapi=1&playerapiid=ytplayer&version=3",
                       "ytapiplayer", "0", "0", "8", null, null, params, atts);

      function onYouTubePlayerReady(playerId) {
          ytplayer = document.getElementById("myytplayer");
      }

      // play/pause
      function vidplay() {
          
          var icon = document.getElementById("playspan");
          // si el video estta en play, fem pausa i posem icono play.
          if (ytplayer.getPlayerState()==1) {
            ytplayer.pauseVideo();
            icon.className= "glyphicon glyphicon-play";
            
            // si esta en pausa, play el video. 
          } else{
            ytplayer.playVideo();
            icon.className= "glyphicon glyphicon-pause";
          }
         
      }

      //puja el volum
      function increasevolume() {
        var nvol;
        //llegim volum actual
        nvol=ytplayer.getVolume();
        if(nvol<100){
            nvol=nvol+10;
            ytplayer.setVolume(nvol);
            //alert(nvol);
        }
      }
      // baixa el volum 
      function decreasevolume() {
          var nvol;
          //llegim volum actual
          nvol = ytplayer.getVolume();
          if (nvol>0) {
              nvol = nvol-10;
              ytplayer.setVolume(nvol);
              //alert(nvol);
          }
      }
      //passa a la cançó anterior
      function previousSong(){ loadSong("3iqvddLKN9Y")}
      //passa a la seguent cançó
      function nextSong(){loadSong("Ls0z-ZE47So")}

      //carrega la cançó a través de la Id.
      function loadSong(idVideo){
        ytplayer.loadVideoById(idVideo);
      }

