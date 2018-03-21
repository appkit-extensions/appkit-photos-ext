﻿export default class PhotosModule extends Module {

    live = false

    state = {
        images: [],
        refreshing: false,
        err: null
    }

    moduleWillLoad() {
        this.live = this.options.get('enable-live-updates', false)
        if (this.live) {
            this.dataUpdateFrequency = 60 * 5
        }
    }

    moduleDataDidUpdate({ images }, refreshing, err) {
        this.setState({ images, refreshing, err })
    }

    moduleDataWillUpdate(fromCache) {
        return this.loadModuleContent(this.live, fromCache)
    }
}
