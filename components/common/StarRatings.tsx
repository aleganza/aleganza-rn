import { useTheme } from "@/lib/theme/useTheme";
import { Star, StarHalf } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Txt } from "../ui/texts";

interface StarRatingsProps {
  rating: number; // 0-10
  reviewCount?: number;
}

export const StarRatings: React.FC<StarRatingsProps> = ({
  rating,
  reviewCount,
}) => {
  const { theme } = useTheme();
  const starColor = "#F2C94C";
  const emptyColor = theme.colors.mist;
  const starSize = theme.iconSize.sm - 2;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor: "blue",
        gap: 4,
      }}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const ratingValue = i * 2 + 1;
        if (rating >= ratingValue + 1) {
          return (
            <Star key={i} size={starSize} color={starColor} fill={starColor} />
          );
        } else if (rating >= ratingValue) {
          return (
            <View
              key={i}
              style={{
                width: starSize,
                height: starSize,
                position: "relative",
              }}
            >
              <Star
                size={starSize}
                color={emptyColor}
                fill={emptyColor}
                style={{ position: "absolute", top: 0, left: 0 }}
              />
              <StarHalf
                size={starSize}
                color={starColor}
                fill={starColor}
                style={{ position: "absolute", top: 0, left: 0 }}
              />
            </View>
          );
        } else {
          return (
            <Star
              key={i}
              size={starSize}
              color={emptyColor}
              fill={emptyColor}
            />
          );
        }
      })}

      {reviewCount !== undefined && (
        <Txt
          style={{
            fontSize: theme.fontSize.sm,
            color: theme.colors.textShy,
            // fontFamily: theme.family.default.regular
          }}
        >
          ({reviewCount})
        </Txt>
      )}
    </View>
  );
};
