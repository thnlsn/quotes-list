# Prerequisites

you will need to install

1. npm
2. node

# Setup

1. Download the QuotesList folder to your computer
2. Run `npm install -g http-server`
3. Go to your working directory where index.html lives
4. Run `http-server -c-1`
5. Open your browser and go to localhost://[port] where port is the output of the last command.
6. You should be able to see "Quotes Challenge" on the page! Let's start coding!

# Choose Your Style

Within the app.js we support both class component and functional component. You can choose either one or mix them up base on your preference.

# Requirements

1. Display all the quotes in a list view, show userName, timestamp and content.
2. Add an input field and a submit button on the bottom, allow adding a quote to the list(default userName is "Elmo", and the quoteId increment by 1).
3. Add an edit button next to each quote, when clicked, user can edit the content of the quote in the input field below.
4. Add a delete button next to each quote, when clicked, deletes that quote from the list.

# Bonus Points

1. Filter the list base on userName
2. Sort the list by timestamp
3. Add headshots of the users to list items.
