var app = new Vue({
    el: '#app',
    data: {
        items: [],
        link: "",
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
        async updateLink() {
            console.log("in update link");
            try {
                let response = await axios.put("/api/items/" + this.findItem._id, {
                    title: this.findItem.title,
                    description: this.findItem.description,
                    link: this.link,

                });
                this.findItem = null;
                this.link = null;
                this.getItems();
                return true;
            } catch (error) {
                console.log(error);
            }
        }
    }
});
