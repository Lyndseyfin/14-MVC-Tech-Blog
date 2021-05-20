const User = require('../api/userRoutes');
const Post= require('../api/postRoutes');
const Comment = require('../api/commentRoutes');

// Reader.hasOne(LibraryCard, {
//   foreignKey: 'reader_id',
//   onDelete: 'CASCADE',
// });

// Reader.hasMany(Book, {
//   foreignKey: 'reader_id',
//   onDelete: 'CASCADE',
// });

// Book.belongsTo(Reader, {
//   foreignKey: 'reader_id',
// });

// LibraryCard.belongsTo(Reader, {
//   foreignKey: 'reader_id',
// });

module.exports = { Reader, Book, LibraryCard };
