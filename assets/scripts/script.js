$(document).ready(function(){
    $(".carousel").carousel();

    var id = [550,343611];

    // https://api.themoviedb.org/3/movie/550?api_key=cc93940bfc0e8ed610b23598baac74fd

    
    // https://api.themoviedb.org/3/movie/343611?api_key=cc93940bfc0e8ed610b23598baac74fd
    var url = "https://api.themoviedb.org/3/movie/";
    var themapi_key="?api_key=cc93940bfc0e8ed610b23598baac74fd";



    // https://image.tmdb.org/t/p/w500/mMZRKb3NVo5ZeSPEIaNW9buLWQ0.jpg
    // https://image.tmdb.org/t/p/w500/nDS8rddEK74HfAwCC5CoT6Cwzlt.jpg
    // https://image.tmdb.org/t/p/w500/pCUdYAaarKqY2AAUtV6xXYO8UGY.jpg

    // for multiple images of same movie
    // https://api.themoviedb.org/3/movie/550/images?api_key=cc93940bfc0e8ed610b23598baac74fd 

    // get id of movie and get images

    // <a class="carousel-item" href="#one!"><img src="https://picsum.photos/200/300?random=1"></a>

    function appendImageToCarousel(url, hreF){
        var a = $("<a>");
        a.attr("href", hreF);
        a.addClass("carousel-item");
        var img = $("<img>");
        img.attr("src", url);
        a.append(img);
        $(".carousel").append(a);
        $(".carousel").carousel();
    }


    for (var i = 0; i < id.length; i++){
        var apiURL = url+id[i]+themapi_key;
        var hreF = id[i];
        $.ajax({
            url: apiURL,
            method: "GET"
        }).then(function(response){
            // console.log(response);
            var img = response.backdrop_path;
            imgURL = "https://image.tmdb.org/t/p/w500"+img;
            appendImageToCarousel(imgURL, hreF);
        })
    }


  });