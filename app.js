let app = new Vue({
    el: '#app',
    data: {
        // Qty = quantity
        products: [
            {name: "Bryum d'argent", wish_listed: 0, final_price: 20, price: 20, qty: 1, img_nb: 1},
            {name: 'Spathiphyllum', wish_listed: 0, final_price: 23, price: 23, qty: 1, img_nb: 2},
            {name: 'Figuier pleureur', wish_listed: 0, final_price: 34, price: 34, qty: 1, img_nb: 3},
            {name: 'Aribanda', wish_listed: 0, final_price: 39, price: 39, qty: 1, img_nb: 4},
            {name: 'Figuier pleureur', wish_listed: 0, final_price: 35, price: 35, qty: 1, img_nb: 5},
            {name: 'Aloe vera', wish_listed: 0, final_price: 45, price: 45, qty: 1, img_nb: 6},
            {name: 'Canne du muet', wish_listed: 0, final_price: 28, price: 28, qty: 1, img_nb: 7},
            {name: 'Palmiste', wish_listed: 0, final_price: 19, price: 19, qty: 1, img_nb: 8},
            {name: 'Salvia officinalis', wish_listed: 0, final_price: 42, price: 42, qty: 1, img_nb: 9},
            {name: 'Dracaena', wish_listed: 0, final_price: 50, price: 50, qty: 1, img_nb: 10},
        ],
        wish_list: [],
        cart: [],
        },
    methods: {
        show_wish_list: function() {
            window.scrollTo(0,0);
            document.querySelector('.wish_list').classList.toggle('extend_wish_list');
            document.querySelector('.wish_list_title').classList.toggle('wish_list_title_js');
            document.querySelector('.wish_list_container').classList.toggle('wish_list_container_js')
            const wish_list_height = document.querySelector('body').offsetHeight
            document.querySelector('.wlc').style.height = wish_list_height.toString() + 'px'
                        
            try {
                for (let i = 0; i < this.wish_list.length; i++) {
                    document.getElementsByClassName('wish_list_card')[i].classList.toggle('wish_list_card_js')             
                }
            }
            catch {
                console.log('Whish list empty');
            }
        },
        show_cart: function() {
            document.querySelector('.cart').classList.toggle('extend_cart');
            document.querySelector('.cart_title').classList.toggle('cart_title_js');
            document.querySelector('.cart_list').classList.toggle('cart_list_js');
            document.querySelector('.cart_bottom').classList.toggle('cart_bottom_js');
            document.querySelector('.panier_vide').classList.toggle('panier_vide_js');
        },
        go_to_home: function(){
            try {
                // Cart
                document.querySelector('.cart').classList.remove('extend_cart');
                document.querySelector('.cart_title').classList.remove('cart_title_js');
                document.querySelector('.cart_list').classList.remove('cart_list_js');
                document.querySelector('.cart_bottom').classList.remove('cart_bottom_js');
                document.querySelector('.panier_vide').classList.remove('panier_vide_js');

                // Wish list
                document.querySelector('.wish_list').classList.remove('extend_wish_list');
                document.querySelector('.wish_list_title').classList.remove('wish_list_title_js');
                document.querySelector('.wish_list_card').classList.remove('wish_list_card_js');
            }
            catch {
                console.log('Already home');
            }
        },
        add_to_cart: function(product){
            this.cart.push(product);
            
            // Éviter les doublons :
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i + 1] == this.cart[i]) {
                    this.cart.splice(i+1, 1)
                }
            }
        },
        remove_from_cart: function(product) {
            this.cart.splice(this.cart.indexOf(product), 1)
        },
        pass_command: function(){

            if (this.cart.length == 0){
                document.querySelector('.error_command_msg').classList.toggle('error_command_msg_js')
            }
            
            else if (this.cart.length > 0){
                this.cart.splice(0)
                document.querySelector('.command_passed_msg').classList.toggle('command_passed_msg_js')
            }
        },
        close_pop_up_msg: function(){
            document.querySelector('.command_passed_msg').classList.remove('command_passed_msg_js')
            document.querySelector('.error_command_msg').classList.remove('error_command_msg_js')
        },
        add_to_wish_list: function(product){
            this.wish_list.push(product);

            // Éviter les doublons :
            for (let i = 0; i < this.wish_list.length; i++) {                 
                if (this.wish_list[i+1] == this.wish_list[i]) {
                    this.wish_list.splice(i+1, 1)
                }
            }
        },
        remove_from_wish_list: function(product) {
            this.wish_list.splice(this.wish_list.indexOf(product), 1)
        },
    },
    computed: {
        nb_cart_products: function(){
            nb_products = 0

            for (let i = 0; i < this.cart.length; i++) {
                const product = this.cart[i];
                nb_products += product.qty
            }
            return nb_products

        },
        total_price: function(){
            total = 0

            for (let i = 0; i < this.cart.length; i++) {
                const product = this.cart[i];
                total += product.final_price
            }
            return total
        },
        nb_wish_list_products: function(){
            nb_products = 0

            if(this.wish_list.length > 0){
                nb_products = this.wish_list.length
            }
            return nb_products
        }
    }
})
