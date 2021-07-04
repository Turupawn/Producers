// SPDX-License-Identifier: MIT

pragma solidity 0.8.5;

contract Producers
{
  struct A {
    uint256 x;
    string y;
  }
  struct B {
    A a;
    uint256 x;
  }

  A public a;
  B public b;

  function functionA(A memory _a) public
  {
    a = _a;
  }

  function functionB(B memory _b) public
  {
    b = _b;
  }

  /* Structs */
  struct Registry {
    address editor;
    Producer producer;
    Organization organization;
    Farm farm;
    Harvest harvest;
    ProductionVolume production_volume;
    CacaoAgroforestalSystem cacao_agroforestal_system;
    Beneficiary beneficiary;
  }

  struct Producer {
    string photo;
    string name;
    string bio;
    string id_number;
    string sex;
    uint256 birthday_year;
    uint256 birthday_month;
    uint256 birthday_day;
  }

  struct Organization {
    string name;
    string org_address;
    string location;
    string farm_name;
    string general_description;
  }

  struct Farm {
    uint256 georreference_utm_x;
    uint256 georreference_utm_y;
    uint256 height;
    uint256 total_area;
    uint256 other_farm_area;
    uint256 forest_area;
    uint256 cacao_area;
    uint256 production_area;
    uint256 template_area;
    uint256 projection_area;
    string variety1;
    string variety2;
    string variety3;
    string variety4;
    bool is_chemical;
    bool is_organic;
    string performance;
  }

  struct Harvest {
    string start1;
    string end1;
    string start2;
    string end2;
  }

  struct ProductionVolume {
    uint256 punds;
    uint256 quintal;
    uint256 fruit;
  }

  struct CacaoAgroforestalSystem {
    bool has_timber;
    string timber_specs;
    bool has_fruit;
    string fruit_specs;
    bool has_palm;
    string palm_specs;
    bool has_musaceae;
    string musaceae_specs;
  }

  struct Beneficiary {
    bool is_handcrafter;
    bool is_industrial;
  }

  /* Events */
  event AddProducerEvent(
    address sender,
    uint256 id,
    string name
  );

  event EditProducerEvent(
    address sender,
    uint256 id,
    string name
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
  uint256 public register_count;
  mapping(uint256 => Registry) public registers;
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
    require(addessIsAdmin[msg.sender] || msg.sender == editor, "Sender must be editor.");
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

  function addProducer(Registry memory registry)
    public addressIsAdmin(msg.sender)
  {
    registers[register_count] = registry;
    emit AddProducerEvent(
      msg.sender, register_count, registry.producer.name
    );
    register_count += 1;
  }

  function editProducer(uint256 id, Registry memory registry)
    public addressIsEditor(registry.editor)
  {
    registers[id] = registry;
    emit EditProducerEvent(
      msg.sender, register_count, registry.producer.name
    );
  }
}