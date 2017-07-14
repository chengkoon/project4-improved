# Project 4 - Tikam! (Unique Bid Auction)

## Demo
1. You can visit https://wdi-project4-ck.herokuapp.com/ for a live demo BUT it is highly unstable now (stable version to be pushed before 16/7/2017).
2. or you can git clone this repo and run 'node server.js' (estab mongoDB connection) and then 'npm run dev'

## Project Description
There are 2 types of users you can try out - sponsors and ordinary users. Sponsors have the ability to post a product and open up bidding for ordinary users to bid. Create an account for each type of user to try.

After posting the item, users can then bid for the item with amount ranging from $1.00 to $1.99, inclusive. In this unique bid system, the bidder with the highest, unique bid wins. Therefore a bidder with a bid amount of $1.97 might triumph over a bid of $1.99. A simple table for illustration purposes:

| Bid           | No. of bidders| Result  |
| ------------- |:-------------:| -------:|
| $1.99         | 5             |         |
| $1.98         | 4             |         |
| $1.97         | 1             | Winner! |

## Technologies Used
Main libraries/frameworks: VueJS, MongoDB, NodeJS, JavaScript, HTML, CSS
Others: ScrollReveal + Animate.css, Bulma
