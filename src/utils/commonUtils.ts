// import RNFetchBlob from 'rn-fetch-blob';

// const fs = RNFetchBlob.fs;

// async function downloadImage(url: string): Promise<string> {
//     let imagePath = null;
//     const resp = await RNFetchBlob.config({
//         fileCache: true
//     }).fetch("GET", url);

//     imagePath = resp.path();
//     const base64Data = await resp.readFile("base64");

//     await fs.unlink(imagePath);

//     return base64Data;
// }

// export default downloadImage;

export function debounce(
  func: Function,
  wait: number,
  immediate: boolean = false
) {
  let timeout: any;

  return () => {
    const context: any = this,
      args = arguments;

    const later = () => {
      timeout = null;
      if (!immediate) func();
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func();
  };
}

export const getStatus = (status: string) => {
  switch (status) {
    case "listing":
      return "Active";
    case "accepted":
      return "Accepted";
    case "started":
      return "Started";
    case "restarted":
      return "Restarted";
    case "withdraw":
      return "Withdraw";
    case "completed":
      return "Completed";
    default:
      return "Draft";
  }
};
