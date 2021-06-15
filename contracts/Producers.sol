// SPDX-License-Identifier: MIT

pragma solidity 0.8.5;

contract Producers
{
  struct Producer {
    uint256 id;
    string name;
    string email;
    string phone;
    string whatsapp;
    string region;
    string country;
    string bio;
    string image;
  }
  struct Farm {
    string name;
    string country;
    string region; // ??
    uint256 lat;   // ??
    uint256 lang;  // ??
    string description;
  }
  struct Lot {
    uint256 height;
    string variety;
    string procedure;
    uint256 size;
  }
  
  uint256 public producer_count;
  mapping(uint256 => Producer) public producers;
  
  function addProducer(
    string memory name,
    string memory email,
    string memory phone,
    string memory whatsapp,
    string memory region,
    string memory country,
    string memory bio,
    string memory image
    ) public
  {
    producers[producer_count] = Producer(producer_count,
      name,
      email,
      phone,
      whatsapp,
      region,
      country,bio,
      image);
    producer_count += 1;
  }
}