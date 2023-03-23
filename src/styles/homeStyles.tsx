import { StyleSheet } from 'react-native';

const ColorPrimary = "#3A4F6D";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: ColorPrimary,
    },
    
    //Home
    imgUser:{
        width: 45,
        height: 45,
    },
    txtUser:{
        fontSize: 35,
        marginLeft: 10,
        fontFamily: 'Raleway-Regular',
    },
    banner:{
        flex: 1,
        justifyContent: "center",
        resizeMode: 'contain',
    },
    functions:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: ColorPrimary,
    },
    function:{
        flexBasis: '50%',
    },
    imgButton: {
        width: '98%',
        height: 200,
        marginHorizontal:5,
        borderRadius: 20,
        marginVertical: 5,
    },


});