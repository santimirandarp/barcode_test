import { QuaggaJSCodeReader } from "@ericblade/quagga2";
import jsQR from "jsqr";

class QrCodeReader {
  _row: [];
  config: {};
  supplements: any; // TODO: is FORMAT, _row, config, supplements actually necessary? check inside quagga to see if
  // they are used for anything? or if they are just customary.
  FORMAT: {
    value: "qrcode";
    writeable: false;
  };
  constructor(config: any, supplements: any) {
    this._row = [];
    this.config = config || {};
    this.supplements = supplements;
    this.FORMAT = {
      value: "qrcode",
      writeable: false,
    };
    return this;
  }

  decodeImage(inputImageWrapper: any) {
    const data = inputImageWrapper.getAsRGBA();
    const result = jsQR(
      data,
      inputImageWrapper.size.x,
      inputImageWrapper.size.y
    );
    if (result === null) {
      return null;
    }
    // TODO: translate result.location into same values as box/boxes from other readers?
    return {
      codeResult: {
        code: result.data,
        format: this.FORMAT.value,
      },
      ...result,
    };
  }
  decodePattern(pattern: any) {
    return null;
  }
}

export { QrCodeReader };
