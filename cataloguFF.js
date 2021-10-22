function shoeFactory() {
  
    //Cart list
    var cart = {};

    //Grand Total 
    var total = 0.00;

    //User messages
    var error = "Sorry, no match found.";
    var noStock = "Out of stock";

    //User Support Out of Stock list 
    var outOfStock = [];
    var outOfStockList = [];

    //User Support
    var newShoesList = [];
    var reg1 = /^[1-9]\d{0,3}\.\d{2}$/;

    //User support error messages
    var imgLink = "Enter image link.";
    var tagID = "Enter shoe ID tag.";
    var price = "Enter price.";
    var theBrand = "Select a brand.";
    var theColour = "Select a colour";
    var theSize = "Select a size";
    var addShoe = "Preview item before adding to catalogue.";
    

    //Filtering
    function filtering(brands, colour, size) {
        
        for (var i = 0; i <shoeList.length; i++) {

            var itt = shoeList[i];

            if (itt.brand === brands && itt.color === colour && itt.size === size) {
                var filt = shoeList.filter(function(itt){
                    return itt.brand === brands && itt.color === colour && itt.size === size;
                })
               
                return filt;

            } else if (itt.color === colour && itt.size === size && brands === "All") {
                var filt2 = shoeList.filter(function(itt){
                    return itt.color === colour && itt.size === size;
                })
               
                return filt2;

            } else if (itt.brand === brands && itt.size === size && colour === "All") {
                var filt3 = shoeList.filter(function(itt){
                    return itt.brand === brands && itt.size === size;
                })
               
                return filt3;

            } else if (itt.brand === brands && itt.color === colour && size === "All") {
                var filt4 = shoeList.filter(function(itt){
                    return itt.brand === brands && itt.color === colour;
                })
               
                return filt4;

            } else if (itt.brand === brands && colour === "All" && size === "All") {
                var filt5 = shoeList.filter(function(itt){
                    return itt.brand === brands;
                })
               
                return filt5;

            } else if (itt.color === colour && brands === "All" && size === "All") {
                var filt6 = shoeList.filter(function(itt){
                    return itt.color === colour;
                })
              
                return filt6;

            } else if (itt.size === size && brands === "All" && colour === "All") {
                var filt7 = shoeList.filter(function(itt){
                    return itt.size === size;
                })
              
                return filt7;

            } else if (brands === "All" && colour === "All" && size === "All") {    
                
                return shoeList;
            }
        }
    }
    
    //Adding to cart
    function addCart(tag) {
        for (var i = 0; i < shoeList.length; i++) {

            var itt = shoeList[i];

            if (itt.tag === tag) {
                
                if (itt.stock > 1) {
                    itt.stock--;

                    if (!cart.hasOwnProperty(tag)) {
                        cart[tag] = itt;
                        
                        total += itt.price;

                    } else if(cart.hasOwnProperty(tag)) {
                    
                        cart[tag].quantity++;
                    
                        total += itt.price;

                    }

                } else if (itt.stock === 1) {
                    
                    if (!cart.hasOwnProperty(tag)) {
                        cart[tag] = itt;

                    } else if(cart.hasOwnProperty(tag)) {
                    
                        cart[tag].quantity++;
                    }

                    total += itt.price;
                    itt.stock = noStock;
    
                }
            }
        }  
    }

    //Removing from cart
    function remove(tag) {
        for (var i = 0; i < shoeList.length; i++) {
            var itt = shoeList[i];

            if (itt.tag === tag) {
                
                if (itt.stock === noStock && cart[tag].quantity > 1) {
                    itt.stock = 1;
                    
                    total -= itt.price;
                    cart[tag].quantity--;

                } else if (itt.stock >= 1 && cart[tag].quantity > 1) {
                    itt.stock++;

                    total -= itt.price;

                    cart[tag].quantity--;

                    

                } else if (cart[tag].quantity === 1 && itt.stock === noStock) {

                    itt.stock = 1;
                    total -= itt.price;
                
                    delete cart[tag];

                } else if (cart[tag].quantity === 1 && itt.stock != noStock) {

                    itt.stock++;
                    total -= itt.price;
        
                    delete cart[tag];
                }
                
            }
        } 
        
    }

    //Checking out from cart 
    function checkOut() {
        total = 0.00;
        cart = {};

        for (var i = 0; i < shoeList.length; i++) {

            var itt = shoeList[i];
            itt.quantity = 1;

            if (itt.stock === noStock) {
                
                var filt = shoeList.filter(function(itt){
                    return itt.stock === noStock;
                })
                outOfStockList = filt
            }
        }

        if (outOfStockList.length > 0) {
            
            for (var k = 0; k < outOfStockList.length; k++) {
                outOfStock.push(outOfStockList[k]);
            }  
        }
        

        for (var j = 0; j < shoeList.length; j++) {
            var itt2 = shoeList[j];
            itt2.quantity = 1;
            if (itt2.stock != noStock) {
                
                var filt2 = shoeList.filter(function(itt2){
                    return itt2.stock != noStock;
                })

                shoeList = filt2;
            }
        }
    }

    function userSupport(link, brand, colour, size, stock, tag, price) {
        this.image = link;
        this.brand = brand;
        this.colour = colour;
        this.size = size;
        this.stock = parseInt(stock);
        this.tag = tag;
        this.price = parseFloat(price);
        this.quantity = 1;
    }
    
    function newShoe(link, brand, colour, size, stock, tag, price) {

        newShoesList.shift();

        var theNewShoe = new userSupport(link, brand, colour, size, stock, tag, price);
    
        newShoesList.push(theNewShoe);
    }

    function addingNewShoe() {
        for (var i = 0; i < newShoesList.length; i++) {
            var itt = newShoesList[i];
            shoeList.push(itt);
                
        }
    }

    function localStorageSetting(theShoeList, theCartList, theTotal, outStock) {
        shoeList = theShoeList;
        cart = theCartList;
        total = theTotal;
        outOfStock = outStock;
    }

    function regExCost(cost) {
        
        if(/^[1-9]\d{0,3}\.\d{2}$/.test(cost)){
            
            return cost;

        } else {
           
            return "Incorrect price format.";
        }
    }

    function checkTag(theTag) {
        var trimTag = theTag.trim();
        
        for (var i = 0; i < shoeList.length; i++) {
            var itt = shoeList[i];
            
            if (itt.tag === trimTag) {
                return "ID already exists.";
            }  
        }
        return trimTag;
    }

    //reseting out of stock list for user support sect 
    function resetOutStock(list) {
        outOfStock = list;
    }

    //Removing shoe from out of stock list 
    function removeOutOfStock(tag, newStock) {
        for (var i = 0; i < outOfStock.length; i++) {
            var itt = outOfStock[i];

            if (itt.tag === tag) {
                itt.stock = parseInt(newStock);
                shoeList.push(itt);

                let index = outOfStock.indexOf(itt);

                if (index > -1) {
                    outOfStock.splice(index, 1);
                }
            }
        }
    }

    // reseting shoe list from user support local storage sect
    function resetShoeList(localList) {
        shoeList = localList;
    }

    function values() {
        return {
            theList : shoeList,
            theError : error,
            outOfStock : noStock,
            cart : cart,
            total : parseFloat(total.toFixed(2)),
            stockList : outOfStock,
            newShoesList : newShoesList,
            errorSize : theSize,
            errorColour : theColour,
            errorBrand : theBrand,
            errorPrice : price,
            errorTag : tagID,
            errorImage : imgLink,
            addError : addShoe,
        }
    }

    return { values,
             filtering,
             addCart,
             remove,
             checkOut,
             newShoe,
             addingNewShoe,
             localStorageSetting,
             regExCost,
             checkTag,
             resetShoeList,
             resetOutStock,
             removeOutOfStock,
    }
}