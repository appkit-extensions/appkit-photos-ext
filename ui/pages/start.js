export default class ImageGalleryPage extends Component {

    constructor() {
      super();
        this.state = {
            media: [],
            images: [],
            zoomed: false,
            index: 0,
            width: 0 
        }
    }
  
    componentDidMount() {

        let media = Module.data.images.map(img => {
            return {
                photo: img.full,
                caption: img.title
            }
        });
  
        let images = Module.data.images.map(img => {
            return {
                url: "file://" + img.full
            }
        });
  
        let width = (Dimensions.get("window").width - 16) / 3;
  
        this.setState({media, images, width});
    }

    render() {
	
        let thumbs = this.state.media.map((img, i) => {
            return (
              <TouchableOpacity key={i} onPress={() => this.click(i)} style={{borderWidth:2,borderColor:'white'}}>
                <Image source={{uri:img.photo}} style={{width:this.state.width,height:this.state.width}} />
              </TouchableOpacity>
      )
});
	
return (
  <ScrollView style={styles.container}>
    <View style={styles.thumbView}>
      { thumbs }
    </View>
    <Modal visible={this.state.zoomed} transparent={false} animationType="slide">
      <View style={{flex:1,backgroundColor:'#000'}}>
						<ImageViewer imageUrls={this.state.images} index={this.state.index} />
						<View style={{position:'absolute',top:33,right:10}}>
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
      this.setState({zoomed: !this.state.zoomed, index: index});
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
