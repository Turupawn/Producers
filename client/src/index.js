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

  // PersonalInformation
  var pi_photo = cid._baseCache.get("z")
  console.log(pi_photo)
  var pi_name = document.getElementById("pi_name").value
  var pi_id_number = document.getElementById("pi_id_number").value
  var pi_rtn = document.getElementById("pi_rtn").value
  var pi_birthday = document.getElementById("pi_birthday").value
  var pi_gender = document.getElementById("pi_gender").value
  var pi_marital_status = document.getElementById("pi_marital_status").value
  var pi_amount_childs = document.getElementById("pi_amount_childs").value
  var pi_amount_sons = document.getElementById("pi_amount_sons").value
  var pi_amount_daugters = document.getElementById("pi_amount_daugters").value
  var pi_cellphone = document.getElementById("pi_cellphone").value
  var pi_email = document.getElementById("pi_email").value
  var pi_bio = document.getElementById("pi_bio").value

  // FarmInfo
  var fi_name = document.getElementById("fi_name").value
  var fi_zone_description = document.getElementById("fi_zone_description").value
  var fi_belonging_organization = document.getElementById("fi_belonging_organization").value
  var fi_organization_address = document.getElementById("fi_organization_address").value
  var fi_location = document.getElementById("fi_location").value
  var fi_georeference_x = document.getElementById("fi_georeference_x").value
  var fi_georeference_y = document.getElementById("fi_georeference_y").value
  var fi_msnm_height = document.getElementById("fi_msnm_height").value

  // FarmArea
  var fa_total = document.getElementById("fa_total").value
  var fa_other_farm = document.getElementById("fa_other_farm").value
  var fa_forest = document.getElementById("fa_forest").value
  var fa_cacao = document.getElementById("fa_cacao").value
  var fa_production = document.getElementById("fa_production").value
  var fa_template = document.getElementById("fa_template").value
  var fa_projection = document.getElementById("fa_projection").value

  // Plantation
  var p_variety_1 = document.getElementById("p_variety_1").value
  var p_variety_2 = document.getElementById("p_variety_2").value
  var p_variety_3 = document.getElementById("p_variety_3").value
  var p_variety_4 = document.getElementById("p_variety_4").value
  var p_variety_5 = document.getElementById("p_variety_5").value
  var p_variety_6 = document.getElementById("p_variety_6").value
  var p_variety_7 = document.getElementById("p_variety_7").value
  var p_variety_8 = document.getElementById("p_variety_8").value

  // Farm
  var f_management = document.getElementById("f_management").value
  var f_performance = document.getElementById("f_performance").value

  // CSA
  var csa_timber = document.getElementById("csa_timber").value
  var csa_timber_description = document.getElementById("csa_timber_description").value
  var csa_fruit = document.getElementById("csa_fruit").value
  var csa_fruit_description = document.getElementById("csa_fruit_description").value
  var csa_palm = document.getElementById("csa_palm").value
  var csa_palm_description = document.getElementById("csa_palm_description").value
  var csa_musaceae = document.getElementById("csa_musaceae").value
  var csa_musaceae_description = document.getElementById("csa_musaceae_description").value

  // Harvest
  var h_start_1 = document.getElementById("h_start_1").value
  var h_end_1 = document.getElementById("h_end_1").value
  var h_start_2 = document.getElementById("h_start_2").value
  var h_end_2 = document.getElementById("h_end_2").value
  var h_cob = document.getElementById("h_cob").value
  var h_slime = document.getElementById("h_slime").value
  var h_dry_and_fermented = document.getElementById("h_dry_and_fermented").value
  var h_dry_only = document.getElementById("h_dry_only").value
  var h_total_year_volume = document.getElementById("h_total_year_volume").value
  var h_cacao_atributes_and_profile = document.getElementById("h_cacao_atributes_and_profile").value
  var h_status = document.getElementById("h_status").value

  var producer = [
    [ // PersonalInformation
        pi_photo,
        pi_name,
        pi_id_number,
        pi_rtn,
        pi_birthday,
        pi_gender,
        pi_marital_status,
        pi_amount_childs,
        pi_amount_sons,
        pi_amount_daugters,
        pi_cellphone,
        pi_email,
        pi_bio,
    ],
    [ // FarmInfo
        fi_name,
        fi_zone_description,
        fi_belonging_organization,
        fi_organization_address,
        fi_location,
        fi_georeference_x,
        fi_georeference_y,
        fi_msnm_height,
    ],
    [ // FarmArea
        fa_total,
        fa_other_farm,
        fa_forest,
        fa_cacao,
        fa_production,
        fa_template,
        fa_projection,
    ],
    [ // Plantation
        p_variety_1,
        p_variety_2,
        p_variety_3,
        p_variety_4,
        p_variety_5,
        p_variety_6,
        p_variety_7,
        p_variety_8,
    ],
    [ // Farm
        f_management,
        f_performance,
    ],
    [ // CSA
        csa_timber,
        csa_timber_description,
        csa_fruit,
        csa_fruit_description,
        csa_palm,
        csa_palm_description,
        csa_musaceae,
        csa_musaceae_description,
    ],
    [ // Harvest
        h_start_1,
        h_end_1,
        h_start_2,
        h_end_2,

        h_cob,
        h_slime,
        h_dry_and_fermented,
        h_dry_only,

        h_total_year_volume,
        h_cacao_atributes_and_profile,

        h_status,
    ]
  ]

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
      "",           //gender
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