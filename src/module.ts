import Quagga, { type QuaggaJSConfigObject } from "@ericblade/quagga2";

import { QrCodeReader } from "./QrCodeReader";

const ImageWrapper = Quagga.ImageWrapper;
//Quagga.registerReader("qr_code", QrCodeReader);
//configure the code reader
Quagga.registerReader("qrcode", QrCodeReader);
const config: QuaggaJSConfigObject = {
  inputStream: {
    name: "Live",
    type: "LiveStream",
    // where it draws the video
    target: "#myElement", // Or '#yourElement' (optional)
  },
  decoder: {
    // we can pass custom readers
    // @ts-ignore - this is a custom reader
    readers: ["code_39_reader", "code_128_reader", "qrcode"],
  },
};

Quagga.init(config, function (err: any) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Initialization finished. Ready to start");
  Quagga.start();
  Quagga.onDetected(function (data: any) {
    console.log("detected ", data);
    Quagga.stop();
  });
});
