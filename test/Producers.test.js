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
    expect(first_producer.email).to.equal('email');
    expect(first_producer.phone).to.equal('phone');
    expect(first_producer.whatsapp).to.equal('whatsapp');
    expect(first_producer.region).to.equal('region');
    expect(first_producer.country).to.equal('country');
    expect(first_producer.bio).to.equal('bio');
    expect(first_producer.image).to.equal('image');
  });
});