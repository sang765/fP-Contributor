/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { addBadge, BadgePosition, ProfileBadge, removeBadge } from "@api/Badges";
import { ApplicationCommandInputType, sendBotMessage } from "@api/Commands";
import { definePluginSettings } from "@api/Settings";
import ErrorBoundary from "@components/ErrorBoundary";
import { Link } from "@components/Link";
import { Devs } from "@utils/constants";
import { Margins } from "@utils/margins";
import { copyWithToast } from "@utils/misc";
import definePlugin, { OptionType } from "@utils/types";
import { Button, Forms } from "@webpack/common";
import { User } from "discord-types/general";
import virtualMerge from "virtual-merge";

type Badge = {
    id: string;
    description: string;
    icon: string;
    link?: string;
};

interface UserProfile extends User {
    profileEffectId?: number;
}
let UsersData = {} as Record<string, string>;
const UserBadges: Record<string, ProfileBadge[]> = {};
const addBadgesForAllUsers = () => {
    Object.keys(UsersData).forEach(userId => {
        const userBadges = UsersData[userId].badges;
        if (userBadges) {
            userBadges.forEach((badge: Badge) => {
                const newBadge: ProfileBadge = {
                    description: badge.description,
                    image: badge.icon,
                    position: BadgePosition.START,
                    props: {
                        style: {
                            borderRadius: "50%",
                            transform: "scale(0.9)"
                        }
                    },
                    shouldShow: user => user.user.id === userId,
                };
                addBadge(newBadge);
                if (!UserBadges[userId]) {
                    UserBadges[userId] = [];
                }
                UserBadges[userId].push(newBadge);
            });
        }
    });
};

const removeBadgesForAllUsers = () => {
    Object.keys(UserBadges).forEach(userId => {
        const userBadges = UserBadges[userId].badges;
        if (userBadges) {
            userBadges.forEach(badge => {
                removeBadge(badge);
            });
        }
    });
};
async function loadfakeProfile(noCache = false) {
    UsersData = {};
    const init = {} as RequestInit;
    if (noCache)
        init.cache = "no-cache";
    const response = await fetch("https://i.sampath.tech/v2/users/fakeProfile", init);
    const data = await response.json();
    UsersData = data;
}

function getUserEffect(profileId: string) {
    const userEffect = UsersData[profileId].profile_effect;
    return userEffect || null;
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
    },
    enableCustomBadges: {
        description: "Allows you to use custom badges",
        type: OptionType.BOOLEAN,
        default: false,
        restartNeeded: true
    }
});

export default definePlugin({
    name: "fakeProfile",
    description: "Use discord profile effects, themes without nitro and get custom badges.",
    authors: [{
        name: "Sampath",
        id: 984015688807100419n,
    }, Devs.Alyxia, Devs.Remty],
    async start() {
        await loadfakeProfile();
        if (settings.store.enableCustomBadges) {
            addBadgesForAllUsers();
        }
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
            <Link href="https://github.com/sampathgujarathi/fakeProfile/#how-to-get-profile-effects">CLICK HERE TO GET PROFILE EFFECTS OR CUSTOM BADGES</Link>
            <Forms.FormText>
                Enable Profile Themes to use fake profile themes. <br />
                To set your own colors:
                <ul>
                    <li>• go to your profile settings</li>
                    <li>• choose your own colors in the Nitro preview</li>
                    <li>• click the "Copy 3y3" button</li>
                    <li>• paste the invisible text anywhere in your bio</li>
                </ul><br />
            </Forms.FormText>
        </Forms.FormSection>
    ),
    settings,
    profileDecodeHook(user: UserProfile) {
        if (user) {
            if (settings.store.enableProfileEffects || settings.store.enableProfileThemes) {
                let mergeData: Partial<UserProfile> = {};
                const profileEffect = getUserEffect(user.userId);
                const colors = decode(user.bio);
                if (settings.store.enableProfileEffects && profileEffect) {
                    mergeData = {
                        ...mergeData,
                        profileEffectId: profileEffect
                    };
                }

                if (settings.store.enableProfileThemes && colors) {
                    mergeData = {
                        ...mergeData,
                        premiumType: 2,
                        themeColors: colors
                    };
                }

                return virtualMerge(user, mergeData as UserProfile);
            }
            return user;
        }

        return user;
    },
    commands: [
        {
            name: "reload",
            description: "Reloads profile effects and custom badges",
            options: [],
            inputType: ApplicationCommandInputType.BOT,
            execute: async (opts, ctx) => {
                removeBadgesForAllUsers();
                await loadfakeProfile(true);
                addBadgesForAllUsers();
                sendBotMessage(ctx.channel.id, { content: "Reloaded profile effects and custom badges" });
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
