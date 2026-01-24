import { useTheme } from "@/lib/theme/useTheme";
import { ExternalLink, Link } from "lucide-react-native";
import { ColorValue, View } from "react-native";

import { LinkLabelWrapper, Property } from "./common";

export type LinkItem = {
  href: string;
  color: ColorValue | string;
  bgColor: ColorValue | string;
};

export type GalleryProps = {
  data: LinkItem[];
};

export default function Links({ data }: GalleryProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flexWrap: "wrap",
        flexDirection: "row",
        rowGap: theme.spacing.sm,
        columnGap: theme.spacing.sm,
      }}
    >
      {data.map((link, index) => (
        <LinkLabelWrapper
          key={index}
          property={
            <Property
              text={link.href.replace(/^https?:\/\//, "")}
              Icon={ExternalLink}
              textColor={link.color.toString()}
            />
          }
          href={link.href}
          wrapperStyle={{
            backgroundColor: link.bgColor.toString(),
          }}
        />
      ))}
    </View>
  );
}
