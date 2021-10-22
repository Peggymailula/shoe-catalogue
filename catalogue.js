var searchBtn= document.querySelector(".searchBtn");
var message = document.querySelector(".message");
var photo = document.querySelector(".photos");
var shoeBrand= document.querySelector(".shoeBrand");
var shoeColour= document.querySelector(".shoeColour");
var shoeSize=document.querySelector(".shoeSize");
var shoeDisplay = document.querySelector(".shoeDisplay");
var theShoeFactory = shoeFactory();
var templateSource = document.querySelector(".userTemplate").innerHTML;
var userTemplate = Handlebars.compile(templateSource);
var userData = { 
    shoes : theShoeFactory.values().theList
};

userDataHTML = userTemplate(userData);
shoeDisplay.innerHTML = userDataHTML;


searchBtn.addEventListener("click", function(){
    

    shoeDisplay.innerHTML = "";

    var filteredData = {
        shoes : theShoeFactory.filtering(shoeBrand.value, shoeColour.value, shoeSize.value)
    };

    filteredDataHTML = userTemplate(filteredData);
    shoeDisplay.innerHTML = filteredDataHTML;

    //Error message condition
    if (shoeDisplay.childElementCount === 0) {
        shoeDisplay.innerHTML = theShoeFactory.values().theError; 
    }

   

});