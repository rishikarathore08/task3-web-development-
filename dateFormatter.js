const { format, isValid, parse } = require('date-fns');

const formatDate = (dateString) => {
    const parsedDate = parse(dateString, 'yyyy-M-d', new Date());
    if (!isValid(parsedDate)) {
        throw new Error('Invalid Due Date');
    }
    return format(parsedDate, 'yyyy-MM-dd');
};

module.exports = {
    formatDate,
};