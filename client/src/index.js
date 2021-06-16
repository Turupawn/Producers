var contract
var accounts
var web3

const getProducer = async () => {
  var producer_id = document.getElementById("producer_id").value
  producer_json = await contract.methods
    .producers(
      producer_id
    ).call()
  document.getElementById("producer").innerHTML = JSON.stringify(producer_json)
}

const getProducerCount = async () => {
  producer_count = await contract.methods
    .producer_count().call()
  document.getElementById("producer_count").innerHTML = "Cantidad de productores: " + producer_count
}

const addProducer = async () => {
  var input_name = document.getElementById("name").value
  var input_email = document.getElementById("email").value
  var input_phone = document.getElementById("phone").value
  var input_whatsapp = document.getElementById("whatsapp").value
  var input_region = document.getElementById("region").value
  var input_country = document.getElementById("country").value
  var input_bio = document.getElementById("bio").value
  var input_image = document.getElementById("image").value
  const result = await contract.methods.addProducer(
      input_name,
      input_email,
      input_phone,
      input_whatsapp,
      input_region,
      input_country,
      input_bio,
      input_image).send({ from: accounts[0], gas: 400000 })
    .catch((revertReason) => {
      getRevertReason(revertReason.receipt.transactionHash);
    });
};