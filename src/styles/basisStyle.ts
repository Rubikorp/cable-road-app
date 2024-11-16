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
    backgroundColor: "#fff",
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
  dscPriority: {
    fontSize: 14,
    color: '#ec221f',
  },
  containerBtnBottom: {
    gap: 16,
  },
});

const navigationStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    position: 'relative',
  },
  header: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
    color: '#000',
  },
  goBack: {
    fontSize: 16,
    fontWeight: '500',
    color: '#32ade6',
  },
  goBackContainer: {
    position: 'absolute',
    left: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBack: {
    height: 10,
    width: 5,
    marginRight: 7
  }
});

export {basisBtn, basisStyle, navigationStyle};
