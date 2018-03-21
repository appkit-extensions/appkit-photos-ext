export default class ImageGalleryPage extends Component {

    width = (Layout.window.width - 16) / 3
    state = {
        thumbs: [],
        images: [],
        zoomed: false,
        index: 0,
        refreshing: true
    }

    moduleDidUpdate({ images, refreshing, err }) {

        if (err) {
            Util.showError(err.message || err)
        }

        const sources = images.map(img => {
            return {
                url: img.full.path
            }
        });

        this.setState({
            images: sources,
            thumbs: images,
            refreshing
        });
    }

    render() {

        let thumbs = this.state.thumbs.map((img, i) => {
            return (
                <TouchableOpacity key={i} onPress={() => this.click(i)} style={{ borderWidth: 2, borderColor: 'white' }}>
                    <Image source={{ uri: img.full.path }} style={{ width: this.width, height: this.width }} />
                </TouchableOpacity>
            )
        });

        const refresh = Module.canUpdateData ? (
            <RefreshControl refreshing={this.state.refreshing} onRefresh={() => Module.updateData()} />
        ) : null

        return (
            <ScrollView style={styles.container} refreshControl={refresh}>
                <View style={styles.thumbView}>
                    {thumbs}
                </View>
                <Modal visible={this.state.zoomed} transparent={false} animationType="slide">
                    <View style={{ flex: 1, backgroundColor: '#000' }}>
                        <ImageViewer
                            style={{ marginTop: 30 }}
                            imageUrls={this.state.images}
                            index={this.state.index} />
                        <View style={{ position: 'absolute', top: (Navbar.height - 25), right: 15 }}>
                            <TouchableOpacity onPress={() => this.click()}>
                                <Icon name="close" size={25} subtle></Icon>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        )
    }

    click(index) {
        this.setState({ zoomed: !this.state.zoomed, index: index });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    thumbView: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 2
    }
})
