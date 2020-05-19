# Bargain Books

We're going to revolutionize the books market by providing a site for selling books between individuals

```json
{
    "ISBN": "978-0-321-87758-1",
    "Title": "Essential C#5.0",
    "Author": "Mark Michaelis",
    "Price": 59.99,
    "SellerEmail": "someone@someplace.com",
    "Used": true,
    "Location": {
        "City": "Redmond",
        "Street": "156TH AVE NE"
    }
}
```

We need to be able to provide a nice list of all the books for sale, as well as showing, creating, updating and deleting individual books. Status codes returned by the API should reflect whether something was created, changed, or if the request had no effect.

Our customers know what they want, so being able to filter books on Title or Author is important, one is enough.
Basic data type validation should be performed for basic data types such as String, Number and Boolean.

Your mission, should you choose to accept it, is to implement this API and prove that it works, either by providing tests or a swagger file for manual testing. All methods and paths should be tested by unit tests or documented in swagger, but not neccessarily both.

## Instructions

Fork this repo (top right corner icon on github) to create a copy of this repo to your own gitub account, clone your repo, do your implementation and push to your github, and create a pull request when done.

## Running

```sh
npm install
npm start
```

## Developing

```sh
npm install
npm run dev
```

## Test

```sh
npm install
npm run test
```

## swagger

Swagger UI availble at `localhost:3000/swagger`
Specification served at UI availble at `localhost:3000/swagger.yaml`

Update the `swagger/swagger.yaml` file containing an openapi 3.0 or swagger 2.0 specification of the API.

NOTE: The online swagger editor `http://editor.swagger.io/` can occasionally report errors for a correct yaml file. If you get an error that doesn't make sense, just reload the editor page.



POST:
curl -i -X POST -H "Content-Type:application/json" "http://localhost:3000/books" -d '{"ISBN":"9780321877581","Title":"Essential C#5.0","Author":"Mark Michaelis","Price":"59.99","SellerEmail":"someone@someplace.com","Used":true,"Location":{"City":"Redmond","Street":"156TH AVE NE"}}'

DELETE:
curl -i -X DELETE "http://localhost:3000/books/_id"

GET:
curl -i "http://localhost:3000/books"

GET ONE:
curl -i "http://localhost:3000/books/_id"

GET QUERY:
curl - i "http://localhost:3000/books?Title=Book"

PUT:
curl -i -X PUT -H "Content-Type:application/json" "http://localhost:3000/books/5ec380dbeb26ab99f16bd68e" -d '{"ISBN":"9780321877581","Title":"One Book","Author":"Mark Michaelis","Price":"59.99","SellerEmail":"someone@someplace.com","Used":true,"Location":{"City":"Redmond","Street":"156TH AVE NE"}}'


