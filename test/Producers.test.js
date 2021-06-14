const { expect } = require('chai');

const Producers = artifacts.require('Producers');

contract('Producers', function () {
  beforeEach(async function () {
    this.producers = await Producers.new();
  });

  it('addProducers stores producer', async function () {
    await this.producers.addProducer(
      "name",
      "email",
      "phone",
      "whatsapp",
      "region",
      "country",
      "bio",
      "image"
    );

    var first_producer = await this.producers.producers(1)
    expect(first_producer.name).to.equal('name');
  });
});