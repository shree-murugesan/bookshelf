# [bookshelf](bookshelf-catalog.netlify.app)

You can access this at: [bookshelf-catalog.netlify.app](bookshelf-catalog.netlify.app)

This is a web application designed to keep track of your book collection. You can search and add books to read; or if you've already read them you can save them to your collection with your rating. You can also catalog which books you are currently reading, and update them when you have finished reading it. If you would like to pick up a new book but cannot decide, you can randomly generate a book to read from your TBR (To Be Read) list. If you would like, you can also select the Genre you're feeling like reading to get a book better suited to your mood.

This was built with the MERN stack: MongoDB, Express, React (bootstrapped with [Create React App](https://github.com/facebook/create-react-app)), and Node.js. This is powered by the GoogleBooks API to get details of the book (title, author, average rating, number of pages, etc.). This is deployed on Heroku and Netlify.

# To Do
- [ ] Improve UI of the app (*in progress*)
- [x] Prompt user to enter rating for book once they have finished reading
- [ ] Prompt user to enter Genre when adding book to collection *OR* get it from an API
- [ ] Provide option to select Rating threshold when picking random book (e.g. > 4 stars rating)
- [x] Prevent user from adding duplicate books to collection
- [x] Display toasts when book has been successfully added / there is an error adding the book
- [ ] Improve alignment of books on View Books page 
- [ ] Option to edit book's rating
- [ ] Organize file structure and improve code quality (remove repeated code, unecessary console.log(), etc.) (*in progress*)

# Bugs
- [ ] When you click 'Stop Reading' on a book, it gets sent to TBR even if the book had already been read -> need to save previous status
