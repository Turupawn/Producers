var contract
var accounts
var web3
var contract_address = "0x42DeE8A729E6beEf25Db0985fd214C99EefA9173"

const getProducer = async () => {
  contract.options.address = contract_address
  var producer_id = document.getElementById("producer_id").value
  producer_json = await contract.methods
    .producers(
      producer_id
    ).call()
  document.getElementById("producer").innerHTML = JSON.stringify(producer_json)
}

const getProducerCount = async () => {
  contract.options.address = contract_address
  producer_count = await contract.methods
    .producer_count().call()
  document.getElementById("producer_count").innerHTML = "Cantidad de productores: " + producer_count
}

const addProducer = async () => {
  contract.options.address= contract_address
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

async function loadApp() {
  var awaitWeb3 = async function () {
    web3 = await getWeb3();
    web3.eth.net.getId((err, netId) => {
      if (netId == 42) {
        var awaitContract = async function () {
          contract = await getContract(web3);
          var awaitAccounts = async function () {
            accounts = await web3.eth.getAccounts()
            getProducerCount()
            console.log("Web3 loaded")
          };
          awaitAccounts()
        };
        awaitContract();
      } else {
        console.log("Error: Wrong network")
      }
    });
  };
  awaitWeb3();
}

loadApp()