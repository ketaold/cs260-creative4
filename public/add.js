var app = new Vue({
    el: '#admin',
    data: {
        link: "",
        description: "",
        file: null,
        addItem: null,
        findItem: null,
        items: [],
    },
    created() {
        this.getItems();
    },
    methods: {
        fileChanged(event) {
            this.file = event.target.files[0]
        },
        async upload() {
            try {
                const formData = new FormData();
                formData.append('photo', this.file, this.file.name)
                let r1 = await axios.post('/api/photos', formData);
                let r2 = await axios.post('/api/items', {
                    link: this.link,
                    description: this.description,
                    path: r1.data.path
                });
                this.addItem = r2.data;
            } catch (error) {
                console.log(error);
            }
        },
        async getItems() {
            try {
                let response = await axios.get("/api/items");
                this.items = response.data;
                return true;
            } catch (error) {
                console.log(error);
            }
        },

    }
});
