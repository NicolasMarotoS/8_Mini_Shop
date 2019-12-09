let App = function (productId = null,productPrice = null) {

    // Launch the shopify library
    if (window.ShopifyBuy && window.ShopifyBuy.UI) {
        ShopifyBuyInit();
    }

    // Initialize the buy button
    function ShopifyBuyInit() {
        var client = ShopifyBuy.buildClient({
            //domain                : 'manuel-moreale.myshopify.com',     // Debug
            //storefrontAccessToken :  '4779d4df10b83bdae3d64746b414375d' // Debug

            domain                : 'minimalissimo.myshopify.com',
            storefrontAccessToken : 'f8d6c8562e85e7ab1f659dfa5f604e47',
        });

        // Set up the button
        ShopifyBuy.UI.onReady(client).then(function (ui) {

            // Configurations
            var Config = {

                // Product button
                "product" : {
                    "iframe"    : false,
                    "variantId" : "all",
                    "width"     : "auto",
                    "contents": {
                        "img"                : false,
                        "imgWithCarousel"    : false,
                        "title"              : false,
                        "variantTitle"       : false,
                        "price"              : false,
                        "description"        : false,
                        "buttonWithQuantity" : false,
                        "quantity"           : false
                    },
                    "text" : {
                        button      : 'GBP ' + productPrice,
                        outOfStock  : 'Out of stock',
                        unavailable : 'Unavailable',
                    },
                },

                // Cart Config
                "cart" : {
                    "iframe"  : false,
                    "popup"   : false,
                    "contents": {
                        "button": true
                    },
                    "text" : {
                        "title"           : 'Cart',
                        "empty"           : 'Your cart is empty.',
                        "button"          : 'Checkout',
                        "total"           : 'Total',
                        "notice"          : 'Shipping and discount codes are added at checkout.',
                        "noteDescription" : 'Special instructions for seller',
                    }
                },

                // Cart toggle button
                "toggle" : {

                    // Don't use iframes
                    "iframe" : false,

                    // What items do we need?
                    "order": [
                        'icon',
                    ],


                },

                // Cart Product config
                "lineItem" : {
                    "contents": {
                        "image" : false
                    },
                },



            };

            // Instantiate only the cart in the homepage
            if (productId == null) {
                ui.createComponent('cart' , {
                    moneyFormat : '%C2%A3%7B%7Bamount%7D%7D',
                    options : {
                        "cart"   : Config.cart,
                        "toggle" : Config.toggle
                    }
                });
            }

            if (productId != null) {

                // Instantiate the components
                ui.createComponent('product', {
                    
                    id          : [productId],
                    node        : document.getElementById('buy'),
                    moneyFormat : '%C2%A3%7B%7Bamount%7D%7D',

                    // Components Options
                    options: {
                        "product"  : Config.product,
                        "cart"     : Config.cart,
                        "lineItem" : Config.lineItem,
                        "toggle"   : Config.toggle
                    }
                });
            }
        });
    }
};