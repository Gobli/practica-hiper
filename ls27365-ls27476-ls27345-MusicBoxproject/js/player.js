
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
