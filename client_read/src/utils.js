const getWeb3 = async () => {
  return new Promise((resolve, reject) => {
    console.log(document.readyState)
    if(document.readyState=="complete")
    {
      var web3 = new Web3(new Web3.providers.HttpProvider('http://147.182.178.194'));
      resolve(web3)
    }else
    {
      window.addEventListener("load", async () => {
        var web3 = new Web3(new Web3.providers.HttpProvider('http://147.182.178.194'));
        resolve(web3)
      });
    }
  });
};

const getContract = async (web3) => {
  const data = await $.getJSON("./contracts/Producers.json");

  const netId = await web3.eth.net.getId();
  const deployedNetwork = data.networks[netId];
  const contract = new web3.eth.Contract(
    data.abi,
    deployedNetwork && deployedNetwork.address
  );
  return contract;
};

var getJSON = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

async function loadApp() {
  var awaitWeb3 = async function () {
    web3 = await getWeb3();
    web3.eth.net.getId((err, netId) => {
      if (netId == 648529) {
        var awaitContract = async function () {
          contract = await getContract(web3);
          var awaitAccounts = async function () {
            accounts = await web3.eth.getAccounts()
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