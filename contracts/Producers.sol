// SPDX-License-Identifier: MIT

pragma solidity 0.8.5;

contract Producers
{
  /* Structs */
  struct Producer {
    address editor;
    PersonalInformation personal_information;
    Organization organization;
    Farm farm;
    Harvest harvest;
    ProductionVolume production_volume;
    CacaoAgroforestalSystem cacao_agroforestal_system;
    Beneficiary beneficiary;
  }

  struct PersonalInformation {
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
  uint256 public producer_count;
  mapping(uint256 => Producer) public producers;

  constructor()
  {
  }

  function addProducer(Producer memory producer) public
  {
    producers[producer_count] = producer;
    emit AddProducerEvent(
      msg.sender, producer_count, producer.personal_information.name
    );
    producer_count += 1;
  }

  function editProducer(uint256 id, Producer memory producer) public
  {
    producers[id] = producer;
    emit EditProducerEvent(
      msg.sender, producer_count, producer.personal_information.name
    );
  }
}