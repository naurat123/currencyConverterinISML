(function () {
    //alert('self executing function: welcome');
    })();
    
    // include api for currency change
    const api = "https://api.exchangerate-api.com/v4/latest/USD";
      
    // for selecting different controls
    var search = document.querySelector("#searchBox");
    var convert = document.querySelector("#convert");
    var reset = document.querySelector("#reset");
    var fromCurrecy = document.querySelector("#from");
    var toCurrecy = document.querySelector("#to");
    var finalValue = document.querySelector(".finalValue");
    var finalAmount = document.getElementById("finalAmount");
    var floatingLabel = document.querySelector(".input__label");
    var resultFrom;
    var resultTo;
    var searchValue;
      
    // Event when currency is changed
    fromCurrecy.addEventListener('change', (event) => {
        resultFrom = `${event.target.value}`;
        console.log(resultFrom);
    });
      
    // Event when currency is changed
    toCurrecy.addEventListener('change', (event) => {
        resultTo = `${event.target.value}`;
        console.log(resultTo);
    });
      
    search.addEventListener('input', updateValue);
    //search.addEventListener('onclick',shiftlabel);
      
    // function for updating value
    function updateValue(e) {
        searchValue = e.target.value;
        //shiftlabel();
        console.log(searchValue);
    }
    function shiftlabel(){
        floatingLabel.style.color = "green";
        floatingLabel.style.fontsize = "x-small";
        
    }
      
    // when user clicks, it calls function getresults
    $("#convert").click(function(e) {
        e.preventDefault();
        console.log("before ajax");
        $.ajax({
            //type: "POST",
            url: "https://dev07-na-conair.demandware.net/on/demandware.store/Sites-Naurat-site-Site/en_US/currencyConverter-Show",
            // data: { 
            //     id: $(this).val(), // < note use of 'this' here
            //     access_token: $("#access_token").val() 
            // },
            success: function(result) {
                displayResults(result.data);
            },
            error: function(result) {
                alert('error');
            }
        });
    });



//convert.addEventListener("click", getResults);  
// // function getresults
// function getResults() {
//     console.log("inside getResult");
//     fetch(`${api}`)
//         .then(currency => {
//             return currency.json();
//         }).then(displayResults);
// }
      
    // display results after convertion
    function displayResults(currency) {
        console.log("Inside Display Result");
        let fromRate = currency[resultFrom];
        let toRate = currency[resultTo];
        finalValue.innerHTML = 
           ((toRate / fromRate) * searchValue).toFixed(2);
        finalAmount.style.display = "block";
    }
      
    // when user click on reset button
    reset.addEventListener("click", clearVal);
    function clearVal() {
        window.location.reload();
        document.getElementsByClassName("finalValue").innerHTML = "";
    };