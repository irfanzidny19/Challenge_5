import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 12,
  },
  headingContainer: {
    marginTop: 12,
    marginBottom: 22,
  },
  heading: {
    fontSize: 24,
    color: 'white',
  },
  content: {
    marginTop: 20,
  },
  todoDateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  cardListContainer: {
    marginTop: 14,
  },
  todoCard: {
    padding: 14,
    backgroundColor: '#4f5b62',
    borderRadius: 12,
    elevation: 10,
    marginVertical: 8,
  },
  todoTitle: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  todoDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 20,
  },
  todoTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  todoActionContainer: {
    flexDirection: 'row',
  },
  doneBadge: {
    borderRadius: 99,
    borderWidth: 1,
    borderColor: '#4ebaaa',
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  editButton: {
    marginRight: 8,
  },
  doneBadgeText: {
    color: '#4ebaaa',
    fontSize: 14,
    marginRight: 2,
  },
  input: {
    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginVertical: 12,
  },
  saveButon: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#000a12',
    width: 100,
  },
  cancelButton: {
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#7f0000',
    width: 90,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 14,
    marginLeft: 8,
  },
  statusesContainer: {
    flexDirection: 'row',
  },
  statusButton: {
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#000a12',
    width: 100,
    marginRight: 10,
  },
  statusButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  statusButtonSelected: {
    backgroundColor: 'white',
  },
  statusButtonTextSelected: {
    color: 'black',
    textAlign: 'center',
  },
});

export default styles;
