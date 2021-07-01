Honduras agricultural producers distributed and transparent database on Lacchain.

Currently deployed in kovan at `0xF894ac2181144CC52D49816bC6893673F50f9f5B`.

# Compile and Test

```bash
npx truffle compile
npx truffle test
```

# Deploy

```bash
npx truffle migrate --network kovan
npx truffle console --network ropsten
```

# Roles y permisos

## Admin

Quien lanza el contrato (el sender) es el primer address administrador. Este address podrá crear o revocar administradores, incluyendo a sí mismo.

Puede:

* Crear productores nuevos
* Asignar el rol de Admin a otro address
* Revocar el rol de Admin a otro address
* Editar cualquier productor?

## Editor

Cuando se crea un nuevo productor, se le asigna un address editor. Los productores pueden ser editados por el editor asignado. Como cualquier otro campo, el editor puede ser modificado cuando se edita un productor.

Puede:

* Editar un productor específico

# Eventos

Para mantener transparencia en la información, cada vez que se crea un evento importante se emite un nuevo evento para que quede el historial a futuro de cada cambio en la información.

## AddProducerEvent

Se emite cuando se crea un productor. Se almacenan todos los campos del productor al momento de su creación así como el address que creó dicho productor (el sender).

## EditProducerEvent

Se emite cuando se edita un productor. Se almacenan los nuevos valores de todos los campos del productor así como el address que editó (el sender).