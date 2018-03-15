export default class PhotosModule extends Module {

    state = {
        images: []
    }

    moduleWillLoad() {
    }

    async moduleDataDidUpdate(data) {

        // add data to state
        this.setState({
            images: data.images
        })
    }
}