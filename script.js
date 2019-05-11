/**
 * URL of the called webservice
 */
$webserviceURL="http://127.0.0.1:3000/";


/**
 * methods called
 */
$urlFindAll = $webserviceURL + "albums";
$urlCatalog = $webserviceURL + "catalog";

$url = "";


// we initialize the value of the offset to 0
$offset = 0;

// the number of results shown
$limit = 24;


/**
 * Return the data of the people's searshed
 * this function calls different's webservice's methods
 * depending on the informations provided by the user?
 * 
 */
function showResults() {

    removeTableResults();
	
	$url = $urlFindAll + '/' + $offset + '/' + $limit;

    renderTableResults()
};


/**
 * Return the data of the people's searshed
 * this function calls different's webservice's methods
 * depending on the informations provided by the user?
 * 
 */
function showCatalog() {
    $offset = 0;
    $limit = 4; 

    removeTableResults();
	
	$url = $urlCatalog + '/' + $offset + '/' + $limit;;

    renderTableResults()

    $('.hidden').removeClass('hidden');
};


/**
 * Returns the next $limit peoples
 */
function showNextResults() {

    $offset = $offset + $limit;
    showResults();
    $('#previous-Btn').show();
}

/**
 * Returns the previous $limit peoples
 */
function showPreviousResults(){
if($offset != 0){
    $offset = $offset - $limit;
    showResults();
    $('#next-Btn').show();
    
}
 
/**
 * Returns the first results when the user
 * presses "Searsh" for the first time
 * 
 */
}
function showFirstResults(){
    $limit = 24;
    $offset = 0;
    showResults();
    $('.hidden').removeClass('hidden');
}


/**
 * Renders the results in  HTML's page
 */
function renderTableResults() {

    $.ajax({
        url: $url
    }).then(function (data) {
        $.each(data, function (index, value) {
			console.log(data[index]);
            $('#tblData').append(
                '<div class="col-lg-1" style="height:250px">' 
                + '<div style="background-image: url(\'https://spark.adobe.com/images/landing/examples/design-music-album-cover.jpg\');height:50%;background-size: cover"></style></div>'
                +'<p>'+ data[index].artiste +'</br>'
                + data[index].nom +'</br>'
                + data[index].annee +'</p>'
            + '</div>'
        );})
     if(data.length < $limit){
        $('#next-Btn').hide();
     }
     if($offset === 0){
        $('#previous-Btn').hide();
     }

    });

}

/**
 * Clear the table rendered
 */
function removeTableResults() {
    $("#tblData").remove();
    $(
        '<div id="tblData">'
    ).appendTo('#results');
}



