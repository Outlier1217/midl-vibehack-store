// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Store {

    struct Product {
        uint price;
        bool exists;
    }

    mapping(uint => Product) public products;
    mapping(address => uint[]) public purchases;

    event ProductAdded(uint id, uint price);
    event Purchased(address buyer, uint productId);

    function addProduct(uint id, uint price) public {
        products[id] = Product(price, true);
        emit ProductAdded(id, price);
    }

    function buy(uint productId) public payable {
        require(products[productId].exists, "Product not found");
        require(msg.value >= products[productId].price, "Not enough BTC");

        purchases[msg.sender].push(productId);
        emit Purchased(msg.sender, productId);
    }

    function getPurchases(address user) public view returns (uint[] memory) {
        return purchases[user];
    }
}