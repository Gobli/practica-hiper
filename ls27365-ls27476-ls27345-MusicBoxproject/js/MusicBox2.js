/* Music Recommender*/
(function(){

function MusicRecommender(){

	this.ArrayData;
	this.player;
	//this.json_object;
	this.musicSearch;
	this.musicRecommend;
	this.musicListened;

	//busca les cançons corresponents al buscador. 
	this.search= function(inputBuscador){
		//busca la cançó que ha entrat l'usuari. 

		var apiKey = "&api_key=b1a1877a71b1e84036a5e9aef8a11703&limit=10&format=json";
		var api_url = "http://ws.audioscrobbler.com/2.0/?method=track.search&track="+inputBuscador+apiKey;
		var search= new AJAX;
		var json_object=search.connect(api_url);
		this.musicSearch = new Array();
	 	//obtenim els artistes i el titol de la canso
	 	for (var i=0; i<json_object.results.trackmatches.track.length; i++){
	 		this.musicSearch[i]= new track();
	 		this.musicSearch[i].setArtist(json_object.results.trackmatches.track[i].artist);
	 		this.musicSearch[i].setTitle(json_object.results.trackmatches.track[i].name);
	 		//busquem informacio de la canso, per obtenir album i foto de album. 
	 		console.log(this.musicSearch[i].getTitle());
	 		console.log(this.musicSearch[i].getArtist());
	 		var api_url1 = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&track="+this.musicSearch[i].getTitle()+"&artist="+this.musicSearch[i].getArtist()+apiKey;
			var json_object1=search.connect(api_url1);

			if(json_object1.track.album==null){
				this.musicSearch[i].setImageAlbum("/image/no-image-icon-md.png");
				this.musicSearch[i].setAlbum("No Album name");
			}else{
				this.musicSearch[i].setImageAlbum(json_object1.track.album.image[1].value);//llegir imatge
				this.musicSearch[i].setAlbum(json_object1.track.album.title);

			}
	 	}
	 	return this.musicSearch;
	}

	this.playlist=function(track){

		this.musicListened = new Array()
		var i=this.musicListened.length;
		this.musicListened[i]= new track();
		this.musicListened[i]=track; 

	}

	this.list=function(){
		return this.musicListened;
	}
	this.recommend= function(){
		var apiKey = "&api_key=b1a1877a71b1e84036a5e9aef8a11703&limit=10&format=json";
		var search= new AJAX;
		this.musicRecommend = new Array();

		if(this.musicListened==null){
			var api_url = "http://ws.audioscrobbler.com/2.0/?method=geo.getTopTracks&country=Spain"+apiKey;
			var json_object=search.connect(api_url);
			
			for(var i=0; i<json_object.toptracks.track.length; i++){
				this.musicRecommend[i]= new track();
				this.musicRecommend[i].setTitle(json_object.toptracks.track[i].name);
				this.musicRecommend[i].setArtist(json_object.toptracks.track[i].artist.name);

				var api_url1 = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&track="+this.musicRecommend[i].getTitle()+"&artist="+this.musicRecommend[i].getArtist()+apiKey;
				var json_object1=search.connect(api_url1);

				if(json_object1.track.album==null){
					this.musicSearch[i].setImageAlbum("/image/no-image-icon-md.png");
					this.musicSearch[i].setAlbum("No Album name");
				}else{
					this.musicSearch[i].setImageAlbum(json_object1.track.album.image[1].value);//llegir imatge
					this.musicSearch[i].setAlbum(json_object1.track.album.title);

				}
			}

		}else{
			
			var title= this.musicListened[0].getTitle();
			var artist= this.musicListened[0].getArtist();
			var api_url = "http://ws.audioscrobbler.com/2.0/?method=track.getSimilar&track="+title+"&artist="+artist+apiKey;
			var json_object=search.connect(api_url);

			for(var i=0; i<json_object.similartracks.track.length; i++){
				this.musicRecommend[i]= new track();
				this.musicRecommend[i].setTitle(json_object.similartracks.track[i].name);
				this.musicRecommend[i].setArtist(json_object.similartracks.track[i].artist.name);
				console.log(this.musicRecommend[i].getTitle());
				console.log(this.musicRecommend[i].getArtist());

				var api_url1 = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&track="+this.musicRecommend[i].getTitle()+"&artist="+this.musicRecommend[i].getArtist()+apiKey;
				var json_object1=search.connect(api_url1);

				if(json_object1.track.album==null){
					this.musicSearch[i].setImageAlbum("/image/no-image-icon-md.png");
					this.musicSearch[i].setAlbum("No Album name");
				}else{
					this.musicSearch[i].setImageAlbum(json_object1.track.album.image[1].value);//llegir imatge
					this.musicSearch[i].setAlbum(json_object1.track.album.title);

				}
			}
			//track.getSimilar();
		}

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

		console.log(xhr.responseText);
		var json_response = JSON.parse(xhr.responseText);
		console.log(json_response);
		return json_response;
	}
}


function botonBuscar()
{

	var x=document.getElementById("areabusqueda").value;
	var resultsSearched=musicRecommender.search(x);
	for(var i=0; i<resultsSearched.length;i++){
		addTrack(resultsSearched[i],i);
	}
}


function botonRecomendado(){
	console.log("RECOMENDADO");
}
function botonMusica(){
	console.log("MUSICA");
}
function botonBusqueda(){
	console.log("BUSQUEDA");
	var track1= new track();
	track1.setTitle("Mierda");
	track1.setArtist("caca");
	addTrack(track1);
	addRecomendedSong("hola");
}

function addRecomendedSong(track){
	$( "#sectionB" ).append(" <div class='col-xs-4 col-md-4'> <a href='#' class='thumbnail' > <img src='images/logo.png' alt='...'></a></div>")
}
function addTrack(track,i){

	$( "#sectionA" ).append( " <div class='row container'> <div class='col-xs-3'><a href='#'' class='thumbnail' id="+i+"><img src="+track.imageAlbum+" alt='...''></a></div><div class='col-xs-9'> <p> "+track.title+"</p> <p>"+track.artist+"</p> </div></div>" );
}




	var musicRecommender= new MusicRecommender();
	
	//es cridara amb EVENT de botó BUSCAR
	//var resultsSearched=musicRecommender.search();
	//console.log(resultsSearched);
	musicRecommender.playlist();
	musicRecommender.recommend();

}());
