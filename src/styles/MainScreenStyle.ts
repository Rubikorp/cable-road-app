import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    searchInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 4,
      marginBottom: 16,
    },
    itemContainer: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      marginBottom: 8,
      backgroundColor: 'rgba(207, 207, 207, 0.18)'
    },
    itemNumber: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    itemRepairs: {
      fontSize: 14,
      color: '#666',
    },
    listContainer: {
      paddingBottom: 16,
    },
    filterButtonsContainer: {

    },
    numberBox: {
        flex: 1,
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    }
  });

  export default styles