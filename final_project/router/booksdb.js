let bb = {
      1: {"author": "Chinua Achebe","title": "Things Fall Apart", "isbn": "9780385474542", "reviews": {} },
      2: {"author": "Hans Christian Andersen","title": "Fairy tales", "isbn": "9789888341696", "reviews": {} },
      3: {"author": "Dante Alighieri","title": "The Divine Comedy", "isbn": "9780141197494", "reviews": {} },
      4: {"author": "Unknown","title": "The Epic Of Gilgamesh", "isbn":  "9781609807948", "reviews": {} },
      5: {"author": "Unknown","title": "The Book Of Job", "isbn": "9780805243079" , "reviews": {} },
      6: {"author": "Unknown","title": "One Thousand and One Nights", "isbn": "9780140442892", "reviews": {} },
      7: {"author": "Unknown","title": "Nj\u00e1l's Saga", "isbn": "9780140447699", "reviews": {} },
      8: {"author": "Jane Austen","title": "Pride and Prejudice", "isbn": "9780451479914" , "reviews": {} },
      9: {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "isbn": "9780140449723", "reviews": {} },
      10: {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "isbn": "9780375400704", "reviews": {} }
}

let books = new Map();
Object.entries(bb).forEach((b) => {
      s = new Map()
      s.set("author", b[1].author)
      s.set("title", b[1].title)
      s.set("isbn", b[1].isbn)
      reviews = new Map([])
      s.set("reviews", reviews)
      books.set(Number(b[0]), s)
})      

module.exports=books;
