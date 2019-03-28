var app = new Vue({
    el: '#app',
    data: {
        items: [],
        findItem: "",
    },
    created() {
        this.getItems();
    },
    methods: {
        async getItems() {
            try {
                let response = await axios.get("/api/items");
                this.items = response.data;
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        selectItem(item) {
            this.findItem = item;
        },
        async deleteItem() {
            try {
                let response = axios.delete("/api/items/" + this.findItem._id);
                this.findItem = null;
                this.getItems();
                return true;
            } catch (error) {
                console.log(error);
            }
        },
    }
});
