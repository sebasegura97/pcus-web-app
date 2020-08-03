import moment from "moment"

const formatDate = (milliseconds, format) => {
  let date = moment(parseInt(milliseconds)).format(
    format ? format : "DD/MM/YYYY HH:mm"
  );
  return date;
};

export default formatDate