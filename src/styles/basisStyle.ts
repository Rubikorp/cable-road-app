import {StyleSheet} from 'react-native';

const basisBtn = StyleSheet.create({
  btn: {
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 100,
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFF',
  },
  btnSave: {
    backgroundColor: '#32ade6',
  },
  btnAdd: {
    backgroundColor: '#34c759',
  },
  btnSort: {
    backgroundColor: '#5856d6',
  },
  btnDelete: {
    backgroundColor: '#ec221f',
  },
});

const basisStyle = StyleSheet.create({
  textInputModal: {
    width: 300,
    backgroundColor: '#f6f6f6',
    borderRadius: 5,
    fontSize: 16,
    padding: 16,
    color: '#161616',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  containerScreen: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  textInp: {
    padding: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    fontSize: 16,
    color: '#000',
    backgroundColor: '#f6f6f6',
  },
  dsc: {
    fontSize: 14,
    color: '#000',
  },
  dscPriority:{
    fontSize: 14,
    color: "#ec221f"
  },
  containerBtnBottom: {
    gap: 16,
  }
});

export {basisBtn, basisStyle};
