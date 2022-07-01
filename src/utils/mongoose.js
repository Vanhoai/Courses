module.exports = {
    multipleMongooseToObject: (array) => {
        return array.map((item) => item.toObject());
    },
    mongooseToObject: (item) => {
        return item ? item.toObject() : item;
    },
};
