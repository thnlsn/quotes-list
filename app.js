/* Your working area */
const { useState, useEffect } = React; // Destructure hooks

// Component for a single quote in the list
const Quote = function ({ quote, deleteQuote }) {
  const [quoteState, setQuoteState] = useState(quote); // The data currently in the quote
  const [editing, setEditing] = useState(false); // State determining if quote is being edited

  const { quoteId, image, userName, timestamp, content } = quoteState; // Destructure quote data

  // Function to call whenever inputs are changed in the quote edit menu to update that quotes state, the parameter is always the event, so we destructure out event.target.value and event.target.name
  const handleChange = ({ target: { value, name } }) => {
    const quote = { ...quoteState }; // Shallow copy
    // name is equal to the object property name, so we use bracket notation to access that property and reassign it to the new value after the change event
    quote[name] = value;
    setQuoteState(quote); // Set state to the new quote
  };

  // Function to take in the timestamp and return a formatted version depending on their locale
  const formatDate = (timestamp) => {
    const date = new Date(timestamp); // Create a new Date object with the timestamps in data.json

    // Options for how to format the timestamp
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      weekday: 'short',
    };

    const locale = navigator.language; // Users locale

    // Internationalization API - format the data given user locale and the option above
    return new Intl.DateTimeFormat(locale, options).format(date);
  };

  return (
    <li className='quote' id={quoteId}>
      {/* If editing is true */}
      {editing ? (
        <div className='quote__edit-form'>
          <div className='quote__input-container'>
            <div className='quote__label'>Link to image</div>
            <input
              onChange={handleChange}
              type='text'
              className='quote-form__image'
              name='image' // So CRUD functions know which property in state to target
              placeholder='Link to image'
              value={image}
            />
          </div>
          <div className='quote__input-container'>
            <div className='quote__label'>Username</div>
            <input
              onChange={handleChange}
              type='text'
              className='quote-form__username'
              name='userName' // So CRUD functions know which property in state to target
              placeholder='Username'
              value={userName}
            />
          </div>
          <div className='quote__input-container'>
            <div className='quote__label'>Message</div>
            <input
              onChange={handleChange}
              type='text'
              className='quote-form__content'
              name='content' // So CRUD functions know which property in state to target
              placeholder='Message'
              value={content}
            />
          </div>
        </div>
      ) : (
        <div className='quote__container'>
          <img src={image} className='quote__image' alt='Profile Picture' />
          <div className='quote__username'>{userName}</div>
          <div className='quote__timestamp'>{formatDate(timestamp)}</div>
          <q className='quote__content'>{content}</q>
        </div>
      )}
      <div className='quote__controls'>
        <button
          className='quote__button btn'
          onClick={() => deleteQuote(quoteId)}
        >
          Delete
        </button>
        <button
          className='quote__button btn'
          onClick={() => setEditing(!editing)}
        >
          {editing ? 'Done' : 'Edit'}
        </button>
      </div>
    </li>
  );
};

const FunctionView = function () {
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState({
    image: null,
    userName: 'Elmo', // Default username
    content: null,
  });

  const addQuote = () => {
    const newQuotes = [...quotes]; // Shallow copy of quotes state

    newQuotes.push({
      ...newQuote,
      // If there is a quote ? find previous id and increment : else set id to 1
      quoteId: quotes.length > 0 ? +quotes[quotes.length - 1].quoteId + 1 : 1,
      // Generate Date which will work even though it's different format than in data.json
      timestamp: Date.now(),
    });
    setQuotes(newQuotes);
    // Set newQuote back to default state
    setNewQuote({
      image: null,
      userName: 'Elmo',
      content: null,
    });
    // Empty the values of each input field
    document
      .querySelectorAll('.quote-form input')
      .forEach((input) => (input.value = ''));
  };

  // Function to take an id and return the index of the quote that has a matching id
  const quoteIndex = (id) => quotes.findIndex((quote) => quote.quoteId === id);

  const deleteQuote = (id) => {
    const newQuotes = [...quotes]; // Shallow copy
    newQuotes.splice(quoteIndex(id), 1); // Remove the quote at index where id is the same
    setQuotes(newQuotes);
  };

  const handleChange = ({ target: { value, name } }) => {
    const quote = { ...newQuote }; // Shallow copy
    quote[name] = value; // Reassign the property that is the same as the name value of the input element to the new value of the input element
    setNewQuote(quote);
  };

  useEffect(async () => {
    // Using fetch API because this project is run entirely through the browser where Web APIs are available (unlike import/require which only work in a Node environment)
    const data = await fetch('./data.json').then((response) => response.json());
    setQuotes(data);
  }, []);

  return (
    <div className='container'>
      <h1 className='heading'>Quotes Challenge</h1>
      <ul className='quotes'>
        {quotes.map((quote) => (
          <Quote quote={quote} deleteQuote={deleteQuote} key={quote.quoteId} />
        ))}
      </ul>
      <div className='quote-form'>
        <input
          onChange={handleChange}
          type='text'
          className='quote-form__image'
          name='image' // So CRUD functions know which property in state to target
          placeholder='Link to image'
        />
        <input
          onChange={handleChange}
          type='text'
          className='quote-form__username'
          name='userName' // So CRUD functions know which property in state to target
          placeholder='Username'
        />
        <input
          onChange={handleChange}
          type='text'
          className='quote-form__content'
          name='content' // So CRUD functions know which property in state to target
          placeholder='Message'
        />
        <button onClick={addQuote} className='quote-form__submit btn'>
          + Add Quote
        </button>
      </div>
    </div>
  );
};

/* Not working area */
const App = React.createElement(FunctionView);
ReactDOM.render(App, document.getElementById('root'));
