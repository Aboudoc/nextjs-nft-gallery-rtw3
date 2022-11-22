export const NFTCard = ({ nft }) => {
  return (
    <div>
      <div>
        <img src={nft.media[0].gateway}></img>
      </div>
      <div>
        <h2>{nft.title}</h2>
        <p>{nft.id.tokenId.substr(nft.id.tokenId.length)}</p>
      </div>
    </div>
  );
};
