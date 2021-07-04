const { expect } = require('chai');

const Producers = artifacts.require('Producers');

contract('Producers', function () {
  beforeEach(async function () {
    this.producers = await Producers.new();
  });


  var value = [
    "0x4d739Eb42A5869c71b483b1e0d72C3979E3F3769",
    [//Producer
      "",
      "Juan",
      "",
      "",
      "",
      1,
      1,
      1
    ],
    [//Organization
      "",
      "",
      "",
      "",
      "",
    ],
    [//Farm
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "1",
      "",
      "",
      "",
      "",
      true,
      true,
      "",
    ],
    [//Harvest
      "",
      "",
      "",
      "",
    ],
    [//ProductionVolume
      "1",
      "1",
      "1",
    ],
    [//CacaoAgroforestalSystem
      true,
      "",
      true,
      "",
      true,
      "",
      true,
      "",
    ],
    [//Beneficiary
      true,
      true,
    ],
  ];


  it('addProducers stores producer', async function () {
    await this.producers.addProducer(
      value
    );

    var first_producer = await this.producers.registers(0)
    expect(first_producer.producer.name).to.equal('Juan');
  });
});