class DateHelper {
  static getLocaleDateTimeString(dateString) {
    const isoDate = new Date(dateString);
    const localDate = new Date(
      isoDate.getTime() - isoDate.getTimezoneOffset() * 60000
    );
    const response =
      localDate.toDateString() + " " + localDate.toTimeString().slice(0, 8);
    return response;
  }
}
//Replace this with Moment
export default DateHelper;
