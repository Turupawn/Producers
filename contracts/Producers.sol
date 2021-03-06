// SPDX-License-Identifier: MIT

pragma solidity 0.8.6;

import "./Ownable.sol";

contract Producers is Ownable
{
  /* Structs */
  struct Producer {
    PersonalInformation personal_information;
    FarmInfo farm_info;
    FarmArea farm_area;
    Plantation plantation;
    Farm farm;
    CSA csa;
    Harvest harvest;
  }

  struct PersonalInformation {
    string name;
    string id_number;
    string rtn;
    string birthday;
    string gender;
    string marital_status;
    uint256 amount_childs;
    uint256 amount_sons;
    uint256 amount_daugters;
    string cellphone;
    string email;
    string bio;
  }

  struct FarmInfo {
    string name;
    string zone_description;
    string belonging_organization;
    string organization_address;
    string location;
    uint256 georeference_x;
    uint256 georeference_y;
    uint256 msnm_height;
  }

  struct FarmArea {
    uint256 total;
    uint256 other_farm;
    uint256 forest;
    uint256 cacao;
    uint256 production;
    uint256 template;
    uint256 projection;
  }

  struct Plantation {
    string variety_1;
    string variety_2;
    string variety_3;
    string variety_4;
    string variety_5;
    string variety_6;
    string variety_7;
    string variety_8;
  }

  struct Farm {
    string management;
    uint256 performance;
  }

  struct CSA {
    uint256 timber;
    string timber_description;
    uint256 fruit;
    string fruit_description;
    uint256 palm;
    string palm_description;
    uint256 musaceae;
    string musaceae_description;
  }

  struct Harvest {
    string start_1;
    string end_1;
    string start_2;
    string end_2;

    uint256 cob;
    uint256 slime;
    uint256 dry_and_fermented;
    uint256 dry_only;

    uint256 total_year_volume;
    string cacao_atributes_and_profile;

    string other_data;
    uint256 status;
  }

  /* Public Variables */
  mapping(uint256 => Producer) public producers;

  constructor()
  {
  }

  function setProducer(uint256 id, Producer memory producer) public onlyOwner requiredFields(producer)
  {
    producers[id] = producer;
  }

   modifier requiredFields(Producer memory producer)
   {
    require(bytes(producer.personal_information.name).length != 0,"Must have personal information name");
    require(bytes(producer.personal_information.id_number).length != 0,"Must have personal information id number");
    //require(producer.harvest.status != 0,"Must have harvest status");
    _;
   }
}
