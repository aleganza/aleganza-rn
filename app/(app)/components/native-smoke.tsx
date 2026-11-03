import { openFormSheet } from "@/components/bottom-sheet";
import { DemoCard, ShowcaseFrame } from "@/components/showcase";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { Txt } from "@/components/ui/texts";
import { useTheme } from "@/lib/theme/useTheme";
import { hapticVibrate, hapticVibrateSoft } from "@/lib/utils/haptics";
import { Asset } from "expo-asset";
import * as Application from "expo-application";
import * as Brightness from "expo-brightness";
import * as Device from "expo-device";
import { Image } from "expo-image";
import * as Notifications from "expo-notifications";
import * as ScreenOrientation from "expo-screen-orientation";
import * as Updates from "expo-updates";
import React, { useEffect, useRef, useState } from "react";
import { Platform, View } from "react-native";
import {
  getFileSize as getCompressorFileSize,
  Image as CompressorImage,
} from "react-native-compressor";
import {
  getSystemHapticStatus,
  isSupported as isHapticFeedbackSupported,
  trigger as triggerHapticFeedback,
} from "react-native-haptic-feedback";
import Video from "react-native-video";

const ICON = require("@/assets/icon.png");
const VIDEO_URL =
  "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4";
const NOTIFICATION_CHANNEL = "native-smoke";

const formatValue = (value: unknown) => {
  if (value === undefined) return "";
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
};

