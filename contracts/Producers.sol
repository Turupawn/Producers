// SPDX-License-Identifier: MIT

pragma solidity 0.8.5;

contract Producers
{
  /* Structs */
  struct Producer {
    string name;
    string email;
    string phone;
    string whatsapp;
    string region;
    string country;
    string bio;
    string image;
    address editor;
  }

  /* Events */
  event AddProducerEvent(
    address sender,
    uint256 id,
    string name,
    string email,
    string phone,
    string whatsapp,
    string region,
    string country,
    string bio,
    string image,
    address editor
  );

  event EditProducerEvent(
    address sender,
    uint256 id,
    string name,
    string email,
    string phone,
    string whatsapp,
    string region,
    string country,
    string bio,
    string image,
    address editor
  );

  event AdminAdded(
    address sender,
    address new_admin
  );

  event AdminRevoked(
    address sender,
    address new_admin
  );
  
  /* Public Variables */
  uint256 public producer_count;
  mapping(uint256 => Producer) public producers;
  mapping(address => bool) public addessIsAdmin;

  constructor()
  {
    addessIsAdmin[msg.sender] = true;
  }

  /* Modifer */
  modifier addressIsAdmin(address _address) {
    require(addessIsAdmin[_address], "Sender must be admin");
    _;
  }

  modifier addressIsEditor(address editor) {
    require(msg.sender == editor, "Sender must be editor.");
    _;
  }

  /* Public Functions */
  function addAdminAddress(address _address) public addressIsAdmin(msg.sender)
  {
    addessIsAdmin[_address] = true;
    emit AdminAdded(
      msg.sender, _address
    );
  }

  function revokeAdminAddress(address _address) public addressIsAdmin(msg.sender)
  {
    addessIsAdmin[_address] = false;
    emit AdminRevoked(
      msg.sender, _address
    );
  }
  
  function addProducer(
    string memory name,
    string memory email,
    string memory phone,
    string memory whatsapp,
    string memory region,
    string memory country,
    string memory bio,
    string memory image,
    address editor
    ) public addressIsAdmin(msg.sender)
  {
    producers[producer_count] = Producer(
      name, email, phone, whatsapp, region, country, bio, image, editor
    );
    emit AddProducerEvent(
      msg.sender, producer_count, name, email, phone, whatsapp, region, country, bio, image, editor
    );
    producer_count += 1;
  }

  function editProducer(
    uint256 id,
    string memory name,
    string memory email,
    string memory phone,
    string memory whatsapp,
    string memory region,
    string memory country,
    string memory bio,
    string memory image,
    address editor) public addressIsEditor(editor) // addressIsAdmin(msg.sender) can admin edit producers?
  {
    producers[id] = Producer(
      name, email, phone, whatsapp, region, country, bio, image, editor
    );
    emit EditProducerEvent(
      msg.sender, id, name, email, phone, whatsapp, region, country, bio, image, editor
    );
  }
}