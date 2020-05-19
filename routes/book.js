get = (req, res, next) => {

  if(req.query.Title){
    search = {Title: req.query.Title}
    req.models.Book.find(search).then((book) =>{
      return res.send(book)
    }).catch((error) =>{
      return next(error)
    });
  }
  else {
    req.models.Book.find().then((books) => {
      return res.send(books);
    }).catch((error) => {
      return next(error)
    }) 
  }
}

post = (req, res, next) => {
    return req.models.Book.create({
      ISBN: req.body.ISBN,
      Title: req.body.Title,
      Author: req.body.Author,
      Price: req.body.Price,
      SellerEmail: req.body.SellerEmail,
      Used: req.body.Used,
      Location: {
        City: req.body.Location.City,
        Street: req.body.Location.Street,
      }
    })
  .then((book) => {
      return res.status(201).send(book)
  }).catch((error) =>{
    next(error)
  })
}

deleteBook = (req, res, next) => {
  req.models.Book.findByIdAndDelete(req.params.id).then((deleted)=> {
    if(deleted)
      return res.send(deleted).status(200)
    res.sendStatus(204)
  }).catch((error) => next(error))
}

getOneBook = (req, res, next) => {
  let search = {};
  search = {_id: req.params.id}
  req.models.Book.find(search).then((book) =>{
    return res.send(book)
  }).catch((error) =>{
    next(error)
  });
}

updateBook = (req, res, next) => {

  req.models.Book.updateOne({_id: req.params.id},
    {
      ISBN: req.body.ISBN,
      Title: req.body.Title,
      Author: req.body.Author,
      Price: req.body.Price,
      SellerEmail: req.body.SellerEmail,
      Used: req.body.Used,
      Location: {
        City: req.body.Location.City,
        Street: req.body.Location.Street,
      },
    },{
     new: true,
     upsert: true,
     runvalidators: true,
    }).then((status) => {
      if (status.upserted)
        res.status(201)
      else if (status.nModified)
        res.status(200)
      else 
        res.status(204)

      if(res.statusCode !== 204){
        return req.models.Book.findById(req.params.id).then((book) => {
          res.send(book)
        })
      }
      return res.send()
    }).catch((error) => next(error))

  // const id = req.params.id;

  // return req.models.Book.findOneAndUpdate({_id: id},  {
  //   ISBN: req.body.ISBN,
  //   Title: req.body.Title,
  //   Author: req.body.Author,
  //   Price: req.body.Price,
  //   SellerEmail: req.body.SellerEmail,
  //   Used: req.body.Used,
  //   Location: {
  //     City: req.body.Location.City,
  //     Street: req.body.Location.Street,
  //   }
  // }, {useFindAndModify: false, new: true, upsert: true}
  // ).then((book) =>{
  //   return res.status(200).send(book)
  // }).catch((error)=>{
  //   next(error)
  // })
}


module.exports = {
  get,
  post,
  deleteBook,
  getOneBook,
  updateBook
}
