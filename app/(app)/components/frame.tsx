import HubItem from "@/components/hub/HubItem";
import HubItemsGroup from "@/components/hub/HubItemsGroup";
import HubWrapper from "@/components/hub/HubWrapper";
import { ShowcaseFrame } from "@/components/showcase";
import React from "react";

export default function FrameShowcase() {
  return (
    <ShowcaseFrame
      title="Frame"
      subtitle="Header variants, custom header content, and the fixed bottom action."
    >
      <HubWrapper>
        <HubItemsGroup label="Variants">
          <HubItem
            label="Basic header"
            icon="menu"
            route="/components/frame/basic"
          />
          <HubItem
            label="Icons only"
            icon="more-1"
            route="/components/frame/icons-only"
          />
          <HubItem
            label="Custom header content"
            icon="filter"
            route="/components/frame/custom-header"
          />
          <HubItem
            label="Bottom action and keyboard"
            icon="upload"
            route="/components/frame/bottom-action"
          />
        </HubItemsGroup>
      </HubWrapper>
    </ShowcaseFrame>
  );
}
