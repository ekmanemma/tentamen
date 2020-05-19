const express = require('express')
const router = express.Router()

const book = require('./book.js')

router.get("/books", book.get)
router.get("/books/:id", book.getOneBook)
router.post("/books", book.post)
router.delete("/books/:id", book.deleteBook)
router.put("/books/:id", book.updateBook)

module.exports = router