# Book-Record-Management

Server >> Storing certain book data >> User Register >> Subscriber

This is a book record managemnt API Server/ Backend for the library system or managemnet of records or manuals or books

Fine Calculation Logic
If the book is returned late (returnDate < currentDate):

If subscription is expired (subscriptionExpiration < currentDate):
Fine = 100 + (20 × days since subscription expired)

Else: 50

Else: 0

Subscription Types
3 months (Basic) 6 months (Standard) 12 months (Premium)

If the subscription type is standard && if the subscription date is 06/03/2023 => then subscription valid till 06/09/2023
within subscription date >> if we miss the renewal >>50/- day subscription date is also been missded >> and also missed the renewal >> 100 + 20/- day