export default function NativeSmokeShowcase() {
  const { theme } = useTheme();
  const [log, setLog] = useState<string[]>([]);
  const [assetUri, setAssetUri] = useState<string | null>(null);
  const [brightness, setBrightness] = useState<number | null>(null);
  const [systemBrightness, setSystemBrightness] = useState<number | null>(null);
  const [usingSystemBrightness, setUsingSystemBrightness] = useState<
    boolean | null
  >(null);
  const [hapticStatus, setHapticStatus] = useState("unknown");
  const [orientation, setOrientation] = useState<string>("unknown");
  const [notificationStatus, setNotificationStatus] = useState("unknown");
  const [notificationId, setNotificationId] = useState<string | null>(null);
  const [videoStatus, setVideoStatus] = useState("idle");
  const [videoError, setVideoError] = useState<string | null>(null);
  const [compressedUri, setCompressedUri] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<string | null>(null);
  const initialBrightness = useRef<number | null>(null);
  const brightnessTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const push = (message: string) => {
    const time = new Date().toLocaleTimeString();
    setLog((prev) => [`${time}  ${message}`, ...prev].slice(0, 40));
  };

  const run = async (
    label: string,
    action: () => Promise<unknown> | unknown,
  ) => {
    try {
      const result = await action();
      const formatted = formatValue(result);
      push(`${label}: OK${formatted ? ` → ${formatted}` : ""}`);
    } catch (error) {
      push(
        `${label}: ERROR → ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  };

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNEL, {
        name: "Native smoke",
        importance: Notifications.AndroidImportance.DEFAULT,
      }).catch(() => {});
    }

    Brightness.getBrightnessAsync()
      .then((value) => {
        initialBrightness.current = value;
        setBrightness(value);
      })
      .catch(() => {});

    if (Platform.OS === "android") {
      Brightness.getSystemBrightnessAsync()
        .then(setSystemBrightness)
        .catch(() => {});
      Brightness.isUsingSystemBrightnessAsync()
        .then(setUsingSystemBrightness)
        .catch(() => {});
    }

    getSystemHapticStatus()
      .then((status) => setHapticStatus(formatValue(status)))
      .catch(() => {});

    ScreenOrientation.getOrientationAsync()
      .then((value) => setOrientation(ScreenOrientation.Orientation[value]))
      .catch(() => {});

    return () => {
      Notifications.setNotificationHandler(null);

      if (brightnessTimer.current) {
        clearTimeout(brightnessTimer.current);
      }

      if (Platform.OS === "android") {
        Brightness.restoreSystemBrightnessAsync().catch(() => {});
      } else if (initialBrightness.current !== null) {
        Brightness.setBrightnessAsync(initialBrightness.current).catch(() => {});
      }
    };
  }, []);

  const loadAsset = async () => {
    const asset = Asset.fromModule(ICON);
    await asset.downloadAsync();
    const uri = asset.localUri ?? asset.uri;
    setAssetUri(uri);
    return uri;
  };

  const readBrightness = async () => {
    const value = await Brightness.getBrightnessAsync();
    setBrightness(value);

    if (Platform.OS === "android") {
      const [system, usingSystem] = await Promise.all([
        Brightness.getSystemBrightnessAsync(),
        Brightness.isUsingSystemBrightnessAsync(),
      ]);
      setSystemBrightness(system);
      setUsingSystemBrightness(usingSystem);
      return `${value.toFixed(2)} (system ${system.toFixed(2)}, override=${!usingSystem})`;
    }

    return value.toFixed(2);
  };

  const releaseBrightnessOverride = async () => {
    if (Platform.OS === "android") {
      await Brightness.restoreSystemBrightnessAsync();
    } else if (initialBrightness.current !== null) {
      await Brightness.setBrightnessAsync(initialBrightness.current);
    }
  };

  const setLowBrightness = async () => {
    await Brightness.setBrightnessAsync(0.3);
    const value = await readBrightness().catch(() => "0.30");

    if (brightnessTimer.current) {
      clearTimeout(brightnessTimer.current);
    }

    brightnessTimer.current = setTimeout(() => {
      releaseBrightnessOverride()
        .then(readBrightness)
        .catch(() => {});
    }, 1500);

    return `${value} (auto-restore in 1.5s)`;
  };

  const releaseBrightness = async () => {
    await releaseBrightnessOverride();
    return readBrightness();
  };

  const readOrientation = async () => {
    const value = await ScreenOrientation.getOrientationAsync();
    setOrientation(ScreenOrientation.Orientation[value]);
    return ScreenOrientation.Orientation[value];
  };

  const requestNotificationPermissions = async () => {
    const settings = await Notifications.requestPermissionsAsync();
    setNotificationStatus(
      settings.granted ? "granted" : `denied (${settings.status})`,
    );
    return settings.granted;
  };

  const scheduleNotification = async () => {
    let permissions = await Notifications.getPermissionsAsync();
    if (!permissions.granted) {
      permissions = await Notifications.requestPermissionsAsync();
    }

    if (!permissions.granted) {
      setNotificationStatus(`denied (${permissions.status})`);
      throw new Error("notification permission not granted");
    }

    setNotificationStatus("granted");

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Native smoke test",
        body: "Local notification scheduled by the template",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
        channelId: NOTIFICATION_CHANNEL,
      },
    });

    setNotificationId(id);
    return id;
  };

  const cancelNotification = async () => {
    if (!notificationId) {
      throw new Error("no scheduled notification");
    }

    await Notifications.cancelScheduledNotificationAsync(notificationId);
    setNotificationId(null);
    return "cancelled";
  };

  const openForm = () => {
    openFormSheet({
      title: "Native smoke form",
      fields: [
        {
          type: "text",
          key: "name",
          label: "Name",
          placeholder: "Type here",
        },
      ],
      submitLabel: "Submit",
      onSubmit: (values) => {
        push(`form-sheet submitted: ${JSON.stringify(values)}`);
      },
    });

    push("gorhom form-sheet opened");
  };

  const compressIcon = async () => {
    const asset = Asset.fromModule(ICON);
    await asset.downloadAsync();

    if (!asset.localUri) {
      throw new Error("asset localUri is null");
    }

    const before = await getCompressorFileSize(asset.localUri).catch(
      () => "unknown",
    );
    const result = await CompressorImage.compress(asset.localUri, {
      compressionMethod: "manual",
      maxWidth: 128,
      maxHeight: 128,
      quality: 0.5,
      output: "jpg",
    });
    const after = await getCompressorFileSize(result).catch(() => "unknown");

    setCompressedUri(result);
    setCompressedSize(`${before} → ${after} bytes`);

    return `${before} → ${after} bytes`;
  };

  const deviceRows = [
    ["Model", Device.modelName ?? "unknown"],
    ["OS", `${Device.osName ?? "unknown"} ${Device.osVersion ?? ""}`.trim()],
    ["Runtime", Device.isDevice ? "physical device" : "simulator/emulator"],
    ["App name", Application.applicationName ?? "unknown"],
    ["App id", Application.applicationId ?? "unknown"],
    ["Version", Application.nativeApplicationVersion ?? "unknown"],
    ["Build", Application.nativeBuildVersion ?? "unknown"],
  ];

  const updatesRows = [
    ["Enabled", String(Updates.isEnabled)],
    ["Update id", Updates.updateId ?? "embedded"],
    ["Runtime version", Updates.runtimeVersion ?? "unknown"],
    ["Channel", Updates.channel ?? "dev/null"],
  ];

  return (
    <ShowcaseFrame
      title="Native smoke test"
      subtitle="Manual checks for the native modules that are not covered by the other demos."
    >
      <DemoCard title="Device and application">
        {deviceRows.map(([label, value]) => (
          <View
            key={label}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: theme.spacing.sm,
            }}
          >
            <Txt>{label}</Txt>
            <Txt
              style={{
                color: theme.colors.textSupporting,
                flexShrink: 1,
                textAlign: "right",
              }}
            >
              {value}
            </Txt>
          </View>
        ))}
      </DemoCard>

      <DemoCard title="Asset and expo-image">
        <Image
          source={ICON}
          style={{ width: 80, height: 80, borderRadius: theme.borderRadius.md }}
        />
        <Txt style={{ color: theme.colors.textSupporting }}>
          localUri: {assetUri ?? "not loaded"}
        </Txt>
        <PrimaryButton
          onPress={() => run("expo-asset", loadAsset)}
        >
          Load asset
        </PrimaryButton>
      </DemoCard>

      <DemoCard title="Haptics">
        <Txt style={{ color: theme.colors.textSupporting }}>
          supported: {String(isHapticFeedbackSupported())} · system:{" "}
          {hapticStatus}
        </Txt>
        <PrimaryButton
          onPress={() => run("expo-haptics light", hapticVibrate)}
        >
          Expo haptics light
        </PrimaryButton>
        <SecondaryButton
          onPress={() => run("expo-haptics soft", hapticVibrateSoft)}
        >
          Expo haptics soft
        </SecondaryButton>
        <SecondaryButton
          onPress={() =>
            run("react-native-haptic-feedback", () => {
              triggerHapticFeedback("impactLight", {
                enableVibrateFallback: true,
                ignoreAndroidSystemSettings: false,
              });
              return `supported=${isHapticFeedbackSupported()}`;
            })
          }
        >
          RN haptic (respect settings)
        </SecondaryButton>
        <SecondaryButton
          onPress={() =>
            run("react-native-haptic-feedback force", () => {
              triggerHapticFeedback("impactLight", {
                enableVibrateFallback: true,
                ignoreAndroidSystemSettings: true,
              });
              return `supported=${isHapticFeedbackSupported()} status=${hapticStatus}`;
            })
          }
        >
          RN haptic (force)
        </SecondaryButton>
      </DemoCard>

      <DemoCard title="Brightness">
        <Txt style={{ color: theme.colors.textSupporting }}>
          App: {brightness === null ? "unknown" : brightness.toFixed(2)}
          {Platform.OS === "android"
            ? ` · System: ${systemBrightness === null ? "unknown" : systemBrightness.toFixed(2)} · Using system: ${
                usingSystemBrightness === null
                  ? "unknown"
                  : usingSystemBrightness
                    ? "yes"
                    : "no (override active)"
              }`
            : ""}
        </Txt>
        <PrimaryButton onPress={() => run("brightness get", readBrightness)}>
          Read brightness
        </PrimaryButton>
        <SecondaryButton
          onPress={() => run("brightness set 0.3", setLowBrightness)}
        >
          Set 0.3 (auto-restore)
        </SecondaryButton>
        <SecondaryButton
          onPress={() => run("brightness release override", releaseBrightness)}
        >
          Release override
        </SecondaryButton>
      </DemoCard>

      <DemoCard title="Orientation (portrait-only app)">
        <Txt style={{ color: theme.colors.textSupporting }}>
          Current: {orientation}
        </Txt>
        <PrimaryButton onPress={() => run("orientation get", readOrientation)}>
          Read orientation
        </PrimaryButton>
        <SecondaryButton
          onPress={() =>
            run("orientation lock portrait", async () => {
              await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT_UP,
              );
              return readOrientation();
            })
          }
        >
          Lock portrait
        </SecondaryButton>
        <SecondaryButton
          onPress={() =>
            run("orientation unlock", async () => {
              await ScreenOrientation.unlockAsync();
              return readOrientation();
            })
          }
        >
          Unlock
        </SecondaryButton>
      </DemoCard>

      <DemoCard title="Notifications">
        <Txt style={{ color: theme.colors.textSupporting }}>
          Permission: {notificationStatus} · scheduled: {notificationId ?? "none"}
        </Txt>
        <PrimaryButton
          onPress={() =>
            run("notification permissions", requestNotificationPermissions)
          }
        >
          Request permissions
        </PrimaryButton>
        <PrimaryButton onPress={() => run("notification schedule", scheduleNotification)}>
          Schedule in 2s
        </PrimaryButton>
        <SecondaryButton onPress={() => run("notification cancel", cancelNotification)}>
          Cancel scheduled
        </SecondaryButton>
      </DemoCard>

      <DemoCard title="Updates (dev client limitation)">
        {updatesRows.map(([label, value]) => (
          <View
            key={label}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: theme.spacing.sm,
            }}
          >
            <Txt>{label}</Txt>
            <Txt style={{ color: theme.colors.textSupporting }}>{value}</Txt>
          </View>
        ))}
        <PrimaryButton
          onPress={() =>
            run("updates check", async () => {
              if (!Updates.isEnabled) {
                throw new Error("Updates disabled in dev client (expected)");
              }
              const result = await Updates.checkForUpdateAsync();
              return `available=${result.isAvailable}`;
            })
          }
        >
          Check for update
        </PrimaryButton>
      </DemoCard>

      <DemoCard title="Gorhom form sheet">
        <PrimaryButton onPress={openForm}>Open form sheet</PrimaryButton>
      </DemoCard>

      <DemoCard title="Video (network)">
        <Video
          source={{ uri: VIDEO_URL }}
          style={{
            width: "100%",
            height: 180,
            borderRadius: theme.borderRadius.md,
            backgroundColor: "#000000",
          }}
          controls
          muted
          resizeMode="contain"
          onLoadStart={() => {
            setVideoStatus("loading");
            setVideoError(null);
          }}
          onLoad={() => {
            setVideoStatus("loaded");
            push("video: loaded");
          }}
          onError={(event) => {
            const message =
              event.error.errorString ??
              event.error.localizedDescription ??
              "unknown error";
            setVideoError(message);
            setVideoStatus("error");
            push(`video: ERROR → ${message}`);
          }}
        />
        <Txt style={{ color: theme.colors.textSupporting }}>
          Status: {videoStatus}
          {videoError ? ` · ${videoError}` : ""}
        </Txt>
        <Txt style={{ color: theme.colors.textSupporting }}>
          Remote 1 MB sample; network required.
        </Txt>
      </DemoCard>

      <DemoCard title="Compressor">
        <PrimaryButton onPress={() => run("compressor image", compressIcon)}>
          Compress icon
        </PrimaryButton>
        <Txt style={{ color: theme.colors.textSupporting }}>
          Size: {compressedSize ?? "not compressed"}
        </Txt>
        {compressedUri ? (
          <Image
            source={{ uri: compressedUri }}
            style={{
              width: 80,
              height: 80,
              borderRadius: theme.borderRadius.md,
            }}
          />
        ) : null}
      </DemoCard>

      <DemoCard title="Log">
        {log.length === 0 ? (
          <Txt style={{ color: theme.colors.textSupporting }}>
            No actions yet
          </Txt>
        ) : (
          log.map((entry, index) => (
            <Txt
              key={`${index}-${entry}`}
              selectable
              style={{
                fontFamily: theme.family.mono.regular,
                fontSize: theme.fontSize.xs,
                color: theme.colors.textSupporting,
              }}
            >
              {entry}
            </Txt>
          ))
        )}
      </DemoCard>
    </ShowcaseFrame>
  );
}
