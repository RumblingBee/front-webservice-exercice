/**
 * URL of the called webservice
 */
webserviceURL = "http://127.0.0.1:3000/";


/**
 * methods called
 */
urlAlbums = webserviceURL + "albums";
urlCatalogs = webserviceURL + "catalog";

urlInit = "";
urlCalled = "";


// we initialize the value of the offset to 0
offset = 0;

// the number of results shown
limit = 24;


function initAlbums() {

    urlInit = urlAlbums;

    limit = 24;
    offset = 0;

    showResults();

    $('.hidden').removeClass('hidden');
}


function initCatalogs() {

    urlInit = urlCatalogs;

    limit = 4;
    offset = 0;


    removeTableResults();


    showResults();

    $('.hidden').removeClass('hidden');
};





/**
 * Return the data of the people's searshed
 * this function calls different's webservice's methods
 * depending on the informations provided by the user?
 * 
 */
function showResults() {

    removeTableResults();
    buildUrl();
    processQuery()
};

/**
 * Renders the results in  HTML's page
 */
function processQuery() {

    $.ajax({
        url: urlCalled
    }).then(function (data) {
        renderResult(data);

    });

}




/**
 * Returns the next limit peoples
 */
function showNextResults() {

    offset = offset + limit;
    showResults();
    $('#previous-Btn').show();
}

/**
 * Returns the previous limit peoples
 */
function showPreviousResults() {
    if (offset != 0) {
        offset = offset - limit;
        showResults();
        $('#next-Btn').show();

    }
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

function renderResult(data) {


    if (urlInit === urlAlbums) {

        $.each(data, function (index, value) {
            console.log(data[index]);
            $('#tblData').append(
                '<div class="col-lg-3" style="height:250px">' +
                '<div style="background-image: url(\'https://spark.adobe.com/images/landing/examples/design-music-album-cover.jpg\');height:50%;background-size: cover"></style></div>' +
                '<p>' + data[index].artiste + '</br>' +
                data[index].nom + '</br>' +
                data[index].annee + '</p>' +
                '</div>'
            );
        })
    } else if (urlInit === urlCatalogs) {
        $.each(data, function (index, value) {
            console.log(data[index]);
            $('#tblData').append(
                '<div class="col-lg-3" style="height:250px">' +
                '<div style="background-image: url(\'https://spark.adobe.com/images/landing/examples/design-music-album-cover.jpg\');height:50%;background-size: cover"></style></div>' +
                '<p>' + data[index].nom + '</br>' +
                data[index].artiste + '</br>' +
                data[index].prix + '€ </br>' +
                '</div>'
            );
        })

    } else if (urlInit.includes("artist")) {

    }

    if (data.length < limit) {
        $('#next-Btn').hide();
    }
    if (offset === 0) {
        $('#previous-Btn').hide();
    }

}

function buildUrl() {
    urlCalled = urlInit + '/' + offset + '/' + limit;
}