/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ApplicationCommandInputType, sendBotMessage } from "@api/Commands";
import { definePluginSettings } from "@api/Settings";
import ErrorBoundary from "@components/ErrorBoundary";
import { Link } from "@components/Link";
import { Margins } from "@utils/margins";
import { copyWithToast } from "@utils/misc";
import definePlugin, { OptionType } from "@utils/types";
import { Button, Forms } from "@webpack/common";
import { User } from "discord-types/general";
import virtualMerge from "virtual-merge";
import { Devs } from "@utils/constants";

interface UserProfile extends User {
    profileEffectId?: number;
}
let UserEffects = {} as Record<string, string>;

async function loadEffects(noCache = false) {
    UserEffects = {};
    const init = {} as RequestInit;
    if (noCache)
        init.cache = "no-cache";
    const response = await fetch("https://i.sampath.tech/users/fakeProfile", init);
    const data = await response.json();
    UserEffects = data;
    console.log("Updated database!", data);
}

function getUserEffect(profileId: string) {
    const userEffect = UserEffects[profileId];
    return userEffect || [];
}
interface UserProfile extends User {
    themeColors?: Array<number>;
}

interface Colors {
    primary: number;
    accent: number;
}

function encode(primary: number, accent: number): string {
    const message = `[#${primary.toString(16).padStart(6, "0")},#${accent.toString(16).padStart(6, "0")}]`;
    const padding = "";
    const encoded = Array.from(message)
        .map(x => x.codePointAt(0))
        .filter(x => x! >= 0x20 && x! <= 0x7f)
        .map(x => String.fromCodePoint(x! + 0xe0000))
        .join("");

    return (padding || "") + " " + encoded;
}

// Courtesy of Cynthia.
function decode(bio: string): Array<number> | null {
    if (bio == null) return null;

    const colorString = bio.match(
        /\u{e005b}\u{e0023}([\u{e0061}-\u{e0066}\u{e0041}-\u{e0046}\u{e0030}-\u{e0039}]+?)\u{e002c}\u{e0023}([\u{e0061}-\u{e0066}\u{e0041}-\u{e0046}\u{e0030}-\u{e0039}]+?)\u{e005d}/u,
    );
    if (colorString != null) {
        const parsed = [...colorString[0]]
            .map(x => String.fromCodePoint(x.codePointAt(0)! - 0xe0000))
            .join("");
        const colors = parsed
            .substring(1, parsed.length - 1)
            .split(",")
            .map(x => parseInt(x.replace("#", "0x"), 16));

        return colors;
    } else {
        return null;
    }
}


const settings = definePluginSettings({
    enableProfileEffects: {
        description: "Allows you to use profile effects",
        type: OptionType.BOOLEAN,
        default: true,
        restartNeeded: true
    },
    enableProfileThemes: {
        description: "Allows you to use profile themes",
        type: OptionType.BOOLEAN,
        default: false,
        restartNeeded: true
    }
});

export default definePlugin({
    name: "fakeProfile",
    description: "Use discord profile effects and themes without nitro.",
    authors: [{
        name: "Sampath",
        id: 984015688807100419n
    }, Devs.Alyxia, Devs.Remty],
    async start() {
        await loadEffects();
    },
    patches: [
        {
            find: "UserProfileStore",
            replacement: {
                match: /(?<=getUserProfile\(\i\){return )(\i\[\i\])/,
                replace: "$self.profileDecodeHook($1)"
            }
        },
        {
            find: ".USER_SETTINGS_PROFILE_THEME_ACCENT",
            replacement: {
                match: /RESET_PROFILE_THEME}\)(?<=color:(\i),.{0,500}?color:(\i),.{0,500}?)/,
                replace: "$&,$self.addCopy3y3Button({primary:$1,accent:$2})"
            }
        }
    ],
    settingsAboutComponent: () => (

        <Forms.FormSection>
            <Forms.FormTitle tag="h3">Usage</Forms.FormTitle>
            <Link href="https://github.com/sampathgujarathi/fakeProfile/#how-to-get-profile-effects">CLICK HERE TO GET PROFILE EFFECTS</Link>
            <Forms.FormText>
                After enabling this plugin, you will see custom colors in the profiles of other people using compatible plugins. <br />
                To set your own colors:
                <ul>
                    <li>• go to your profile settings</li>
                    <li>• choose your own colors in the Nitro preview</li>
                    <li>• click the "Copy 3y3" button</li>
                    <li>• paste the invisible text anywhere in your bio</li>
                </ul><br />
                <b>Please note:</b> if you are using a theme which hides nitro ads, you should disable it temporarily to set colors.
            </Forms.FormText>
        </Forms.FormSection>
    ),
    settings,
    profileDecodeHook(user: UserProfile) {
        if (user) {
            if (settings.store.enableProfileEffects || settings.store.enableProfileThemes) {
                let mergeData: Partial<UserProfile> = {}; // Use Partial to allow merging

                if (settings.store.enableProfileEffects) {
                    const profileEffect = getUserEffect(user.userId);
                    mergeData = {
                        ...mergeData,
                        premiumType: 2,
                        profileEffectId: profileEffect
                    };
                }

                if (settings.store.enableProfileThemes) {
                    const colors = decode(user.bio);
                    mergeData = {
                        ...mergeData,
                        themeColors: colors
                    };
                }

                return virtualMerge(user, mergeData as UserProfile); // Cast back to UserProfile
            }
            return user;
        }

        return user;
    },
    commands: [
        {
            name: "reload",
            description: "Reloads profile effects",
            options: [], // Add options if needed
            inputType: ApplicationCommandInputType.BOT,
            execute: async (opts, ctx) => {
                await loadEffects(true);
                sendBotMessage(ctx.channel.id, { content: "Reloaded profile effects" });
            },
        },
    ],
    addCopy3y3Button: ErrorBoundary.wrap(function ({ primary, accent }: Colors) {
        return <Button
            onClick={() => {
                const colorString = encode(primary, accent);
                copyWithToast(colorString);
            }}
            color={Button.Colors.PRIMARY}
            size={Button.Sizes.XLARGE}
            className={Margins.left16}
        >Copy 3y3
        </Button >;
    }, { noop: true }),
});
