"use client";

import { useEffect } from "react";

const AddComp = ({ id="testing", h, w }: { id: string; w: Number; h: Number }) => {
  const adUnitPath = "/6355419/Travel/Europe/France/Paris";
  const adSlotId = id;
  const adSize: [number, number] = [300, 250];

  useEffect(() => {
    const windowWithGpt = window as any;
    windowWithGpt.googletag = windowWithGpt.googletag || { cmd: [] };

    let slot: any;

    windowWithGpt.googletag.cmd.push(() => {
      slot = windowWithGpt.googletag
        .defineSlot(adUnitPath, adSize, adSlotId)
        .addService(windowWithGpt.googletag.pubads());

      windowWithGpt.googletag.enableServices();

      windowWithGpt.googletag.display(adSlotId);
    });

    return () => {
      windowWithGpt.googletag.cmd.push(() => {
        if (slot) {
          windowWithGpt.googletag.destroySlots([slot]);
        }
      });
    };
  }, []);
  return (
    <div
      id={adSlotId}
      style={{
        width: `${adSize[0]}px`,
        height: `${adSize[1]}px`,
        backgroundColor: "#f0f0f0",
      }}
    />
  );
};

export default AddComp;
