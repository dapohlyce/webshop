#!/bin/bash
docker-compose -f compose/admin.yml -f compose/picture.yml -f compose/product_db.yml  -f compose/product.yml -f compose/product_mongo_express.yml -f compose/order.yml -f compose/order_db.yml -f compose/user_db.yml -f compose/user.yml --project-directory . up
