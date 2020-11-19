import { StyleSheet } from 'react-native';
import theme from '../../../../../theme';

const styles = StyleSheet.create({
  emptyAgendaText: {
    marginTop: 150,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 50,
  },
  headerText: {
    fontWeight: '400',
    fontSize: 15,
    color: '#AFAFAF',
  },
  body: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  agendaDateColumn: {
    flex: 4,
    alignItems: 'center',
  },
  agendaDate: {
    color: theme.palette.primary.red,
    fontSize: 40,
  },
  agendaDayOfWeek: {
    color: theme.palette.primary.blue,
    fontSize: 15,
  },
  agendaContentColumn: {
    flex: 8,
  },
  agendaItem: {
    backgroundColor: theme.palette.secondary.white,
    borderRadius: 20,
    marginBottom: 25,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 15,
  },
  sessionCourse: {
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 26.2,
    textAlign: 'left',
    marginBottom: 10,
  },
  agendaItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sessionInfo: {
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 26.2,
    color: '#888888',
  },
});

export default styles;
