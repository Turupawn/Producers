const { expect } = require('chai');

const Producers = artifacts.require('Producers');

contract('Producers', function () {
  beforeEach(async function () {
    this.producers_contract = await Producers.new();
  });

  var producer_example1 = [
    "0x4d739Eb42A5869c71b483b1e0d72C3979E3F3769",
    [ //PersonalInformation
      "",     //photo
      "Juan", //name
      "",     //bio
      "",     //id_number
      "",     //sex
      1,      //birthday_year
      1,      //birthday_month
      1,      //birthday_day
    ],
    [//Organization
      "",      //name
      "",      //org_address
      "",      //location
      "",      //farm_name
      "",      //general_description
    ],
    [//Farm
      1,        //georreference_utm_x
      1,        //georreference_utm_y
      1,        //height
      1,        //total_area
      1,        //other_farm_area
      1,        //forest_area
      1,        //cacao_area
      1,        //production_area
      1,        //template_area
      1,        //projection_area
      "",       //variety1
      "",       //variety2
      "",       //variety3
      "",       //variety4
      true,     //is_chemical
      true,     //is_organic
      "",       //performance
    ],
    [//Harvest
      "",       //start1
      "",       //end1
      "",       //start2
      "",       //end2
    ],
    [//ProductionVolume
      1,       //punds
      1,       //quintal
      1,       //fruit
    ],
    [//CacaoAgroforestalSystem
      true,       //has_timber
      "",         //timber_specs
      true,       //has_fruit
      "",         //fruit_specs
      true,       //has_palm
      "",         //palm_specs
      true,       //has_musaceae
      "",         //musaceae_specs
    ],
    [//Beneficiary
      true,         //is_handcrafter
      true,         //is_industrial
    ],
  ];

  var producer_example2 = [
    "0x4d739Eb42A5869c71b483b1e0d72C3979E3F3769",
    [ //PersonalInformation
      "",     //photo
      "Pedro", //name
      "",     //bio
      "",     //id_number
      "",     //sex
      1,      //birthday_year
      1,      //birthday_month
      1,      //birthday_day
    ],
    [//Organization
      "",      //name
      "",      //org_address
      "",      //location
      "",      //farm_name
      "",      //general_description
    ],
    [//Farm
      1,        //georreference_utm_x
      1,        //georreference_utm_y
      1,        //height
      1,        //total_area
      1,        //other_farm_area
      1,        //forest_area
      1,        //cacao_area
      1,        //production_area
      1,        //template_area
      1,        //projection_area
      "",       //variety1
      "",       //variety2
      "",       //variety3
      "",       //variety4
      true,     //is_chemical
      true,     //is_organic
      "",       //performance
    ],
    [//Harvest
      "",       //start1
      "",       //end1
      "",       //start2
      "",       //end2
    ],
    [//ProductionVolume
      1,       //punds
      1,       //quintal
      1,       //fruit
    ],
    [//CacaoAgroforestalSystem
      true,       //has_timber
      "",         //timber_specs
      true,       //has_fruit
      "",         //fruit_specs
      true,       //has_palm
      "",         //palm_specs
      true,       //has_musaceae
      "",         //musaceae_specs
    ],
    [//Beneficiary
      true,         //is_handcrafter
      true,         //is_industrial
    ],
  ];


  it('addProducers stores producer', async function () {
    await this.producers_contract.addProducer(
      producer_example1
    );

    var first_producer = await this.producers_contract.producers(0)
    expect(first_producer.personal_information.name).to.equal('Juan');
  });

  it('editProducer edits producer', async function () {
    await this.producers_contract.editProducer(
      0,
      producer_example2
    );

    var first_producer = await this.producers_contract.producers(0)
    expect(first_producer.personal_information.name).to.equal('Pedro');
  });
});