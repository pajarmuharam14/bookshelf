document.addEventListener("DOMContentLoaded", () => {
  let bookShelf = [];

  const formInput = document.querySelector("#form-input-book");
  formInput.addEventListener("submit", (e) => {
    e.preventDefault();
    addBooksObject();
    e.target.reset();
  });

  const addBooksObject = () => {
    const generateId = +new Date();
    const titleBooks = document.querySelector("#titleInput").value;
    const authorBooks = document.querySelector("#authorInput").value;
    const releaseDateBooks = document.querySelector("#yearInput").value;

    const booksObject = {
      id: generateId,
      title: titleBooks,
      author: authorBooks,
      year: releaseDateBooks,
      isComplete: false,
    };

    bookShelf.push(booksObject);
    makeElementBooks();
    saveDataBooks();
  };

  const makeElementBooks = () => {
    const notFinishReading = document.querySelector("#tableUnfinishedReading");
    notFinishReading.innerHTML = "";

    const finishReading = document.querySelector("#tablefinishedReading");
    finishReading.innerHTML = "";

    bookShelf.forEach((books) => {
      const tableRow = document.createElement("tr");
      const tableDataTitle = document.createElement("td");
      const tableDataId = document.createElement("td");
      const tableDataAuthor = document.createElement("td");
      const tableDataYear = document.createElement("td");
      const tableDataButton = document.createElement("td");
      const btnDelete = document.createElement("button");
      const btnFinished = document.createElement("button");
      const btnUnfinished = document.createElement("button");

      btnDelete.classList.add("btn-delete");
      btnFinished.classList.add("btn-finished");
      btnUnfinished.classList.add("btn-finished");

      tableDataId.innerText = books.id;
      tableDataTitle.innerText = books.title;
      tableDataAuthor.innerText = books.author;
      tableDataYear.innerText = books.year;
      btnDelete.innerText = "Delete";
      btnFinished.innerText = "Finished";
      btnUnfinished.innerText = "Unfinished";

      tableRow.append(tableDataId, tableDataTitle, tableDataAuthor, tableDataYear, tableDataButton);

      if (!books.isComplete) {
        notFinishReading.append(tableRow);
        tableDataButton.append(btnDelete, btnFinished);
      } else {
        finishReading.append(tableRow);
        tableDataButton.append(btnDelete, btnUnfinished);
      }

      btnFinished.addEventListener("click", () => {
        books.isComplete = true;
        notFinishReading.append();
        finishReading.append(tableRow);
        tableDataButton.removeChild(btnFinished);
        tableDataButton.append(btnUnfinished);
        saveDataBooks();
      });

      btnUnfinished.addEventListener("click", () => {
        books.isComplete = false;
        notFinishReading.append(tableRow);
        finishReading.append();
        tableDataButton.removeChild(btnUnfinished);
        tableDataButton.append(btnFinished);
        saveDataBooks();
      });

      btnDelete.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this book?")) {
          bookShelf = bookShelf.filter((book) => book != books);
          makeElementBooks();
          saveDataBooks();
        }
      });
    });
  };

  const storageKey = "book-shelf";

  const serializedData = localStorage.getItem(storageKey);
  let data = JSON.parse(serializedData);
  if (data !== null) {
    data.forEach((book) => bookShelf.push(book));
  }

  function saveDataBooks() {
    const parsed = JSON.stringify(bookShelf);
    localStorage.setItem(storageKey, parsed);
  }

  makeElementBooks();
});
