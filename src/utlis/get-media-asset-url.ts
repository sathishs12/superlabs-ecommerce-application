const CONTABO_BASE =
  "https://eu2.contabostorage.com/eabb361130e04e0c98e8b88a22721601:bb-main";

export const getMediaAssetUrl = (assetPath: string) => {
  return `${CONTABO_BASE}/${assetPath}`;
};
