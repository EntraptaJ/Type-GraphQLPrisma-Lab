# KristianFJones/Type-GraphQLPrisma-Lab

This is a work in progress lab using my @K-FOSS/TS-ESNode, TypeGraphQL's experimental Prisma2 generator, and Prisma2 as a proof of concept playground for what future APIs could look like.

## Usage

Clone this repo

Open in VSCode and relaunch in VSCode Remote Development Container.

Open VSCode terminal and run:

```SH
npx prisma2 migrate up --experimental
```

Launch the VSCode Debugging task.

## Usage

### Prisma Data Model

Add in the models you would like to create in [schema.prisma](./schema.prisma)

Run

```SH
npm run prisma2:generate
```

Create Migration/Initial DB Models

#### For non deployed applications

```SH
npm run prisma2:migrate:create:init
```

#### Deployed Applications

```sh
npm run prisma2:migrate:create

```

Bring up the new database model

```SH
npx prisma2 migrate up --experimental
```
