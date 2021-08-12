var contract
var web3

const getProducer = async () => {
  var producer_id = document.getElementById("producer_id").value
  producer_json = await contract.methods
    .producers(producer_id).call()
  document.getElementById("producer").innerHTML = JSON.stringify(producer_json)
  document.getElementById("producer_image").src = "https://ipfs.io/ipfs/" + producer_json['personal_information'][0]
}

const getProducerCount = async () => {
  producer_count = await contract.methods
    .producer_count().call()
  document.getElementById("producer_count").innerHTML = "Cantidad de productores: " + producer_count
}