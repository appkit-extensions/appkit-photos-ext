export default class PhotosModule extends Module {

    state = {
        images: [],
        err: null
    }

    moduleWillLoad() {
        if (this.options.get('enable-live-updates', false)) {
            this.dataUpdateFrequency = 60
        }
    }

    moduleDataDidUpdate({ images }, err) {
        this.setState({ images, err })
    }

    async moduleDataWillUpdate() {
        return this.loadModuleContent(this.options.get('enable-live-updates', false))
    }
}
