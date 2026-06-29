"use client";

import { useEffect } from "react";

const adUnitPath = "/6355419/Travel/Europe/France/Paris";
const adSlotId = "sticky-footer";
const adSize: [number, number] = [728, 90];

const StickyFooter = () => {
  useEffect(() => {
    const w = window as any;
    w.googletag = w.googletag || { cmd: [] };

    let slot: any;

    w.googletag.cmd.push(() => {
      slot = w.googletag
        .defineSlot(adUnitPath, adSize, adSlotId)
        .addService(w.googletag.pubads());
      w.googletag.enableServices();
      w.googletag.display(adSlotId);
    });

    return () => {
      w.googletag.cmd.push(() => {
        if (slot) w.googletag.destroySlots([slot]);
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
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
      }}
    />
  );
};

export default StickyFooter;
