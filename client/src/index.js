var contract
var accounts
var web3

const getProducer = async () => {
  var producer_id = document.getElementById("producer_id").value
  producer_json = await contract.methods
    .producers(producer_id).call()
  document.getElementById("producer").innerHTML = JSON.stringify(producer_json)
}

const addProducer = async () => {
  var producer_id = document.getElementById("producer_id").value

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
  var h_other_data = document.getElementById("h_other_data").value

  var producer = [
    [ // PersonalInformation
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

        h_other_data,
        h_status,
    ]
  ]

  const result = await contract.methods.setProducer(producer_id, producer)
    .send({ from: accounts[0], gas: 0 })
    .on('transactionHash', function(hash){
      console.log("transactionHash: El usuario hizo clic en Confirm, esperando confirmación")
    })
    .on('receipt', function(receipt){
      console.log("receipt: Se han escrito los valores en el lacchain")
    })
    .catch((revertReason) => {
      getRevertReason(revertReason.receipt.transactionHash);
    });
};