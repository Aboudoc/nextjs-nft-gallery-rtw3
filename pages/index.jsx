import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);

  const fetchNFTs = async () => {
    let nfts;
    console.log("fetching nfts");
    const apiKey = "1ies5QbTezWH1atYmleFGuywUWWxYxJz";
    const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTs/`;

    if (!collection.length) {
      // Setup request options:
      var requestOptions = {
        method: "GET",
      };

      const fetchURL = `${baseURL}?owner=${wallet}`;

      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    } else {
      console.log("fetching nfts for collection owned by address");
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    }

    if (nfts) {
      console.log("nfts: ", nfts);
      setNFTs(nfts.ownedNfts);
    }
  };

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: "GET",
      };
      const apiKey = "1ies5QbTezWH1atYmleFGuywUWWxYxJz";
      const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${true}`;
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      if (nfts) {
        console.log("NFTs in collection", nfts);
        setNFTs(nfts.nfts);
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div>
        <input
          onChange={(e) => setWalletAddress(e.target.value)}
          value={wallet}
          type={"text"}
          placeholder="Add your wallet address"
        ></input>
        <input
          onChange={(e) => setCollectionAddress(e.target.value)}
          value={collection}
          type={"text"}
          placeholder="Add the collection address"
        ></input>
        <label>
          <input
            onChange={(e) => setFetchForCollection(e.target.checked)}
            type={"checkbox"}
          ></input>
          Fetch for collection
          <button
            onClick={() => {
              if (fetchForCollection) {
                fetchNFTsForCollection();
              } else {
                fetchNFTs();
              }
            }}
          >
            Let's go!
          </button>
        </label>
      </div>
    </div>
  );
};

export default Home;
