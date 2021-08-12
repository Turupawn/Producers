var contract
var accounts
var web3
var file_buffer

const getProducer = async () => {
  var producer_id = document.getElementById("producer_id").value
  producer_json = await contract.methods
    .producers(producer_id).call()
  document.getElementById("producer").innerHTML = JSON.stringify(producer_json)
  document.getElementById("producer_image").src = "https://ipfs.io/ipfs/" + producer_json['personal_information'][0]
}

const getAddProducerEvents = async () => {
  document.getElementById("add_producer_events").innerHTML = ""
  contract.events.AddProducerEvent({}, { fromBlock: 0, toBlock: 'latest' }).on(
    'data', function(event) {
    console.log(event);
    document.getElementById("add_producer_events").innerHTML += JSON.stringify(event)
  }).on('error', console.error);
}

const getEditProducerEvents = async () => {
  document.getElementById("edit_producer_events").innerHTML = ""
  contract.events.EditProducerEvent({}, { fromBlock: 0, toBlock: 'latest' }).on(
    'data', function(event) {
    console.log(event);
    document.getElementById("edit_producer_events").innerHTML += JSON.stringify(event)
  }).on('error', console.error);
}

const getProducerCount = async () => {
  producer_count = await contract.methods
    .producer_count().call()
  document.getElementById("producer_count").innerHTML = "Cantidad de productores: " + producer_count
}

const addProducer = async () => {
  const { cid } = await node.add(file_buffer, { cidVersion: 2 })
  console.log('successfully stored image on ipfs', cid)
  var personal_information_image = cid._baseCache.get("z")

  var personal_information_name = document.getElementById("name").value
  var personal_information_bio = document.getElementById("bio").value
  var personal_information_id_number = document.getElementById("id_number").value
  var personal_information_sex = document.getElementById("sex").value
  var personal_information_birthday_year = document.getElementById("birthday_year").value
  var personal_information_birthday_month = document.getElementById("birthday_month").value
  var personal_information_birthday_day = document.getElementById("birthday_day").value

  var organization_name = document.getElementById("name").value
  var organization_org_address = document.getElementById("org_address").value
  var organization_location = document.getElementById("location").value
  var organization_farm_name = document.getElementById("farm_name").value
  var organization_general_description = document.getElementById("general_description").value

  var farm_georreference_utm_x = document.getElementById("georreference_utm_x").value
  var farm_georreference_utm_y = document.getElementById("georreference_utm_y").value
  var farm_height = document.getElementById("height").value
  var farm_total_area = document.getElementById("total_area").value
  var farm_other_farm_area = document.getElementById("other_farm_area").value
  var farm_forest_area = document.getElementById("forest_area").value
  var farm_cacao_area = document.getElementById("cacao_area").value
  var farm_production_area = document.getElementById("production_area").value
  var farm_template_area = document.getElementById("template_area").value
  var farm_projection_area = document.getElementById("projection_area").value
  var farm_variety1 = document.getElementById("variety1").value
  var farm_variety2 = document.getElementById("variety2").value
  var farm_variety3 = document.getElementById("variety3").value
  var farm_variety4 = document.getElementById("variety4").value
  var farm_is_chemical = document.getElementById("is_chemical").checked
  var farm_is_organic = document.getElementById("is_organic").checked
  var farm_performance = document.getElementById("performance").value

  var harvest_start1 = document.getElementById("start1").value
  var harvest_end1 = document.getElementById("end1").value
  var harvest_start2 = document.getElementById("start2").value
  var harvest_end2 = document.getElementById("end2").value

  var production_volume_punds = document.getElementById("punds").value
  var production_volume_quintal = document.getElementById("quintal").value
  var production_volume_fruit = document.getElementById("fruit").value
  
  var cacao_agroforestal_system_volume_has_timber = document.getElementById("has_timber").checked
  var cacao_agroforestal_system_volume_timber_specs = document.getElementById("timber_specs").value
  var cacao_agroforestal_system_volume_has_fruit = document.getElementById("has_fruit").checked
  var cacao_agroforestal_system_volume_fruit_specs = document.getElementById("fruit_specs").value
  var cacao_agroforestal_system_volume_has_palm = document.getElementById("has_palm").checked
  var cacao_agroforestal_system_volume_palm_specs = document.getElementById("palm_specs").value
  var cacao_agroforestal_system_volume_has_musaceae = document.getElementById("has_musaceae").checked
  var cacao_agroforestal_system_volume_musaceae_specs = document.getElementById("musaceae_specs").value

  var beneficiary_is_handcrafter = document.getElementById("is_handcrafter").checked
  var beneficiary_is_industrial = document.getElementById("is_industrial").checked

  var producer = [
    accounts[0],
    [ //PersonalInformation
      personal_information_image,
      personal_information_name,
      personal_information_bio,
      personal_information_id_number,
      personal_information_sex,
      personal_information_birthday_year,
      personal_information_birthday_month,
      personal_information_birthday_day,
    ],
    [//Organization
      organization_name,
      organization_org_address,
      organization_location,
      organization_farm_name,
      organization_general_description,
    ],
    [//Farm
      farm_georreference_utm_x,
      farm_georreference_utm_y,
      farm_height,
      farm_total_area,
      farm_other_farm_area,
      farm_forest_area,
      farm_cacao_area,
      farm_production_area,
      farm_template_area,
      farm_projection_area,
      farm_variety1,
      farm_variety2,
      farm_variety3,
      farm_variety4,
      farm_is_chemical,
      farm_is_organic,
      farm_performance,
    ],
    [//Harvest
      harvest_start1,
      harvest_end1,
      harvest_start2,
      harvest_end2,
    ],
    [//ProductionVolume
      production_volume_punds,
      production_volume_quintal,
      production_volume_fruit,
    ],
    [//CacaoAgroforestalSystem
      cacao_agroforestal_system_volume_has_timber,
      cacao_agroforestal_system_volume_timber_specs,
      cacao_agroforestal_system_volume_has_fruit,
      cacao_agroforestal_system_volume_fruit_specs,
      cacao_agroforestal_system_volume_has_palm,
      cacao_agroforestal_system_volume_palm_specs,
      cacao_agroforestal_system_volume_has_musaceae,
      cacao_agroforestal_system_volume_musaceae_specs,
    ],
    [//Beneficiary
      beneficiary_is_handcrafter,
      beneficiary_is_industrial,
    ],
  ];

  const result = await contract.methods.addProducer(producer)
    .send({ from: accounts[0], gas: 0 })
    .catch((revertReason) => {
      getRevertReason(revertReason.receipt.transactionHash);
    });
};

const editProducer = async () => {
  const { cid } = await node.add(file_buffer)
  console.log('successfully stored image on ipfs', cid)
  var input_id = document.getElementById("id_edit").value
  var input_name = document.getElementById("name_edit").value
  var input_height = document.getElementById("height_edit").value
  var input_image = cid['string']

  var producer = [
    accounts[0],
    [ //PersonalInformation
      input_image,  //photo
      input_name,   //name
      "",           //bio
      "",           //id_number
      "",           //sex
      1,            //birthday_year
      1,            //birthday_month
      1,            //birthday_day
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
      input_height,        //height
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


  const result = await contract.methods.editProducer(input_id, producer)
    .send({ from: accounts[0], gas: 4000000 })
    .catch((revertReason) => {
      getRevertReason(revertReason.receipt.transactionHash);
    });
};