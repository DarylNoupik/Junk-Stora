<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">JUNKSTORA README</h3>
  <p align="center">
    A database storage library for building decentralized applications
    <br />
    <a href="https://github.com/kttm25/Junkstora/blob/master/README.md"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/kttm25/Junkstora/blob/master/README.md">View Demo</a>
    ·
    <a href="https://github.com/kttm25/Junkstora/issues">Report Bug</a>
    ·
    <a href="https://github.com/kttm25/Junkstora/issues">Request Feature</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#how-will-ipfs-filecoin-or-related-technology-be-used-for-this-project">How will IPFS, Filecoin, or related technology be used for this project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation-and-running-example">Installation and Running example</a></li>
        <li><a href="#available-scripts">Available Scripts</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#references">References</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>


## About The Project

JUNKSTORA is a database storage library for building decentralized applications in Typescript and Javascript, currently focused on Filecoin's IPFS platform.

Junkstora connects to Filecoin nodes, manipulates and encrypts live chain data and operations and Junkstora servers for high performance analytics on blockchain data. Internally, the library can be used either as a main database backup system or as a redundant secondary system.

<p align="right">(<a href="#top">back to top</a>)</p>

## How will IPFS, Filecoin, or related technology be used for this project? 

We use Filecoin IPFS to be able to store dynamic database data to produce a unique signature hash of the original file through the Filecoin blockchain.

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

### Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

- Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

<p align="right">(<a href="#top">back to top</a>)</p>

### Installation and Running example

```console
> npm install
> npm start
```

<p align="right">(<a href="#top">back to top</a>)</p>

Now the plugin is available using `http://localhost:8080`

### Available Scripts

Before starting the project, it is necessary to create an .env file based on the .env.temp file.


After that, in the project directory, you can run:

#### `npm start`

Runs the app in the production mode.<br>
Use [http://localhost:3000](http://localhost:3000) to access to plugin.

You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage

Before using this plugin, you must install ipfs node to contact ipfs network ([Installation instruction](https://docs.ipfs.tech/install/command-line/#system-requirements)). 
Then execute this command to activate the ipfs daemon to communicate with the ipfs network :

```console
> ipfs daemon
```

Then use the following endpoints before accessing the plugins : 

### GET /ipfs/mongodb/getdata
Get a Mongodb database backup on the ipfs storage

**Parameters**

|  Name | Required |  Type   | Description                                                                                                                                               |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `cid` | required | string  | CID of object save in ipfs storage.                                                                     |
|     `privatekey` | optional | array  | The secret key of algorand wallet use to encrypt data                                                                  |
|     `publickey` | optional | string  | The public address of algorand wallet use to encrypt data

```
//Example
{
    "cid": "QmbqxcpJ13Bt9dectb24w2DLB3mMiu1v392pJii5YHp8A2"
    "privatekey" : [32,102,54,27,124,129,82,206,12,139,126,61,205,2,192,111,210,181,77,68,248,0,93,152,118,138,194,249,70,241,203,11,227,204,47,74,156,194,248,154,193,14,191,5,9,96,178,1,123,85,170,148,123,248,161,115,249,86,186,167,167,67,67,67],
    "publickey": "5PGC6SU4YL4JVQIOX4CQTYFSAF5VLKUUYP4KC47ZK25I4QJDBBBB3PTV6B"
}
```

**Response**

```
{
    "success": true,
    "message": "Restore success"
}
```

### POST /ipfs/mongodb/savedata
Backup a mongodb database to ipfs storage

**Parameters**

|  Name | Required |  Type   | Description                                                                                                                                               |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `privatekey` | optional | array  | The secret key of algorand wallet use to encrypt data                                                                  |
|     `publickey` | optional | string  | The public address of algorand wallet use to encrypt data

```
//Example
{
    "privatekey" : [32,102,54,27,124,129,82,206,12,139,126,61,205,2,192,111,210,181,77,68,248,0,93,152,118,138,194,249,70,241,203,11,227,204,47,74,156,194,248,154,193,14,191,5,9,96,178,1,123,85,170,148,123,248,161,115,249,86,186,167,167,67,67,67],
    "publickey": "5PGC6SU4YL4JVQIOX4CQTYFSAF5VLKUUYP4KC47ZK25I4QJDBBBB3PTV6B"
}
```


**Response**

```
{
    "success": true,
    "CID": "QmbqxcpJ13Bt9dectb24w2DLB3mMiu1v392pJii5YHp8A2"
}
```
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Add back to top links
- [ ] Add Changelog
- [ ] Add User interface for plugin
- [ ] Add Plugin to Backup and Restore MySQL database
- [ ] Add Plugin to Backup and Restore SQL Server database
- [ ] Add Plugin to Backup and Restore Oracle Database
- [ ] Add Plugin to Backup and Restore Azure CosmosDB Database
- [ ] Add Plugin to Backup and Restore AWS DynamoDB Database

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

## References

- Documentation:
  - [IPFS CONFIG](https://github.com/ipfs/js-ipfs/blob/master/docs/CONFIG.md)
  - [IPFS HTTP CLIENT](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client#readme)
  - [Mongodb Snapshot](https://github.com/lihaibh/ditto#readme)
  - [Mongodb](https://github.com/mongodb/node-mongodb-native)

<p align="right">(<a href="#top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are 

**greatly appreciated**.

1. Fork the Mintrand Project
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit your Changes (`git commit -a -m 'feat: add some amazing feature'`)
4. Push to the Branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>
