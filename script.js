/**
 * URL of the called webservice
 */
$webserviceURL="http://127.0.0.1:8000/";


/**
 * methods called
 */
$urlFindByLastNameAndFirstname = $webserviceURL + "find";
$urlFindByLastName = $webserviceURL + "findByLastName";
$urlFindByFirstName = $webserviceURL + "findByFirstName";
$urlFindAll = $webserviceURL + "findAll";
$url = "";


// we initialize the value of the offset to 0
$offset = 0;

// the number of results shown
$limit = 10;


/**
 * Return the data of the people's searshed
 * this function calls different's webservice's methods
 * depending on the informations provided by the user?
 * 
 */
function showResults() {


    var $firstName = $("#firstname").val();
    var $lastName = $("#lastname").val();

    removeTableResults();

    if ($firstName !== "" && $lastName !== "") {
        $url = $urlFindByLastNameAndFirstname + "/" + $firstName + "/" + $lastName;
    } else if ($lastName !== "") {
        $url = $urlFindByLastName + "/" + $lastName;
    } else if ($firstName !== "") {
        $url = $urlFindByFirstName + "/" + $firstName;
    } else {
        $url = $urlFindAll;
    }
    $url = $url + "/" + $offset + "/" + $limit
    renderTableResults()
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
            $('#tblData > tbody:last-child').append('<tr><td>' + data[index].guid +
                '</td> <td>' + data[index].first + '</td> <td>' + data[index].last +
                '</td></tr>');
        })
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
        '<table id="tblData" class="table"><thead><tr><th>Guid</th><th>First</th><th>Last</th><th></th></tr> </thead><tbody></tbody></table>'
    ).appendTo('#results');
}



