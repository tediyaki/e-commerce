# e-commerce

## RESTful API  
Here are the APIs that are provided in this project  

| Route | HTTP | Header(s) | Body | Description |
| --- | --- | --- | --- | --- |
| `/user/register` | POST | `none` | `name, email, password` | Register with a new user info |
| `/user/login` | POST | `none` | `email, password` | Sign in and get an access token based on credentials |
| `/user/cart/:productid` | POST | `token` | `none` | add a product to cart |
| `/user/cart/:cart_index` | PATCH | `token` | `none` | remove a product based on cart index |
| `/product` | GET | `none` | `none` | Get all the products info |
| `/product` | POST | `none` | `name, description, image(file), stock` | Create a product |
| `/product/:_id` | PUT | `none` | `name, description, image(file), stock` | Update a product |
| `/product/:_id` | DELETE | `none` | `none` | Delete a product |

## POST /user/register

Register with name, email, and password.  

example output on success register
```
{
    "_id": <user's id, type: String>,
    "name": <user's name, type: String>,
    "email": <user's email, type: String>,
    "token": <user's authentication token, type: String>,
    "cart": <user's shopping cart, type: Array>
}

status: 201
```

### Register Error example

#### Email is Already Registered

This occurs if other user has registered with the email.  
Output  
```
[
    "This email is already registered"
]

status: 400
```

#### Email is not valid

This occurs if email is not valid  
Output
 
```
[
    "This email is not valid"
]

status: 400
```

#### Field is empty

The error is displayed according to the empty field  

Output
```
[
    "Please enter your name" <if name field is empty>,
    "Please enter your email" <if email field is empty>,
    "Please enter your password <if password field is empty>"
]

status: 400
```

## POST /user/login

Login with email and password  
On successful login user's info will be displayed  

Output:
```
{
    "_id": <user's id, type: String>,
    "name": <user's name, type: String>,
    "email": <user's email, type: String>,
    "token": <user's authentication token, type: String>,
    "cart": <user's shopping cart, type: Array>
}

status: 200
```

### Login Error example

If any field is empty or the email and password is mismatched, the error will be displayed  

output
```
"Wrong email / password"

status: 400
```

## Route /user/cart Restriction

The user MUST be logged in in order to add or delete their cart.  
Otherwise, this error will be displayed

```
"You are not logged in"

status: 403
```

## POST /user/cart/:productid

Add an item to cart.  
This will return the user info alongside their cart item(s)

output post /user/cart/:productid

```
{
    "_id": <user's id, type: String>,
    "name": <user's name, type: String>,
    "email": <user's email, type: String>,
    "cart": [
        {
            "_id": <product id, type: String>,
            "name": <product name, type: String>,
            "description": <product description, type: String>,
            "image": <product image link, type: String>
        }
    ]
}

status: 201
```

## PATCH /user/cart/:cart_index

Remove an item from cart then display current user info  

Example patch /user/cart/0 (data from post /user/cart)
```
{
    "_id": <user's id, type: String>,
    "name": <user's name, type: String>,
    "email": <user's email, type: String>,
    "cart": []
}

status: 200
```

## GET /product
Get all products in array  
output:
```
[
    {
        "_id": <product id, type: String>,
        "name": <product name, type: String>,
        "description": <product description, type: String>,
        "image": <product description, type: String>,
        "stock": <product stock, type: Number>,
        "__v": 0 <version from mongoose>
    }
]

status: 200
```

## POST /product
Add a product by input its name, description, image(file), and stock  
On successful creation the product info will be displayed
```
{
    "_id": <product id, type: String>,
    "name": <product name, type: String>,
    "description": <product description, type: String>,
    "image": <product description, type: String>,
    "stock": <product stock, type: Number>,
    "__v": 0 <version from mongoose>
}

status: 201
```
### POST /product Validation Errors

#### No file provided

The error will be displayed if there is no file

```
"Cannot read property 'cloudStoragePublicUrl' of undefined"

status: 500
```

#### Field are empty (except for file)
The error is displayed according to the empty field  
Note: the stock will be 0 if empty

```
[
    "Please enter product name" <if product name is empty>,
    "Please enter product description <if product description is empty>"
]

status: 400
```

#### File is not an image 
The error is displayed is the file is not an image file (.png, .jpg, or .jpeg)

```
"Only images are allowed"

status: 500
```

#### Stock is negative value
The error is displayed if input stock is below 0
```
[
    "Invalid stock number"
]

status: 400
```

## PUT /product/:id
Update a product based on its id  
The new name, description, image, and stock MUST be provided  
On successful update, the updated product will be displayed  
output:

```
{
    "_id": <product id, type: String>,
    "name": <new product name, type: String>,
    "description": <new product description, type: String>,
    "image": <new product description, type: String>,
    "stock": <new product stock, type: Number>,
    "__v": 0 <version from mongoose>
}

status: 200
```

### PUT /product/:id Errors

The error is exactly the same as POST /product/:id

## DELETE /product/:id
Remove a product based on its id  
output on successful removal:

```
{
    "message": "Product removed successfully"
}

status: 200
```