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
  var input_name = document.getElementById("name").value
  var input_height = document.getElementById("height").value
  var input_image = cid._baseCache.get("z")

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