import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

function CustomHeader() {
    return(
        <View style={styles.header}>
            <Image source={require('../../assets/IMG_7636.png')} style={{ width: 30, height: 30 }} />
            <TouchableOpacity>
                <AntDesign name={'questioncircleo'} size={20} color={'#000'} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingHorizontal: 30,
        marginTop: 60,
        marginBottom: -20
    }
});

export default CustomHeader;