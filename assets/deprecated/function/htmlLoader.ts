import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

/**
 * Loads a local HTML file from assets and returns it as a string
 * so it can be used in WebView source={{ html: ... }}
 *
 * @param modulePath - require path of your local HTML file
 * @returns string containing the HTML content
 */
export const loadHtmlAsset = async (modulePath: any): Promise<string> => {
  try {
    // Get the asset object
    const asset = Asset.fromModule(modulePath);

    // Make sure the asset is downloaded and available locally
    await asset.downloadAsync();

    // Read the local file as string
    const htmlString = await FileSystem.readAsStringAsync(asset.localUri!);

    return htmlString;
  } catch (error) {
    console.error("Error loading HTML asset:", error);
    return "<h1>Error loading HTML file</h1>";
  }
};
