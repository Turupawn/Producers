const { expect } = require('chai');

const Producers = artifacts.require('Producers');

contract('Producers', function () {
  beforeEach(async function () {
    this.producers_contract = await Producers.new();
  });

  var producer_example1 = [
    [ // PersonalInformation
        "", //photo
        "Juan", //name
        "0801199583552", //id_number
        "", //rtn
        "", //birthday
        "", //gender
        "", //marital_status
        1, //amount_childs
        1, //amount_sons
        1, //amount_daugters
        "", //cellphone
        "", //email
        "", //bio
    ],
    [ // FarmInfo
        "", //name
        "", //zone_description
        "", //belonging_organization
        "", //organization_address
        "", //location
        1, //georeference_x
        1, //georeference_y
        1, //msnm_height
    ],
    [ // FarmArea
        1, //total
        1, //other_farm
        1, //forest
        1, //cacao
        1, //production
        1, //template
        1, //projection
    ],
    [ // Plantation
        "", //variety_1
        "", //variety_2
        "", //variety_3
        "", //variety_4
        "", //variety_5
        "", //variety_6
        "", //variety_7
        "", //variety_8
    ],
    [ // Farm
        1, //management
        1, //performance
    ],
    [ // CSA
        1, //timber
        "", //timber_description
        1, //fruit
        "", //fruit_description
        1, //palm
        "", //palm_description
        1, //musaceae
        "", //musaceae_description
    ],
    [ // Harvest
        "", //start_1
        "", //end_1
        "", //start_2
        "", //end_2

        1, //cob
        1, //slime
        1, //dry_and_fermented
        1, //dry_only

        1, //total_volume
        "", //cacao_atributes_and_profile

        1, //status
    ]
  ]

  var producer_example2 = [
    [ // PersonalInformation
        "", //photo
        "Pedro", //name
        "0801199583552", //id_number
        "", //rtn
        "", //birthday
        "", //gender
        "", //marital_status
        1, //amount_childs
        1, //amount_sons
        1, //amount_daugters
        "", //cellphone
        "", //email
        "", //bio
    ],
    [ // FarmInfo
        "", //name
        "", //zone_description
        "", //belonging_organization
        "", //organization_address
        "", //location
        1, //georeference_x
        1, //georeference_y
        1, //msnm_height
    ],
    [ // FarmArea
        1, //total
        1, //other_farm
        1, //forest
        1, //cacao
        1, //production
        1, //template
        1, //projection
    ],
    [ // Plantation
        "", //variety_1
        "", //variety_2
        "", //variety_3
        "", //variety_4
        "", //variety_5
        "", //variety_6
        "", //variety_7
        "", //variety_8
    ],
    [ // Farm
        1, //management
        1, //performance
    ],
    [ // CSA
        1, //timber
        "", //timber_description
        1, //fruit
        "", //fruit_description
        1, //palm
        "", //palm_description
        1, //musaceae
        "", //musaceae_description
    ],
    [ // Harvest
        "", //start_1
        "", //end_1
        "", //start_2
        "", //end_2

        1, //cob
        1, //slime
        1, //dry_and_fermented
        1, //dry_only

        1, //total_volume
        "", //cacao_atributes_and_profile

        1, //status
    ]
  ]


  it('addProducers stores producer', async function () {
    await this.producers_contract.addProducer(
      producer_example1
    );

    var first_producer = await this.producers_contract.producers(1)
    expect(first_producer.personal_information.name).to.equal('Juan');
  });

  it('editProducer edits producer', async function () {
    await this.producers_contract.editProducer(
      1,
      producer_example2
    );

    var first_producer = await this.producers_contract.producers(1)
    expect(first_producer.personal_information.name).to.equal('Pedro');
  });
});